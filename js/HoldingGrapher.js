define([
    "dojo/dom-style", "dojo/query", "dojox/gfx", "dojo/window", "dojo/domReady!"
], function (domStyle, query, gfx, viewport) {

    var cornerSurface;
    var xAxisSurface;
    var yAxisSurface;
    var dataSurface;

    return {
        initSurfaces:function (pagePosition, yAxisWidth, xAxisHeight,pixelRatio) {
            $.scrollbarWidth = function () {
                var a, b, c;
                if (c === undefined) {
                    a = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
                    b = a.children();
                    c = b.innerWidth() - b.height(99).innerWidth();
                    a.remove()
                }
                return c
            };
            var scrollBarWidth = $.scrollbarWidth();
            var graphWidth = viewport.getBox().w - pagePosition.X - 20;
            var graphHeight = viewport.getBox().h - pagePosition.Y - 20;

            var cornerDivElement = query("#cornerDiv")[0];
            domStyle.set(cornerDivElement, "top", (pagePosition.Y) + "px");
            domStyle.set(cornerDivElement, "left", (pagePosition.X) + "px");
            domStyle.set(cornerDivElement, "width", (yAxisWidth) + "px");
            domStyle.set(cornerDivElement, "height", (xAxisHeight) + "px");

            var xDivElement = query("#xDiv")[0];
            domStyle.set(xDivElement, "top", (pagePosition.Y) + "px");
            domStyle.set(xDivElement, "left", (pagePosition.X + yAxisWidth) + "px");
            domStyle.set(xDivElement, "width", (graphWidth - yAxisWidth - scrollBarWidth) + "px");
            domStyle.set(xDivElement, "height", xAxisHeight + "px");

            var yDivElement = query("#yDiv")[0];
            domStyle.set(yDivElement, "top", (pagePosition.Y + xAxisHeight) + "px");
            domStyle.set(yDivElement, "left", (pagePosition.X) + "px");
            domStyle.set(yDivElement, "width", (yAxisWidth) + "px");
            domStyle.set(yDivElement, "height", (graphHeight - xAxisHeight - scrollBarWidth) + "px");

            var dataAreaDivElement = query("#dataAreaDiv")[0];
            domStyle.set(dataAreaDivElement, "top", (pagePosition.Y + xAxisHeight) + "px");
            domStyle.set(dataAreaDivElement, "left", (pagePosition.X + yAxisWidth) + "px");
            domStyle.set(dataAreaDivElement, "width", (graphWidth - yAxisWidth) + "px");
            domStyle.set(dataAreaDivElement, "height", (graphHeight - xAxisHeight) + "px");

            //scrolling/resize events: Ghetto but effective
            require(["dojo/on"], function (on) {
                on(dataAreaDivElement, "scroll", function (evt) {
                    xDivElement.scrollLeft = dataAreaDivElement.scrollLeft;
                    yDivElement.scrollTop = dataAreaDivElement.scrollTop;
                });
                on(window, "resize", function (evt) {
                    //TODO: Duplicated Logic: Consider refactor
                    var graphWidth = viewport.getBox().w - pagePosition.X - 20;
                    var graphHeight = viewport.getBox().h - pagePosition.Y - 20;

                    var xDivElement = query("#xDiv")[0];
                    domStyle.set(xDivElement, "width", (graphWidth - yAxisWidth - scrollBarWidth) + "px");

                    var yDivElement = query("#yDiv")[0];
                    domStyle.set(yDivElement, "height", (graphHeight - xAxisHeight - scrollBarWidth) + "px");

                    var dataAreaDivElement = query("#dataAreaDiv")[0];
                    domStyle.set(dataAreaDivElement, "width", (graphWidth - yAxisWidth) + "px");
                    domStyle.set(dataAreaDivElement, "height", (graphHeight - xAxisHeight) + "px");
                });
            });

            // Create the GFX surface return to caller
            cornerSurface = gfx.createSurface(cornerDivElement.id, cornerDivElement.style.width, cornerDivElement.style.height);
            xAxisSurface = gfx.createSurface(xDivElement.id, xDivElement.style.width, xDivElement.style.height);
            yAxisSurface = gfx.createSurface(yDivElement.id, yDivElement.style.width, yDivElement.style.height);
            dataSurface = gfx.createSurface(dataAreaDivElement.id, xDivElement.style.width, yDivElement.style.height);
            //this.drawDebugStuff();
        },


        // TODO: I don't think that this is the way to do it but..works for now
        clear:function () {
            if (cornerSurface !== undefined && cornerSurface._parent !== null) {
                cornerSurface.destroy();
            }
            if (xAxisSurface !== undefined && xAxisSurface._parent !== null) {
                xAxisSurface.destroy();
            }
            if (yAxisSurface !== undefined && yAxisSurface._parent !== null) {
                yAxisSurface.destroy();
            }
            if (dataSurface !== undefined && dataSurface._parent !== null) {
                dataSurface.destroy();
            }
        },


        // DEBUG ONLY
        drawDebugStuff:function () {
            cornerSurface.createCircle({ cx:0, cy:0, r:50 }).setFill("green");
            xAxisSurface.createCircle({ cx:0, cy:0, r:200 }).setFill("yellow");
            yAxisSurface.createCircle({ cx:0, cy:0, r:500 }).setFill("blue");
            //dataSurface.createCircle({ cx:0, cy:0, r:1000 }).setFill("red");
            dataSurface.createText({ x:20, y:100, text:"Vector Graphics Rock!", align:"start" })
                .setFont({ family:"Arial", size:"20pt", weight:"bold" })//set font
                .setFill("blue");

        }

    };
});
