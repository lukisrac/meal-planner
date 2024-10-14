import {
    FieldError,
    Input,
    Label,
    Text,
    TextField,
} from "react-aria-components";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { TextFieldProps } from "@/components/ui/text-input/text-input";

interface Props<FormData extends FieldValues> extends TextFieldProps {
    control: Control<FormData>;
    name: Path<FormData>;
}

export function TextInput<FormData extends FieldValues>(
    props: Props<FormData>,
) {
    const {
        control,
        description,
        hiddenLabel,
        label,
        name,
        ...textFieldProps
    } = props;

    const { field, fieldState, formState } = useController({
        control,
        name,
    });

    return (
        <TextField
            isInvalid={fieldState.invalid}
            isRequired={props.isRequired}
            name={field.name}
            onBlur={field.onBlur}
            onChange={field.onChange}
            validationBehavior="aria"
            value={field.value}
            {...textFieldProps}
        >
            <Label aria-hidden={hiddenLabel} hidden={hiddenLabel}>
                {label}
            </Label>
            <Input ref={field.ref} />
            {description && <Text slot="description">{description}</Text>}
            {formState.errors[name]?.message && (
                <FieldError>{fieldState.error?.message}</FieldError>
            )}
        </TextField>
    );
}
