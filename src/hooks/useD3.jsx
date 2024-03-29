import {useEffect , useRef} from 'react';
// @ts-ignore
import * as d3 from 'd3';

 const useD3 = (renderChartFn, dependencies) => {
    const ref = useRef();

    useEffect(() => {
        renderChartFn(d3.select(ref.current));
        return () => {};
    }, dependencies);
    return ref;
}
export default useD3