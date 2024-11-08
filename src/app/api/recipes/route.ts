import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import {
    getPresignedUrls,
    handleUpload,
} from "@/components/files/file-upload-helpers";
import { authOptions } from "@/server/auth";
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

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const preparationTime = parseInt(
            formData.get("preparationTime") as string,
            10,
        );
        const servings = parseInt(formData.get("servings") as string, 10);
        const images = formData.getAll("images") as File[];

        if (
            !title ||
            !description ||
            !preparationTime ||
            !servings ||
            !images
        ) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const imageUrls = [];

        const filesInfo: ShortFileProp[] = images.map((image) => ({
            originalFileName: image.name,
            fileSize: image.size,
        }));

        const presignedUrls = await getPresignedUrls(filesInfo);

        await handleUpload(images, presignedUrls, () => {
            // eslint-disable-next-line no-console
            console.log("uploaded");
            imageUrls.push(presignedUrls);
        });

        const recipe = await db.recipe.create({
            data: {
                title,
                description,
                preparationTime,
                servings,
                user: { connect: { email: session.user.email } },
                images: {
                    create: presignedUrls.map((url) => ({
                        size: url.fileSize,
                        fileName: url.originalFileName,
                        originalName: url.originalFileName,
                        bucket: "meal-planner",
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
