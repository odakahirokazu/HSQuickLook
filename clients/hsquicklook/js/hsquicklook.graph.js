/*******************************************************************************
 * JGraph.js for HS Quick Look
 * 
 * Authors: Soki Sakurai, Hirokazu Odaka
 * Date: 2013-**-**
 * Date: 2014-12-20 | Hirokazu Odaka | new design.
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
    this.drawn = false;
    
    this.config = {
      editable: true,
      displaylogo: false,
      scrollZoom: true,
    };
    
    this.layout = {
      showlegend: true,
      title: " ",
      legend: {
        xanchor: "right",
        yanchor: "top"
      },
      xaxis: {
        type: "linear",
        title: "Time (s)",
        range: [-1.0, +1.0],
      },
      yaxis: {
        type: "linear",
        title: " ",
        range: [-1.0, +1.0],
      },
      margin: {
        t: 40,
        b: 40,
        l: 60,
        r: 40
      },
      autosize: true,
      autoMove: true,
      yMin: -1.0,
      yMax: 1.0
    };
    
    this.data = {
      x: [],
      y: [],
      type: "scatter",
      mode: "lines+markers",
      name: "data1",
      marker: {
        color:  "black",
        size: 1,
      },
      line: {
        color: "black",
      }
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
    var data = this.data,
      n = data.y.length;
    
    if (n > 0) {
      return data.y[n - 1];
    } else {
      return void 0;
    }
  };

  TrendCurve.prototype.setRangeX = function(range) {
    this.layout.xaxis = range;
  };

  TrendCurve.prototype.setRangeY = function(range) {
    this.layout.yaxis = range;
  };

  TrendCurve.prototype.setCapacity = function(capacity) {
    var data = this.data;
    if (capacity > 0 && capacity < data.x.length) {
      data.x.splice(0, data.x.length - capacity);
      data.y.splice(0, data.y.length - capacity);
    }
    this.capacity = capacity;
  };
  
  TrendCurve.prototype.plot = function() {
    if (!this.drawn) {
          Plotly.newPlot($(this.placeholder).attr('id'), data, this.layout, this.config);
          this.drawn = true;
        }
        else {
          Plotly.update($(this.placeholder).attr('id'), data, this.layout, this.config);
        }
  };
  
  TrendCurve.prototype.pushData = function(dataPoint) {
    var data = this.data,
      size = data.x.length,
      capacity = this.capacity,
      lastDataX = this.getCurrentDataX(),
      lastDataY = this.getCurrentDataY(),
      newDataX = dataPoint[0],
      newDataY = dataPoint[1];
    
    this.setCurrentData(newDataX, newDataY);
    
    if (this.differentialMode == true) {
      if (lastDataX === void 0) {
        return;
      }
      if (newDataX - lastDataX > 0.0) {
        if (newDataY < lastDataY) {
          newDataY += this.upperBound;
        }
        newDataY = (newDataY - lastDataY) / (newDataX - lastDataX);
        data.x.push(newDataX);
        data.y.push(newDataX);
        if (capacity > 0 && size >= capacity) {
          data.x.shift();
          data.y.shift();
        }
      }
    } else {
      data.x.push(newDataX);
      data.y.push(newDataY);
      if (capacity > 0 && size >= capacity) {
        data.x.shift();
        data.y.shift();
      }
    }
  };

  /***************************************************************************
   * Object prototype MultiTrendCurves
   */
  HSQuickLook.graph.MultiTrendCurves = function() {
    var data = [],
      counter = 0;
    
    this.trendCurves = [];
    this.placeholder = "";
    this.refreshCycle = 4;
    this.refreshPhase = 1;
    this.timeOrigin = void 0;
    this.xWidth = 600.0;
    this.drawn = false;
    this.layout = {
      showlegend: true,
      title: " ",
      legend: {
        xanchor: "right",
        yanchor: "top"
      },
      xaxis: {
        type: "linear",
        title: "Time (s)",
        range: [-1.0, +1.0],
      },
      yaxis: {
        type: "linear",
        title: " ",
        range: [-1.0, +1.0],
      },
      margin: {
        t: 40,
        b: 40,
        l: 60,
        r: 40
      },
      autosize: true,
      autoMove: true,
      yMin: -1.0,
      yMax: 1.0
    };
    
    this.config = {
      modeBarButtonsToAdd:[ {
        name: "Toggle linear/log in x-axis",
        icon: Plotly.Icons.pencil,
        click: function(gd) {
          if (gd.layout.xaxis.type === "linear") {
            gd.layout.xaxis.type = "log";
            gd.layout.xaxis.range[0] = Math.log10(gd.layout.xaxis.range[0]);
            gd.layout.xaxis.range[1] = Math.log10(gd.layout.xaxis.range[1]);
          }
          else if (gd.layout.xaxis.type === "log") {
            gd.layout.xaxis.type = "linear";
            gd.layout.xaxis.range[0] = 10**gd.layout.xaxis.range[0];
            gd.layout.xaxis.range[1] = 10**gd.layout.xaxis.range[1];
          }
          Plotly.update(gd, gd.data, gd.layout, gd.config);
        }
      },
      {
        name: "Toggle linear/log in y-axis",
        icon: Plotly.Icons.drawline,
        click: function(gd) {
          if (gd.layout.yaxis.type === "linear") {
            gd.layout.yaxis.type = "log";
            var ret = CheckLogCondition(gd.layout.yaxis.range);
            gd.layout.yaxis.range[0] = Math.log10(ret[0]);
            gd.layout.yaxis.range[1] = Math.log10(ret[1]);

            var ret = CheckLogCondition([gd.layout.yMin,gd.layout.yMax]);
            gd.layout.yMin = Math.log10(ret[0]);
            gd.layout.yMax = Math.log10(ret[1]);
          }
          else if (gd.layout.yaxis.type === "log") {
            gd.layout.yaxis.type = "linear";
            gd.layout.yaxis.range[0] = 10**gd.layout.yaxis.range[0];
            gd.layout.yaxis.range[1] = 10**gd.layout.yaxis.range[1];
            gd.layout.yMin = 10**gd.layout.yMin;
            gd.layout.yMax = 10**gd.layout.yMax;
          }
          Plotly.update(gd, gd.data, gd.layout, gd.config);
        }
        },
      {
        name: "Toggle legend ON/OFF",
        icon: Plotly.Icons.eraseshape,
        click: function(gd) {
          if (gd.layout.showlegend === true) {
            gd.layout.showlegend = false;
          }
          else if (gd.layout.showlegend === false) {
            gd.layout.showlegend = true;
          }
          Plotly.update(gd, gd.data, gd.layout, gd.config);
        }
        },
        {
          name: "Automove of x-axis",
          icon: Plotly.Icons.tooltip_basic,
          click: function(gd) {
            if (gd.layout.autoMove === true) {
              gd.layout.autoMove =false;
            }
            else if (gd.layout.autoMove === false) {
              gd.layout.autoMove = true;
            }
            Plotly.update(gd, gd.data, gd.layout, gd.config);
          },
        },
        {
          name: "Autoscale of y-axis",
          icon: Plotly.Icons.drawrect,
          click: function(gd) {
            gd.layout.yaxis.range = [gd.layout.yMin, gd.layout.yMax];
            Plotly.update(gd, gd.data, gd.layout, gd.config);
          }
        },
      ],
      editable: true,
      displaylogo: false,
    };

    this.addTrendCurve = function(sourceID, curve) {
      this.trendCurves[sourceID] = curve;
      data.push(curve.data);
    };

    this.getTrendCurve = function(sourceID) {
      return this.trendCurves[sourceID];
    };

    this.plot = function() {
      if (counter == this.refreshCycle) {
        counter = 0;
      }
      if (counter == this.refreshPhase) {
        var range = [this.layout.yMin, this.layout.yMax];
        if (this.layout.yaxis.type === "log") {
          range = [10**(range[0]), 10**(range[1])];
        }
        for(var curve in this.trendCurves){
          var value = this.trendCurves[curve].getLastYValue();
          range = GetAppropriateRangeY(range, value);
        };
        this.setYMinMax(range);
        if (!this.drawn) {
          this.setRangeY(range);
          Plotly.newPlot($(this.placeholder).attr('id'), data, this.layout, this.config);
          this.drawn = true;
        }
        else {
          Plotly.update($(this.placeholder).attr('id'), data, this.layout, this.config);
        }
      }
      counter += 1;
    };
  };

  var MultiTrendCurves = HSQuickLook.graph.MultiTrendCurves;

  MultiTrendCurves.prototype.setRangeX = function(range) {
    if (this.layout.xaxis.type === "log") {
      this.layout.xaxis.range[0] = Math.log10(range[0]);
      this.layout.xaxis.range[1] = Math.log10(range[1]);
    }
    else {
      this.layout.xaxis.range = range;
    }
  };

  MultiTrendCurves.prototype.setRangeY = function(range) {
    if (this.layout.yaxis.type === "log") {
      var ret = CheckLogCondition(range)
      this.layout.yaxis.range[0] = Math.log10(ret[0]);
      this.layout.yaxis.range[1] = Math.log10(ret[1]);
      this.layout.yMin = Math.log10(ret[0]);
      this.layout.yMax = Math.log10(ret[1]);
    }
    else {
      this.layout.yMin = range[0];
      this.layout.yMax = range[1];
      this.layout.yaxis.range = range;
    }
    $(this.placeholder).attr('ymax', this.layout.yMax);
    $(this.placeholder).attr('ymin', this.layout.yMin);
  };

  MultiTrendCurves.prototype.setYMinMax = function(range) {
    if (this.layout.yaxis.type === "log") {
      var ret = CheckLogCondition(range);
      this.layout.yMin = Math.log10(ret[0]);
      this.layout.yMax = Math.log10(ret[1]);
    }
    else {
      this.layout.yMin = range[0];
      this.layout.yMax = range[1];
    }
    $(this.placeholder).attr('ymax', this.layout.yMax);
    $(this.placeholder).attr('ymin', this.layout.yMin);
  };

  MultiTrendCurves.prototype.resetRangeY = function() {
    this.layout.yaxis.range[0] = this.layout.yMin;
    this.layout.yaxis.range[1] = this.layout.yMax;
  };

  MultiTrendCurves.prototype.adjustRangeX = function(x) {
    if (this.layout.autoMove === false) { return; }
    if (this.layout.xaxis.type === "log") {
      var ret = CheckLogCondition([x - this.xWidth + 0.5, x + 0.5])
      this.layout.xaxis.range[0] = Math.log10(ret[0]);
      this.layout.xaxis.range[1] = Math.log10(ret[1]);
    }
    else {
      this.layout.xaxis.range[0] = x - this.xWidth + 0.5;
      this.layout.xaxis.range[1] = x + 0.5;
    }
  };
  
  MultiTrendCurves.prototype.adjustRangeY = function(y) {
    var range = GetAppropriateRangeY(this.layout.yaxis.range ,y);
    if (range === null) {
      return;
    }
    this.setRangeY(range);
  };
})(); /* end of the anonymous function */

GetAppropriateRangeY = function(currentRange, y) {
  if (y === void 0) { return null; }
  
  var y0 = currentRange[0],
    y1 = currentRange[1],
    w = y1 - y0,
    r = (y - y0) / w,
    s = 1.0,
    c = 0.95,
    ret = [y0, y1];
    
  if (r > c) {
    s = r / c;
    y1 = y0 + w * s;
    ret[1] = y1;
  }
  else if (r < 1 - c) {
    s = (1.0 - r) / c;
    y0 = y1 - w * s;
    ret[0] = y0;
  }
  return ret;
  }

CheckLogCondition = function(range){
  var yMax_negative = 100;
  var yMin_negative = 0.1;
  var min_value = range[0];
  var max_value = range[1];
  var ret = [0, 1];
  if (min_value <= 0 || Number(min_value) == NaN){
    ret[0] = yMin_negative;
  }
  else{
    ret[0] = min_value;
  }
  if(max_value <= 0 || Number(min_value) == NaN){
    ret[1] = yMax_negative;
  }
  else{
    ret[1] = max_value;
  }
  return ret;
}
