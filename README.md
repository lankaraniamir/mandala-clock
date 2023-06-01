# [Mandala Clock](https://lankaraniamir.github.io/mandala-clock/)
Abstract clock measuring hours in number of colors, minutes in number of shape points, and seconds in number of occurences of the shape

![alt text](https://github.com/lankaraniamir/mandala-clock/blob/main/example_image_a.jpg?raw=true)
## Hours
  - Number of colors used in the visualizer from 1 to 12
  - Each color is easily seen as a distinct shape in the corners of the page
  - Colors are chosen at random but cannot be too similar to each other
  - First color will be the opposite color as the background
  - PM: white background;  AM: black background

## Minutes
  - Number of protruding points in the current shape
  - Starts at 1 point when there's 0 minutes in the hour and increases by one each hour
  - At 0 minutes, it's a circle. At 1 minute, it's a line. At 2 minutes, it's a triangle. At 3 minutes, it's a square. And so on continuing into star-like
shapes up to 60 protruding points
  - Protruding points are used so that the edges are easily countable and shapes are more distinct between minutes

## Seconds
  - number of distinct occurences of the current shape throughout the whole visual
  - every 15 seconds, a less protruding shape with the same number of protruding points will arise with the same color as the background. This makes it easier to approximate the number of seconds

## Other Details
  - Since primality reflects disctiveness, protrusions are created by drawing a line between points in the original shape where we skip a number of points for each line equivalent to the coprime of the total points and half the number of points resulting in undulations with uniqueness. If the shape has no coprime with its half, this indicates uniqueness so each point is represented in normal order but if they share general shape patterns with prior minutes so a larger skip is needed to create a unique shape. By only filling in the center, we ultimately get the final shape. For more info, see the code.
  - The less protruding version of the shape will find the highest coprime of 1 below the highest coprime found priorly and the total number of points resulting in a significantly smaller skip and consequently, less protrusion. If the prior skip was already 0 or 1, this results in this shape becoming a circle.
  - The shape constantly rotates in a layered fashion. Each shape starting on the outer layer rotates an additional time based upon the rotations of all prior layers resulting in a slow rotation in the outer layers and a fast rotation in the inner layers. Furthermore, as the number of layers increase the rotation speed of inner layers also increases. This rotation is rapidly sped up every 15 seconds resulting in a jump in spin speed between sets of 15
