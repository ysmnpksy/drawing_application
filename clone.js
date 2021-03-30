function Clone(c){
    this.icon = "assets/clone.jpg";
    this.name = "clone";
    
    //ctrl will determine whether the "ctrl" button is being pressed.
    var ctrl = false;
    
    //mClick will determine whether the mouse was clicked. 
    var mClick = false;
    var c = c
    var x;
    var y;
    var cloneX;
    var cloneY;
    var destinationX;
    var destinationY;
    var distX;
    var distY; 
    var mode = false
    var onCanvas = false
    
    var minSize = 10
    var increment = 3
    
    
    //Added text and slider to the options area
    this.populateOptions = function() {
        var text = createDiv("Ctrl + mouse click to set clone starting point");
        select(".options").child(slider);
        
        text.class("text");
        select(".options").child(text);
        
        helpers.slider();
	};
    
    //When the tool is unselected, removes the text, and does leave the clone box on the canvas
    this.unselectTool = function() {
        mode = false;
        draw();
        loadPixels();
        select(".options").html("");
	} 
    
    this.mousePressed = function (){
        mClick = true
    }

    this.mouseReleased = function(){
        mClick = false
    }
    
    //When the "ctrl" button is pressed, ctrl will become true
    this.keyPressed = function(keycode){
        if(keyCode == 17){
            ctrl = true;
        }
    }
    //When the "ctrl" button is released, ctrl will become false
    this.keyReleased = function(keycode){
        if (keyCode == 17){
            ctrl = false;
        }
    }

    this.draw = function(){
        
        //Initialising the size of the cloning box
        var n = slider.value()
        var val = minSize + (n - 1) * increment
        var mouseVal = val/2
        
        c.mousePressed(function(){
            onCanvas = true
        })
        
        //When ctrl is pressed and the mouse is clicked, it will save the current mouseX and mouseY position. This will be where the start of the original image to be cloned.
        if(ctrl == true && mClick == true){
            cloneX = mouseX
            cloneY = mouseY
        }
        
        //When the mouse is clicked, it will save the current mouseX and mouseY position. This be the starting point of the new area of the cloned image. 
        if(mClick == true){
            destinationX = mouseX
            destinationY = mouseY
            
           //The distance of the original mouse position and desintation coordinates will be used when the clone image is being drawn in a new area, the original coordinates will move in the same direction as the mouse
            distX = destinationX - cloneX
            distY = destinationY - cloneY
        }
        
        mClick = false
        updatePixels();
        
        //Draws the cloned image
        if(mouseIsPressed && onCanvas == true){
            copy(mouseX - distX - mouseVal, 
                 mouseY - distY - mouseVal, 
                 val, val, 
                 mouseX - mouseVal, 
                 mouseY - mouseVal, 
                 val, val)
            loadPixels(); 
            
            //Draws a rect at the original image only when mode == true
            noFill()
            strokeWeight(1)
            stroke(0)
            mode = true
            if(mode == true){
                rect(mouseX - distX - mouseVal, 
                     mouseY - distY - mouseVal, 
                     val, val)
            }
        }
        else{
            mode = false
            onCanvas = false
        }
    }
}