/*******************************************************************************
 * JMultiGraph.js for HS Quick Look
 * 
 * Authors: Soki Sakurai Date: 2014-05-09
 * 
 ******************************************************************************/

/* Global variable */
var HSQuickLook = HSQuickLook || {};

/* The anonymous function of this script */
(function() {
    /***************************************************************************
     * Exported variables
     */
    HSQuickLook.JMultiGraph = {};

    HSQuickLook.JMultiGraph.PointType = {
        Undefined : 0,
        NoError : 1,
        SymmetricError : 2,
        AsymmetricError : 3
    };

    HSQuickLook.JMultiGraph.JMultiGraph = function() {
        var plots = [];
        var queryToPlaceholder = "";
        var showSeriesLine = true;
        var options = {
            legend : {
                position : "nw",
                show : true
            },
            series : {
                lines : {
                    show : showSeriesLine,
                    lineWidth : 1
                }
            },
            xaxis : {
                axisLabel : "TI (s)",
                axisLabelUseCanvas : true,
            },
            yaxis : {
                axisLabel : "",
                axisLabelUseCanvas : true,
            },
            selection : {
                mode : "x"
            }
        };

        this.addGraph = function(graph) {
            plots.push(graph.getPlotData());
        };

        this.setQueryToPlaceholder = function(path) {
            queryToPlaceholder = path;
        };

        this.enableRescale = function(enadisX, enadisY) {
            if (enadisX === undefined || enadisY === undefined) {
                return;
            }
            if (enadisX || enadisY) {
                $(queryToPlaceholder).bind(
                        "plotselected",
                        function(event, ranges) {
                            var rxy = {};
                            if (enadisX) {
                                rxy.xaxis = {
                                    min : 0,
                                    max : 0
                                };
                                rxy.xaxis.min = ranges.xaxis.from;
                                rxy.xaxis.max = ranges.xaxis.to;
                            }
                            if (enadisY) {
                                rxy.yaxis = {
                                    min : 0,
                                    max : 0
                                };
                                rxy.yaxis.min = ranges.yaxis.from;
                                rxy.yaxis.max = ranges.yaxis.to;
                            }
                            range_locked = true;
                            $.plot(queryToPlaceholder, plots, $.extend(true,
                                    {}, options, rxy));
                        });
                var selection_str = "";
                if (enadisX) {
                    selection_str = "x";
                }
                if (enadisY) {
                    selection_str = selection_str + "y";
                }
                options.selection.mode = selection_str;
            } else {
                options.selection.mode = "";
            }
        };

        // this.plot = function(query) {
        this.plot = function(rangeX, rangeY, query) {
            if (rangeX !== undefined) {
                options.xaxis.min = rangeX[0];
                options.xaxis.max = rangeX[1];
            }
            if (rangeY !== undefined) {
                options.yaxis.min = rangeY[0];
                options.yaxis.max = rangeY[1];
            }
            var placeholder = "";
            if (typeof query == "string") {
                placeholder = query;
            } else {
                placeholder = queryToPlaceholder;
            }
            $.plot($(placeholder), plots, options);
        };

    };
})(); /* end of the anonymous function */
