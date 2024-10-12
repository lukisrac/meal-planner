import Link from "next/link";

export default function NotFound() {
    return (
        <>
            <h2>Stránka nenalezena</h2>
            <Link href="/">Return Home</Link>
        </>
    );
}
