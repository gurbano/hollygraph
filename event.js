var EventTypeEnum = {
	MOUSEUP : 'click',
	DRAGSTART : 'dragstart',
	DRAGEND : 'dragend',
	MOUSEMOVE : 'mousemove',
	MOUSEENTER: 'mouseenter',
	MOUSELEAVE: 'mouseleave',
	NULL : 'null'
}
function Event(event){
	var self = this;
	this.type = type;
	this.targetType = targetType;
	this.targetObject = targetObject;
	this.event = event;
}

function EventListener(){
	var self = this;
	this.event = function(eventName, ev, ctx){
		switch(eventName){
			case EventTypeEnum.DRAGEND: 
				dragend(ev,ctx);
				break;
			case EventTypeEnum.MOUSEUP: 
				switch(ev.button){
					case (0):leftclick(ev,ctx);break;
					case (1):middleclick(ev,ctx);break;
					case (2):rightclick(ev,ctx);break;									
				}
				break;
			case EventTypeEnum.MOUSEMOVE: 
				mousemove(ev,ctx);
				break;
			case EventTypeEnum.MOUSEENTER: 
				mouseenter(ev,ctx);
				break;
			case EventTypeEnum.MOUSELEAVE: 
				mouseleave(ev,ctx);
				break;
			default:
				console.warn('unhandled event: ' + eventName, ev, ctx);
				break;
		}
	}		
	return self;
}
GLOBALS.el = new EventListener();
GLOBALS.bind = function(eventName,target,context){target.on(eventName, function(event){GLOBALS.el.event(eventName, event, context);})}


function dragend(event,self){if (self.dragend){self.dragend(self,event);}else{console.warn('unhandled event: ', event, self);}};
function middleclick(event,self){if (self.middleclick){self.middleclick(self,event);}else{console.warn('unhandled event: ', event, self);}};
function leftclick(event,self){if (self.leftclick){self.leftclick(self,event);}else{console.warn('unhandled event: ', event, self);}};
function rightclick(event,self){if (self.rightclick){self.rightclick(self,event);}else{console.warn('unhandled event: ', event, self);}};
function mousemove(event,self){if (self.mousemove){self.mousemove(self,event);}else{console.warn('unhandled event: ', event, self);}};
function mouseenter(event,self){if (self.mouseenter){self.mouseenter(self,event);}else{console.warn('unhandled event: ', event, self);}};
function mouseleave(event,self){if (self.mouseleave){self.mouseleave(self,event);}else{console.warn('unhandled event: ', event, self);}};
