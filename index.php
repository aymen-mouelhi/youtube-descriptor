<!DOCTYPE html>
<html>
<head>
	<meta name="viewport"
	content="user-scalable=no, width=device-width" />
	<link media="screen" type="text/css" href="css/style.css"
	rel="stylesheet">
	<body>
		<div class="card" id="card">
			<div class="user-info">
				<div class="profile-img">
					<img src="https://si0.twimg.com/profile_images/2305966017/t0o8w82d4w6bbiktglyn_normal.jpeg"
					width="48px" height="48px"
					style="-moz-border-radius: 4px;border-radius: 4px;" />
				</div>
				<div class="info">
					<div class="user-name">
						<strong class="fullname">Aymen</strong>
					</div>
					<span class="screenname">@aymen264</span>
					<!-- <div class="time"><?php echo $time; ?>min</div> -->
				</div>
			</div>
			<div class="card-text" id="card-text">Do not say sorry because I am
				hurt. Say sorry because you are hurt.
				http://distillery.s3.amazonaws.com/media/2010/12/01/ec73711d8f7049ac809208de99fdeeb9_7.jpg
				http://www.youtube.com/#/watch?v=8UVNT4wvIGY</div>
				<div class="card-image">
					<img id= "card-thumbnail" style="-moz-border-radius: 4px;border-radius: 4px;max-width:306px;" />
				</div>
				<!-- new way to show card video-->
				<div id="card-video" class="card-video">
					<div class="video-thumbnail" id="video-thumbnail" style="-moz-border-radius: 4px;border-radius: 4px;max-width:306px;">
					</div>
					<div style="padding-left:10px;">
						<div id="video-name">
							Gotye - Somebody that I used to know
						</div>
						<span id="source">Youtube</span>
					</div>
				</div>
				<!-- end of the new way -->
				<div class="time">7:15pm - <span class="date">25 Juin 2012</span></div>
				<div class="tweet-actions">
					<div onclick="return false;" class="tweet-action reply-action" action="reply">
						<i class="icon reply-icon"></i>
					</div>
					<div onclick="return false;" class="tweet-action retweet-action" action="retweet">
						<i class="icon retweet-icon"></i>
						<i class="icon unretweet-icon"></i>
					</div>
					<div onclick="return false;" class="tweet-action favorite-action" action="favorite">
						<i class="icon fav-icon"></i>
						<i class="icon unfav-icon"></i>
					</div>
				</div>
			</div>
			<script type="text/javascript" src="js/jquery.js"></script>
			<script type="text/javascript" src="js/core.js"></script>
		</body>
	</link>
</head>
</html>