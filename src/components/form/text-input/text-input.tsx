import {
    Input,
    Label,
    Text,
    TextField,
    TextFieldProps,
} from "react-aria-components";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { useFormIdContext } from "@/providers/form-id-context";

interface Props<FormData extends FieldValues> extends TextFieldProps {
    control: Control<FormData>;
    description?: string;
    hiddenLabel?: boolean;
    label: string;
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

    const formId = useFormIdContext();

    const id = props.id ?? `${formId}__${name}`;

    const { field, fieldState, formState } = useController({
        control,
        name,
        rules: {
            required: props.isRequired ? "Toto pole je povinné" : undefined,
        },
    });

    console.log("fieldState", fieldState.error);

    return (
        <TextField {...textFieldProps} validationBehavior="aria">
            <Label aria-hidden={hiddenLabel} hidden={hiddenLabel}>
                {label}
            </Label>
            <Input
                aria-invalid={fieldState.invalid}
                aria-required={props.isRequired}
                id={id}
                name={field.name}
                ref={field.ref}
                required={props.isRequired}
                type={props.type}
                value={field.value ?? ""}
            />
            {description && <Text slot="description">{description}</Text>}

            {formState.errors[name]?.message && (
                <p>{fieldState.error?.message}</p>
            )}
        </TextField>
    );
}
