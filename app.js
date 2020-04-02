
function init(){
  d3.json('./samples.json').then(function(data) {
    samples = data.samples
    metaData = data.metadata
    ids = samples.map(d => d.id)
    // populate drop-down menu with subject IDs
    d3.select("#selDataset")
      .selectAll("option")
      .data(ids)
      .enter()
      .append("option")
      .property('value', function(d) {return d})
      .text(function(d) {return `BB-${d}`})
    // create variables to use in plots
    otu_labels = samples[0].otu_labels
    otu_ids = samples[0].otu_ids;
    sample_values = samples[0].sample_values;
    topOTU = otu_ids.slice(0,10);
    topValues = sample_values.slice(0,10);
    topLabels = otu_labels.slice(0,10);
    textLabels = []
    for (i = 0; i < topLabels.length; i++){
      entry = topLabels[i]
      textLabels.push(`${entry}`)}
    tickValues = []
    for (i = 0; i < topOTU.length; i++){
      entry = topOTU[i]
      tickValues.push(`OTU:${entry}`)}
    console.log(tickValues)
    //plot bar chart
    data = [{
      y: toString(topOTU),
      x: topValues,
      text: textLabels,
      type: 'bar'}];
    layout = {
      title: `Subject ${samples[0].id}'s Bellybutton Flora`,
      xaxis:{title:'Colony Size'},
      yaxis: {title: 'Top Ten OTUs',tickmode: "array", tickvals: topOTU, ticktext: tickValues}}
    Plotly.newPlot('bar', data, layout)
    // plot bubble chart
    colors = []
    for (i = 0; i < 10; i++){
      colors.push(`rgb(${Math.floor(Math.random()*255+1)}, \
        ${Math.floor(Math.random()*255+1)}, \
        ${Math.floor(Math.random()*255+1)})`)}
    var data2 = [{
      x: topOTU,
      y: topValues,
      text: textLabels,
      mode: 'markers',
      marker: {
        color: colors,
        opacity: .5,
        size: topValues}}]
    var layout2 = {
      title: `Subject ${samples[0].id}'s Bellybutton Flora`,
      showlegend: false,
      xaxis:{title: 'OTU ID', ticks: tickValues},
      yaxis:{title: 'Colony Size'}};
    Plotly.newPlot('bubble', data2, layout2);
    //insert metadata into panel-body
    var firstSub = metaData[0]
    var list = d3.select('#sample-metadata')
    list.append('ul')
    Object.entries(firstSub).forEach(([key, value]) =>
    list.selectAll('ul')
        .append('li')
        .text(`${key} : ${value}`))
  })
}
init()
function optionChanged() {
    d3.event.preventDefault();
    var subject = d3.select("#selDataset").node().value;
    d3.select("#selDataset").node().value = "";
    buildPlot(subject);
};
d3.select("#selDataset").on("change", optionChanged);
function buildPlot(subject){};
