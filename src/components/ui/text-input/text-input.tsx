import {
    Input,
    Label,
    Text,
    TextField,
    TextFieldProps,
} from "react-aria-components";

export interface TextInputProps extends TextFieldProps {
    description?: string;
    hiddenLabel?: boolean;
    label: string;
}

export function TextInput(props: TextInputProps) {
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
