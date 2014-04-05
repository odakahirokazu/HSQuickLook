/************************************************************
 *   JGraph.js for HS Quick Look
 *   
 *   Authors: Soki Sakurai
 *   Date: 2013-**-**
 * 
 ************************************************************/

/* Global variable */
var HSQuickLook = HSQuickLook || {};


/* The anonymous function of this script */
(function() {
  /************************************************************
   *   Exported variables
   */
  HSQuickLook.JGraph = {};

  HSQuickLook.JGraph.PointType = {
	  Undefined : 0,
	  NoError : 1,
	  SymmetricError : 2,
	  AsymmetricError : 3
  };

  HSQuickLook.JGraph.JGraph = function (pointTypeX, pointTypeY) {
    var PointType = HSQuickLook.JGraph.PointType;
	  var checkType = function(type) {
		  if (type === undefined) {
			  return PointType.NoError;
		  } else if (typeof type === 'number') {
			  if (type < PointType.NoError || type > PointType.AsymmetricError) {
				  throw "Type: " + type + " is undefined in JGraph.";
			  } else {
				  return type;
			  }
		  } else {
			  throw "Type: " + type + " is undefined in JGraph.";
		  }
	  };
	  const typeX = checkType(pointTypeX);
	  const typeY = checkType(pointTypeY);

	  const pointDataLength = function(tx, ty) {
		  var f = function(type) {
			  if (type == PointType.NoError) {
				  return 1;
			  } else if (type == PointType.SymmetricError) {
				  return 2;
			  } else if (type == PointType.AsymmetricError) {
				  return 3;
			  }
        return 0;
		  };
		  return f(tx) + f(ty);
	  }(typeX, typeY);

	  const errorBarString = function(tx, ty) {
		  var f = function(type, axis) {
			  if (type == PointType.NoError) {
				  return "";
			  } else {
				  return axis;
			  }
		  };
		  return f(tx, "x") + f(ty, "y");
	  }(typeX, typeY);

	  var showPoint = true;
	  var pointRaduis = 1;
	  var pointColor = "black";
	  var pointFormat = {
		  show : showPoint,
		  radius : pointRaduis,
		  fillColor : pointColor,
		  errorbars : errorBarString,
		  xerr : {
			  show : true,
			  asymmetric : (typeX == PointType.AsymmetricError),
			  upperCap : "-",
			  lowerCap : "-"
		  },
		  yerr : {
			  show : true,
			  asymmetric : (typeX == PointType.AsymmetricError),
			  upperCap : "-",
			  lowerCap : "-"
		  }
	  };

    var queryToPlaceholder = "";
	  var data = [];
	  var logdata = [];
	  var capacity = -1;
	  var lineColor = "black";
	  var threshold = 0.0;
	  var colorBelowThreshold = "red";
	  var dataLabel = "data1";
	  var plotData = {
		  color : lineColor,
		  points : pointFormat,
		  threshold : {
			  below : threshold,
			  color : colorBelowThreshold
		  },
		  data : data,
		  label : dataLabel
	  };

	  var xrange = [ -10.0, 10.0 ];
	  var yrange = [ -10.0, 10.0 ];
	  var current_xrange = [ -10.0, 10.0 ];
	  var current_yrange = [ -10.0, 10.0 ];
	  var range_locked = false;
	  var xlabel = "";
	  var ylabel = "";
	  var logScaleX = false;
	  var logScaleY = false;
	  var showSeriesLine = true;
	  var showLegend = true;
	  var legendPosition = "nw";
	  var options = {
		  legend : {
			  position : legendPosition,
			  show : showLegend
		  },
		  series : {
			  lines : {
				  show : showSeriesLine,
				  lineWidth : 1
			  }
		  },
		  xaxis : {
			  axisLabel : xlabel,
			  axisLabelUseCanvas : true,
			  min : xrange[0],
			  max : xrange[1]
		  },
		  yaxis : {
			  axisLabel : ylabel,
			  axisLabelUseCanvas : true,
			  min : yrange[0],
			  max : yrange[1]
		  },
		  selection : {
        // mode : "x"
			  mode : ""
		  }
	  };
	  
	  this.setQueryToPlaceholder = function(query){
	    if(typeof query == "string"){
    	  queryToPlaceholder = query;
	    }
	  };

    // this.plot = function(queryToPlaceholder, rangeX, rangeY) {
	  this.plot = function(rangeX, rangeY, query) {
		  if (rangeX !== undefined) {
			  current_xrange[0] = rangeX[0];
			  current_xrange[1] = rangeX[1];
		  }
		  options.xaxis.min = current_xrange[0];
		  options.xaxis.max = current_xrange[1];
		  if (rangeY !== undefined) {
			  current_yrange[0] = rangeY[0];
			  current_yrange[1] = rangeY[1];
		  }
		  options.yaxis.min = current_yrange[0];
		  options.yaxis.max = current_yrange[1];
	    var placeholder = "";
	    if(typeof query == "string"){
	      placeholder = query;
	    }
	    else{
	      placeholder = queryToPlaceholder;
	    }
	    range_locked = false;
	    $.plot($(placeholder), [ plotData ], options);
	  };

	  this.plotInDefaultRange = function(query) {
		  if (xrange !== undefined) {
			  options.xaxis.min = xrange[0];
			  options.xaxis.max = xrange[1];
		  }
		  if (yrange !== undefined) {
			  options.yaxis.min = yrange[0];
			  options.yaxis.max = yrange[1];
		  }
	    var placeholder = "";
	    if(typeof query == "string"){
	      placeholder = query;
	    }
	    else{
	      placeholder = queryToPlaceholder;
	    }
	    range_locked = false;
		  $.plot($(placeholder), [ plotData ], options);
	  };
	  
	  this.lockRange = function(lock_ena){
		  range_locked = lock_ena;
	  };
	  
	  this.isRangeLocked = function(){
		  return range_locked;
	  };

	  this.setXRange = function(xmin, xmax){
		  current_xrange[0] = xmin;
		  current_xrange[1] = xmax;
	  };
		
	  this.setYRange = function(ymin, ymax){
		  current_yrange[0] = ymin;
		  current_yrange[1] = ymax;
	  };

	  this.setDefaultXRange = function(xmin, xmax){
		  xrange[0] = xmin;
		  xrange[1] = xmax;
	  };
		
	  this.setDefaultYRange = function(ymin, ymax){
		  yrange[0] = ymin;
		  yrange[1] = ymax;
	  };

	  this.enableRescale = function(enadisX, enadisY){
		  if(enadisX === undefined || enadisY === undefined){
			  return;
		  }
		  if(enadisX || enadisY){
			  $(queryToPlaceholder).bind("plotselected", function(event, ranges) {
				  var rxy = {};
				  if(enadisX){
					  rxy.xaxis = {min:0,max:0};
					  selection_str = "x";
					  if(!logScaleX){
						  rxy.xaxis.min = ranges.xaxis.from;
						  rxy.xaxis.max = ranges.xaxis.to;
					  }
					  else{						
						  rxy.xaxis.min = Math.exp(ranges.xaxis.from);
						  rxy.xaxis.max = Math.exp(ranges.xaxis.to);
					  }
					  current_xrange[0] = rxy.xaxis.min;
					  current_xrange[1] = rxy.xaxis.max;
				  }
				  if(enadisY){
					  rxy.yaxis = {min:0,max:0};
					  selection_str = selection_str+"y";
					  if(!logScaleY){
						  rxy.yaxis.min = ranges.yaxis.from;
						  rxy.yaxis.max =	 ranges.yaxis.to;
					  }
					  else{						
						  rxy.yaxis.min = Math.exp(ranges.yaxis.from);
						  rxy.yaxis.max = Math.exp(ranges.yaxis.to);
					  }
					  current_yrange[0] = rxy.yaxis.min;
					  current_yrange[1] = rxy.yaxis.max;
				  }
				  range_locked = true;
				  $.plot(queryToPlaceholder, [ plotData ], $.extend(true, {}, options, rxy));
			  });
			  var selection_str = "";
			  if(enadisX){
				  selection_str = "x";
			  }
			  if(enadisY){
				  selection_str = selection_str+"y";
			  }
			  options.selection.mode = selection_str;
      }
		  else{
			  options.selection.mode = "";
		  }
	  };

	  this.setPointFormat = function(show, radius, color) {
		  if (show) {
			  showPoint = true;
			  if (typeof radius == "number") {
				  pointRaduis = radius;
			  }
			  if (typeof color == "string") {
				  pointColor = color;
			  }
			  pointFormat = {
				  show : showPoint,
				  radius : pointRaduis,
				  fillColor : pointColor
			  };
		  } else {
			  showPoint = false;
			  pointFormat.show = showPoint;
		  }
	  };

	  this.setThreshold = function(thr, color) {
		  if (typeof thr == "number") {
			  threshold = thr;
			  if (typeof color == "string") {
				  colorBelowThreshold = color;
			  }
			  plotData.threshold = {
				  below : threshold,
				  color : colorBelowThreshold
			  };
		  }
	  };

	  this.setShowSeriesLine = function(ena) {
		  if (ena === undefined || ena == true) {
			  showSeriesLine = true;
		  } else {
			  showSeriesLine = false;
		  }
		  options.series = {
			  lines : {
				  show : showSeriesLine
			  }
		  };
	  };

	  this.setLegend = function(ena, position) {
		  if (ena) {
			  showLegend = true;
		  } else {
			  showLegend = false;
		  }
		  if (typeof position == "string") {
			  legendPosition = position;
		  }
		  options.legend = {
			  position : legendPosition,
			  show : showLegend
		  };
	  };
	  
	  this.setLogScaleX = function(enadis){
		  if(enadis===undefined || enadis){
			  logScaleX = true;
		  }
		  else{
			  logScaleX = false;
		  }
		  if(logScaleX){
			  options.xaxis.ticks = [0.00001,0.0001,0.001,0.01,0.1,1,10,100,1000,10000,100000,1000000];
        options.xaxis.transform = function(v) {return Math.log(v);};
		  }
		  else{
			  options.xaxis.ticks = null;
        options.xaxis.transform = null;			
		  }
	  };
	  
	  this.setLogScaleY = function(enadis){
		  if(enadis===undefined || enadis){
			  logScaleY = true;
		  }
		  else{
			  logScaleY = false;
		  }
      // if(logScaleY){
      // plotData.data = logdata;
      // }
      // else{
      // plotData.data = data;
      // }
		  if(logScaleY){
			  options.yaxis.ticks = [0.00001,0.0001,0.001,0.01,0.1,1,10,100,1000,10000,100000,1000000];
        options.yaxis.transform = function(v) {return Math.log(v)};
		  }
	  };


	  this.setXLabel = function(label) {
		  if (typeof label == "string") {
			  xlabel = label;
			  options.xaxis.axisLabel = xlabel;
		  }
	  };

	  this.setYLabel = function(label) {
		  if (typeof label == "string") {
			  ylabel = label;
			  options.yaxis.axisLabel = ylabel;
		  }
	  };

	  this.setCapacity = function(size) {
		  if (size > 0 && size < data.length) {
			  data.splice(0, data.length - size);
		  }
		  capacity = size;
	  };

	  this.setLineColor = function(color) {
		  lineColor = color;
		  plotData.color = lineColor;
	  };

	  this.setDataLabel = function(label) {
		  dataLabel = label;
		  plotData.label = dataLabel;
	  };

	  this.setData = function(d) {
		  if (d instanceof Array) {
			  if (d[0].length == pointDataLength) {
				  data = d;
			  } else {
				  throw "Data array with invalid length: " + d + " is pushed into JGraph.";
			  }
		  } else {
			  throw "Invalid data array: " + d + " is pushed into JGraph.";
		  }
	  };
	  
	  this.getData = function() {
		  return data;
	  };

	  this.getPointFormat = function() {
		  return pointFormat;
	  };

	  this.pushData = function(d) {
		  if (d instanceof Array) {
			  if (d.length == pointDataLength) {
				  if (capacity > 0 && data.length >= capacity) {
					  data.splice(0, 1);
				  }
				  data.push(d);
				  data.sort(
				    function(a,b){
				    	if(a[0] < b[0]){
				    		return -1;
				    	}
				    	else if(a[0] > b[0]){
				    		return 1;
				    	}
				    	else{
				    		return 0;
				    	}
				    }
				  );
			  } else {
				  throw "Data array with invalid length: " + d + " is pushed into JGraph.";
			  }
		  } else {
			  throw "Invalid data array: " + d + " is pushed into JGraph.";
		  }
	  };

	  this.getNumberOfPoints = function() {
		  return data.length;
	  };

	  this.getPointTypeX = function() {
		  return typeX;
	  };

	  this.getPointTypeY = function() {
		  return typeY;
	  };
  };
})(); /* end of the anonymous function */
