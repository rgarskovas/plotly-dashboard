// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
      PANEL.html("");
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
      var sample = "940"
      console.log(result)})};


d3.json("samples.json").then((importedData) => {
    //     // Populating dropdown
  //  buildMetadata(sample){
        //     d3.json("samples.json").then((data) => {
        
        //     // Populating dropdown
    var data = importedData;
    var metadata = data.metadata;
    var samples = data.samples;

    var sample = "940"

    
    // Establish datasets
    // filter metadata for sample
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var metadata_array = [].concat.apply([], resultArray);
    var all_sample_nums = metadata.map(metadata => metadata.id);
    console.log(all_sample_nums)



    // filter sample data for sample
    var samples = samples.filter(sampleObj => sampleObj.id == sample);

    // get all the values from the sample
    var sample_values = samples.map(sample => sample.sample_values);
    // concat the array
    var sample_values_array = [].concat.apply([], sample_values);
    // slice to 10 values
    var top_10_sample_values = sample_values_array.slice(0, 10);    

    // get all the otu from that sample
    var otu_ids = samples.map(sample => sample.otu_ids);
    var otu_ids_array = [].concat.apply([], otu_ids);
    var otu_ids_array_clean = [].concat.apply([], otu_ids);
    
    // add OTU ID to cells
    for(var i=0;i<otu_ids_array.length;i++){
        otu_ids_array[i]="OTU ID: "+otu_ids_array[i];
    }
    var top_10_otu_ids = otu_ids_array.slice(0, 10);

    // get all the otu labels from that sample
    var otu_labels = samples.map(sample => sample.otu_labels);


    var dropdown = d3.select("#selDataset");
    dropdown.html("")




    // bar chart
    var trace1 = {
        y: top_10_otu_ids,
        x: top_10_sample_values,
        type: 'bar',
        orientation: 'h'
      };
  
      var data = [trace1];

      var layout = {
        title: `Top 10 Sample Values for OTU ids`,
      };
  
      Plotly.newPlot("bar", data, layout);



      // bubble chart
      var trace1 = {
        x: otu_ids_array_clean,
        y: sample_values_array,
        mode: 'markers',
        marker: {
          size: sample_values_array,
          color: otu_ids_array_clean,
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'Size of samples for OTUs',
        showlegend: false,
        height: 600,
        width: 600
      };
      
      Plotly.newPlot('bubble', data, layout);



    // populate dropdown with data
    var dropdown = d3.select("#selDataset");

    for(let i = 0; i < all_sample_nums.length; i++){ 
        dropdown.append("option").text(all_sample_nums[i]);
        }

    // populate the demographic table
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
      PANEL.html("");
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });


    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#selDataset").on("change", optionChanged);

});


function optionChanged() {
    d3.json("samples.json").then((importedData) => {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    console.log(dataset)

    var data = importedData;
    var metadata = data.metadata;
    var samples = data.samples;

    var sample = dataset

    
    // Establish datasets
    // filter metadata for sample
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var metadata_array = [].concat.apply([], resultArray);
    var all_sample_nums = metadata.map(metadata => metadata.id);
    console.log(all_sample_nums)



    // filter sample data for sample
    var samples = samples.filter(sampleObj => sampleObj.id == sample);

    // get all the values from the sample
    var sample_values = samples.map(sample => sample.sample_values);
    // concat the array
    var sample_values_array = [].concat.apply([], sample_values);
    // slice to 10 values
    var top_10_sample_values = sample_values_array.slice(0, 10);    

    // get all the otu from that sample
    var otu_ids = samples.map(sample => sample.otu_ids);
    var otu_ids_array = [].concat.apply([], otu_ids);
    var otu_ids_array_clean = [].concat.apply([], otu_ids);
    
    // add OTU ID to cells
    for(var i=0;i<otu_ids_array.length;i++){
        otu_ids_array[i]="OTU ID: "+otu_ids_array[i];
    }
    var top_10_otu_ids = otu_ids_array.slice(0, 10);

    // get all the otu labels from that sample
    var otu_labels = samples.map(sample => sample.otu_labels);

    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("bar", "x", [top_10_sample_values]);
    Plotly.restyle("bar", "y", [top_10_otu_ids]);

    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("bubble", "x", [otu_ids_array_clean]);
    Plotly.restyle("bubble", "y", [sample_values_array]);


    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
    console.log(result)

})};
  
  

