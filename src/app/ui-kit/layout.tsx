import { ReactNode } from "react";

export default function UiKitLayout(props: { children: ReactNode }) {
    return <div className="space-y-10">{props.children}</div>;
}
