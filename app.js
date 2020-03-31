// function handleSubmit() {
//     d3.event.preventDefault();
//     var subject = d3.select("#selDataset").node().value;
//     d3.select("#selDataset").node().value = "";
    
//     buildPlot(subject);
// };
// function buildPlot(subject) {
    d3.json('./samples.json').then(function(data) {
      
      var subject = data.map(d => d.names);
      console.log(subject);
      var meta = data.map(d => d.metadata);
      console.log(meta);
      var samples = data.map(d => d.samples);
      console.log(samples);
      var ids = [];
      var otu_ids = [];
      var sample_values = [];
      Object.entries(samples).forEach(d => {
        ids.push(d.id);
        otu_ids.push(d.otu_ids);
        sample_values.push(d.sample_values);
      });
      console.log(ids);
      console.log(otu_ids);
      console.log(sample_values);
      // var trace1 = {
      //   type: "bar",
      //   orientation: "h",
      //   x: sample_values,
      //   y: otu_labels,
      //   line: {
      //     color: "#17BECF"
      //   }
      // };
      // var data = [trace1];
      // var layout = {
      //   title: `${subject} OTU Profile`,
      //   xaxis: {title: 'OTU Values'},
      //   yaxis: {title: 'OTU ID'}
      // };
      // Plotly.newPlot("plot", data, layout);
    });
  // };
  
  // Add event listener for submit button
  // d3.select("#submit").on("click", handleSubmit);



// 1. Use the D3 library to read in `samples.json`.
// d3.json('samples.json').then(function(data){})
// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

// * Use `sample_values` as the values for the bar chart.

// * Use `otu_ids` as the labels for the bar chart.

// * Use `otu_labels` as the hovertext for the chart.

// 3. Create a bubble chart that displays each sample.

// * Use `otu_ids` for the x values.

// * Use `sample_values` for the y values.

// * Use `sample_values` for the marker size.

// * Use `otu_ids` for the marker colors.

// * Use `otu_labels` for the text values.

// ![Bubble Chart](Images/bubble_chart.png)

// 4. Display the sample metadata, i.e., an individual's demographic information.

// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

// ![hw](Images/hw03.png)

// 6. Update all of the plots any time that a new sample is selected.

