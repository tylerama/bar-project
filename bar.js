// Line
function Line()	{
	// Line members

	this.queue = [];

};

Line.prototype.join = function(patron) {
	// add patron to the list.

	// do some checks here, like is valid patron, patron not in queue already.
	this.queue.push(patron);

};


Line.prototype.leave = function(patron) {
	// remove patron from the list.

	// do some checks here, like is valid patron, is patron in queue.
	
	
	// This is used to find the position of the patron in the array
	var position = this.queue.indexOf(patron);
	
	if (position >=0) {
		// This splices at and to the indexed position of the patron
		this.queue.splice(position,1);
	}

};

Line.prototype.count = function() {
	return this.queue.length;
};

//---------------------------------------------------------------------------------------------------------

// Patron
function Patron(name,age)	{
	this.name = name;
	this.age = age;
	this.wristband;
	this.drunkLevel = 0;
	this.wallet = 100;
	this.tooDrunk = false;
	this.paid;
};

//---------------------------------------------------------------------------------------------------------

// Doorman
function Doorman(bar) {
	this.bar = bar;
};

// Checking the ID of a patron, would it be better to take the first patron in line?
Doorman.prototype.checkID = function(patron)	{
	if(patron.age >= 19)	{
		patron.wristband = true;
	}
	else	{
		patron.wristband = false;	
	}
};

// Checking to see if the patron is drunk
Doorman.prototype.checkDrunk = function(patron)	{
	// Variable for drunk test
	if(patron.drunkLevel > 20)	{
		patron.tooDrunk = true;
	}
};

// Taking money from the patron
Doorman.prototype.takeMoney = function(patron)	{
	if(patron.wallet >= 5)	{
		patron.wallet -= 5;
		patron.paid = true;
	}
	else	{
		patron.paid = false;
	}
};

// Check to see if full then let in
Doorman.prototype.checkFull = function(patron)    {
    if((this.bar.patronsQueue.queue.length + this.bar.serviceQueue.queue.length) != this.bar.capacity)    {
        console.log("Welcome to " + this.bar.name + ", " + patron.name + ".");
        this.letInside(patron);
    }
    else    {
        console.log("Sorry, " + this.bar.name + " is full.");
    }
};

// Adding patron to the people inside bar
Doorman.prototype.letInside = function(patron)	{
	this.bar.patronsQueue.join(patron);
};


// Process all of the above at one time
Doorman.prototype.processPatron	= function(patron) {
	this.checkID(patron);
	if(patron.wristband === true)	{
		this.checkDrunk(patron);
		if(patron.tooDrunk === false)	{
			this.takeMoney(patron);
			if(patron.paid === true)	{
                		this.checkFull(patron);
			}
			else	{
				// Patron is too broke, can't get in
				console.log("You are too broke and can't come in.");
			}	
		}
		else	{
			// Patron is too drunk, can't get in
			console.log("You are too drunk and can't come in.");
		}
	}
	else	{
		// Patron is too young, can't get in
		console.log("You are too young and can't come in.");
	}
	
};

//---------------------------------------------------------------------------------------------------------

// Bartender
function Bartender(queue)	{
	this.queue = queue;
};

//---------------------------------------------------------------------------------------------------------

// Bar
function Bar(name,capacity)	{
    this.name = name;
    this.capacity = capacity;
    this.entryQueue = new Line();
    this.serviceQueue = new Line();
    this.patronsQueue = new Line();
    this.tender = new Bartender(this.serviceQueue);
    this.door1 = new Doorman(this);
};

Bar.prototype.visitor = function(patron)    {
    	var doorman = this.door1 || this.door2 || new Doorman(this);
	doorman.processPatron(patron);
};


//---------------------------------------------------------------------------------------------------------

var myBar = new Bar("The Couch",10);
var p1 = new Patron("Tyler",26);
var p2 = new Patron("Jessica",24);
var p3 = new Patron("Nathan",22);
var p4 = new Patron("Austin",19);
var p5 = new Patron("Bella", 3);

myBar.visitor(p1);
myBar.visitor(p2);
myBar.visitor(p3);
myBar.visitor(p4);
myBar.visitor(p5);
//---------------------------------------------------------------------------------------------------------