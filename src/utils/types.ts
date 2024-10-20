import { FormEvent, RefObject } from "react";

export type ShortFileProp = {
    originalFileName: string;
    fileSize: number;
};

export type PresignedUrlProp = ShortFileProp & {
    url: string;
    fileNameInBucket: string;
};

export type FileProps = ShortFileProp & {
    id: string;
    isDeleting?: boolean;
    fileNameInBucket: string;
    fileUrl: string;
};

export type FilesListProps = {
    files: FileProps[];
    fetchFiles: () => Promise<void>;
    setFiles: (
        // eslint-disable-next-line no-unused-vars
        files: FileProps[] | ((files: FileProps[]) => FileProps[]),
    ) => void;
    downloadUsingPresignedUrl: boolean;
};

export type LoadSpinnerProps = {
    size?: "small" | "medium" | "large";
};

export type UploadFilesFormUIProps = {
    isLoading: boolean;
    fileInputRef: RefObject<HTMLInputElement>;
    // eslint-disable-next-line no-unused-vars
    uploadToServer: (event: FormEvent<HTMLFormElement>) => void;
    maxFileSize: number;
};

export type FileInDBProp = {
    fileNameInBucket: string;
    originalFileName: string;
    fileSize: number;
};
