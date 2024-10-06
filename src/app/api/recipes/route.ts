import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { db } from "@/server/db";

export async function GET() {
    try {
        const recipes = await db.recipe.findMany();

        return NextResponse.json(recipes);
    } catch (e) {
        console.log("[RECIPES_GET]", e);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();

        const { title, description, preparationTime, servings } = body;

        const recipe = await db.recipe.create({
            data: {
                title,
                description,
                preparationTime,
                servings,
                user: { connect: { email: session.user.email } },
            },
        });

        return NextResponse.json(recipe);
    } catch (e) {
        console.log("[RECIPES_POST]", e);
        return new NextResponse("Internal error", { status: 500 });
    }
}
