d3.csv(
  "../data/GenderPayGap-PublicData-US_short-version.csv",
  d3.autoType
).then(data => {
  console.log(data);

  const width = window.innerWidth * 0.9,
    height = window.innerHeight,
    paddingInner = 0.2,
    margin = { top: 20, bottom: 40, left: 40, right: 40 };

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d["Pay gap ($)"])])
    .range([width - margin.left, margin.right]);

  const yScale = d3
    .scaleBand()
    .domain(data.map(d => d.Occupation))
    .range([height - margin.bottom, margin.top])
    .paddingInner(paddingInner);

  const yAxis = d3.axisLeft(yScale).ticks(data.length);

  // const xAxis = d3.axisBottom(xScale).ticks(d => d["Pay gap ($)"]);

  const svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const rect = svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("y", d => yScale(d.Occupation))
    .attr("x", 0, d => xScale(d["Pay gap ($)"]))
    .attr("width", d => width - margin.left - xScale(d["Pay gap ($)"]))
    .attr(
      "transform",
      `translate(160, ${(height - margin.bottom, margin.top)})`
    )
    .attr("height", yScale.bandwidth())
    .attr("fill", "darkmagenta");

  const text = svg
    .selectAll("text")
    .data(data)
    .join("text")
    .attr("class", "label")
    // this allows us to position the text in the center of the bar
    .attr("x", 0, d => xScale(d["Pay gap ($)"]))
    .attr("y", d => yScale(d.Occupation) + yScale.bandwidth())
    .text(d => d["Pay gap ($)"])
    .attr("dx", "160");

  svg
    .append("g")
    .attr("class", "axis")
    .attr(
      "transform",
      `translate(160, ${(height - margin.bottom, margin.top)})`
    )
    //.call(xAxis)
    .call(yAxis);
});
