import * as Minio from "minio";
import { env } from "@/env";

export const s3Client = new Minio.Client({
    endPoint: env.S3_ENDPOINT,
    accessKey: env.S3_ACCESS_KEY,
    secretKey: env.S3_SECRET_KEY,
    region: env.S3_BUCKER_REGION,
    useSSL: true,
});

export async function createBucketIfNoExists(bucketName: string) {
    const bucketExists = await s3Client.bucketExists(bucketName);

    if (!bucketExists) {
        await s3Client.makeBucket(bucketName);
    }
}

/**
 * Generate presigned urls for uploading files to S3
 * @param files files to upload
 * @returns promise with array of presigned urls
 */
export async function createPresignedUrlToUpload({
    bucketName,
    fileName,
    expiry = 60 * 60, // 1 hour
}: {
    bucketName: string;
    fileName: string;
    expiry?: number;
}) {
    // Create bucket if it doesn't exist
    await createBucketIfNoExists(bucketName);

    return await s3Client.presignedPutObject(bucketName, fileName, expiry);
}

/**
 * Delete file from S3 bucket
 * @param bucketName name of the bucket
 * @param fileName name of the file
 * @returns true if file was deleted, false if not
 */
export async function deleteFileFromBucket({
    bucketName,
    fileName,
}: {
    bucketName: string;
    fileName: string;
}) {
    try {
        await s3Client.removeObject(bucketName, fileName);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return false;
    }

    return true;
}
