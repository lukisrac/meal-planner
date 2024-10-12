import { ReactNode } from "react";
import {
    FieldValues,
    FormProvider,
    SubmitErrorHandler,
    SubmitHandler,
    UseFormReturn,
} from "react-hook-form";
import { FormIdContextProvider } from "@/providers/form-id-context";

interface Props<TFieldValues extends FieldValues> {
    children: ReactNode;
    className?: string;
    formApi: UseFormReturn<TFieldValues>;
    handleError?: SubmitErrorHandler<TFieldValues>;
    id: string;
    method?: "get" | "post";
    onSubmit: SubmitHandler<TFieldValues>;
}

export function Form<TFieldValues extends FieldValues = FieldValues>(
    props: Props<TFieldValues>,
) {
    return (
        <FormIdContextProvider value={props.id}>
            <FormProvider {...props.formApi}>
                <form
                    className={props.className}
                    id={props.id}
                    method={props.method ?? "post"}
                    noValidate
                    onSubmit={props.formApi.handleSubmit(
                        props.onSubmit,
                        props.handleError,
                    )}
                >
                    {props.children}
                </form>
            </FormProvider>
        </FormIdContextProvider>
    );
}
