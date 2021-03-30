function FreehandTool(newName, iconName){
	//set an icon and a name for the object
	this.icon = "assets/"+iconName;
	this.name = newName;

	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;
    
    //Slider to change the stroke size
    this.populateOptions = function() {
        helpers.slider();
	};
    
    //If the tool was highlighter, revert the strokecap back to round when selecting another tool.
    this.unselectTool = function(){
        if(self.name == "highlighter"){
            strokeCap(ROUND);
        }
    }
    
    var self = this;
    
	this.draw = function(){
		//if the mouse is pressed
		if(mouseIsPressed){
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else{
                //If this tool is eraser, make the stroke colour white.
                if(self.name == "eraser"){
                    stroke(255);
                }
                
                //If this tool is the highlighter, make the strokeCap square, other round.
                if(self.name == "highlighter"){
                    strokeCap(SQUARE);
                }
                else{
                    strokeCap(ROUND);
                }
                
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		//try and comment out these lines and see what happens!
		else{
			previousMouseX = -1;
			previousMouseY = -1;
		}
	};
}