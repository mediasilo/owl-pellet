owl-pellet
==========

MediaSilo Analytics Snippet

#### Install

    bower install owl-pellet
    
#### Usage

    <html>
        <head>
	          <script type="text/javascript" src="http://code.jquery.com/jquery-2.1.0.min.js"></script>
	          <!-- Include analytics.js to get pageLoad track events for free -->
	          <script type="text/javascript" src="analytics.js"></script>
        </head>
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
    </html>
