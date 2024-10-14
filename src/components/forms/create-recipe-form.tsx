"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "react-aria-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { TextInput } from "@/components/form/text-input/text-input";

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
            <TextInput
                control={formApi.control}
                isRequired
                label="Název"
                name="title"
                type="text"
            />
            <TextInput
                control={formApi.control}
                label="Popisek"
                name="description"
                type="text"
            />
            <Button type="submit">Odeslat</Button>
        </Form>
    );
}
