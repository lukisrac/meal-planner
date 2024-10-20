"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { FilesContainer } from "@/components/files/files-container/files-container";
import { ModeSwitchMenu } from "@/components/files/mode-switch-menu/mode-switch-menu";
import { UploadFilesRoute } from "@/components/files/upload-files-route/upload-files-route";
import { UploadFilesS3PresignedUrl } from "@/components/files/upload-files-s3-presigned-url/upload-files-s3-presigned-url";
import { CreateRecipeForm } from "@/components/forms/create-recipe-form";
import { FileProps } from "@/utils/types";

export type fileUploadMode = "s3PresignedUrl" | "NextjsAPIEndpoint";

export default function AddRecipePage() {
    const [files, setFiles] = useState<FileProps[]>([]);
    const [uploadMode, setUploadMode] =
        useState<fileUploadMode>("s3PresignedUrl");

    // Fetch files from the database
    const fetchFiles = async () => {
        const response = await fetch("/api/files");
        const body = (await response.json()) as FileProps[];
        // set isDeleting to false for all files after fetching
        setFiles(body.map((file) => ({ ...file, isDeleting: false })));
    };

    // fetch files on the first render
    useEffect(() => {
        fetchFiles().catch(console.error);
    }, []);

    // determine if we should download using presigned url or Next.js API endpoint
    const downloadUsingPresignedUrl = uploadMode === "s3PresignedUrl";
    // handle mode change between s3PresignedUrl and NextjsAPIEndpoint
    const handleModeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setUploadMode(event.target.value as fileUploadMode);
    };

    return (
        <div>
            přidat recept
            <CreateRecipeForm />
            {/*<UploadFileForm />*/}
            <ModeSwitchMenu
                onModeChange={handleModeChange}
                uploadMode={uploadMode}
            />
            {uploadMode === "s3PresignedUrl" ? (
                <UploadFilesS3PresignedUrl onUploadSuccess={fetchFiles} />
            ) : (
                <UploadFilesRoute onUploadSuccess={fetchFiles} />
            )}
            <FilesContainer
                downloadUsingPresignedUrl={downloadUsingPresignedUrl}
                fetchFiles={fetchFiles}
                files={files}
                setFiles={setFiles}
            />
        </div>
    );
}
