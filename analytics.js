$( document ).ready(function () {
	
	var sendEvent = function(eventName, body) {
		$.ajax({
			url: _msAnalyticsEndpoint+'?'+eventName,
			type : 'get',
			dataType: 'jsonp',
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

	sendEvent("pageLoad");
});
