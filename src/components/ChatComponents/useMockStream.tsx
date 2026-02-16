import { useEffect, useRef } from "react";

export const useMockStream = (onMessage: (message: any) => void) => {
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        let id = 0;

        intervalRef.current = window.setInterval(() => {
            const message = {
                id: id++,
                user: "User_" + Math.floor(Math.random() * 10),
                text: "Random message " + Math.random().toString(36).substring(2, 7),
                timestamp: Date.now(),
            };

            onMessage(message);
        }, 1000)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [onMessage])
}