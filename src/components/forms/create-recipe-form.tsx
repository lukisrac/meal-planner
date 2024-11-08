"use client";

import { Button } from "react-aria-components";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/form/form/form";
import { NumberInput } from "@/components/form/number-input/number-input";
import { TextInput } from "@/components/form/text-input/text-input";
import { ImageFileInput } from "@/components/ui/image-file-input/image-file-input";

const FORM_SCHEMA = z.object({
    description: z.string().min(1, "Popisek je povinný"),
    images: z.array(z.instanceof(File)),
    preparationTime: z.number().min(1),
    servings: z.number().min(1),
    title: z.string().min(1, "Název je povinný"),
});

type RecipeFormData = z.infer<typeof FORM_SCHEMA>;

export function CreateRecipeForm() {
    const handleSubmitForm: SubmitHandler<RecipeFormData> = async (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("preparationTime", values.preparationTime.toString());
        formData.append("servings", values.servings.toString());
        values.images.forEach((image) => {
            formData.append("images", image);
        });

        try {
            await fetch("/api/recipes", {
                method: "POST",
                body: formData,
            });
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
        }
    };

    const handleFormErrors: SubmitErrorHandler<RecipeFormData> = (errors) => {
        // eslint-disable-next-line no-console
        console.log("form errors", errors);
    };

    return (
        <Form
            className="mt-10"
            onHandleError={handleFormErrors}
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
                    <ImageFileInput control={control} name="images" />
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
