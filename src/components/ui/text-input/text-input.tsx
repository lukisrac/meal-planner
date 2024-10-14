import {
    Input,
    Label,
    Text,
    TextField,
    TextFieldProps as ReactAriaTextFieldProps,
} from "react-aria-components";
import { FieldError } from "react-hook-form";

export interface TextFieldProps extends ReactAriaTextFieldProps {
    description?: string;
    error?: FieldError;
    hiddenLabel?: boolean;
    isFormField?: boolean;
    label: string;
}

export function TextInput(props: TextFieldProps) {
    const { description, hiddenLabel, label, ...textFieldProps } = props;

    return (
        <TextField {...textFieldProps}>
            <Label aria-hidden={hiddenLabel} hidden={hiddenLabel}>
                {label}
            </Label>
            <Input />
            {description && <Text slot="description">{description}</Text>}
        </TextField>
    );
}
