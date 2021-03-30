//a tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the 
//pixel array.
function LineOrRectTool(newName, iconName){
	//set an icon and a name for the object
	this.icon = "assets/"+iconName;
	this.name = newName;

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;
    
    var noFillButton;
    var self = this;
    
    this.populateOptions = function() {
        if(self.name == "drawrect"){
            //Created a button for a no fill option
            select(".options").html(
                "<button id = 'noFillButton'> No Fill </button>");

            select("#noFillButton").mouseClicked(function(){
                noFillButton = select("#" + this.elt.id);

                //Starts off with the button saying "no fill", and draws a rect with a fill colour.
                if(colourP.fillMode == true) {
                    fill(colourP.selectedColour)
                    colourP.fillMode = false;
                    noFillButton.html("No Fill");

                //When the no fill button is pressed, the button will change to say "fill" instead and have no fill when drawing a rect
                } else {
                    noFill();
                    colourP.fillMode = true;
                    noFillButton.html("Fill");
                }
            });
        }
        
        helpers.slider();
	};
    
    this.unselectTool = function() {
        if(self.name == "drawrect"){
            //clears the options section
            select(".options").html("");

            //Reset the mode for the button to work correctly after switching tools
            colourP.fillMode = false;
        }
        
        //Change the cursor back to an arrow
        helpers.arrow();
	}

	//draws the line to the screen 
	this.draw = function(){
        
        //Change the cursor to a cross
        helpers.cross();

		//only draw when mouse is clicked
		if(mouseIsPressed){
			//if it's the start of drawing a new line
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//save the current pixel Array
				loadPixels();
			}

			else{
				//update the screen with the saved pixels to hide any previous
				//line between mouse pressed and released
				updatePixels();
                
                if(self.name == "drawrect"){
                    //draw the rect
				    rect(startMouseX, startMouseY, mouseX-startMouseX, mouseY-startMouseY);
                }
                else{
                    //draw the line
                    line(startMouseX, startMouseY, mouseX, mouseY);
                }
			}
		}

		else if(drawing){
			//save the pixels with the most recent line and reset the
			//drawing bool and start locations
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};
}
