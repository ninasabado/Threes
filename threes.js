/* The THREES Game 
 * An application in JS
 * by Nina Sabado
*/

var score = 0;		// Total value of numbers combined
var moves = 0;		// Total number of moves made

/* SQUARE */

/* SQUARE Object
 * Defines Square object 
 * Contains: value of square */
function Square(v){
	this.val = v;
}

/* TABLE */

/* TABLE Object
 * Defines Table object */
function Table(ex, why, percentFilled){
	this.per = 0;
	this.row = 0;
	this.col = 0;

	// If x and y values exist, protects against NaN
	if(ex && why ){
		this.row = ex;
		this.col = why;
		this.grid = [];

		// Pushes a new Square object for each grid in the table,
		// instantiating a random number from 0-2
		for(var i = 0; i < this.row*this.col; i++){

			if(percentFilled)
				this.per = percentFilled;	// If percentFilled exists
			else
				this.per = 50;				// Else defaults to 50

			this.grid.push(this.newSq());
		}
	}
}

/* Table.NEWSQ Function
 * Function creates a new Square each time, with value 1 or 2
 * Randomly generates a number from 1-100, success if less than this.per */
Table.prototype.newSq = function(){
	if(Math.floor(Math.random()*100) <= this.per)
		return new Square(Math.floor(Math.random()*2)+1);
	else
		return new Square(0);
}

/* Table.PRINT Function
 * Prints it in row x column format */
Table.prototype.print = function(){
	var indx = 0;
	var string = "";
	for(var j = 0; j < this.row; j++){
		for(var i = 0; i < this.col; i++){
			var v = this.grid[indx++].val;
			if(v < 10)
				string += "[   "+ v + "   ]";
			else if(v < 100)
				string += "[  " + v + "   ]";
			else if(v < 1000)
				string += "[  " + v + "  ]";

		}
		string += "\n";
	}

	console.log("MOVES: " + moves);
	console.log("SCORE: " + score);
	console.log(string);
}

/* CHECK Function
 * Function checks if merging the squares is possible
 * Returns TRUE if possible, FALSE if not */
function check(one, two){
	if((one.val + two.val) == 3)
		return true;
	else if(one.val >= 3 && two.val >= 3 && one.val == two.val)
		return true;
	else
		return false;
}

/* Table.HSHIFT Function 
 * Depending on boolean left, function shifts everything from
   given first square to given last square left or right */
Table.prototype.hShift = function(first, last, left){
	// Shifts everything to the left, starts at the first and increments
	if(left){
		for(var j = first; j != last; j++)
			this.grid[j] = this.grid[j+1];
	}
	// Shifts everything to the right, starts at the last and decrements
	else{
		for(var j = last; j != first; j--)
			this.grid[j] = this.grid[j-1];
	}
	
}

/* Table.VSHIFT Function 
 * Depending on boolean up, function shifts everything from
   given first square to given last square up or down */
Table.prototype.vShift = function(first, last, up){
	if(up){
		for(var j = first; j < last; j+=this.col)
			this.grid[j] = this.grid[j+this.col];
	}
	else{
		for(var j = last; j != first; j-=this.col)
			this.grid[j] = this.grid[j-this.col];
	}
	
}

/* Table.LEFT Function
 * If leftmost square is 0, shifts everything left
 * If leftmost two squares are mergeable, merges then shifts
 * CURRENT VERSION: Shifts/merges can only be done near the wall */
Table.prototype.left = function(){
	moves++;
	
	// Checks the leftmost squares
	for(var i = 0; i < this.grid.length; i+=this.col){
		var first = i;					// Index of first in row
		var last  = i + (this.col-1);	// Index of last in row
		var bool  = true;

		// Check 1: Leftmost square is 0
		if(this.grid[first].val == 0){
			this.hShift(first, last, bool);
			this.grid[last] = this.newSq();
		}

		// Check 2: Leftmost square is NOT 0, but ends are mergeable
		else if(i+1 != this.grid.length 
			&& check(this.grid[first], this.grid[first+1])){
			score += (this.grid[first].val += this.grid[first+1].val);
			this.hShift(first+1, last, bool);
			this.grid[last] = this.newSq();
		}
	}

	console.log("\nYou moved LEFT:");
	this.print();
}

/* Table.RIGHT Function
 * If rightmost square is 0, shifts everything right
 * If rightmost two squares are mergeable, merges then shifts
 * CURRENT VERSION: Shifts/merges can only be done near the wall */
 Table.prototype.right = function(){
 	moves++;
	
	// Checks the rightmost squares
	for(var i = this.col-1; i < this.grid.length; i+=this.col){
		var first = i - (this.col-1);	// Index of first in row
		var last  = i;					// Index of last in row
		var bool  = false;

		// Check 1: Rightmost square is 0
		if(this.grid[last].val == 0){
			this.hShift(first, last, bool);
			this.grid[first] = this.newSq();
		}

		// Check 2: Rightmost square is NOT 0 but ends are mergeable
		else if(i != this.grid.length 
			&& check(this.grid[last], this.grid[last-1])){
			score += (this.grid[last].val += this.grid[last-1].val);
			this.hShift(first, last-1, bool);
			this.grid[first] = this.newSq();
		}
	}

	console.log("\nYou moved RIGHT:");
	this.print();
}

