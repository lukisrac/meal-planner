import { ReactNode } from "react";
import { BottomBar } from "@/components/bottom-bar/bottom-bar";

export default function HomeLayout(props: { children: ReactNode }) {
    return (
        <div className="flex h-full flex-col">
            <div className="container grow">{props.children}</div>
            <BottomBar />
        </div>
    );
}
