"use client";

import { Button } from "@/components/ui/button/button";

export default function UiKitPage() {
    return (
        <>
            <div className="space-y-4">
                <p className="text-h2">Buttons</p>
                <hr />
                <div>
                    <p>Variants:</p>
                    <div className="mt-2 flex gap-x-4 gap-y-2">
                        <Button>Button variant filled</Button>
                        <Button variant="rounded">
                            Button variant rounded
                        </Button>
                    </div>
                </div>
                <div>
                    <p>Colors:</p>
                    <div className="mt-2 flex gap-x-4 gap-y-2">
                        <Button>Button color primary</Button>
                        <Button color="secondary">
                            Button color secondary
                        </Button>
                        <Button color="white">Button color white</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
