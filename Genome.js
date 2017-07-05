$.getScript("https://d3js.org/d3.v4.min.js", function() {
  $.getScript("http://dimplejs.org/dist/dimple.v2.3.0.min.js", function() {
    //Wait for Document to be ready
    $(document).ready(function (){
    });
    //Create required HTML tags
    createElements1();

    //Some Global State Variables
    var Data = [],
        globalChart1,
        globalChart2;

    //Get data from the ICGC Server, massage and Visualize
    $.get( "https://dcc.icgc.org/api/v1/projects/GBM-US/mutations?field=id,mutation,type,chromosome,start,end&size=100&order=desc", function( data ) {

      //Add a single Mutation Count column to use Dimple addSeries and make it count frequency
      //as a sum of Mutation Count column
      $.each(data["hits"], function(i, d) {d["Mutation Count"]=1;Data.push(d);});

      //Add svg chart for Type Overview
      var svg = dimple.newSvg("#typeOverview", 590, 450);
      svg.append("text")
        .attr("x", (590 / 2))
        .attr("y", 35)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Type Overview");
      var myChart = new dimple.chart(svg, Data);
      myChart.setBounds(60, 45, 510, 315);
      var x = myChart.addCategoryAxis("x", ["mutation"]);
      x.title = "Types of Mutation";
      myChart.addMeasureAxis("y", ["Mutation Count"]);
      var series = myChart.addSeries("mutation", dimple.plot.bar);
      globalChart1 = myChart;//Reference to Global State

      //Add svg element for Chromosome Overview
      var svg2 = dimple.newSvg("#chromosomeOverview", 590, 500);
      svg2.append("text")
        .attr("x", (590 / 2))
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Chromosome Overview");
      var myChart2 = new dimple.chart(svg2, Data);
      myChart2.setBounds(60, 105, 510, 345);
      myChart2.addCategoryAxis("x", "chromosome");
      myChart2.addMeasureAxis("y", "Mutation Count");
      var series2 = myChart2.addSeries("mutation", dimple.plot.bar);
      myChart2.addLegend(180, 40, 380, 60, "right");
      globalChart2 = myChart2;//Reference Global State

      //Add event handlers for filters
      series.addEventHandler('click', function(e) { myChart2.data=dimple.filterData(Data, "mutation", e.xValue);myChart2.setBounds(60, 105, 510, 345); myChart2.draw(800)});
      series2.addEventHandler('click', function(e) { myChart.data=dimple.filterData(Data, "chromosome", e.xValue);myChart.setBounds(60, 45, 510, 315); myChart.draw(800)});

      //Draw charts on page
      myChart.draw();
      myChart2.draw();
    });

    function clearFilter() {
      globalChart1.data=Data;
      globalChart1.setBounds(60, 45, 510, 315); globalChart1.draw(800);
    }
    function clearFilter2() {
      globalChart2.data=Data;
      globalChart2.setBounds(60, 105, 510, 345); globalChart2.draw(800);
    }

    function createElements1() {
      //Add Div element for Type Overview Chart
      var div1 = $('<div/>');
      div1.appendTo("#dataVisualization");
      $('<span/>', {
        id: "typeOverview",
        width: '80%',
      }).appendTo(div1);
      $('<button/>', {
        text: 'Clear Filter!'
      }).on('click', clearFilter).appendTo($('<span/>', {
        width: '20%',
      }).appendTo(div1));

      //Add Div element for Chromosome Overview chart
      var div2 = $('<div/>');
      div2.appendTo("#dataVisualization");
      $('<span/>', {
        id: "chromosomeOverview",
        width: '80%',
      }).appendTo(div2);
      $('<button/>', {
        text: 'Clear Filter!'
      }).on('click', clearFilter2).appendTo($('<span/>', {
        width: '20%',
      }).appendTo(div2));
    }

  }); //End of Dimple.js load callback
}); //End of D3.js load callback

