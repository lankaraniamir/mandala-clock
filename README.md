# Pointy-Clock-Visualizer
Simple program representing a clock abstractly. To see visualizer, go to its github 
page found on right sidebar. To run locally, download the folder and open index.html 
on your browser.

The hour is represented by the number of colors in the visualizer (easily
visualizable by the number of shapes in the corner representing each color
used). If the background is white, it's P.M., and if it's black, it's P.M. The
colors are chosen at random with some amount of distinction required. However,
the first color will always be the opposite color as the background.

The minute is represented by the number of outward points in the current expanding
shape, starting at 1 point when there's 0 minutes in the hour. In other words,
at 0 minutes, it's a circle. At 1 minute, it' a line. At 2 minutes, it's a
triangle. At 3 minutes, it's a square. And so on continuing into star-like
shapes up to 60 outward points that make the edge easily countable.

The number of seconds is represented by the number of occurences of the shape
within the outer shape. Every 15 seconds, a less inwardly pointy version of the
shape (or in some cases, a circle) will appear in the same color as the background
making it easy to approximate how many seconds have occurred.
