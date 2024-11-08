import Image from "next/image";
import { formatBytes } from "@/components/files/file-upload-helpers";
import { LoadSpinner } from "@/components/files/load-spinner/load-spinner";
import { FileProps } from "@/utils/types";

async function getPresignedUrl(file: FileProps) {
    const response = await fetch(`/api/files/download/presignedUrl/${file.id}`);
    return (await response.json()) as string;
}

interface Props {
    fetchFiles: () => Promise<void>;
    file: FileProps;
    setFiles: (
        // eslint-disable-next-line no-unused-vars
        files: FileProps[] | ((files: FileProps[]) => FileProps[]),
    ) => void;
}

export function FileItem(props: Props) {
    async function deleteFile(id: string) {
        // remove file from the list of files on the client
        props.setFiles((files: FileProps[]) =>
            files.map((file: FileProps) =>
                file.id === id ? { ...file, isDeleting: true } : file,
            ),
        );

        try {
            // delete file request to the server
            await fetch(`/api/files/delete/${id}`, {
                method: "DELETE",
            });
            // fetch files after deleting
            await props.fetchFiles();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            alert("Failed to delete file");
        } finally {
            // remove isDeleting flag from the file
            props.setFiles((files: FileProps[]) =>
                files.map((file: FileProps) =>
                    file.id === id ? { ...file, isDeleting: false } : file,
                ),
            );
        }
    }

    // Depending on the upload mode, we either download the file using the presigned url from S3 or the Next.js API endpoint.
    const downloadFile = async (file: FileProps) => {
        const presignedUrl = await getPresignedUrl(file);
        window.open(presignedUrl, "_blank");
    };

    return (
        <li className="relative flex items-center justify-between gap-2 border-b py-2 text-sm">
            <button
                className="text-blue-500 hover:text-blue-600 truncate hover:underline"
                onClick={() => downloadFile(props.file)}
            >
                {props.file.originalFileName}
            </button>
            <a
                download
                href={props.file.fileUrl}
                rel="noreferrer"
                target="_blank"
            >
                {props.file.originalFileName}
            </a>

            <Image alt="" height={100} src={props.file.fileUrl} width={100} />

            <div className="flex items-center gap-2">
                <span className="w-32">{formatBytes(props.file.fileSize)}</span>

                <button
                    className="bg-red-500 hover:bg-red-600 flex w-full flex-1 cursor-pointer items-center justify-center rounded-md px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={props.file.isDeleting}
                    onClick={() => deleteFile(props.file.id)}
                >
                    Delete
                </button>
            </div>

            {props.file.isDeleting && (
                <div className="absolute inset-0 flex items-center justify-center rounded-md bg-gray-900 bg-opacity-20">
                    <LoadSpinner size="small" />
                </div>
            )}
        </li>
    );
}
