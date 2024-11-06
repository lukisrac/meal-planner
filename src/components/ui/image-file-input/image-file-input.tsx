import Image from "next/image";
import { useState } from "react";
import { FileTrigger } from "react-aria-components";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { Button } from "@/components/ui/button/button";

interface Props<FormData extends FieldValues> {
    control: Control<FormData>;
    name: Path<FormData>;
}

export function ImageFileInput<FormData extends FieldValues>(
    props: Props<FormData>,
) {
    const [files, setFiles] = useState<FileList | null>(null);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const { field } = useController({
        control: props.control,
        name: props.name,
    });

    const handleSelectFiles = (files: FileList | null) => {
        setFiles(files);

        if (files) {
            const filesArray = Array.from(files);
            const imagePreviews = filesArray
                .map((file) => URL.createObjectURL(file))
                .filter(Boolean) as string[];
            setPreviewImages(imagePreviews);
            field.onChange(filesArray);
        }
    };

    const handleDeleteFile = (index: number) => {
        if (files) {
            const updatedFiles = Array.from(files).filter(
                (_, i) => i !== index,
            );
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setFiles(updatedFiles);

            const updatedPreviews = previewImages.filter((_, i) => i !== index);
            setPreviewImages(updatedPreviews);
        }
    };

    return (
        <>
            <div className="flex aspect-square max-w-96 items-center justify-center bg-gray-50">
                <FileTrigger
                    acceptedFileTypes={["image/*"]}
                    allowsMultiple
                    onSelect={handleSelectFiles}
                    ref={field.ref}
                >
                    <Button className="bg-transparent flex size-full flex-col items-center justify-center text-grayscale-500">
                        <i className="icon-image-2 text-[50px]" />
                        <span className="text-bodyLg font-normal">
                            Přidat obrázek k receptu
                        </span>
                    </Button>
                </FileTrigger>
            </div>
            {files && (
                <ul>
                    {Array.from(files).map((file, index) => (
                        <li key={file.name}>
                            {previewImages[index] && (
                                <Image
                                    alt=""
                                    height={200}
                                    src={previewImages[index]}
                                    width={200}
                                />
                            )}
                            <button onClick={() => handleDeleteFile(index)}>
                                delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
