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
	if(Math.floor(Math.random()*100) < this.per)
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
			string += "[ " + this.grid[indx++].val + " ]";
		}
		string += "\n";
	}
	console.log(string);
}


/* CHECK Function
 * Function checks if merging the squares is possible
 * Returns TRUE if possible, FALSE if not */
function check(one, two){
	if((one.val + two.val) == 3)
		return true;
	else if(one.val > 2 && two.val > 2 && one.val == two.val)
		return true;
	else
		return false;
}

/* Table.HSHIFT Function 
 * Depending on boolean left, function shifts everything from
   given first square to given last square left or right */
Table.prototype.hShift = function(first, last, left){
	if(left){
		for(var j = first; j < last; j++)
			this.grid[j] = this.grid[j+1];
	}
	else{
		for(var j = last; j != first; j--)
			this.grid[j] = this.grid[j-1];
	}
	
}

/* Table.LEFT Function
 * If leftmost square is 0, shifts everything to the left
 * If leftmost two squares are mergeable, merges then shifts
 * CURRENT VERSION: Shifts/merges can only be done near the wall */
Table.prototype.left = function(){
	
	// Checks the leftmost squares
	for(var i = 0; i < this.grid.length; i+=this.col){
		var first = i;					// Index of first in row
		var last = i + (this.col-1);	// Index of last in row

		// Check 1: Leftmost square is 0
		if(this.grid[first].val == 0){
			this.hShift(first, last, true);
			this.grid[last] = this.newSq();
		}

		// Check 2: Leftmost square is NOT 0
		else if(i+1 != this.grid.length 
			&& check(this.grid[first], this.grid[first+1])){
			this.grid[first].val += this.grid[first+1].val;
			this.hShift(first+1, last, true);
			this.grid[last] = this.newSq();
		}
	}

	console.log("Move to the LEFT:");
	this.print();
}

/* Table.RIGHT Function
 * Shifts all squares in grid to the right - O(N) */
Table.prototype.right = function(){
	
	// Checks the rightmost squares
	for(var i = this.col-1; i < this.grid.length; i+=this.col){
		var first = i - (this.col-1);	// Index of first in row
		var last = i;					// Index of last in row

		// Check 1: Rightmost square is 0
		if(this.grid[last].val == 0){
			this.hShift(first, last, false);
			this.grid[first] = this.newSq();
		}

		// Check 2: Leftmost square is NOT 0
		else if(i != this.grid.length 
			&& check(this.grid[last], this.grid[last-1])){
			this.grid[last].val += this.grid[last-1].val;
			this.hShift(first, last-1, false);
			this.grid[first] = this.newSq();
		}
	}

	console.log("Move to the RIGHT:");
	this.print();
}

/* Takes in user's variables */
var user_x = +process.argv[2];
var user_y = +process.argv[3];
var user_perc = +process.argv[4];

//console.log("When you take the arguments, you get x as " + user_x + " and y as " + user_y);

thisTable = new Table(user_x, user_y, user_perc);
thisTable.print();
thisTable.left();
thisTable.right();