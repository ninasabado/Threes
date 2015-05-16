/* The THREES Game 
 * An application in JS
 * by Nina Sabado
*/

/* Defines Square object */
function Square(val){
	this.value = val;
}

/* Defines Table object */
function Table(ex, why){
	if(ex && why){
		this.x = ex;
		this.y = why;
		this.grid = [];
		//this.max = (x*y)-1;
		for(var i = 0; i < this.x*this.y; i++){
			this.grid.push(new Square(Math.floor(Math.random()*3)));
			//console.log("Pushed new SQUARE [" + this.grid[i].value + "]");
		}
	}
	else
		
	
}

// Prints it in row x column format
Table.prototype.print = function(){
	var indx = 0;
	var string = "";
	for(var i = 0; i < this.y; i++){
		for(var j = 0; j < this.x; j++){
			string += "[ " + this.grid[indx++].value + " ]";
		}
		string += "\n";
	}
	console.log(string);
}

/* Takes in user's variables */
var user_x = +process.argv[2];
var user_y = +process.argv[3];

console.log("When you take the arguments, you get x as " + user_x + " and y as " + user_y);
console.log("Let's take some randomly generated numbers:");

thisTable = new Table(user_x, user_y);
thisTable.print();