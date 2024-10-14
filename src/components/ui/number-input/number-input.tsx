import {
    Group,
    Input,
    Label,
    NumberField,
    NumberFieldProps,
    Text,
} from "react-aria-components";
import { Button } from "@/components/ui/button/button";

export interface NumberInputProps extends NumberFieldProps {
    description?: string;
    hiddenLabel?: boolean;
    label: string;
}

export function NumberInput(props: NumberInputProps) {
    const { description, hiddenLabel, label, ...numberFieldProps } = props;

    return (
        <NumberField {...numberFieldProps}>
            <Label aria-hidden={hiddenLabel} hidden={hiddenLabel}>
                {label}
            </Label>
            <Group>
                <Input />
                <Button slot="increment">+</Button>
                <Button slot="decrement">-</Button>
            </Group>
            {description && <Text slot="description">{description}</Text>}
        </NumberField>
    );
}
