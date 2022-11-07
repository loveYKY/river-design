import { useEffect, useState } from 'react';
var useDebounced = function (value, delay) {
    var _a = useState(value), debouncedValue = _a[0], setDebouncedVal = _a[1];
    useEffect(function () {
        var time = window.setTimeout(function () {
            setDebouncedVal(value);
        }, delay);
        return function () {
            clearTimeout(time);
        };
    }, [value, delay]);
    return debouncedValue;
};
export default useDebounced;
