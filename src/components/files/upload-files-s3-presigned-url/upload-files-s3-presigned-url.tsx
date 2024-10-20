import { FormEvent, useRef, useState } from "react";
import {
    getPresignedUrls,
    handleUpload,
    MAX_FILE_SIZE_S3_ENDPOINT,
    validateFiles,
} from "@/components/files/file-upload-helpers";
import { UploadFilesFormUI } from "@/components/files/upload-files-form-ui/upload-files-form-ui";
import { ShortFileProp } from "@/utils/types";

interface Props {
    onUploadSuccess: () => void;
}

export function UploadFilesS3PresignedUrl(props: Props) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const uploadToServer = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // check if files are selected
        if (!fileInputRef.current?.files?.length) {
            alert("Please, select file you want to upload");
            return;
        }
        // get File[] from FileList
        const files = Object.values(fileInputRef.current.files);
        // validate files
        const filesInfo: ShortFileProp[] = files.map((file) => ({
            originalFileName: file.name,
            fileSize: file.size,
        }));

        const filesValidationResult = validateFiles(
            filesInfo,
            MAX_FILE_SIZE_S3_ENDPOINT,
        );
        if (filesValidationResult) {
            alert(filesValidationResult);
            return;
        }
        setIsLoading(true);

        const presignedUrls = await getPresignedUrls(filesInfo);
        if (!presignedUrls?.length) {
            alert("Something went wrong, please try again later");
            return;
        }

        // upload files to s3 endpoint directly and save file info to db
        await handleUpload(files, presignedUrls, props.onUploadSuccess);

        setIsLoading(false);
    };

    return (
        <UploadFilesFormUI
            fileInputRef={fileInputRef}
            isLoading={isLoading}
            maxFileSize={MAX_FILE_SIZE_S3_ENDPOINT}
            uploadToServer={uploadToServer}
        />
    );
}
