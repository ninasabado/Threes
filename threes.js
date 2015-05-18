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

			if(this.per)
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
*/
Table.prototype.hShift = function(start, last, left){
	if(left){
		for(var j = start; j < last; j++)
			this.grid[j] = this.grid[j+1];
	}
	
}

/* Table.LEFT Function
 * Shifts all squares in grid to the left - O(N) */
Table.prototype.left = function(){
	// Checks the leftmost square
	for(var i = 0; i < this.grid.length; i+=this.col){
		
		console.log("Checking Square " + i);

		// Check 1: Leftmost square is 0
		// Function shifts everything over to the left
		if(this.grid[i].val == 0){
			console.log("LEFTMOST SQUARE IS 0, MOVE ALL");
			var last = i + this.col - 1;	// Index of last in row
			this.hShift(i, last, true);
			this.grid[last] = new Square(100);
			this.print();
		}

		// Check 2: Leftmost square is NOT 0
		// Keeps checking the two squares to see if mergeable
		// If non-mergeable, checks the next two until mergeable is
		// found or not moved
		else if(i+1 != this.grid.length && check(this.grid[i], this.grid[i+1])){
			console.log("The two leftmost squares are mergeable");
		}
	}
}

/* Takes in user's variables */
var user_x = +process.argv[2];
var user_y = +process.argv[3];
var user_perc = +process.argv[4];

//console.log("When you take the arguments, you get x as " + user_x + " and y as " + user_y);

thisTable = new Table(user_x, user_y, user_perc);
thisTable.print();
thisTable.left();