"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth-client";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imageBase64, setImageBase64] = useState<string>();

    const convertImageToBase64 = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageBase64(reader.result as string);
        };
    };

    const handleSignUp = async () =>
        await signUp.email(
            {
                email,
                password,
                name,
                image: image ? imageBase64 : undefined,
            },
            {
                onRequest(context) {
                    console.log("Requesting...", context);
                },
                onSuccess(context) {
                    console.log("Success!", context);
                },
                onError(context) {
                    alert(context.error.message);
                },
            },
        );

    return (
        <div>
            <div>
                <label>name</label>
                <input
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label>email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setImage(file);
                            convertImageToBase64(file);
                        }
                    }}
                />
            </div>
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
}
