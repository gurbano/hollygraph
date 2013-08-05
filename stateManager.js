/*! stateManager.js | (c) 2013 g.urbano / www.gurbano.it */
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
	var _self = this;
	this.enter = function(){
		console.info('Enter DefaultState');
		/*when an entity is dragged */
		Entity.prototype.dragend = function(self,event){
			GLOBALS.grid.snapObject(self.obj); //snapped to the grid
			self.forEachSet(function(set,context){set.entityDragged(context);}); //notify each set the entity belongs that the entity has been dragged around. See comment below.
		}
		/*
				a different state could redefine the way each set handle the event:
				eg:
				Set.prototype.entityDragged = function(entity){
					this.forEachLink(function(link,context){
						if (link.connectEntity(entity.id)){
							link.refresh();
						}		
					});
				};
			*/	
		
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
	var _self = this;
	this.set = undefined;
	this.enter = function(params){
		console.info('Enter SetSelectedState', params);
		_self.set = params.set;
		Map.prototype._leftclick = Map.prototype.leftclick;
		Map.prototype.leftclick = function(self,event){			
			$('#modal-form-add-actor').dialog( "open" );		
			$('#actor_name').val('');
			/*add actor*/		
				$(document).off('ACTOR_ADDED').on('ACTOR_ADDED',function(ev,params){
				$(document).off('ACTOR_ADDED'); //Detach listener
				console.info('Actor added',params.item.id);
				_self.set.addActor(params.item.id,event.x,event.y,function(){});
			});		
		};
		Map.prototype.rightclick = function(self,event){			
			$('#modal-form-add-movie').dialog( "open" );		
			$('#movie_name').val('');
			/*add actor*/		
				$(document).off('MOVIE_ADDED').on('MOVIE_ADDED',function(ev,params){
				$(document).off('MOVIE_ADDED'); //Detach listener
				console.info('Movie added',params.item.id);
				_self.set.addMovie(params.item.id,event.x,event.y,function(){});
			});		
		};
		//Entity.prototype.rightclick = function(self,event){self.showMenu();}
		Entity.prototype.leftclick = function(self,event){self.showMenu();}
		Entity.prototype.mouseenter = function(self,event){document.body.style.cursor = 'pointer';}
		Entity.prototype.mouseleave = function(self,event){ document.body.style.cursor = 'default';}
		
	}
	this.exit = function(){
		console.info('Exit SetSelectedState');
		Map.prototype.leftclick = Map.prototype._leftclick;
	}
	this.preventDefault = false;	
}
