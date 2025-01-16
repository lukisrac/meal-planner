"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import loginBgImg from "../../../../public/login-bg.png";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () =>
        await signIn.email({
            email,
            password,
            callbackURL: "/",
        });

    return (
        <div
            className="size-full bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${loginBgImg.src})` }}
        >
            <div>
                <label>Email: </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex h-full items-center justify-center">
                <button className="bg-white" onClick={handleLogin}>
                    Přihlásit se
                </button>
            </div>
        </div>
    );
}
