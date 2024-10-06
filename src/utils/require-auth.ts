import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

export async function requireAuth() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/prihlaseni");
    }
}
