"use client";

import { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form as ReactAriaForm } from "react-aria-components";
import {
    FieldValues,
    FormProvider,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
    UseFormProps,
    UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";

interface Props<TFieldValues extends FieldValues, Schema> {
    // eslint-disable-next-line no-unused-vars
    children: (methods: UseFormReturn<TFieldValues>) => ReactNode;
    className?: string;
    id?: string;
    onHandleError?: SubmitErrorHandler<TFieldValues>;
    onSubmit: SubmitHandler<TFieldValues>;
    options?: UseFormProps<TFieldValues>;
    schema: Schema;
}

export function Form<
    Schema extends ZodType<any, any, any>, // eslint-disable-line
    TFieldValues extends FieldValues = z.infer<Schema>,
>(props: Props<TFieldValues, Schema>) {
    const form = useForm({
        ...props.options,
        resolver: zodResolver(props.schema),
    });

    return (
        <FormProvider {...form}>
            <ReactAriaForm
                className={props.className}
                id={props.id}
                onSubmit={form.handleSubmit(
                    props.onSubmit,
                    props.onHandleError,
                )}
            >
                {props.children(form)}
            </ReactAriaForm>
        </FormProvider>
    );
}
