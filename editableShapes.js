function EdiableShapes(c){
    this.icon = "assets/shapes.png"
    this.name = "editableshapes"
    
    var editButton;
    var finishButton;
    
    var canvas = c
    
    var editMode = false;
    var currentShape = [];
    
    //Add the edit and finish button to the options section
    this.populateOptions = function() {
		select(".options").html(
			"<button id = 'editButton'> Edit Shape </button> <button id = 'finishButton'> Finish Shape </button>");
        
        //When edit mode is off, the button will say "Edit Shape" and when it's on, the button will say "Add Vertices".
		select("#editButton").mouseClicked(function(){
			editButton = select("#" + this.elt.id);
			if(editMode) {
                editMode = false;
				editButton.html("Edit Shape");
			} else {
                editMode = true;
				editButton.html("Add Vertices");
			}
		});
        
        //When the finish button is pressed, it ends the current shape and allows to start a new shape
        select("#finishButton").mouseClicked(function(){
            finishButton = select("#" + this.elt.id);
            editMode = false;
            draw();
            loadPixels();
            currentShape = []; 
        })
        
        //Slider to change the stroke size
        helpers.slider();
        
	};
    
    //When another tool is selected, it performs certain actions
    this.unselectTool = function() {
        //Finishs the shape 
        editMode = false;
        draw();
        loadPixels();
        currentShape = [];
        
		//clears the options section
		select(".options").html("");
        
        //Change the cursor back to an arrow
        helpers.arrow();
	} 
    
    //Will only draw if the mouse is pressed within the canvas
    this.mousePressOnCanvas = function(canvas) {
        if (mouseX > canvas.elt.offsetLeft - 70 &&
            mouseX < (canvas.elt.offsetLeft + canvas.width) &&
            mouseY > canvas.elt.offsetTop - 35 &&
            mouseY < (canvas.elt.offsetTop + canvas.height - 35)) {
            return true;
        }
        return false;
    }
    
    this.draw = function(){
        updatePixels(); 
        noFill();
        
        //Change the cursor to a cross
        helpers.cross();
        
        //When adding vertices, everytime the mouse is pressed within the canvas, the mouse position is added to the currentShape array
        if(this.mousePressOnCanvas(canvas) && mouseIsPressed){
            if(!editMode){
                currentShape.push({
                    x: mouseX,
                    y: mouseY
                });
            }
            //In editing mode, when the mouse is pressed near a vertex, it can move the edge of the vertex to where the mouse position is
            else{
                for(var i = 0; i < currentShape.length; i++){
                    if(dist(currentShape[i].x,
                           currentShape[i].y,
                           mouseX,
                           mouseY) < 15){
                        currentShape[i].x = mouseX;
                        currentShape[i].y = mouseY;
                    }
                }
            }
        }
        
        //Draws the vertices from the currentShape array when the mouse was pressed.
        beginShape();
        for(var i = 0; i < currentShape.length; i++){
            vertex(currentShape[i].x, 
                   currentShape[i].y);
            
            //In editing mode, it draws a small circle to indicate where the user can drawg the vertex
            if(editMode){
                ellipse(currentShape[i].x,currentShape[i].y,7);
            }
        }
        endShape();
    }
}

