import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import { db } from "@/server/db";
import { deleteFileFromBucket } from "@/utils/upload-client";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } },
) {
    if (req.method !== "DELETE") {
        return new NextResponse("Only DELETE requests are allowed", {
            status: 405,
        });
    }

    const { id } = params;

    if (!id) {
        return new NextResponse("Missing or invalid id", {
            status: 400,
        });
    }

    // Get the file name in bucket from the database
    const fileObject = await db.file.findUnique({
        where: {
            id,
        },
        select: {
            fileName: true,
        },
    });

    if (!fileObject) {
        return new NextResponse("Item not found", { status: 404 });
    }
    // Delete the file from the bucket
    await deleteFileFromBucket({
        bucketName: env.S3_BUCKET_NAME,
        fileName: fileObject?.fileName,
    });
    // Delete the file from the database
    const deletedItem = await db.file.delete({
        where: {
            id,
        },
    });

    if (deletedItem) {
        return NextResponse.json(
            { message: "Item deleted successfully" },
            { status: 200 },
        );
    } else {
        return NextResponse.json(
            { message: "Item not found" },
            { status: 404 },
        );
    }
}
