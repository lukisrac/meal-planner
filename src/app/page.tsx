import Image from "next/image";
import { getServerSession } from "next-auth";
import { CreateRecipeForm } from "@/components/forms/create-recipe-form";
import { authOptions } from "@/server/auth";
import { requireAuth } from "@/utils/require-auth";
import { css } from "../../styled-system/css";
import { center, circle, hstack, stack } from "../../styled-system/patterns";

export default async function Home() {
    await requireAuth();

    const session = await getServerSession(authOptions);

    return (
        <div className={center({ height: "100vh" })}>
            <div
                className={css({
                    border: "3px solid #000000",
                    boxShadow: "4px 4px 0 #000000",
                    borderRadius: "13px",
                    padding: 6,
                    maxWidth: 400,
                })}
            >
                <div className={stack({ gap: 4 })}>
                    <div className={hstack({ gap: 4 })}>
                        <div
                            className={circle({ size: 12, overflow: "hidden" })}
                        >
                            <Image
                                alt=""
                                height={120}
                                priority
                                src={session?.user.image ?? ""}
                                width={120}
                            />
                        </div>
                        <div>
                            <h2 className={css({ fontWeight: "600" })}>
                                {session?.user.name}
                            </h2>
                            <p className={css({ color: "#7d7d7d" })}>
                                {session?.user.email}
                            </p>
                        </div>
                    </div>
                    <blockquote className={css({ fontSize: "17px" })}>
                        Sint incididunt ipsum ullamco dolore ex dolore in eu qui
                        ea id et dolore minim. Sunt occaecat non eu. Veniam
                        tempor cillum cillum ex cillum commodo non esse quis
                        quis elit id esse aliquip. Qui aute reprehenderit enim
                        cupidatat dolore id nostrud quis. Magna dolore esse
                        nulla aute pariatur laboris labore officia deserunt.
                    </blockquote>
                </div>
            </div>

            <CreateRecipeForm />
        </div>
    );
}
