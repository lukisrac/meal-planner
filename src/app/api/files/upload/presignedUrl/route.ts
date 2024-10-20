import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { env } from "@/env";
import { PresignedUrlProp, ShortFileProp } from "@/utils/types";
import { createPresignedUrlToUpload } from "@/utils/upload-client";

const bucketName = env.S3_BUCKET_NAME;
const expiry = 60 * 60; // 24 hours

export async function POST(req: NextRequest) {
    if (req.method !== "POST") {
        //res.status(405).json({ message: "Only POST requests are allowed" });
        return new NextResponse("Only POST requests are allowed", {
            status: 405,
        });
    }

    // get the files from the request body
    const files = (await req.json()) as ShortFileProp[];
    //const { files } = body;
    //const files = req.body as ShortFileProp[];
    //console.log("BODY: ", body);

    if (!files?.length) {
        //res.status(400).json({ message: "No files to upload" });
        return new NextResponse("No files to upload", { status: 400 });
    }

    const presignedUrls = [] as PresignedUrlProp[];

    if (files?.length) {
        // use Promise.all to get all the presigned urls in parallel
        await Promise.all(
            // loop through the files
            files.map(async (file) => {
                const fileName = `${nanoid(5)}-${file?.originalFileName}`;

                // get presigned url using s3 sdk
                const url = await createPresignedUrlToUpload({
                    bucketName,
                    fileName,
                    expiry,
                });
                // add presigned url to the list
                presignedUrls.push({
                    fileNameInBucket: fileName,
                    originalFileName: file.originalFileName,
                    fileSize: file.fileSize,
                    url,
                });
            }),
        );
    }

    //res.status(200).json(presignedUrls);
    return NextResponse.json(presignedUrls, { status: 200 });
}
