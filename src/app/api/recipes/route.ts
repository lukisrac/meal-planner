import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import sharp from "sharp";
import {
    getPresignedUrls,
    handleUpload,
} from "@/components/files/file-upload-helpers";
import { FORM_SCHEMA } from "@/components/forms/create-recipe-form";
import { env } from "@/env";
import { authOptions } from "@/server/auth-old";
import { db } from "@/server/db";
import { ShortFileProp } from "@/utils/types";

export async function GET() {
    try {
        const recipes = await db.recipe.findMany();

        return NextResponse.json(recipes);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log("[RECIPES_GET]", e);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const formData = await req.formData();

        const parsedFormData = FORM_SCHEMA.parse({
            title: formData.get("title"),
            description: formData.get("description"),
            preparationTime: parseInt(
                formData.get("preparationTime") as string,
                10,
            ),
            servings: parseInt(formData.get("servings") as string, 10),
            images: formData.getAll("images"),
        });

        if (
            !parsedFormData.title ||
            !parsedFormData.description ||
            !parsedFormData.preparationTime ||
            !parsedFormData.servings ||
            !parsedFormData.images
        ) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const processedImages = await Promise.all(
            parsedFormData.images.map(async (image) => {
                const buffer = await image.arrayBuffer();

                const processedBuffer = await sharp(Buffer.from(buffer))
                    .resize(1920)
                    .webp({ quality: 80 })
                    .toBuffer();

                return new File([processedBuffer], image.name, {
                    type: "image/webp",
                });
            }),
        );

        const filesInfo: ShortFileProp[] = processedImages.map((image) => ({
            originalFileName: image.name,
            fileSize: image.size,
        }));

        const presignedUrls = await getPresignedUrls(filesInfo);

        await handleUpload(processedImages, presignedUrls, () => {
            // eslint-disable-next-line no-console
            console.log("uploaded");
        });

        const recipe = await db.recipe.create({
            data: {
                title: parsedFormData.title,
                description: parsedFormData.description,
                preparationTime: parsedFormData.preparationTime,
                servings: parsedFormData.servings,
                user: { connect: { email: session.user.email } },
                images: {
                    create: presignedUrls.map((url) => ({
                        size: url.fileSize,
                        fileName: url.fileNameInBucket,
                        originalName: url.originalFileName,
                        bucket: env.S3_BUCKET_NAME,
                    })),
                },
            },
        });

        return NextResponse.json(recipe);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log("[RECIPES_POST]", e);
        return new NextResponse("Internal error", { status: 500 });
    }
}
