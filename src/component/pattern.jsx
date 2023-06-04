


const Pattern = ()=>{
    const {width , height} = useWindowsSize()
    useEffect(()=>{
        const aspect = width / height,
            chart = d3.select('#pattern-parent-id');
        d3.select(window)
            .on("resize", function() {
                let targetWidth = chart.node().getBoundingClientRect().width;
                chart.attr("width", targetWidth);
                chart.attr("height", targetWidth / aspect);
            });
    },[width , height])

    return <article>
        <h1>Dynamic SVG Path</h1>
        <section id="pattern-parent-id" style={{width :'100%' , height : "100%"}}>
            <Square width={width} height={height} cornerRadius={20}/>
        </section>
    </article>
}
export default Pattern;