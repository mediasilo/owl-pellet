$( document ).ready(function () {
	
	var sendEvent = function(eventName, body) {
		$.ajax({
			url: 'http://localhost:8013/v3/analytics/event?eventType='+eventName,
			type : 'get',
			dataType: 'jsonp',
			beforeSend: function (request)
		    {
		        request.setRequestHeader("Authorization", "Basic dXNlcjp1c2Vy");
		        request.setRequestHeader("MediaSiloHostContext", "cloudcompanion");
		    },
			success: function(o){
				console.log(o);
			}
        });
	}

	_msAnalytics = {
		track: function(eventName, body) {
			sendEvent(eventName, body);
		}
	}

	sendEvent("quicklink.pageLoad");
});
