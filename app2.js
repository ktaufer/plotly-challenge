

d3.json('./samples.json').then(function(jsonData) {
    var data = jsonData;
    var samples = data.samples;
    var ids = samples.map(d => d.id);
    var otu_ids = samples.map(d => d.otu_ids);
    var sample_values = samples.map(d => d.sample_values);
    var topOTU = otu_ids.map(row =>row.slice(0,10));
    var topValues = sample_values.map(row => row.slice(0,10));
    var dataframe = {};
    dataframe.id = ids.map(d => d);
    dataframe.otu_ids = topOTU.map(d => d.otu_ids)
    dataframe.sample_values = topValues.map(d => d);
    var metadata = data.metadata;
    d3.select('selDataset')
        .selectAll('option')
        .data(dataframe)
        .enter()
        .append('option')
        .attr('value', d => d.id)
        .text(`${d => d.id}`);
    console.log(dataframe.otu_ids)
    //plot bar chart
    var data = [{
        y: dataframe.otu_ids[0],
        x: dataframe.sample_values[0],
        text: [`OTU ID: ${dataframe.otu_ids[0]}, Colony size: ${dataframe.sample_values[0]}`],
        type: 'bar'}];
    var layout = {
        title: `Subject ${dataframe.id[0]}'s Bellybutton Flora`,
        xaxis:{
            title:'OTU ID',
            tickvals: [`OTU ID: ${dataframe.otu_ids[0]}`]},
        yaxis: {title: 'Colony Size'}};
    Plotly.newPlot('bar', data, layout);
    //insert metadata into panel-body
    var list = d3.select('selDataset').append('ul')
    list.selectAll('li')
        .data(metadata)
        .enter()
        .append('li')
        .text(`${metadata[0]}`)
});