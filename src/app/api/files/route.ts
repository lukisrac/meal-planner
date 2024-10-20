import { NextResponse } from "next/server";
import { env } from "@/env";
import { db } from "@/server/db";
import { FileProps } from "@/utils/types";

const LIMIT_FILES = 10;

export async function GET() {
    try {
        // Get the 10 latest files from the database
        const files = await db.file.findMany({
            take: LIMIT_FILES,
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                originalName: true,
                size: true,
                fileName: true,
            },
        });

        // The database type is a bit different from the frontend type
        // Make the array of files compatible with the frontend type FileProps
        const filesWithProps: FileProps[] = files.map((file) => ({
            id: file.id,
            originalFileName: file.originalName,
            fileSize: file.size,
            fileNameInBucket: file.fileName,
            fileUrl: `https://${env.S3_ENDPOINT}/${env.S3_BUCKET_NAME}/${file.fileName}`,
        }));

        return NextResponse.json(filesWithProps);
    } catch (e) {
        console.log("[FILES_GET]", e);
        return new NextResponse("Internal error", { status: 500 });
    }
}
