# WebGl Work

### Purpose

I attached some code that I wrote in Javascript using WebGL to demonstrate my knowledge of computer graphics. Here are some simple renderings. 

### Renderings

To see each rendering, clone the repository and click on the html files, which will fire up on your browser with the desired rendering. The corresponding js file holds the WebGL code that renders each item.

#### colors.html
A program that displays a triangle and presents the following rendering options to the user. The
display of the triangle’s boundary and interior can be toggled. The RGB color of each vertex can be set
interactively and the user can choose the shading - flat or interpolated - for the boundary and for the
interior. Choosing flat shading sets the color of all vertices equal to that of the first vertex.

#### tetrix.html
The tetrix is the 3D version of the Sierpinski triangle and is also referred to as the Sierpinski tetrahedron. 
This program allows you to render the tetrix at a specified recursion level. The rendered tetrix is animated and is continuously rotating about an axis. The user can toggle between rotation about the x, y, or z axis.

#### galore.html
A program that interactively draws triangles and
quadrilaterals. The program draws a point at the location
of each mouse click. It supports two modes – triangle mode
(default) and quad mode. In triangle mode, every 3 consecutive points are drawn as a triangle. In quad mode, every 4
consecutive points are drawn as a quadrilateral. Each drawn
shape is assigned a different color assigned randomly.
Furthermore, the following interaction is supported.
– Pressing r or R clears the screen and resets to default.
– Pressing t or T toggles between the drawing modes.

#### reflex.html
A game to test the user’s reflexes. The player has to click on a polygon that appear for a brief
period at a random location. After a fixed inerval the polygon disappears and reappears at another
location. If the user clicks inside the polygon before it disappears, her score increases, and the polygon
disappears and reappears at another location. If she clicks on a blank location, e.g. the polygon there
has already disappeared, her score decreases. If she has not clicked at all for three concescutive polygons,
her score decreases. The player starts the game with a score of 0 and the game ends when her score
becomes negative.
