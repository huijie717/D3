'use strict';		

//Define data
// City Name
var city_name = [ "Beijing" , "Shanghai" , "Shenzhen" , "HK" , "Other"];


var sample = [
  [ 3000,  1045　 , 504　, 327 , 3714 ],
  [ 614,  2040　 , 360　, 124  , 3234 ],
  [ 798,  698 , 3672　, 1245 , 2647  ],
  [ 452,  675  , 2789 , 1254  , 3876 ],
  [ 1387,  1034　 , 654 , 245  , 7986 ]
];  

// set layout and transform data  

// set svg, chord and color definition

// draw the element group for each city and the city name

// draw the inner chords


// set layout and transform data  
var chord_layout = d3.layout.chord()
	                 .padding(0.03)		//the gap between element
	                 .sortSubgroups(d3.descending)	//sort
	                 .matrix(sample);	//the matrix 

var groups = chord_layout.groups();
var chords = chord_layout.chords();

console.log( groups );
console.log( chords );

// set svg, chord and color definition
var width  = 600;
var height = 600;
var innerRadius = width/2 * 0.7;
var outerRadius = innerRadius * 1.1;

var color20 = d3.scale.category20();// d3 categorical colors

var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
    .append("g")
	.attr("transform", "translate(" + width/2 + "," + height/2 + ")");

// draw the element group for each city and the city name
var outer_arc =  d3.svg.arc()
			 .innerRadius(innerRadius)
			 .outerRadius(outerRadius);

var g_outer = svg.append("g");

g_outer.selectAll("path")
		.data(groups)
		.enter()
		.append("path")
		.style("fill", function(d) { return color20(d.index); })
		.style("stroke", function(d) { return color20(d.index); })
		.attr("d", outer_arc );

g_outer.selectAll("text")
		.data(groups)
		.enter()
		.append("text")
		.each( function(d,i) { 
			d.angle = (d.startAngle + d.endAngle) / 2; 
			d.name = city_name[i];
		})
		.attr("dy",".35em")
		.attr("transform", function(d){
			return "rotate(" + ( d.angle * 180 / Math.PI ) + ")" +
				   "translate(0,"+ -1.0*(outerRadius+10) +")" +
				    ( ( d.angle > Math.PI*3/4 && d.angle < Math.PI*5/4 ) ? "rotate(180)" : "");
		})
		.text(function(d){
			return d.name;
		});
		
// draw the inner chords
var inner_chord =  d3.svg.chord()
				.radius(innerRadius);

svg.append("g")
	.attr("class", "chord")
    .selectAll("path")
	.data(chords)
    .enter()
	.append("path")
	.attr("d", inner_chord )
    .style("fill", function(d) { return color20(d.source.index); })
	.style("opacity", 1)
	.on("mouseover",function(d,i){
		d3.select(this)
			.style("fill","yellow");
	})
	.on("mouseout",function(d,i) { 
		d3.select(this)
			.transition()
            .duration(1000)
			.style("fill",color20(d.source.index));
	});

