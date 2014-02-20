var MediaSilo = MediaSilo || {};
var MediaSiloAnalytics = (function () {

	// Thanks to: https://github.com/robertodecurnex/J50Npi
	var J50Npi = {  
	    currentScript: null,  
	    getJSON: function(url, data, callback) {

	      var src = url + (url.indexOf("?")+1 ? "&" : "?");
	      var head = document.getElementsByTagName("head")[0];
	      var newScript = document.createElement("script");
	      var params = [];
	      var param_name = ""

	      this.success = callback || function(){};

	      data["_ms_callback"] = "MediaSiloAnalytics.J50Npi.success";
	      for(param_name in data){  
	          params.push(param_name + "=" + encodeURIComponent(data[param_name]));  
	      }
	      src += params.join("&")

	      newScript.type = "text/javascript";  
	      newScript.src = src;

	      if(this.currentScript) {
	        head.removeChild(this.currentScript);
	      }
	      head.appendChild(newScript); 
	      this.currentScript = newScript;
	    },
	    success: null
	}; 

	var sendEvent = function(eventName, data) {
		var url = "http://localhost:8013/v3/analytics/event";
		var data = data || {};
		data["_ms_host"] = window.location.host; 
		data["_ms_path"] = window.location.pathname;
		data["_ms_eventType"] = eventName;
		J50Npi.getJSON(url, data);
		
	}

	track = function(eventName, body) { sendEvent(eventName, body); }

	return {
		track: track,
		J50Npi : J50Npi
	};

}(MediaSiloAnalytics || {}));

// Track event for each time the page is loaded
MediaSiloAnalytics.track("pageLoad");