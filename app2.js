//init function to populate charts with default values



function init(){
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
        var otu_labels = samples[0].otu_labels
        var otu_ids = samples[0].otu_ids;
        var sample_values = samples[0].sample_values;
        var topOTU = otu_ids.slice(0,10);
        var topValues = sample_values.slice(0,10);
        var topLabels = otu_labels.slice(0,10);
        //plot bar chart
        var data = [{
            y: toString(topOTU),
            x: topValues,
            text: [`${topLabels}`],
            type: 'bar'}];
        var layout = {
            title: `Subject ${samples[0].id}'s Bellybutton Flora`,
            xaxis:{title:'Colony Size'},
            yaxis: {title: 'OTU ID',
                tickvalues: `${toString(topOTU)}`}}
        Plotly.newPlot('bar', data, layout)
        //plot bubble chart
        
        
        var trace1 = {
            x: topOTU,
            y: topValues,
            mode: 'markers',
            marker: {
              color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
              opacity: [1, 0.8, 0.6, 0.4],
              size: [40, 60, 80, 100]
            }
          };
          
          var data = [trace1];
          
          var layout = {
            title: 'Marker Size and Color',
            showlegend: false,
            height: 600,
            width: 600
          };
          
          Plotly.newPlot('myDiv', data, layout);


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