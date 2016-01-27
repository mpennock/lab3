
// link to connect module
var connect = require('connect');

// link to the url module to access url
var url = require('url');

// create new app using connect
var app = connect();


var calculateIt = function(req, res, next) {
	// get the mthod and values from the query string
	var qs = url.parse(req.url, true).query;

	// get the method from the querystring
	var method;

	// determine the method and assign it the appropriate operator symbol
	// note this is a string and can't be used as an actual operator
	if (qs.method == 'add') {
		method = '+';
	}
	else if (qs.method == 'subtract') {
		method = '-';
	}
	else if (qs.method == 'multiply') {
		method = '*';
	}
	else if (qs.method == 'divide') {
		method = '/';
	}
	// if method does not equal any of the above, it is invalid
	else {
		method = 'invalid';
	}

	// math funstions to get our totals
	var addition = function(val1, val2) {
		// takes in two values and converts them to integers
		val1 = parseInt(val1, 10);
		val2 = parseInt(val2, 10);
		// returns the two values added together
		return val1+val2;
	};

	// and we do essentially the same thing for each math operator
	var subtraction = function(val1, val2) {
		val1 = parseInt(val1, 10);
		val2 = parseInt(val2, 10);
		return val1-val2;
	};

	var multiplication = function(val1, val2) {
		val1 = parseInt(val1, 10);
		val2 = parseInt(val2, 10);
		return val1*val2;
	};

	var division = function(val1, val2) {
		val1 = parseInt(val1, 10);
		val2 = parseInt(val2, 10);
		return (val1) / (val2);
	};

	// get the x value (first value)
	var x = qs.x;

	// and get the y value (second value)
	var y = qs.y;

	res.writeHead(200, {
        "Content-Type": "text-plain"
    });

	var total

	if (method == '+') {
		total = addition(x,y);
	} 
	else if (method == '-') {
		total = subtraction(x,y);
	}
	else if (method == '*') {
		total = multiplication(x,y);
	}
	else if (method == '/') {
		total = division(x,y);
	}
	else {
		total = null;
	}

	var message

	if (method != 'invalid') {
		message = (x + ' ' + method + ' ' + y + ' = ' + total);
	}
	else {
		message = 'ERROR. Please use a valid method';
	}

    res.write(message);
    res.end();

};

app.use('/lab3', calculateIt);

// listen for events
app.listen(3000);
console.log('connect app running at http://localhost:3000');