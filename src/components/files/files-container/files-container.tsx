import { FileItem } from "@/components/files/file-item/file-item";
import { FilesListProps } from "@/utils/types";

export function FilesContainer(props: FilesListProps) {
    if (props.files.length === 0) {
        return (
            <div className="flex h-96 flex-col items-center justify-center">
                <p className="text-xl">No files uploaded yet</p>
            </div>
        );
    }

    return (
        <div className="h-96">
            <h1 className="text-xl">
                Last {props.files.length} uploaded file
                {props.files.length > 1 ? "s" : ""}
            </h1>
            <ul className="h-80 overflow-auto">
                {props.files.map((file) => (
                    <FileItem
                        downloadUsingPresignedUrl={
                            props.downloadUsingPresignedUrl
                        }
                        fetchFiles={props.fetchFiles}
                        file={file}
                        key={file.id}
                        setFiles={props.setFiles}
                    />
                ))}
            </ul>
        </div>
    );
}
