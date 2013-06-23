
<?php
	require("Data.class.php");
	
	// we start the session
	session_start();
	
	$d = new Data();
	$d->getContent();
	// store session data
	$_SESSION['data']=$d;
	
	// we print the first item from the data
	//echo $d->allIngredients[0];
?>
<html lang="en">

	<head>
		<link href="css/modern.css" rel="stylesheet">
		<link href="css/modern-responsive.css" rel="stylesheet">
		<link href="css/site.css" rel="stylesheet" type="text/css">
		<link href="js/google-code-prettify/prettify.css" rel="stylesheet" type="text/css">

		<script type="text/javascript" src="js/assets/jquery-1.9.0.min.js"></script>
		<script type="text/javascript" src="js/assets/jquery.mousewheel.min.js"></script>

		<script type="text/javascript" src="js/modern/dropdown.js"></script>
		<script type="text/javascript" src="js/modern/accordion.js"></script>
		<script type="text/javascript" src="js/modern/buttonset.js"></script>
		<script type="text/javascript" src="js/modern/carousel.js"></script>
		<script type="text/javascript" src="js/modern/input-control.js"></script>
		<script type="text/javascript" src="js/modern/pagecontrol.js"></script>
		<script type="text/javascript" src="js/modern/rating.js"></script>
		<script type="text/javascript" src="js/modern/slider.js"></script>
		<script type="text/javascript" src="js/modern/tile-slider.js"></script>
		<script type="text/javascript" src="js/modern/tile-drag.js"></script>
		<script type="text/javascript" src="js/modern/calendar.js"></script>

	</head>
	
	<body class="metrouicss" style="text-align:center" >
	
		<div style="float:left ; margin-top:190px ; height:300px; margin-left:20px"
		id="navigationMenu">
			<p >Navigation Menu</p>
			<div class="page-sidebar" style="margin-right:10px;width:120px">
				<ul>
					<li class="sticker sticker-color-orange" style="background-color:orange">
						<form id="indexForm" method="post" action="index.php">
							<input type="hidden" name="indexData" id="indexData" />
							<a style="color:white">Why Ayuveda</a>
						</form>
					</li>
					<li class="sticker sticker-color-green" >
						<a href="ingredients.php" >Create menu</a>
					</li>
					<li class="sticker sticker-color-blue" >
						<a href="team.php" >Our team</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="page" style="display:inline-block;*display: inline;*zoom: 1">
			<div class="page-header">
				<div class="page-header-content" style="width:800px">
					<span> 
						<h1> Welcome to</h1>
					</span>
					<span style="float:right;margin-top:40px;margin-right:250px">
						<img src = "images/logo3.png" />
					</span>
				</div>
			</div>
			
			<div class="page secondary" style="height:430px">
				<div class="page-header">
					<div class="page-header-content" style="margin-bottom:20px">
						<h1 class="fg-color-orange">Why<small>Ayuveda</small></h1>
					</div>
				</div>
				<div class="page-region">
					<div class="page-region-content">

						<div class="span5">
							<div class="carousel span5" style="height: 300px;width : 600px" data-role="carousel" data-param-effect="slide" data-param-direction="left" data-param-duration="2000" data-param-period="4000">
								<div class="slides">
									<div class="slide image" id="slide1">
										<img src="images/1.jpg" />
									</div>
									<div class="slide image" id="slide2">
										<img src="images/2.jpg" />
									</div>
									<div class="slide image" id="slide3">
										<img src="images/3.jpg" />
									</div>
								</div>


								<span class="control left bg-color-blue">&#8249;</span>
								<span class="control right bg-color-blue">&#8250;</span>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</body>
	

</html>
