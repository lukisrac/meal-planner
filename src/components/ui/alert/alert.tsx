import { ReactNode } from "react";
import { clsx } from "clsx";

interface Props {
    className?: string;
    color: "success" | "info" | "warning" | "error";
    children: ReactNode;
}

export function Alert(props: Props) {
    return (
        <div
            className={clsx(
                "alert",
                `alert--color-${props.color}`,
                props.className,
            )}
            role="alert"
        >
            <i className="alert__icon icon-info-circle" />
            {props.children}
        </div>
    );
}
