// Global variables that will store the toolbox colour palette
// and the helper functions.
var toolbox = null;
var colourP = null;
var helpers = null;

var slider = null;

//var fillMode = false;

function setup() {
	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");

	//Create a slider to control the tool size
	slider = createSlider(1,10,5);
    slider.class("slider")

	//create helper functions and the colour palette
    helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool("freehand","freehand.jpg"));
	toolbox.addTool(new LineOrRectTool("LineTo","lineTo.jpg"));
	toolbox.addTool(new SprayCanTool(c));
	toolbox.addTool(new MirrorDrawTool());
    
    //added
    toolbox.addTool(new FreehandTool("eraser","eraser.png"));
    toolbox.addTool(new FreehandTool("highlighter","highlighter.png"));
    toolbox.addTool(new LineOrRectTool("drawrect","rect.png"));
    toolbox.addTool(new EdiableShapes(c));
    toolbox.addTool(new FloodFill(c));
    toolbox.addTool(new Kaleidoscope());
    toolbox.addTool(new Clone(c));

	background(255);
}

function draw() {
    
    
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
    
    helpers.toolSize();
}

function keyPressed(keycode){
    if (toolbox.selectedTool.hasOwnProperty("keyPressed")){
        toolbox.selectedTool.keyPressed(keyCode)
    }
}

function keyReleased(keyCode){
    if (toolbox.selectedTool.hasOwnProperty("keyPressed")){
        toolbox.selectedTool.keyReleased(keyCode)
    }
}

function mousePressed(){
    if (toolbox.selectedTool.hasOwnProperty("mousePressed")){
        toolbox.selectedTool.mousePressed()
    }
}

function mouseReleased(){
    if (toolbox.selectedTool.hasOwnProperty("mouseReleased")){
        toolbox.selectedTool.mouseReleased()
    }
}

function mouseClicked(){
    if (toolbox.selectedTool.hasOwnProperty("mouseClicked")){
        toolbox.selectedTool.mouseClicked()
    }
}