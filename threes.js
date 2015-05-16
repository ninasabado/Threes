/* The THREES Game 
 * An application in JS
 * by Nina Sabado
*/

var score = 0;		// Total value of numbers combined
var moves = 0;		// Total number of moves made

/* Defines Square object */
function Square(val){
	this.value = val;
}

/* Function creates a new Square each time */
function newSq(){
	return new Square(Math.floor(Math.random()*3));
}

/* Function checks if moving off-grid is possible
 * Returns TRUE if possible, FALSE if not */
function check(one){
	if(one.value == 0)
		return true;
	else
		return false;
}

/* Function checks if merging the squares is possible
 * Returns TRUE if possible, FALSE if not */
function check(one, two){
	if((one.value + two.value) == 3)
		return true;
	else if(((one.value + two.value)%3) == 0)
		return true;
	else
		return false;
}

/* Defines Table object */
/* TO DO FOR LATER:: ACCEPT AN ARGUMENT FOR THE PERCENTAGE OF
TILES INITIALLY FILLED */
function Table(ex, why){
	this.chanceAppear = 50;
	this.x = 0;
	this.y = 0;

	// If existing x AND y arguments
	if(ex && why ){
		this.x = ex;
		this.y = why;
		this.grid = [];

		// Pushes a new Square object for each grid in the table,
		// instantiating a random number from 0-1
		for(var i = 0; i < this.x*this.y; i++){
			this.grid.push(newSq());
			//console.log("Pushed new SQUARE [" + this.grid[i].value + "]");
		}
	}
}

// Prints it in row x column format
Table.prototype.print = function(){
	var indx = 0;
	var string = "";
	for(var j = 0; j < this.x; j++){
		for(var i = 0; i < this.y; i++){
			string += "[ " + this.grid[indx++].value + " ]";
		}
		string += "\n";
	}
	console.log(string);
}

// Shifts all squares in grid to the left
Table.prototype.left = function(){
	console.log("This.x is " + this.x);
	var i = 0;
	//for(var i = 0; i < this.grid.length; i++){
	for(; i < this.grid.length; i+this.x){
		console.log("This.x is " + this.x);
		console.log("i is " + i);
		// if(i%this.x == 0){
		// }
	}
}

/* Takes in user's variables */
var user_x = +process.argv[2];
var user_y = +process.argv[3];

//console.log("When you take the arguments, you get x as " + user_x + " and y as " + user_y);

thisTable = new Table(user_x, user_y);
thisTable.print();
thisTable.left();