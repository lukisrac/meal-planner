"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const FORM_SCHEMA = z.object({
    description: z.string().min(1),
    title: z.string().min(1),
    preparationTime: z.number().min(1),
    servings: z.number().min(1),
});

type RecipeFormData = z.infer<typeof FORM_SCHEMA>;

export function CreateRecipeForm() {
    const formApi = useForm<RecipeFormData>({
        resolver: zodResolver(FORM_SCHEMA),
        defaultValues: {
            title: "test",
            description: "fsdsdf",
            preparationTime: 10,
            servings: 1,
        },
    });

    const handleSubmit: SubmitHandler<RecipeFormData> = async (values) => {
        console.log(formApi.formState.errors);
        console.log(values);

        try {
            await fetch("/api/recipes", {
                method: "POST",
                body: JSON.stringify(values),
            });
        } catch (e) {
            console.log(e);
        }
    };

    console.log(formApi.watch("title"));
    console.log(formApi.watch("description"));
    console.log(formApi.watch("servings"));
    console.log(formApi.watch("preparationTime"));

    return (
        <form onSubmit={formApi.handleSubmit(handleSubmit)}>
            <label htmlFor="">Title:</label>
            <input {...formApi.register("title")} />
            <input {...formApi.register("description")} />
            <input type="number" {...formApi.register("preparationTime")} />
            <input type="number" {...formApi.register("servings")} />
            {formApi.formState.errors && <span>This field is required</span>}
            <input type="submit" />
        </form>
    );
}
