const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 120, right: 120 },
  radius = 5;

let svg;
let xScale;
let yScale;

let state = {
  data: [],
  selection: "ALL",
};

/* LOAD DATA */
d3.csv("../data/caffeine-calories-regional.csv", d3.autoType).then(raw_data => {
  console.log("raw_data", raw_data);
  state.data = raw_data;
  init();
});

/* INITIALIZING FUNCTION */
function init() {
  // Creating the scales
  xScale = d3
    .scaleLinear()
    .domain([0, d3.max(state.data, d => d.Caffeine) + 50])
    .range([margin.left, width - margin.right]);

  yScale = d3
    .scaleLinear()
    .domain([0, d3.max(state.data, d => d.Calories) + 50])
    .range([height - margin.bottom, margin.top]);

  // Creating the axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  const selectElement = d3.select("#dropdown").on("change", function () {
    console.log("new selected category is", this.value);
    state.selection = this.value;
    draw();
  });

  // Dropdown options for unique values in data
  selectElement
    .selectAll("option")
    .data(["ALL", "CHOCOLATE", "COFFEE", "NON-DRINK", "SOFT DRINK", "TEA"])
    .join("option")
    .attr("value", d => d)
    .text(d => d);

  // Creating svg element
  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Adding xAxis
  svg
    .append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("x", "50%")
    .attr("dy", "3em")
    .text("Caffeine (mg)")
    .style("fill", "rgb(255,252,252)");

  // Adding yAxis
  svg
    .append("g")
    .attr("class", "axis y-axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("y", "50%")
    .attr("dx", "-3em")
    .attr("writing-mode", "vertical-rl")
    .text("Calories")
    .style("fill", "rgb(255,252,252)");

  draw();
}

/* DRAW FUNCTION */
function draw() {
  let filteredData = state.data;
  if (state.selection !== "ALL") {
    filteredData = state.data.filter(d => d.category === state.selection);
  }

  const dot = svg
    .selectAll(".dot")
    .data(filteredData, d => d.key)
    .join(
      enter =>
        enter // + HANDLE ENTER SELECTION
          .append("g")
          .attr("class", "dot")
          .attr(
            "transform",
            `translate(${margin.left}, ${height - margin.bottom})`
          )
          .call(enter =>
            enter
              .append("circle")
              // Note: this is important so we can identify it in future updates
              .attr("stroke", "black")
              .attr("opacity", 0.8)
              // "ALL", "CHOCOLATE", "COFFEE", "NON-DRINK", "SOFT DRINK", "TEA"
              .attr("fill", d => {
                if (d.category === "CHOCOLATE") return "#ffd6e0";
                else if (d.category === "COFFEE") return "#fa7921";
                else if (d.category === "NON-DRINK") return "#9bc53d";
                else if (d.category === "SOFT DRINK") return "#5bc0eb";
                else return "#fde74c";
              })
              .attr("r", radius)
          )
          .call(enter => enter.append("text").text(d => d.Coffee))
          // initial value - to be transitioned
          .call(enter =>
            enter
              .transition() // initialize transition
              .delay(d => d.Calories) // delay on each element
              .duration(200)
              .attr(
                "transform",
                d => `translate(${xScale(d.Caffeine)}, ${yScale(d.Calories)})`
              )
          ),
      update =>
        update.call(update =>
          // + HANDLE UPDATE SELECTION
          update
            .transition()
            .duration(200)
            .attr("stroke", "black")
            .transition()
            .duration(200)
            .attr("stroke", "black")
        ),
      exit =>
        exit.call(exit =>
          // + HANDLE EXIT SELECTION
          exit
            .transition()
            .delay(d => d.Calories)
            .duration(200)
            .attr("transform", `translate(${width}, ${margin.top})`)
            .remove()
        )
    );
}
