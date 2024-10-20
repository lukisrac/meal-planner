import Link from "next/link";
import { LoadSpinner } from "@/components/files/load-spinner/load-spinner";
import { UploadFilesFormUIProps } from "@/utils/types";

const GIT_HUB_REPO_LINK =
    "https://github.com/aleksandr-efimenko/local-nextjs-postgres-s3";

export function UploadFilesFormUI(props: UploadFilesFormUIProps) {
    return (
        <form
            className="flex flex-col items-center justify-center gap-3"
            onSubmit={props.uploadToServer}
        >
            <h1 className="text-2xl">
                File upload example using Next.js, MinIO S3, Prisma and
                PostgreSQL
            </h1>
            <p className="text-lg">{`Total file(s) size should not exceed ${props.maxFileSize} MB`}</p>
            <Link
                className="text-blue-500 hover:text-blue-600 hover:underline"
                href={GIT_HUB_REPO_LINK}
            >
                GitHub repo
            </Link>
            {props.isLoading ? (
                <LoadSpinner />
            ) : (
                <div className="flex h-16 gap-5">
                    <input
                        className="rounded-md border bg-gray-100 p-2 py-5"
                        id="file"
                        multiple
                        ref={props.fileInputRef}
                        required
                        type="file"
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 m-2 rounded-md px-5 py-2 disabled:cursor-not-allowed disabled:bg-gray-400"
                        disabled={props.isLoading}
                    >
                        Upload
                    </button>
                </div>
            )}
        </form>
    );
}
