import { useEffect, useRef, useState } from "react";

export const useDebounce = <T>(value: T, ms: number = 300) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [storedValue, setStoredValue] = useState<T>(value);

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setStoredValue(value);
        }, ms);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [ms, value])

    return storedValue;

}