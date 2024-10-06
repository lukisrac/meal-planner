"use client";

import { redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import loginBgImg from "../../../public/login-bg.png";
import { css } from "../../../styled-system/css";
import { Center } from "../../../styled-system/jsx";

export default function LoginPage() {
    const { status } = useSession();

    const handleLogin = () => signIn("google", { callbackUrl: "/" });

    if (status === "loading") {
        return <div>Loading</div>;
    }

    if (status === "authenticated") {
        redirect("/");
    }

    return (
        <div
            className={css({
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "full",
                width: "full",
                hideFrom: "sm",
            })}
            style={{ backgroundImage: `url(${loginBgImg.src})` }}
        >
            <Center height="full">
                <button
                    className={css({ backgroundColor: "white" })}
                    onClick={handleLogin}
                >
                    Přihlásit se
                </button>
            </Center>
        </div>
    );
}
