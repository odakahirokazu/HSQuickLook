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
    var currentData = [void 0, void 0];

    this.placeholder = "";
    this.capacity = -1;
    this.differentialMode = false;
    this.upperBound = 0.0;
    this.rangeLocked = false;
    
    this.data = {
      label: "data1",
      color: "black",
      points: { show: true, radius: 1, fillColor: "black" },
      data: []
    };

    this.options = {
      legend: { show: true, position: "nw" },
      series: { lines: { show: true, lineWidth: 1 }},
      xaxis: { axisLabel: "", axisLabelUseCanvas: true, min: -10.0, max: +10.0 },
      yaxis: { axisLabel: "", axisLabelUseCanvas: true, min: -10.0, max: +10.0 }
    };

    this.setCurrentData = function(x, y) {
      currentData[0] = x;
      currentData[1] = y;
    };

    this.getCurrentDataX = function() {
      return currentData[0];
    };

    this.getCurrentDataY = function() {
      return currentData[1];
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
    var lastDataX = this.getCurrentDataX();
    var lastDataY = this.getCurrentDataY();
    var newDataX = dataPoint[0];
    var newDataY = dataPoint[1];
    this.setCurrentData(newDataX, newDataY);
    
    if (this.differentialMode == true) {
      if (lastDataX === void 0) {
        return;
      }
      if (newDataX-lastDataX > 0.0) {
        if (newDataY < lastDataY) {
          newDataY += this.upperBound;
        }
        newDataY = (newDataY-lastDataY)/(newDataX-lastDataX);
        data.push([newDataX, newDataY]);
        if (capacity>0 && size>=capacity) {
          data.shift();
        }
      }
    } else {
      data.push([newDataX, newDataY]);
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
    var counter = 0;
    
    this.placeholder = "";
    this.refreshCycle = 4;
    this.refreshPhase = 1;
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
      if (counter == this.refreshCycle) {
        counter = 0;
      }
      if (counter == this.refreshPhase) {
        $.plot($(this.placeholder), plots, this.options);
      }
      counter += 1;
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
