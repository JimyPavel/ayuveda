<?php
	require("Data.class.php");
	
	// we start the session
	session_start();
	
	if(isset($_POST['teamData'])){
		$_SESSION['allDishes'] = $_POST['teamData'];
	}
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
	
	<body id="body" class="metrouicss" style="text-align:center;overflow:hidden" >
		<div style="float:left ; margin-top:190px ; height:300px; margin-left:20px"
		id="navigationMenu">
			<p >Navigation Menu</p>
			<div class="page-sidebar" style="margin-right:10px;width:120px">
				<ul>
					<li class="sticker sticker-color-orange" >
						<form id="indexForm" method="post" action="index.php">
							<input type="hidden" name="indexData" id="indexData" />
							<a href="index.php">Why Ayuveda</a>
						</form>
					</li>
					<li class="sticker sticker-color-green" >
						<a href="ingredients.php" >Create menu</a>
					</li>
					<li class="sticker sticker-color-blue" style="background-color:blue">
						<a style="color:white" href="team.php" >Our team</a>
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
			<div>
				
			</div>
			<div class="page secondary" style="height:430px">
				<div class="page-header">
					<div class="page-header-content" style="margin-bottom:20px">
						<h1 class="fg-color-blue">Our<small>Team</small></h1>
					</div>
				</div>
				<div class="page-region" >
					<div class="page-region-content" >
						<div class="span5" >
							<div class="carousel span5" style="height: 400px;width : 400px" 
							data-role="carousel" data-param-effect="slide" 
							data-param-direction="left" data-param-duration="2000" data-param-period="4000">
								<div class="slides">
									<div class="slide image" id="slide2">
										<img src="images/liliana.jpg" />
									</div>
									<div class="slide image" id="slide4">
										<img src="images/laur.jpg" />
									</div>
									<div class="slide image" id="slide1">
										<img src="images/jimy.jpg" />
									</div>
									<div class="slide image" id="slide4">
										<img src="images/razvan.jpg" />
									</div>
								</div>
								<span class="control left bg-color-blue">&#8249;</span>
								<span class="control right bg-color-blue">&#8250;</span>
							</div>
						</div>
						<div style="margin-top:-400px;margin-left:500px ; position:absolute">
							<p>  University "POLITEHNICA" of Bucharest</p>
							<p> <b>Romania</b></p>
							<p> <i>Imagine Cup project 2013 </i></p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script src="js/index.js" ></script>
	</body>
	
</html>