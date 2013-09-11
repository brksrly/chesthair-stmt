// Testing out this drawing library


// Test data




//Functions


function OnScrollDiv(scrollable, xAxis, yAxis) {
    xAxis.scrollLeft(scrollable.scrollLeft());
    yAxis.scrollTop(scrollable.scrollTop());
}


function swHoldingEntryDraw() {
    swHoldingEntryDrawInternal(400, 100, 1500, 850);
}


function swHoldingEntryDrawInternal(x, y, w, h) {
    $.scrollbarWidth=function(){var a,b,c;if(c===undefined){a=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b=a.children();c=b.innerWidth()-b.height(99).innerWidth();a.remove()}return c};
    var defaultYAxisWidth = 150;
    var defaultXAxisHeight = 85;
    var scrollBarWidth = $.scrollbarWidth();

    var body = $('body');

    body.append('<div id="cornerdiv" style="position: absolute; overflow:hidden;"></div>');
    var cornerDiv = $('#cornerdiv');
    cornerDiv.css("top", y).css("left", x).css("width", defaultYAxisWidth).css("height", defaultXAxisHeight);
    var cornerAxis = Raphael(cornerDiv.attr("id"), defaultYAxisWidth, defaultXAxisHeight);
    var cornerBorder = cornerAxis.rect(0, 0, defaultYAxisWidth, defaultXAxisHeight);
    cornerBorder.attr("stroke", "#000000");
    cornerAxis.path("M0 0L"+defaultYAxisWidth+" "+ defaultXAxisHeight);
    cornerAxis.print(0, 0, "print", cornerAxis.getFont("Museo"), 30).attr({fill: "#0A0"});


    // Set up XAxis
    body.append('<div id="xdiv" style="position: absolute; overflow:hidden;"></div>');
    var xDiv = $('#xdiv');
    xDiv.css("top", y).css("left", x + defaultYAxisWidth).css("width", w - defaultYAxisWidth - scrollBarWidth).css("height", h);
    var xAxis = Raphael(xDiv.attr("id"), w - defaultYAxisWidth-scrollBarWidth, defaultXAxisHeight);
    var xBorder = xAxis.rect(0, 0, w - defaultYAxisWidth-scrollBarWidth, defaultXAxisHeight);
    xBorder.attr("stroke", "#000000");

    // Set up YAxis
    body.append('<div id="ydiv" style="position: absolute; overflow:hidden;"></div>');
    var yDiv = $('#ydiv');
    yDiv.css("top", y + defaultXAxisHeight).css("left", x).css("width", defaultYAxisWidth).css("height", h - defaultXAxisHeight - scrollBarWidth);
    var yAxis = Raphael(yDiv.attr("id"), defaultYAxisWidth, h - defaultXAxisHeight - scrollBarWidth);
    var yBorder = yAxis.rect(0, 0, defaultYAxisWidth, h - defaultXAxisHeight - scrollBarWidth);
    yBorder.attr("stroke", "#000000");

    // Set up DataArea
    body.append('<div id="dataAreaDiv" style="position: absolute; overflow:scroll;"></div>');
    var scrollableDataAreaDiv = $('#dataAreaDiv');
    scrollableDataAreaDiv.css("top", y + defaultXAxisHeight).css("left", x + defaultYAxisWidth).css("width", w - defaultYAxisWidth).css("height", h - defaultXAxisHeight);
    var dataArea = Raphael(scrollableDataAreaDiv.attr("id"), w -defaultYAxisWidth - scrollBarWidth, h - defaultXAxisHeight - scrollBarWidth);
    var dataAreaBorder = dataArea.rect(0, 0, w -defaultYAxisWidth- scrollBarWidth, h - defaultXAxisHeight - scrollBarWidth);
    dataAreaBorder.attr("stroke", "#000000");
    dataArea.print(100, 100, "Test string", dataArea.getFont("Times", 800), 30);

    //Sync up scrolling
    scrollableDataAreaDiv.scroll(function(){OnScrollDiv(scrollableDataAreaDiv,xDiv,yDiv)});
}