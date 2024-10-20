import { FormEvent, useRef, useState } from "react";
import {
    createFormData,
    MAX_FILE_SIZE_NEXTJS_ROUTE,
    validateFiles,
} from "@/components/files/file-upload-helpers";
import { UploadFilesFormUI } from "@/components/files/upload-files-form-ui/upload-files-form-ui";

interface Props {
    onUploadSuccess: () => void;
}

export function UploadFilesRoute(props: Props) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const uploadToServer = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!fileInputRef.current?.files?.length) {
            alert("Please, select file you want to upload");
            return;
        }
        const files = Object.values(fileInputRef.current?.files);
        const filesInfo = files.map((file) => ({
            originalFileName: file.name,
            fileSize: file.size,
        }));

        const filesValidationResult = validateFiles(
            filesInfo,
            MAX_FILE_SIZE_NEXTJS_ROUTE,
        );
        if (filesValidationResult) {
            alert(filesValidationResult);
            return;
        }

        setIsLoading(true);

        const formData = createFormData(files);
        const response = await fetch("/api/files/upload/smallFiles", {
            method: "POST",
            body: formData,
        });
        const body = (await response.json()) as {
            status: "ok" | "fail";
            message: string;
        };
        if (body.status === "ok") {
            props.onUploadSuccess();
        } else {
            alert(body.message);
        }
        setIsLoading(false);
    };

    return (
        <UploadFilesFormUI
            fileInputRef={fileInputRef}
            isLoading={isLoading}
            maxFileSize={MAX_FILE_SIZE_NEXTJS_ROUTE}
            uploadToServer={uploadToServer}
        />
    );
}
