import { useState } from "react";

import { useEffect } from "react";

export const useDebounce = (searchQuery : string, delay : number) => {
    const [debouncedValue, setDebouncedValue] = useState(searchQuery);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(searchQuery)
        }, delay)

        return () => clearTimeout(timeout)
    }, [searchQuery])

    return debouncedValue
}