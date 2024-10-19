import { clsx } from "clsx";
import { Button as ReactAriaButton, ButtonProps } from "react-aria-components";

interface Props extends ButtonProps {
    color?: "primary" | "secondary" | "white";
    variant?: "filled" | "rounded";
}

export function Button(props: Props) {
    const { className, children, ...buttonProps } = props;

    return (
        <ReactAriaButton
            className={({ isDisabled }) =>
                clsx(
                    "button",
                    `button--color-${props.color ?? "primary"}`,
                    `button--variant-${props.variant ?? "filled"}`,
                    isDisabled && "button--disabled",
                    className,
                )
            }
            {...buttonProps}
        >
            {children}
        </ReactAriaButton>
    );
}
