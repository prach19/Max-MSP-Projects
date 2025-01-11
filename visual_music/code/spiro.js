// Max js object setup
autowatch = 1;
inlets = 1;
outlets = 1;

// constants
var TWOPI = 2 * Math.PI;

// global variables
var largeRad = .70;
var smallRad = .15;
var smallRatio = 30;
var renderpts = 1000;
var renderstep = TWOPI / renderpts;


// the bang function renders the current settings into a set
// of vector locations in the ranges of -1.0 thru 1.0
function bang() {
	var x, y;				// calculated dimensions
	var tmp, theta;			// variables for drawing calcs
	var stx, sty;			// variables containing the starting points
	var started = 0;		// 'first time' flag
	
	for (theta=0; theta<TWOPI; theta+=renderstep) {
		// calculate the drawing position
		tmp = theta * smallRatio;
		x = largeRad * Math.cos(theta) + smallRad * Math.cos(tmp);
    	y = largeRad * Math.sin(theta) + smallRad * Math.sin(tmp);

		if (started) {
			// send out the current point
			outlet(0, 'point', x, y);
		} else {
			started = 1;

			// send out the start message along with the
			// first drawing location (the start point)
			outlet(0, 'start', x, y);
			
			// store the start point for later
			stx = x;
			sty = y;
		}
	}
	
	// send out the end message along with the
	// original start point (to complete the drawing)
	outlet(0, 'end', stx, sty);
}
	
// set the radius of the 'large' ring
function setLargeRadius(v) {
	if ((v > 0.01) && (v < 0.99)) {
		largeRad = v;
	}
}

// set the radius of the 'small' ring
function setSmallRadius(v) {
	if ((v > 0.01) && (v < 0.99)) {
		smallRad = v;
	}
}

// set the ratio of small ring rotations
// per large ring rotation
function setThetaRatio(v) {
	if ((v > 1) && (v < (renderpts/2))) {
		smallRatio = v;
	}
}

// set the number of points to render
function setRenderPoints(v) {
	if ((v > 10) && (v < 100000)) {
		renderpts = v;
		renderstep = TWOPI / renderpts;
	}
}
