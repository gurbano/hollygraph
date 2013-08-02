var StateEnum = {
	DEFAULT: 0,
	START : 1,
	SETSELECTED : 2
}
function StateManager(){
	var self = this;
	this.currentState = StateEnum.START;
	this.defaultState = new DefaultState();
	this.states ={
		1 : new StartState(),
		2 : new SetSelectedState(),		
		
		
		0 : new DefaultState()
	}
	this.changeState = function(newState, params){
		this.states[this.currentState].exit();
		this.currentState = newState;
		if (!this.states[this.currentState].preventDefault){
			this.defaultState.enter();
		}		
		this.states[this.currentState].enter(params);
	}
}

/*EMPTY STATE FOR REFERENCE*/
function EmptyState(){
	var self = this;
	this.enter = function(){}
	this.exit = function(){}
	this.preventDefault = false;
}

/*START STATE*/
function StartState(){
	var self = this;
	this.enter = function(){
		console.info('Enter StartState');
	}
	this.exit = function(){
		console.info('Exit StartState');
	}
	this.preventDefault = false;
}
function DefaultState(){
	var self = this;
	this.enter = function(){
		console.info('Enter DefaultState');
		/*STOP*/
		Entity.prototype.dragend = function(self,event){
			GLOBALS.grid.snapObject(self.obj);
			self.forEachLine(function(line,context){line.entityDragged(context);});
		}
		Entity.prototype.leftclick = function(self,event){};
		/*LINK ANCHOR*/
		LinkAnchor.prototype.dragend = function(self,event){self.link.refresh();} //Redraw the link once the control point is dragged around
		LinkAnchor.prototype.rightclick = function(self,event){self.link.removeAnchor(self);} //Remove the anchor

		/*LINK*/
		Link.prototype.rightclick = function(self,event){self.addAnchor(new LinkAnchor(self,event.layerX,event.layerY),true);}
		Link.prototype.leftclick = function(self,event){self.addAnchor(new LinkAnchor(self,event.layerX,event.layerY),true);}
		Link.prototype.mouseenter = function(self,event){ document.body.style.cursor = 'pointer';}
		Link.prototype.mouseleave = function(self,event){ document.body.style.cursor = 'default';}

		/*POINTER*/
		Pointer.prototype.mousemove = function(self,event){var p = self.grid.snapToGrid(event.layerX,event.layerY);	self.pointer.setPosition(p.x,p.y);}
	}
	this.exit = function(){}
}
/*Set selected*/
function SetSelectedState(){
	var self = this;
	this.enter = function(params){
		console.info('Enter SetSelectedState', params);
		Map.prototype._leftclick = Map.prototype.leftclick;
		Map.prototype.leftclick = function(self,event){
			/*add actor*/		
			GLOBALS.api.searchCast({query:'Sylvester Stallone'},function(err, result){
				if(!err){
					console.info(result);			
				}
			});
			
		
		}
	}
	this.exit = function(){
		console.info('Exit SetSelectedState');
		Map.prototype.leftclick = Map.prototype._leftclick;
	}
	this.preventDefault = false;
	
	
}
