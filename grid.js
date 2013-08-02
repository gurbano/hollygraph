var GRID_BACKGROUND = "white";
var GRID_COLOR = "#555";
var GRID_STROKE = 0.3;
var CELL_SIZE = 20;

function Pointer(grid){
	var self = this;
	this.grid = grid;
	this.init = function(grid) {		
		self.pointer = new Kinetic.Circle({
			x: 0,
			y: 0,
			width: 3,
			height: 3,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 1,
			radius: 6,
			opacity: 0.3
		});
		GLOBALS.bind('click', self.pointer, self);		
		GLOBALS.bind('mousemove',this.grid.backRect,self);		
		//this.grid.layer.add(self.pointer);				
		return self;
	};
	return self;
}
function Grid(stage,layer) {
	var self = this;
	this.CELL_SIZE = CELL_SIZE;
	this._w = stage.getWidth() / this.CELL_SIZE;
	this._h = stage.getHeight() / this.CELL_SIZE;
	this.W = this._w * CELL_SIZE;
	this.H = this._h * CELL_SIZE;	
	this.layer = layer;
	this.snapObject = function(obj){
		var pos = obj.getPosition();
		pos = this.snapToGrid(pos.x,pos.y);
		obj.setPosition(pos.x,pos.y);
	}
	this.snapToGrid = function(x,y){
		var rx = Math.round(x / this.CELL_SIZE)*this.CELL_SIZE;
		var ry = Math.round(y / this.CELL_SIZE)*this.CELL_SIZE;
		return new Point(rx,ry);
	}
	this.backRect = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: this.W,
		height: this.H,
		fill: GRID_BACKGROUND,
		opacity:0
	});
	
	/*ADDING LINES*/
	for (i = 0; i < this._w + 1; i++) {
		var I = i * this.CELL_SIZE;
		var l = new Kinetic.Line({
			stroke: GRID_COLOR,
			points: [I, 0, I, this.H],
			strokeWidth: GRID_STROKE
		});
		this.layer.add(l);
	}

	for (j = 0; j < this._h + 1; j++) {
		var J = j * this.CELL_SIZE;
		var l2 = new Kinetic.Line({
			stroke: GRID_COLOR,
			points: [0, J, this.W, J],
			strokeWidth: GRID_STROKE
		});
		this.layer.add(l2);
	}	
	this.layer.add(this.backRect);	
	this.pointer = new Pointer(this).init();
	
	return self; //to attach mouseover listener
};






