"use client";

import { Button } from "react-aria-components";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/form/form/form";
import { NumberInput } from "@/components/form/number-input/number-input";
import { TextInput } from "@/components/form/text-input/text-input";

const FORM_SCHEMA = z.object({
    description: z.string().min(1, "Popisek je povinný"),
    preparationTime: z.number().min(1),
    servings: z.number().min(1),
    title: z.string().min(1, "Název je povinný"),
});

type RecipeFormData = z.infer<typeof FORM_SCHEMA>;

export function CreateRecipeForm() {
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
        <Form
            className="mt-10"
            onSubmit={handleSubmitForm}
            options={{
                defaultValues: {
                    title: "",
                    description: "",
                    preparationTime: 10,
                    servings: 1,
                },
            }}
            schema={FORM_SCHEMA}
        >
            {({ control, formState }) => (
                <>
                    <TextInput
                        control={control}
                        isRequired
                        label="Název"
                        name="title"
                        type="text"
                    />
                    <TextInput
                        control={control}
                        isRequired
                        label="Popisek"
                        name="description"
                        type="text"
                    />
                    <NumberInput
                        control={control}
                        label="Počet porcí"
                        minValue={1}
                        name="servings"
                    />
                    <NumberInput
                        control={control}
                        description="Čas v minutách"
                        label="Doba přípravy"
                        minValue={1}
                        name="preparationTime"
                    />
                    <Button isPending={formState.isSubmitting} type="submit">
                        Odeslat
                    </Button>
                </>
            )}
        </Form>
    );
}
