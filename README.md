owl-pellet
==========

MediaSilo Analytics Snippet

#### Install

    bower install owl-pellet
    
    
#### Set Tracking Key and Include JS
    <head>
        <script type="text/javascript">
            _ms_AnalyticsTrackingKey = "10c3a4e0-99be-11e3-a5e2-0800200c9a66";
        </script>
        <script type="text/javascript" src="bower_components/owl-pellet/tracking.js"></script>
    </head>
    
#### Usage


	<body>
		<div><h1>This Page Send Analytics Events On Load ;)</h1></div>
          
		<div class="clickable">It can also send custom events!</div>

		<!-- Use global _msAnalytics to track any event you'd like to -->
  		<script type="text/javascript">
			$(".clickable").on("click", function() {
				_msAnalytics.track("clickable.clicked", null);
			})
		</script>
	</body>
