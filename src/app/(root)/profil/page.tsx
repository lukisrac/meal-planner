"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button/button";
import { signOut } from "@/lib/auth-client";

export default function ProfilePage() {
    const router = useRouter();

    //const handleLogout = () => signOut({ callbackUrl: "/prihlaseni" });
    const handleLogout = async () =>
        await signOut({
            fetchOptions: {
                onSuccess: () => router.push("/"),
            },
        });

    return (
        <div>
            <Button onPress={handleLogout}>Odhlásit se</Button>
        </div>
    );
}
