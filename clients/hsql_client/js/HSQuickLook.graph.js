/*******************************************************************************
 * JGraph.js for HS Quick Look
 * 
 * Authors: Soki Sakurai
 * Date: 2013-**-**
 * Date: 2014-12-19 | Hirokazu Odaka | code cleanup. remove unnecessary functions.
 * 
 ******************************************************************************/

/* Global variable */
var HSQuickLook = HSQuickLook || {};

/* The anonymous function of this script */
(function() {
  /***************************************************************************
   * Exported variables
   */
  HSQuickLook.graph = {};

  /***************************************************************************
   * Object prototype TrendCurve
   */
  HSQuickLook.graph.TrendCurve = function() {
    this.placeholder = "";
    this.capacity = -1;
    this.differentialMode = false;
    this.upperBound = 0.0;
    this.rangeLocked = false;
    this.currentData = [void 0, void 0];
    
    this.data = {
      label: "data1",
      color: "black",
      points: { show: true, radius: 1, fillColor: "black" },
      data: []
    };

    this.options = {
      legend: { show: true, position: "nw" },
      series: { lines: { show: true, lineWidth: 1 }},
      xaxis: {
        axisLabel: "",
        axisLabelUseCanvas: true,
        min: -10.0,
        max: +10.0
      },
      yaxis: {
        axisLabel: "",
        axisLabelUseCanvas: true,
        min: -10.0,
        max: +10.0
      }
    };
  };

  var TrendCurve = HSQuickLook.graph.TrendCurve;

  TrendCurve.prototype.getLastYValue = function() {
    var data = this.data.data;
    var n = data.length;
    if (n>0) {
      return data[n-1][1];
    } else {
      return 0.0;
    }
  };

  TrendCurve.prototype.setRangeX = function(range) {
    this.options.xaxis.min = range[0];
    this.options.xaxis.max = range[1];
  };

  TrendCurve.prototype.setRangeY = function(range) {
    this.options.yaxis.min = range[0];
    this.options.yaxis.max = range[1];
  };

  TrendCurve.prototype.setCapacity = function(capacity) {
    var data = this.data.data;
    if (capacity>0 && capacity<data.length) {
      data.splice(0, data.length-capacity);
    }
    this.capacity = capacity;
  };
  
  TrendCurve.prototype.plot = function(query) {
    $.plot($(this.queryToPlaceholder), [this.data], this.options);
  };
  
  TrendCurve.prototype.pushData = function(dataPoint) {
    var data = this.data.data;
    var size = data.length;
    var capacity = this.capacity;
    var lastData0 = this.currentData[0];
    var lastData1 = this.currentData[1];
    var newData0 = dataPoint[0];
    var newData1 = dataPoint[1];
    this.currentData[0] = newData0;
    this.currentData[1] = newData1;
    
    if (this.differentialMode == true) {
      if (lastData0 === void 0) {
        return;
      }
      if (newData0-lastData0 > 0.0) {
        if (newData1 < lastData1) {
          newData1 += this.upperBound;
        }
        newData1 = (newData1-lastData1)/(newData0-lastData0);
        data.push([newData0, newData1]);
        if (capacity>0 && size>=capacity) {
          data.shift();
        }
      }
    } else {
      data.push([newData0, newData1]);
      if (capacity>0 && size>=capacity) {
        data.shift();
      }
    }
  };

  /***************************************************************************
   * Object prototype MultiGraph
   */
  HSQuickLook.graph.MultiGraph = function() {
    var plots = [];
    this.placeholder = "";
    this.options = {
      legend: { show: true, position: "nw" },
      series: { lines: { show: true, lineWidth: 1 }},
      xaxis: { axisLabel: "Time (s)", axisLabelUseCanvas: true },
      yaxis: { axisLabel: "", axisLabelUseCanvas: true }
    };

    this.addGraph = function(graph) {
      plots.push(graph.data);
    };

    this.plot = function() {
      $.plot($(this.placeholder), plots, this.options);
    };
  };

  var MultiGraph = HSQuickLook.graph.MultiGraph;

  MultiGraph.prototype.setRangeX = function(range) {
    this.options.xaxis.min = range[0];
    this.options.xaxis.max = range[1];
  };

  MultiGraph.prototype.setRangeY = function(range) {
    this.options.yaxis.min = range[0];
    this.options.yaxis.max = range[1];
  };
})(); /* end of the anonymous function */
