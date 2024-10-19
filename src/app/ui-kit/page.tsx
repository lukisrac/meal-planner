"use client";

import { Alert } from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";

export default function UiKitPage() {
    return (
        <>
            {/* BUTTONS */}
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

            {/* ALERTS */}
            <div className="space-y-4">
                <p className="text-h2">Alert</p>
                <hr />
                <div>
                    <p>Colors:</p>
                    <div className="mt-2 flex flex-col gap-y-4">
                        <Alert color="success">Alert - variant success</Alert>
                        <Alert color="info">Alert - variant info</Alert>
                        <Alert color="warning">Alert - variant warning</Alert>
                        <Alert color="error">Alert - variant error</Alert>
                    </div>
                </div>
            </div>
        </>
    );
}
