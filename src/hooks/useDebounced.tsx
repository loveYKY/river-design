import {useEffect, useState} from 'react';
import React from 'react';

const useDebounced = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedVal] = useState(value);

    useEffect(() => {
        const time = window.setTimeout(() => {
            setDebouncedVal(value);
        }, delay);
        
        return () => {
            clearTimeout(time);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounced;
