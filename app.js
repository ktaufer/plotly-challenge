function init(){
  d3.select('#bar').node().value = ''
  d3.select('#bubble').node().value = ''
  d3.select('#gauge').node().value = ''
  d3.select('#sample-metadata').node().value = ''
  // load data
  d3.json('./samples.json').then(function(data) {
    var samples = data.samples;
    var metaData = data.metadata;
    var ids = samples.map(d => d.id);
    
    // populate drop-down menu with subject IDs
    d3.select("#selDataset")
      .selectAll("option")
      .data(ids)
      .enter()
      .append("option")
      .property('value', function(d) {return d})
      .text(function(d) {return `BB-${d}`});
    
    // create variables to use in plots
    var otu_labels = samples[0].otu_labels;
    var otu_ids = samples[0].otu_ids;
    var sample_values = samples[0].sample_values;
    var topOTU = otu_ids.slice(0,10).reverse();
    var topValues = sample_values.slice(0,10).reverse();
    var topLabels = otu_labels.slice(0,10).reverse();

    //plot bar chart
    var data = [{
      y: toString(topOTU),
      x: topValues,
      text:  topLabels,
      type: 'bar'}];
    var layout = {
      title: `Subject ${samples[0].id}'s Bellybutton Flora`,
      xaxis:{title:'Colony Size'},
      yaxis: {title: 'Top Ten OTUs'}};
    Plotly.newPlot('bar', data, layout);
    
    // plot bubble chart
    var colors = [];
    for (i = 0; i < topLabels.length; i++) {
      var color = (`rgb(${Math.floor(Math.random)* 255}, ${Math.floor(Math.random)* 255}, ${Math.floor(Math.random)* 255})`)
      colors.push(color)
    };
    var data2 = [{
      x: topOTU,
      y: topValues,
      text: (topLabels, d => `${d}`),
      mode: 'markers',
      marker: {
        color: colors,
        opacity: .5,
        size: topValues}}];
    var layout2 = {
      title: `Subject ${samples[0].id}'s Bellybutton Flora`,
      showlegend: false,
      xaxis:{title: 'OTU ID'},
      yaxis:{title: 'Colony Size'}};
    Plotly.newPlot('bubble', data2, layout2);
    
    //insert metadata into panel-body
    var firstSub = metaData[0];
    var list = d3.select('#sample-metadata');
    list.append('ul');
    Object.entries(firstSub).forEach(([key, value]) =>
      list.selectAll('ul')
        .append('li')
        .text(`${key} : ${value}`));
    
    //plot gauge chart
    var data3 = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: metaData[0].wfreq,
        title: { text: "Washing Frequency (#/week)" },
        type: "indicator",
        mode: "gauge+number"
      }];
    var layout3 = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);
  })
};

init();

function optionChanged() {
    d3.event.preventDefault();
    var subject = d3.select("#selDataset").node().value;
    d3.select("#selDataset").node().value = "";
    buildPlot(subject);
};

d3.select("#selDataset").on("change", optionChanged);

function buildPlot(subject){
  // load data
  d3.json('./samples.json').then(function(data) {
    var samples = data.samples;
    var metaData = data.metadata;
    
    // create variables to use in plots
    for(i = 0; i < samples.length; i++) {
      if (subject === samples[i].id) {
      var otu_labels = samples[i].otu_labels;
      var otu_ids = samples[i].otu_ids;
      var sample_values = samples[i].sample_values;
      var subjectMeta = metaData[i];
      var subjectID = samples[i].id;
      var subWash = metaData[i].wfreq;
      var topOTU = otu_ids.slice(0,10).reverse();
      var topValues = sample_values.slice(0,10).reverse();
      var topLabels = otu_labels.slice(0,10).reverse();
      };
    };  
    
    //plot bar chart
    var bar = d3.select('#bar');
    bar.node().value = '';
    var data = [{
      y: toString(topOTU),
      x: topValues,
      text: topLabels,
      type: 'bar'}];
    var layout = {
      title: `Subject ${subjectID}'s Bellybutton Flora`,
      xaxis:{title:'Colony Size'},
      yaxis: {title: 'Top Ten OTUs'}};
    Plotly.newPlot('bar', data, layout);

    // plot bubble chart
    var bubble = d3.select('#bubble');
    bubble.node().value = '';
    var colors = [];
    for (i = 0; i < topLabels.length; i++) {
      var color = (`rgb(${Math.floor(Math.random)* 255}, ${Math.floor(Math.random)* 255}, ${Math.floor(Math.random)* 255})`)
      colors.push(color)
    };
    var data2 = [{
      x: topOTU,
      y: topValues,
      text: (topLabels, d => d),
      mode: 'markers',
      marker: {
        color: colors,
        opacity: .5,
        size: topValues}}];
    var layout2 = {
      title: `Subject ${subjectID}'s Bellybutton Flora`,
      showlegend: false,
      xaxis:{title: 'OTU ID'},
      yaxis:{title: 'Colony Size'}};
    Plotly.newPlot('bubble', data2, layout2);
    
    //insert metadata into panel-body
    var list = d3.select('#sample-metadata');
    list.node().value = '';
    list.append('ul');
    Object.entries(subjectMeta).forEach(([key, value]) =>
      list.selectAll('ul')
        .append('li')
        .text(`${key} : ${value}`));
    
    //plot gauge chart
    var gauge = d3.select('#gauge');
    gauge.node().value = '';
    var data3 = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: subWash,
        title: { text: "Washing Frequency (times per week)" },
        type: "indicator",
        mode: "gauge+number"
      }];
    var layout3 = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data3, layout3);
  });
};
