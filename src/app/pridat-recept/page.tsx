"use client";

import { useEffect, useState } from "react";
import { CreateRecipeForm } from "@/components/forms/create-recipe-form";
import { FileProps } from "@/utils/types";

export default function AddRecipePage() {
    const [, setFiles] = useState<FileProps[]>([]);

    // Fetch files from the database
    const fetchFiles = async () => {
        const response = await fetch("/api/files");
        const body = (await response.json()) as FileProps[];
        // set isDeleting to false for all files after fetching
        setFiles(body.map((file) => ({ ...file, isDeleting: false })));
    };

    // fetch files on the first render
    useEffect(() => {
        // eslint-disable-next-line no-console
        fetchFiles().catch(console.error);
    }, []);

    return (
        <div>
            přidat recept
            <CreateRecipeForm />
            {/* <UploadFilesS3PresignedUrl onUploadSuccess={fetchFiles} />
            <FilesContainer
                fetchFiles={fetchFiles}
                files={files}
                setFiles={setFiles}
            /> */}
        </div>
    );
}
