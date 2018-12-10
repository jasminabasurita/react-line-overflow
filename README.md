# React Line Overflow
A simple, mostly css solution to multi-line text overflow

### The Problem:
The natural inclination when faced with multi-line text overflow is to reach for css's `text-overflow: ellipsis`.
Unfortunately this falls short and only works for text with `white-space: nowrap`, or simply put single line text.
A quick web search will reveal many solutions to this problem. Unfortunately with every tool I saw
you lose the advantages of offloading the burden of these calculations to the browsers css engine. These tools generally rely on some form of dynamically truncating the text until a length is found that doesn't overflow.

###### Why this is suboptimal:
This means that each block of text that you wish to have overflow into ellipsis is blocking your javascript thread as it calculates the perfect text length.
😱 All of those resources blocked just to solve a fairly simple problem.

### The Solution:
But css can get us _almost_ all the way there! A simple `overflow: hidden` hides all the extra text. No need to block the thread with calculations of how many characters fit. That leaves us with two issues left:
  - Ensuring that the container height doesn't cut our last line horizontally in half
    - This should be responsive to various fonts to remain accessible to varrying languages.
  - Appending an ellipsis for clarity.

Really all that's needed at this point is to grab the calculated line-height and multiply it by our desired number of lines and float a container with ellipsis over the end of our text block.
