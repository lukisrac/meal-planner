import {
    FieldError,
    Group,
    Input,
    Label,
    NumberField,
    Text,
} from "react-aria-components";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { Button } from "@/components/ui/button/button";
import { NumberInputProps } from "@/components/ui/number-input/number-input";

interface Props<FormData extends FieldValues> extends NumberInputProps {
    control: Control<FormData>;
    name: Path<FormData>;
}

export function NumberInput<FormData extends FieldValues>(
    props: Props<FormData>,
) {
    const {
        control,
        description,
        hiddenLabel,
        isRequired,
        label,
        name,
        ...numberFieldProps
    } = props;

    const { field, fieldState, formState } = useController({ control, name });

    return (
        <NumberField
            isInvalid={fieldState.invalid}
            isRequired={isRequired}
            name={field.name}
            onBlur={field.onBlur}
            onChange={field.onChange}
            validationBehavior="aria"
            value={field.value}
            {...numberFieldProps}
        >
            <Label aria-hidden={hiddenLabel} hidden={hiddenLabel}>
                {label}
            </Label>
            <Group>
                <Input />
                <Button slot="increment">+</Button>
                <Button slot="decrement">-</Button>
            </Group>
            {description && <Text slot="description">{description}</Text>}
            {formState.errors[name]?.message && (
                <FieldError>{fieldState.error?.message}</FieldError>
            )}
        </NumberField>
    );
}
