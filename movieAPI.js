
function MovieApi(){
	var self = this;
	this.version = 3;
	this.baseURL = "http://api.themoviedb.org/"+self.version+"/";
	this.api_key = 'ae05f7ad3e6e9a2047229b85a70b8fb7';
	this.token = null; //token.request_token, token.success, token.expires_at
	this.requestNewToken = function(callback){
		var params = {};
		params.api_key = 'ae05f7ad3e6e9a2047229b85a70b8fb7';
		$.ajax({
			url: self.baseURL + "authentication/token/new",
			data: params,
			success: callback,
			dataType: 'JSON'		
		});
	}
	//Search cast
	this.searchCast = function(params,callback){
		self.encapsulateRequest(params,function(params){
			$.ajax({
				url: self.baseURL + "search/person",
				data: params,
				success: callback,
				dataType: 'JSON'		
			});			
		})	
	}
	this.searchMovie = function(params,callback){
		self.encapsulateRequest(params,function(params){
			$.ajax({
				url: self.baseURL + "search/movie",
				data: params,
				success: callback,
				dataType: 'JSON'		
			});			
		})	
	}
	//Get cast
	this.getCast = function(params,callback){
		self.encapsulateRequest(params,function(params){
			$.ajax({
				url: self.baseURL + "person/"+params.id,
				data: params,//api_key, append_to_response=credits
				success: callback,
				dataType: 'JSON'		
			});			
		})	
	}
	//Get movie
	this.getMovie = function(params,callback){
		self.encapsulateRequest(params,function(params){
			$.ajax({
				url: self.baseURL + "movie/"+params.id,
				data: params,//api_key, append_to_response=credits
				success: callback,
				dataType: 'JSON'		
			});			
		})	
	}
	this.encapsulateRequest = function(params, callback){
		if (params.query){params.query = '*'+params.query+'*';}
		if (!self.token){
			self.requestNewToken(function(data){
				self.token = data;
				params.request_token = self.token.request_token;
				params.api_key = self.api_key;
				callback(params);			
			})
		}else{
			params.request_token = self.token.request_token;
			params.api_key = self.api_key;
			callback(params);
		}
		
	}
	//this.searchCast({query:'Sylvester Stallone'},function(data){
	//	console.info(data);
	//});
}