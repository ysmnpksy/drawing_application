//Displays and handles the colour palette.
function ColourPalette() {
    
    var aValue = 0.3;
    var highColour = null;
    
    this.fillMode = false;
    this.fillToolColour = [0, 0, 0, 255];
    
    //colours[i][0] are colours for most tools
    //colours[i][1] are colours specifically for the highlighter
    //colours[i][2] are colours specifically for flood fill
    this.colours = [
        ["black", 
         color("rgba(0, 0, 0,"+aValue+")"), 
         [0, 0, 0, 255]],
        
        ["silver", 
         color("rgba(192, 192, 192,"+aValue+")"), 
         [192, 192, 192, 255]],
        
        ["grey", 
         color("rgba(128, 128, 128,"+aValue+")"), 
         [128, 128, 128, 255]], 
        
        ["white", 
         color("rgba(255, 255, 255,"+aValue+")"), 
         [255, 255, 255, 255]], 
        
        ["maroon", 
         color("rgba(128, 0, 0,"+aValue+")"), 
         [128, 0, 0, 255]], 
        
        ["red", 
         color("rgba(255, 0, 0,"+aValue+")"), 
         [255, 0, 0, 255]], 
        
        ["purple", 
         color("rgba(128, 0, 128,"+aValue+")"), 
         [128, 0, 128, 255]], 
        
        ["orange", 
         color("rgba(255, 165, 0,"+aValue+")"), 
         [255, 165, 0, 255]], 
        
		["pink", 
         color("rgba(255, 192, 203,"+aValue+")"), 
         [255, 192, 203, 255]], 
        
        ["fuchsia", 
         color("rgba(255, 0, 255,"+aValue+")"), 
         [255, 0, 255, 255]], 
        
        ["green", 
         color("rgba(0, 128, 0,"+aValue+")"), 
         [0, 128, 0, 255]], 
        
        ["lime", 
         color("rgba(0, 255, 0,"+aValue+")"), 
         [0, 255, 0, 255]], 
        
        ["olive", 
         color("rgba(128, 128, 0,"+aValue+")"), 
         [128, 128, 0, 255]], 
        
        ["yellow", 
         color("rgba(255, 255, 0,"+aValue+")"), 
         [255, 255, 0, 255]], 
        
        ["navy", 
         color("rgba(0, 0, 128,"+aValue+")"), 
         [0, 0, 128, 255]], 
        
        ["blue", 
         color("rgba(0, 0, 255,"+aValue+")"), 
         [0, 0, 255, 255]], 
        
		["teal", 
         color("rgba(0, 128, 128,"+aValue+")"), 
         [0, 128, 128, 255]], 
        
        ["aqua", 
         color("rgba(0, 255, 255,"+aValue+")"), 
         [0, 255, 255, 255]]
    ];
    
	//make the start colour be black
	this.selectedColour = "black";

	var self = this;
//    var borderChange = false
    
	var colourClick = function() {

        //remove the old border
		var current = select("#" + self.selectedColour + "Swatch");
		current.style("border", "0");
		//get the new colour from the id of the clicked element
		var c = this.id().split("Swatch")[0];
                
        //If the highligter tool is selected, the colour sting rgba values will be used.
        if(toolbox.selectedTool.name == "highlighter"){
            for(var i = 0; i < self.colours.length; i++){
                if(c == self.colours[i][0]){
                    highColour = self.colours[i][1]
                    self.selectedColour = self.colours[i][0]
                    fill(highColour)
                    stroke(highColour)
                }
            }
        }
        
        //If the flood fill tool is selected, the rgba values will be used instead.
        else if(toolbox.selectedTool.name == "floodfill"){
            for(var i = 0; i < self.colours.length; i++){
                if(c == self.colours[i][0]){
                    var f = self.colours[i][2]
                    self.selectedColour = self.colours[i][0]
                    self.fillToolColour = f
                }
            }
        }
        
        //Ensures that if the fill mode is off for the rect tool, the colour is still updated when switching colours.
        else if(self.fillMode){
            self.selectedColour = c
            stroke(c);
        }
        
        //Else, the default values will be used.
        else{
            self.selectedColour = c
            fill(c);
            stroke(c);
        }

		//add a new border to the selected colour
		this.style("border", "2px solid blue");
	};
    
    //Used to change the colour from colours[0] to colours[1] when the highlighter tool is selected
    this.highlighterSelect = function(){
        for(var i = 0; i < self.colours.length; i++){
            if(self.selectedColour == self.colours[i][0]){
                highColour = self.colours[i][1]
                fill(highColour)
                stroke(highColour)
            }
        }
    }
    
    //Used to change the colour from colours[0] to colours[2] when the flood fill tool is selected
    this.floodFillSelect = function(){
        for(var i = 0; i < self.colours.length; i++){
            if(self.selectedColour == self.colours[i][0]){
                var f = self.colours[i][2]
                self.fillToolColour = f
            }
        }
    }
    
    //Used to ensure that the colour is same when changing tools
    this.allToolCSelect = function(){
        fill(self.selectedColour);
        stroke(self.selectedColour);
    }

    //added this so we can set the colour back to the selected colour after the eraser is used 
    this.setColour = function(c) {
        self.selectedColour = c;
		fill(c);
		stroke(c);  
    }
    
	//load in the colours
	this.loadColours = function() {
		//set the fill and stroke properties to be black at the start of the programme
		//running
		fill(this.colours[0][0]);
		stroke(this.colours[0][0]);

		//for each colour create a new div in the html for the colourSwatches
		for (var i = 0; i < this.colours.length; i++) {
			var colourID = this.colours[i][0] + "Swatch";

			// Add the swatch to the palette and set its background
			// colour to be the colour value.
			var colourSwatch = createDiv();
			colourSwatch.class("colourSwatches");
			colourSwatch.id(colourID);

			select(".colourPalette").child(colourSwatch);
			select("#" + colourID).style("background-color", this.colours[i][0]);
			colourSwatch.mouseClicked(colourClick);
		}

		select(".colourSwatches").style("border", "2px solid blue");
	};
	//call the loadColours function now it is declared
	this.loadColours();
}
