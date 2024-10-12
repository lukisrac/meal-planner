import { requireAuth } from "@/utils/require-auth";

export default async function Home() {
    await requireAuth();

    return <div>sdfsdf</div>;
}
