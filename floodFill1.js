function FloodFill(c){
    this.icon = "assets/floodFill.jpg";
    this.name = "floodfill";

    this.coordinateX = 0;
    this.coordinateY = 0;
    this.currentColour = [0,0,0,0]; 
    this.nodeColour = [0,0,0,0];
 
    var self = this
    
    this.populateOptions = function() {
		//clear options
		select(".options").html("");
	};
    
    //When the mouse is pressed, it records the coordinate and the pixel colour
    var getInfo = function(){
        c.mousePressed(function(){
            //Finds the mouse coordinate and stores it in the coordinate array
            self.coordinateX = mouseX;
            self.coordinateY = mouseY;
            
            //Finds the rgba value of the pixel and stores it
            self.currentColour = get(mouseX, mouseY)
        })
    }
    
    //Compares 2 colours. If count == 4, the colours are the same.
    var compare = function(colour1, colour2){
        var count = 0
        for(var i = 0; i < 4; i++){
            if(colour1[i] == colour2[i]){
                count += 1;
            }
        }
        return count
    }
    
    //Main flood fill function
    var floodFill = function(coX, coY, targetColour, nodeColour){
        if(mouseIsPressed){
            var x = coX;
            var y = coY;
            var tColour = targetColour;
            var changeColour = colourP.fillToolColour;
            var nColour = nodeColour;

            //Checks if the targetColour and replacement colour are the same colour  
            var count = compare(tColour, changeColour)
            
            
            //Finds the rgba value of the current pixel and checks if its the same colour as the targetcolour
            nColour = get(x,y)
            var count2 = compare(nColour, tColour)
            
            //If the targetColour is the same as the replacment colour, return
            if(count == 4){
                return;
            }
            
            //If the current node colour is not the same as targetcolour, return
            else if(count2 <= 3){
                return
            }
            
            //Else set the x and y coordinate to the replacement colour and updatePixels.
            else{
                set(x,y,changeColour)
                updatePixels();
            }
            
            //Calls the function recursively to go left, right, up, and down.
            floodFill(coX-1, coY, targetColour, nodeColour)
            floodFill(coX+1, coY, targetColour, nodeColour)
            floodFill(coX, coY-1, targetColour, nodeColour)
            floodFill(coX, coY+1, targetColour, nodeColour)
        }
    }
    
    this.draw = function(){
        getInfo();
        floodFill(self.coordinateX, self.coordinateY, self.currentColour,self.nodeColour)
    }
}