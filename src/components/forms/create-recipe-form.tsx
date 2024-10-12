"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "react-aria-components";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const FORM_SCHEMA = z.object({
    description: z.string().min(1, "Popisek je povinný"),
    title: z.string().min(1, "Název je povinný"),
    preparationTime: z.number().min(1),
    servings: z.number().min(1),
});

type RecipeFormData = z.infer<typeof FORM_SCHEMA>;

export function CreateRecipeForm() {
    const formApi = useForm<RecipeFormData>({
        resolver: zodResolver(FORM_SCHEMA),
        defaultValues: {
            title: "",
            description: "",
            preparationTime: 10,
            servings: 1,
        },
    });

    const handleSubmitForm: SubmitHandler<RecipeFormData> = async (values) => {
        try {
            await fetch("/api/recipes", {
                method: "POST",
                body: JSON.stringify(values),
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Form onSubmit={formApi.handleSubmit(handleSubmitForm)}>
            <Controller
                control={formApi.control}
                name="title"
                render={({ field, fieldState }) => (
                    <TextField
                        isInvalid={fieldState.invalid}
                        isRequired
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        validationBehavior="aria"
                        value={field.value}
                    >
                        <Label>Název</Label>
                        <Input ref={field.ref} />
                        <FieldError>{fieldState.error?.message}</FieldError>
                    </TextField>
                )}
            />
            <Controller
                control={formApi.control}
                name="description"
                render={({ field, fieldState }) => (
                    <TextField
                        isInvalid={fieldState.invalid}
                        isRequired
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        validationBehavior="aria"
                        value={field.value}
                    >
                        <Label>Popisek</Label>
                        <Input ref={field.ref} />
                        <FieldError>{fieldState.error?.message}</FieldError>
                    </TextField>
                )}
            />
            {/*<TextInput
                control={formApi.control}
                isRequired
                label="Název"
                name="title"
            />
            <TextInput
                control={formApi.control}
                label="Popisek"
                name="description"
            />*/}
            <Button type="submit">Odeslat</Button>
        </Form>
    );

    /*return (
        <form onSubmit={formApi.handleSubmit(handleSubmit)}>
            <label htmlFor="">Title:</label>
            <input {...formApi.register("title")} />
            <input {...formApi.register("description")} />
            <input type="number" {...formApi.register("preparationTime")} />
            <input type="number" {...formApi.register("servings")} />
            {formApi.formState.errors && <span>This field is required</span>}
            <input type="submit" />
        </form>
    );*/
}
