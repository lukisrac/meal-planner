import { ChangeEvent } from "react";
import { fileUploadMode } from "@/app/pridat-recept/page";

interface Props {
    uploadMode: fileUploadMode;
    // eslint-disable-next-line no-unused-vars
    onModeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export function ModeSwitchMenu(props: Props) {
    return (
        <ul className="flex items-center justify-center gap-2">
            <li>
                <label htmlFor="uploadMode">Upload Mode:</label>
            </li>
            <li>
                <select
                    className="rounded-md border-2 border-gray-300"
                    id="uploadMode"
                    onChange={props.onModeChange}
                    value={props.uploadMode}
                >
                    <option value="s3PresignedUrl">S3 Presigned Url</option>
                    <option value="NextjsAPIEndpoint">
                        Next.js API Endpoint
                    </option>
                </select>
            </li>
        </ul>
    );
}
