import useD3 from "./../hooks/useD3";
import * as d3 from 'd3'
const Square = ({width, height}) => {

    const divRef = useD3(div => {
        const lineGenerator = d3.line().curve(d3.curveCardinal);
        const leftCurvedPosition = Math.floor(width * .20);
        const rightCurvePosition = Math.floor(width * .90);
        let pathHeight = height;
        // const sliceWidth = Math.floor(width / 6);
        // debugger
        // let slice = 0
        const points = [[0, pathHeight - 20]]
        for (let i = 20; i < width; i += 20) {
            // if (sliceWidth >= width) break;
            if (leftCurvedPosition - i <= 50 && i < leftCurvedPosition) points.push([i, pathHeight -= 10])
            else if (i < leftCurvedPosition) points.push([i, pathHeight])
            // else if (i === leftCurvedPosition) points.push([i, pathHeight - 50])
            else if (rightCurvePosition - i <= 50 && i < rightCurvePosition) points.push([i, pathHeight += 10])
            else if (i < leftCurvedPosition || i > rightCurvePosition) points.push([i, pathHeight])
            // else if (i === rightCurvePosition) points.push([i, pathHeight])
            else points.push([i, pathHeight]);
            // else if (i > leftCurvedPosition || i < rightCurvePosition) points.push([i, pathHeight - 50])
        }
        points.push([width, height - 16]);
        const pathData = lineGenerator(points);
        div
            .append('div')
            .style('width', `${width}px`)
            .style('height', `${height}px`)
            .style('border', '3px solid black')
            .style('border-bottom', 'none')
            .style('border-radius', '20px')
            .style('position', 'relative')
            .style('margin', '10px auto')
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('stroke-width', '3px')
            .append('path')
            .attr('d', pathData)
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', '3px')
            .style('margin', '0 auto')
    }, [width, height])
    // console.log(width , height)
    // useEffect(() => {
    //     const div = d3.select(divRef.current);
    // }, [width, height]);
    // console.log('re-render')

    return <div ref={divRef}/>;
};
export default Square