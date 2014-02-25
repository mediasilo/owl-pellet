var MediaSiloAnalytics = MediaSiloAnalytics || {};

MediaSiloAnalytics.Data = (function () {

	var client = new $.es.Client({
	  hosts: 'https://663d46b7f2318eca000.qbox.io', apiVersion : "1.0"
	});


	/**
		Gets the total visits for a given analytics key
	**/
	var totalVisits = function(callback) {
		client.count({
			index: 'analytics',
		  	type: 'event',
		  	body: {
			    "query": {
			        "filtered": {
			            "query": {
			                "match_all": {
			                }
			            },
			            "filter": {
			                "term": { "analyticsKey": _ms_AnalyticsTrackingKey, "type": "pageload" }
			            }
			        }
			    }
			}
		}).then(function (body) {
			callback(body);
		}, function (error) {
		  console.trace(error.message);
		});
	}

	/**
		Gets the most recent events given a start time	
	**/
	var recentEvents = function(startTime, callback) {
		client.search({
			index: 'analytics',
		  	type: 'event',
		  	body: {
			    "query": {
			        "filtered": {
			            "query": {
			                "range" : {
        						"created" : {
            						"gte" : startTime
            					}
            				}
			            },
			            "filter": {
			                "term": { "analyticsKey": _ms_AnalyticsTrackingKey}
			            }
			        }
			    },
			    "sort" : {"created" : "desc"}
			}
		}).then(function (body) {
			callback(body);
		}, function (error) {
		  console.trace(error.message);
		});
	}

	/**
		Lists and aggregates all events over time given a range (Epoch millisecond precision) and an interval (1h, day, week, month)
	**/
	var eventsOverTime = function(interval, startTime, endTime, callback) {
			client.search({
			index: 'analytics',
		  	type: 'event',
		  	body: {
			    "query": {
			        "filtered": {
			            "query": {
			                "range" : {
        						"created" : {
            						"gte" : startTime,
            						"lte" :endTime
            					}
            				}
			            },
			            "filter": {
			                "term": { "analyticsKey": _ms_AnalyticsTrackingKey}
			            }
			        }
			    },
			    "sort" : {"created" : "desc"},
				"aggs" : {
			        "event_types" : {
			            "terms" : { "field" : "type" },
			            "aggs" : {
			                "events_over_time" : {
			                    "date_histogram" : {
			                        "field" : "created",
			                        "interval" : interval
			                    }
			                }
			            }
			        }
		    	}
			}
		}).then(function (body) {
			callback(body);
		}, function (error) {
		  console.trace(error.message);
		});
	}

	return {
		totalVisits : totalVisits,
		recentEvents: recentEvents,
		eventsOverTime : eventsOverTime
	}

}(MediaSiloAnalytics.Data || {}));
