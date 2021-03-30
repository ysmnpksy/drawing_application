function HelperFunctions(c) {
    var c = c

	//Jquery click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {
		background(255, 255, 255);
		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();
	});

	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function() {
		saveCanvas("myPicture", "jpg");
	});
    
    //Adds the slider to the options area
    this.slider = function(){
        select(".options").child(slider);
        
        //Created text above the slider
        var text = createDiv("Tool size");
        text.class("sliderText");
        select(".options").child(text);
    }
    
    //Adjust the stroke size of drawing tools by using the slider
    this.toolSize = function(){
    
        var val = slider.value();

        // The stroke size will be from 1-10 depending where the user changes the slider. If the eraser is selected, it will be x6 as big
        if(toolbox.selectedTool.name == "eraser"){ 
            strokeWeight(val * 6);
        }

        // If the spray can tool is selected, the size of each dot changes with the slider..
        else if(toolbox.selectedTool.name == "sprayCanTool"){
            strokeWeight(1 + (val - 1) * 0.16);
        }
        
        else if(toolbox.selectedTool.name == "highlighter"){
        strokeWeight(val * 2);
    }

        //ALl other tools will use the default values of 1-10
        else{
            strokeWeight(val);
        }
    }
    
    //Changes the cursor to a cross
    this.cross = function(){
        cursor(CROSS);
    }

    //Changes the cursor to an arrow
    this.arrow = function() {
        cursor(ARROW)
    }
}