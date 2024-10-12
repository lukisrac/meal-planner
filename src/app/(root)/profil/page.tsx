"use client";

import { signOut } from "next-auth/react";
import { Button } from "react-aria-components";

export default function ProfilePage() {
    const handleLogout = () => signOut({ callbackUrl: "/prihlaseni" });

    return (
        <div>
            <Button onPress={handleLogout}>Odhlásit se</Button>
        </div>
    );
}
