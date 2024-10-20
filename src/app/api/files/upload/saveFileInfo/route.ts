import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import { db } from "@/server/db";
import { FileInDBProp } from "@/utils/types";

export async function POST(req: NextRequest) {
    if (req.method !== "POST") {
        //res.status(405).json({ message: "Only POST requests are allowed" });
        return new NextResponse("Only POST requests are allowed", {
            status: 405,
        });
    }

    const presignedUrls = await req.json();
    //const presignedUrls = req.body as PresignedUrlProp[];

    // Get the file name in bucket from the database
    const saveFilesInfo = await db.file.createMany({
        data: presignedUrls.map((file: FileInDBProp) => ({
            bucket: env.S3_BUCKET_NAME,
            fileName: file.fileNameInBucket,
            originalName: file.originalFileName,
            size: file.fileSize,
        })),
    });

    if (saveFilesInfo) {
        //res.status(200).json({ message: "Files saved successfully" });
        return NextResponse.json(
            {
                message: "Files saved successfully",
            },
            { status: 200 },
        );
    } else {
        //res.status(404).json({ message: "Files not found" });
        return NextResponse.json(
            { message: "Files not found" },
            { status: 404 },
        );
    }
}
