"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button/button";

export default function ProfilePage() {
    const handleLogout = () => signOut({ callbackUrl: "/prihlaseni" });

    return (
        <div>
            <Button isDisabled onPress={handleLogout}>
                Odhlásit se
            </Button>
        </div>
    );
}