/* Table.UP Function
 * If topmost square is 0, shifts everything up
 * If topmost two squares are mergeable, merges then shifts
 * CURRENT VERSION: Shifts/merges can only be done near the wall */
 Table.prototype.up = function(){
 	moves++;

 	// Checks the topmost squares
 	for(var i = 0; i < this.col; i++){
 		var first = i;								// Index of top in column
		var last  = i+(this.col*(this.row-1));		// Index of last in column
		var bool  = true;

 		// Check 1: Topmost square is 0
 		if(this.grid[first].val == 0){
 			this.vShift(first, last, bool);
 			this.grid[last] = this.newSq();
  		}

 		// Check 2: Topmost square is NOT 0 but tops are mergeable
 		if(check(this.grid[first], this.grid[first+this.col])){
 			score += (this.grid[first].val += this.grid[first+this.col].val);
 			this.vShift(first+this.col, last, bool);
 			this.grid[last] = this.newSq();
 		}
 	}

 	console.log("\nYou moved UP:");
 	this.print();
 }

 /* Table.DOWN Function
 * If bottommost square is 0, shifts everything down
 * If bottommost two squares are mergeable, merges then shifts
 * CURRENT VERSION: Shifts/merges can only be done near the wall */
 Table.prototype.down = function(){
 	moves++;

 	// Checks the topmost squares
 	for(var i = 0; i < this.col; i++){
 		var first = i;								// Index of top in column
		var last  = i+(this.col*(this.row-1));		// Index of last in column
		var bool  = false;

 		// Check 1: Bottommost square is 0
 		if(this.grid[last].val == 0){
 			this.vShift(first, last, bool);
 			this.grid[first] = this.newSq();
  		}

 		// Check 2: Bottommost square is NOT 0 but bottoms are mergeable
 		if(check(this.grid[last], this.grid[last-this.col])){
 			score += (this.grid[last].val += this.grid[last-this.col].val);
 			this.vShift(first, last-this.col, bool);
 			this.grid[first] = this.newSq();
 		}
 	}

 	console.log("\nYou moved DOWN:");
 	this.print();
 }

/* Takes in user's variables */
var i;
// Just in case Node.js isn't used
for(i = 0; i < +process.argv.length; i++){
	if(+process.argv[i].indexOf("threes") > 1)
		break;
}
var user_x = 	+process.argv[++i];
var user_y = 	+process.argv[++i];
var user_perc = +process.argv[++i];


/* INTRO */
game = new Table(user_x, user_y, user_perc);
console.log("\nWelcome to THREES by Nina Sabado."
	+ "\nIf you're not sure what to do, don't be afraid to ask for HELP!\n");
game.print();

/* HELP */
function halp(){
	console.log("\nINSTRUCTIONS:"
	+ "\nCOMMAND\t\tACTION"
	+ "\n* Configuration"
	+ "\n  prob\t\tChange the probability of square being filled"
	+ "\n  reset\t\tReset the game"
	+ "\n  quit\t\tExit the game"
	+ "\n* Movement"
	+ "\n  left\t\tGo left"
	+ "\n  right\t\tGo right"
	+ "\n  up\t\tGo up"
	+ "\n  down\t\tGo down");
}

/* STANDARD INPUT
 * Code adapted from https://docs.nodejitsu.com/ */
process.stdin.resume();
  process.stdin.setEncoding("utf8");
  var util = require("util");
  var expectInt = false;

  process.stdin.on("data", function (text) {
    text = text.substring( 0, text.indexOf("\r\n"));	// Chops off \r\n
    
    // Ensures that a random typed integer wouldn't screw up the code
    if(expectInt){
    	var x = parseInt(text);
    	if(!isNaN(text) && (x|0)==x)
    		game.per = x;
    	else
    		console.log("That's not in the right format, sorry.")
    	expectInt = false;
    }

    // Other commands
    else{
    	switch(text){
    	case "HELP":
    		halp();
    		break;
    	case "prob":
    		console.log("\nWhat % would you like to change it to?");
    		console.log("(Please input the integer only)");
    		expectInt = true;
    		break;
    	case "reset":
    		game = new Table(user_x, user_y, game.per);
    		moves = score = 0;
    		console.log("\nYou've reset the game.")
    		game.print();
    		break;
    	case "quit":
    		done();
    		break;

    	case "left":
    		game.left();
    		break;
    	case "right":
    		game.right();
    		break;
    	case "up":
    		game.up();
    		break;
    	case "down":
    		game.down();
    		break;

    	default:
    		console.log("\nSorry, I don't recognize that command."
    			+"\nIf you're confused, please type HELP for the instructions.");
    	}
    }
  });

  function done() {
    console.log("\nThanks for playing THREES by Nina Sabado! Hope to see you again soon.");
    process.exit();
  }
