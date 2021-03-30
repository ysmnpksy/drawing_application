function SprayCanTool(c){
	
	this.name = "sprayCanTool";
	this.icon = "assets/sprayCan.jpg";

    //Amount of dots per spray
	var points = 13;
    var minSize = 10
    var increment = 4
    
    var c = c
    var onCanvas = false
    
    this.populateOptions = function(){
        helpers.slider();
    }
    
	this.draw = function(){
        c.mousePressed(function(){
            onCanvas = true
        })
        
        var n = slider.value()
        //The spread amount changes based on the slider value 
        var spread = minSize + (n - 1) * increment
        
		var r = random(5,10);
        
        //Can only spray whilst the mouse is pressed on canvas
		if(mouseIsPressed && onCanvas == true){
			for(var i = 0; i < points; i++){
				point(random(mouseX - spread, mouseX + spread),
                      random(mouseY - spread, mouseY + spread));
			}
		}
        else{
            onCanvas = false
        }
	};
}
