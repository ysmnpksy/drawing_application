function FloodFill(c){
    this.icon = "assets/floodFill.jpg";
    this.name = "floodfill";
    var canvas = c

    var targetColour = [0,0,0,0]; 
    var nodeColour = [0,0,0,0];
    var queue = [];
    var nodeXY;
    var newNodeX;
    var newNodeY;
    var newNode;
    var replacementC = colourP.fillToolColour
    var modeOn = true
    
    var self = this
    
    this.populateOptions = function() {
		//clear options
		select(".options").html("");
	};
    
    this.unselectTool = function(){
        modeOn = false
    }
 
    //Click on the canvas to get the colour of the area that you want to be changed. Value only changes when on the floodfill tool
    var mouseClickedOnCanvas = function(){
        c.mousePressed(function(){
            if(modeOn == true){
                targetColour = get(mouseX, mouseY)
                nodeColour = get(mouseX, mouseY)
                fFill();
            }
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
    
    //If the comparison of the 2 nodes were the same, replace the pixel with the replacement colour and enqueue the pixel
    var updateColour = function(compareNodes, xCor, yCor){
        if(compareNodes == 4){
            set(xCor, yCor, replacementC)
            queue.push([xCor, yCor])
            updatePixels();
        }
    }
    
    var fFill = function(){
        
        //Assigns the initial start point of the node to where the mouse is.
        nodeXY = [mouseX, mouseY]
        
        //Compares the target colour and replacement colour
        var compareTcRc = compare(targetColour,replacementC)
        
        //If the target colour and replacement colour is the same, return
        if(compareTcRc == 4){
            return
        }
        
        //Compares the node colour and target colour
        var compareNcTc = compare(nodeColour,targetColour)
        
        //If the node colour and target colour is not the same, return
        if(compareNcTc != 4){
            return
        }
        
        //Set the colour of node to replacement colour
        set(nodeXY[0], nodeXY[1], replacementC)
        
        //Enqueue the node to the queue
        queue.push(nodeXY)
    }
    
    //Gets the colour of the pixel from one of the directions from newNode and compares it to the target colour. If they are the same colour, replace the pixel with the replacement colour and enqueue the pixel position
    this.directions = function(xDir, yDir){
        var getC = get(xDir, yDir)
        var comp = compare(getC, targetColour)
        updateColour(comp, xDir, yDir)
    }

    this.draw = function(){
        modeOn = true
        replacementC = colourP.fillToolColour;
        mouseClickedOnCanvas();
        
        //While the queue is not empty
        while(queue.length != 0){
            
            //newNode is the first element of the queue
            newNode = queue[0]
            
            //Assigning the x and y value of the new node to new variables
            newNodeX = newNode[0]
            newNodeY = newNode[1]
            
            //Dequeue the first element of the queue
            queue.shift()
            
            //Going to the left
            self.directions(newNodeX - 1, newNodeY)
            
            //Going to the right
            self.directions(newNodeX + 1, newNodeY)
            
            //Going up
            self.directions(newNodeX, newNodeY - 1)
            
            //Going down
            self.directions(newNodeX, newNodeY + 1)
        }
    }
}