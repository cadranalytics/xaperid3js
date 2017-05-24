HTMLWidgets.widget({

  name: 'D3Gauge',
  type: 'output',

  factory: function(el, width, height) {

    var svgChart = null;
    var svgTitle = null;
    var titleText;
    var titleText2;
    
    var fontSize;
    var τ;
    var arc;
    var endAngle;
    var foreground;
    var title1;
    var title2;

    return {

      renderValue: function(x) {

        if(!svgChart)
        {
        // Hard-coded, also in the CSS.
        var titleHeight=50;
        
        // Used for the title element below the chart
        var fullWidth=width;
        
        var margin  = { left: 20, top: 20, right: 20, bottom: titleHeight }; 
        width  = Math.min(width - margin.left - margin.right,  
                          height- margin.top - margin.bottom); 
        
        titleText1 = x.title1;
        titleText2 = x.title2;
        
        // Calculate width and height of the gauge chart.
        width  = Math.min(width, height);
        height = width;
        
        // Append the svg for the gauge chart.
        svgChart = d3.select(el)
          .append("div")
          .classed("svg-container", true)
          .append("svg")
          .style("padding", margin.top + "px " + margin.right +  "px " + margin.bottom +  "px " + margin.left + "px")
          .attr("preserveAspectRatio", "xMidYMid meet")
          .attr("viewBox", "0 0 " + ( width ) + " " + ( height  ) )
          .classed("svg-content-responsive", true)
          .style("padding-bottom", "50px;");
          
        //  Append the svg for the title division 
        svgTitle = d3.select(el)
        .append("div")
        .classed("svg-gauge-title-container", true)
        .append("svg")
        .classed("svg-content-responsive", true);
        
        // Calculate sizes based on width and height.  
        var outerRadius = width/2, 
        innerRadius = (outerRadius/5)*4;
        τ = 2 * Math.PI; 
        fontSize = width/5;
        
        // Create arc element
         arc = d3.svg.arc() 
        .innerRadius(innerRadius) 
        .outerRadius(outerRadius) 
        .startAngle(0);

        // Create the background arc (full 360 degrees)
        var background = svgChart.append("path") 
        .datum({endAngle: τ}) 
        .style("fill", x.color2) 
        .attr("d", arc)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");  
        
        // Create the center text element
        var text = svgChart.append("text")
        .text('0%') 
        .attr("text-anchor", "middle") 
        .style("font-size",fontSize+'px') 
        .attr("dy",height/2+fontSize/2.5) 
        .attr("dx",width/2);
        
        // Create the title element 1
         title1 = svgTitle.append("text") 
         .classed("svg-gauge-title", true)
         .attr("id","titleText1")
        .text(titleText1) 
        .attr("text-anchor", "middle") 
        .style("font-size",'16px') 
        .attr("dy",20)
        .attr("dx",fullWidth/2);
        
         // Create the title element 2
         title2 = svgTitle.append("text") 
         .classed("svg-gauge-title", true)
         .attr("id","titleText2")
        .text(titleText2) 
        .attr("text-anchor", "middle") 
        .style("font-size",'16px') 
        .attr("dy",38)
        .attr("dx",fullWidth/2);
        
        // Create the foreground arc
         foreground = svgChart.append("path") 
        .datum({endAngle: 0 * τ}) 
        .style("fill", x.color1) 
        .attr("d", arc)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        }
        
        // This is the transition function
        foreground.transition()  
          .duration(1500)
          .call(arcTween, x.value * τ); 
          
          console.log('new value: ' + x.value);

        function arcTween(transition, newAngle) { 
              transition.attrTween("d", function(d) { 
                    var interpolate = d3.interpolate(d.endAngle, newAngle); 
                    return function(t) { 
                          d.endAngle = interpolate(t); 
                          d3.select(el).select("text").text(Math.round((d.endAngle/τ)*1000)/10+'%'); 
                          return arc(d); 
                    }; 
              }); 
        } 
    
      },

      resize: function(width, height) {

        title1.remove();
        title2.remove();
         title1 = svgTitle.append("text") 
         .classed("svg-gauge-title", true)
        .text(titleText1)
        .attr("id","titleText1")
        .attr("text-anchor", "middle") 
        .style("font-size",'16px') 
        .attr("dy",20)
        .attr("dx",width/2);
        
         title2 = svgTitle.append("text") 
         .classed("svg-gauge-title", true)
        .text(titleText2)
        .attr("id","titleText2")
        .attr("text-anchor", "middle") 
        .style("font-size",'16px') 
        .attr("dy",38)
        .attr("dx",width/2);

      }

    };
  }
});