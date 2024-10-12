import Link from "next/link";

export function BottomBar() {
    return (
        <div className="h-14">
            <div className="grid grid-cols-5 gap-x-4">
                <div className="relative">
                    <Link  href="/">
                        Domů
                    </Link>
                </div>
                <div className="relative">
                    <Link  href="/objevit">
                        Objevit
                    </Link>
                </div>
                <div className="relative">
                    <Link  href="/pridat-recept">
                        +
                    </Link>
                </div>
                <div className="relative">
                    <Link  href="/moje-recepty">
                        Moje recepty
                    </Link>
                </div>
                <div className="relative">
                    <Link  href="/profil">
                        Profil
                    </Link>
                </div>
            </div>
        </div>
    );
}
