export function chart2() {
  /* MEN SALARY VS OCCUPATION - */

  d3.csv(
    "../data/GenderPayGap-PublicData-US_short-version.csv",
    d3.autoType
  ).then(data => {
    console.log(data);
    const sortedData = data
      .filter(function (d) {
        return (
          d.Occupation &&
          d.Category &&
          d.Occupation.toLowerCase() === d.Category.toLowerCase()
        );
      })
      .sort((a, b) =>
        d3.ascending(
          a["Men average annual salary ($)"],
          b["Men average annual salary ($)"]
        )
      )
      .slice(0, 10);

    const width = window.innerWidth * 0.4,
      height = window.innerHeight / 2,
      paddingInner = 0.2,
      margin = { top: 20, bottom: 40, left: 40, right: 40 };

    const xScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(sortedData, d => d["Men average annual salary ($)"]) + 10000,
      ])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleBand()
      .domain(sortedData.map(d => d.Occupation))
      .range([height - margin.bottom, margin.top])
      .paddingInner(paddingInner);

    const yAxis = d3.axisLeft(yScale);

    const xAxisBottom = d3.axisBottom(xScale).ticks(4, "$s");
    const xAxisTop = d3.axisTop(xScale).ticks(4, "$s");

    const svg = d3
      .select("#d3-container-2")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const rect = svg
      .selectAll("rect")
      .data(sortedData)
      .join("rect")
      .attr("y", d => yScale(d.Occupation))
      .attr("x", margin.left)
      .attr("width", d => xScale(d["Men average annual salary ($)"]))
      .attr("height", yScale.bandwidth())
      .attr("fill", "darkblue");

    const text = svg
      .selectAll("text")
      .data(sortedData)
      .join("text")
      .attr("class", "label")
      //positioning the text in the center of the bar
      .attr("x", margin.left)
      .attr("y", d => yScale(d.Occupation))
      .text(d => d["Men average annual salary ($)"])
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
      .text("Men average annual salary ($)");

    svg
      .append("g")
      .attr("class", "x-axis2")
      .attr("transform", `translate(0, ${margin.top})`)
      .call(xAxisTop);
  });
}
