import { headers } from "next/headers";
import Image from "next/image";
import { auth } from "@/lib/auth";

export default async function Home() {
    //await requireAuth();
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return <div>Nepřihlášen</div>;
    }

    return (
        <div>
            <p>sdfsdf</p>
            <p>{session.user.name}</p>
            <p>{session.user.email}</p>
            {session.user.image && (
                <Image
                    alt=""
                    height={200}
                    src={session.user.image}
                    width={200}
                />
            )}
        </div>
    );
}
