# Drawing Application
**Technologies: p5.js / JavaScript / HTML**

## Access Project 
This project can be accessed [here]("http://igor.gold.ac.uk/~ypaks001/drawingApp/").

## Implementations

### Editable shape
This extension has been made into a constructor function. We placed the edit and finish shape button in the options area using the populateOptions function. The method to finish the shape is added to the unselectTool function, meaning the shape is also finished by changing tools.

### Colour Palette
We added alternative colour values from the original colours for the highlighter and flood fill tool. The colour values are grouped together in an array in the colours array.

We made sure the border switched to the desired colour when changing colours on both
these tools and made the colour change from the string value to the rgba value when using these tools and back when using other tools.

### Freehand Tool
We edited this tool to consist of three parts: an eraser, highlighter and pen. We added an if statements to check the name of the selected tool and altered the stroke, colour and stroke cap accordingly. The object is then called three times with the name of the tool and icon as parameters.

The eraser allows users to remove mistakes, it is controlled by the stroke slider but the stroke value is multiplied by six so the eraser is always bigger than the highest stroke option.

The highlighter tool sets the alpha value of the colour selected to 0.3 in the colour palette so any drawing underneath is still shown. The highlighter is also controlled by the stroke slider but the value selected is multiplied by two so the same stroke size is wide enough to cover any writing done using the pen.

### Helper Functions
We add the function which controls the tool size to this constructor. This function is called in the options area for all tools except flood fill. An if statements is added to check the tool name selected, as some requires adjustments.
### Kaleidoscope
We added this tool to allow the user to draw kaleidoscopes. The reflection point is the center of the screen. The tool automatically has eight reflections but there is an option button on the bottom menu to change it to six.

###Line or rect tool 
We edited the original line tool to allow this function to draw lines or rectangles. If the tool name is “drawrect”, it adds a button allowing the user to choose between fill and no fill in the options area when drawing the rectangle.

### Cloning tool
This tool copies a selected area and redraws it in a new area using copy(). We implemented the mousePressed and keyPressed function to record the position of the mouse. When Ctrl and the mouse is pressed at the same time, the position saved will be where the original image starts. When the mouse is pressed again, it will record the mouse position of the new area. The cloning image will draw as long as the mouse button is held down. We later added a rectangle at the original image for the user to see the position of the image they are cloning.

### Flood Fill
This tool fills an area of the same colour to another. We developed two versions: the first attempt (floodFill1.js) used recursion while the second (floodFill2.js) used a while loop and a queue.

The first method retrieved the colour value of the pixel using get(), which returned an array with the rgba value. In order to compare the colours, we had to add the rgba values of each colour to the colour palette and use a for loop to compare each index. The function calls recursively, changing the directions if the colour of the pixel is not the same as the new colour or if the colour of the next pixel is the same as the originally retrieved colour. As this method only worked on smaller areas due to the maximum call stack being exceeded, we decided to try another method.

The second methods enqueues the first pixel coordinates to the queue. While the queue is not empty, a variable is set as the head of the queue and then the queue is dequeued. We check if the colour of the variable pixel is the same as the original colour. If so, we set the colour to the new colour and enqueue the coordinates to the queue. This now works for large areas but takes much longer.

We have chosen to use the second method. Given more time, we would have liked to
explore further ideas which improves the time for it to complete.

## Planning and Co-ordinating Development
As each tool works independently, we both worked on different tools simultaneously,
updating our log using Google Drive, so we knew what each other was working on. Each
week we shared files and one of us merged them together so we could see each other's
developments and work on the latest version of our app. We both kept change logs,
recording which lines were added on pre existing files, making merging easier.
If one of us came across a problem, we shared our work so both of us could work on the
problem at the same time, sharing which methods we have tried via WhatsApp.

## Challenges Faced
After using the eraser, when the user draws with any other tool, the colour remains white and did not change despite switching colours. We added a function to the colour palette, this.setColour(), which checks what the selected colour is and sets it to fill and stroke. We called this in the selectTool function in toolbox, so the colour selected is reset every time a different tool is selected.

Due to the rgba values being necessary for the highlighter tool, we had to solve how to change the colour value from the string value. When we got it to partially work, we
encountered more problems. Once the highlighter tool was selected, the colour value would not update until we changed colours. Additionally, when going from the highlighter to another tool, the colour reverts back to the colour selected before it was switched when using the highlighter. This was because we wrote the code to convert the values in the colourClick function. As we had similar issues when implementing the eraser, we adopted the same solution and wrote a new function similar to the one in colourClick and called it in the selectTool function in toolbox.

## Self-Evaluation
We feel the app does not have the most intuitive user interface. Whilst the tool icons do make it evident which tool is which, we feel it would be more helpful having the name of the tool appear when hovering over their respective icon. Additionally, when using the tool size slider, there is no indication of what the tool size is. We could have implemented an outline of the tool size which scales with the slider. The eraser could also have an outline, as it is difficult to understand where it will start erasing when used.

Despite the colour palette taking the longest time to fix, it now functions correctly for all tools. Reflecting on the colour palette, because the flood fill tool needed the colour values in an array, we could have just made the colours as objects with the value as an array. With the highlighter needing a different alpha value, we could have pop() the original value and push() the highlighter’s value. Overall, we are highly satisfied with how the project went as all the tools and colours interact as expected. We collaborated well together to fix each other’s code and shared good practices.
