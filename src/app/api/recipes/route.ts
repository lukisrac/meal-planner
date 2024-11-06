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

        const title = formData.get("title");
        const description = formData.get("description");
        const preparationTime = parseInt(formData.get("preparationTime"), 10);
        const servings = parseInt(formData.get("servings"), 10);
        const images = formData.getAll("images");

        console.log("title", title);
        console.log("description", description);
        console.log("preparationTime", preparationTime);
        console.log("servings", servings);
        console.log("images", images);

        const imageUrls = [];

        const filesInfo: ShortFileProp[] = images.map((image) => ({
            originalFileName: image.name,
            fileSize: image.size,
        }));

        //console.log("filesInfo", filesInfo);

        const presignedUrls = await getPresignedUrls(filesInfo);

        console.log("presignedUrls", presignedUrls);

        await handleUpload(images, presignedUrls, () => {
            console.log("uploaded");
            imageUrls.push(presignedUrls);
        });

        const uploadedImages = await db.image.findMany({ where: {} });

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
        console.log("[RECIPES_POST]", e);
        return new NextResponse("Internal error", { status: 500 });
    }
}
