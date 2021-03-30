//container object for storing the tools. Functions to add new tools and select a tool
function Toolbox() {

	var self = this;

	this.tools = [];
	this.selectedTool = null;

	var toolbarItemClick = function() {
		//remove any existing borders
		var items = selectAll(".sideBarItem");
		for (var i = 0; i < items.length; i++) {
			items[i].style('border', '0');
		}

		var toolName = this.id().split("sideBarItem")[0];
		self.selectTool(toolName);

		//call loadPixels to make sure most recent changes are saved to pixel array
		loadPixels();
	};

	//add a new tool icon to the html page
	var addToolIcon = function(icon, name) {
		var sideBarItem = createDiv("<img src='" + icon + "'></div>");
		sideBarItem.class("sideBarItem");
		sideBarItem.id(name + "sideBarItem");
		sideBarItem.parent("sidebar");
		sideBarItem.mouseClicked(toolbarItemClick);
        
        //A light gray background appears when hovering over the tool icons.
        sideBarItem.mouseOver(function(e){
            var el = sideBarItem;
            el.addClass("hover");
        })
        
        sideBarItem.mouseOut(function(e){
            var el = sideBarItem;
            el.removeClass("hover");
        })
	};
    

	//add a tool to the tools array
	this.addTool = function(tool) {
		//check that the object tool has an icon and a name
		if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
			alert("make sure your tool has both a name and an icon");
		}
		this.tools.push(tool);
		addToolIcon(tool.icon, tool.name);
		//if no tool is selected (ie. none have been added so far)
		//make this tool the selected one.
		if (this.selectedTool == null) {
			this.selectTool(tool.name);
		}
	};

	this.selectTool = function(toolName) {
		//search through the tools for one that's name matches
		//toolName
		for (var i = 0; i < this.tools.length; i++) {
			if (this.tools[i].name == toolName) {
                
                //added
                //this sets the colour to the selected color from the colour pallet as using the eraser sets the colour to white, so it needs to be set back to the selected colour
                colourP.setColour(colourP.selectedColour);
                
				//if the tool has an unselectTool method run it.
				if (this.selectedTool != null && this.selectedTool.hasOwnProperty(
						"unselectTool")) {
					this.selectedTool.unselectTool();
				}
                
				//select the tool and highlight it on the toolbar
				this.selectedTool = this.tools[i];
				select("#" + toolName + "sideBarItem").style("border", "2px solid blue");

				//if the tool has an options area. Populate it now.
				if (this.selectedTool.hasOwnProperty("populateOptions")) {
					this.selectedTool.populateOptions();
				}
			}
		}
        
        //If the highlighter tool is selected, change the colour to the colour with alpha value (colourPalette.colours[1])
        if(toolName == "highlighter"){
            colourP.highlighterSelect();
        }
        
        //If the highlighter tool is selected, change the colour to the rgba value (colourPalette.colours[2]])
        else if(toolName == "floodfill"){
            colourP.floodFillSelect();
        }
        
        //Otherwise use the general colour (colourPalette.colours[0])
        else{
            colourP.allToolCSelect()
        }
	};
}
