export function chart1() {
  /* SALARY GAP VS OCCUPATION */

  d3.csv(
    "../data/GenderPayGap-PublicData-US_short-version.csv",
    d3.autoType
  ).then(data => {
    console.log(data);

    const filteredData = data
      .filter(function (d) {
        return (
          d.Occupation &&
          d.Category &&
          d.Occupation.toLowerCase() === d.Category.toLowerCase()
        );
      })
      .sort((a, b) => d3.ascending(a["Pay gap ($)"], b["Pay gap ($)"]))
      .slice(0, 10);
    console.log(filteredData);

    const width = window.innerWidth * 0.8,
      height = window.innerHeight / 2,
      paddingInner = 0.2,
      margin = { top: 20, bottom: 40, left: 40, right: 40 };

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, d => d["Pay gap ($)"]) + 2500])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleBand()
      .domain(filteredData.map(d => d.Occupation))
      .range([height - margin.bottom, margin.top])
      .paddingInner(paddingInner);

    const yAxis = d3.axisLeft(yScale);

    const xAxisBottom = d3.axisBottom(xScale).ticks(5, "$s");
    const xAxisTop = d3.axisTop(xScale).ticks(5, "$s");

    const svg = d3
      .select("#d3-container-1")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const rect = svg
      .selectAll("rect")
      .data(filteredData)
      .join("rect")
      .attr("y", d => yScale(d.Occupation))
      .attr("x", margin.left)
      .attr("width", d => xScale(d["Pay gap ($)"]))
      .attr("height", yScale.bandwidth())
      .attr("fill", "darkmagenta");

    const text = svg
      .selectAll("text")
      .data(filteredData)
      .join("text")
      .attr("class", "label")
      //positioning the text in the center of the bar
      .attr("x", margin.left)
      .attr("y", d => yScale(d.Occupation))
      .text(d => d["Pay gap ($)"])
      .attr("dx", "10")
      .attr("dy", "1.5em")
      .attr("fill", "white");

    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis);

    svg
      .append("g")
      .attr("class", "x-axis1")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxisBottom)
      .append("text")
      .attr("class", "axis-label")
      .attr("x", width / 2)
      .attr("dy", "3em")
      .text("Annual salary pay gap ($)");

    svg
      .append("g")
      .attr("class", "x-axis2")
      .attr("transform", `translate(0, ${margin.top})`)
      .call(xAxisTop);
  });
}
