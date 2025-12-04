import { Suspense, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface DelayedSuspenseProps {
    children: ReactNode;
    fallback: ReactNode;
    minDuration?: number;
}

export default function DelayedSuspense({
    children,
    fallback,
    minDuration = 500,
}: DelayedSuspenseProps) {
    const [delayDone, setDelayDone] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setDelayDone(true), minDuration);
        return () => clearTimeout(timer);
    }, [minDuration]);

    if (!delayDone) {
        return <>{fallback}</>;
    }

    return <Suspense fallback={null}>{children}</Suspense>;
}
