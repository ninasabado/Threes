# Threes
**by Nina Sabado**

*An adaptation of the popular game Threes. Currently in command-line JS, considering eventually creating some HTML/CSS for it.*


**RUNNING THE GAME:**
I ran the game via Node.js, which had already been installed on my system from a previous JavaScript class I took. It has a really great I/O that I liked.

Via command line, input the arguments in this order:
````
$ node threes [# of rows] [# of columns] [% of board filled]
````
The final argument (````[% of board filled]````) is optional. If the program doesn't detect a value for this, then it will automatically use 50%.


**INSTRUCTIONS:**

````
COMMAND   | ACTION   
* Configuration  
  prob    | Change the probability of tiles being filled
  show	  | Prints out the current grid
  reset   | Reset the game
  quit    | Exit the game                                 
* Movement          
  left    | Go left   
  right   | Go right  
  up      | Go up     
  down    | Go down   
````
*NOTE:*
Threes can only currently combine values at the edges, but I'm looking to change this soon.


**ABOUT THE CODE**

````
VARIABLES:
   score	Keeps track of the total value of numbers combined
   moves	Keeps track of the total number of moves made

   leftable, rightable, uppable, downable
   These four variables keep track of whether it's possible to move or not.
   (If all four are false, then it signals the GAME OVER).

OBJECTS & INTERNAL FUNCTIONS
   
1. Square Object
   A tile object, that only contains a value.
   Integers could have been used instead, but for further ease of adaptation later,
   I chose to make this an object.
   
   INT. VARIABLES: val

2. Table Object
   The game object, that contains a grid of Squares based on user-provided X, Y and % values.
   
   INT. VARIABLES: row, col, per (ie. percentage), grid (ie. the array of Squares)
   
   INT. FUNCTIONS:
   print()	Prints out the table object in the correct format
   newSq()	Outputs a new square based on the percentage provided
   check()	Given two squares, checks to see if they're mergeable
   
   hShift()	Given a start/stop value, shifts grid left or right (horizontally)
   vShift() Given a start/stop value, shifts grid up or down (vertically)
   
   left()	Moves grid left
   right()	Moves grid right
   up()		Moves grid up
   down()	Moves grid down

   halp()	Prints out instuctions
   done()	Ends the program

````