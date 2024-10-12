"use client";

import { redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Loader } from "@/components/ui/loader/loader";
import loginBgImg from "../../../../public/login-bg.png";

export default function LoginPage() {
    const { status } = useSession();

    const handleLogin = () => signIn("google", { callbackUrl: "/" });

    if (status === "loading") {
        return <Loader />;
    }

    if (status === "authenticated") {
        redirect("/");
    }

    return (
        <div
            className="size-full bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${loginBgImg.src})` }}
        >
            <div className="flex h-full items-center justify-center">
                <button className="bg-white" onClick={handleLogin}>
                    Přihlásit se
                </button>
            </div>
        </div>
    );
}
