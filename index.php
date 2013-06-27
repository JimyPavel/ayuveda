
<?php
	require("Data.class.php");
	
	// we start the session
	session_start();
	
	$d = new Data();
	$d->getContent();
	// store session data
	$_SESSION['data']=$d;
	
	if(isset($_POST['indexData'])){
		$_SESSION['allDishes'] = $_POST['indexData'];
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
	
	<body id ="body" class="metrouicss" style="text-align:center;overflow:hidden" >
	
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
		
		<div id="statistics"
		style="float:right; margin-top:500px;margin-right:40px;width:340px;height:1200px;text-align:center">
			<p id="s1"> Doctors write 4.02 billion prescriptions in US, every year
			</p>
			
			<p style="display:none" id="s2">
				<br/> <br/><br/> <br/><br/> <br/> 
				This enables the fact that a person takes around 14.000 of pills, most of which when they are elder.
			</p>
			
			<p style="display:none" id="s3">
				<br/> <br/><br/> <br/><br/> <br/>
				We all know the fruits are healthy. That's why, 69 % of the people buy fresh 
				grapefruit, to squeeze or simply eat. 
				But most of them don't know that it is dangerous to combine grapefruit juice when you take some sort of medication
			</p>
			
			<p style="display:none" id="s4">
				<br/> <br/><br/> <br/><br/> <br/>
				There are more than 85 drugs which can interact with this fruit.
			</p>
			
			<p style="display:none" id="s5">
				<br/> <br/><br/> <br/><br/> <br/>
				Drugs can also interact with other drugs. This represent 3-5% of in-hospital medication errors. 
				All this risks can be avoided using Ayuveda.
			</p>
		</div>
		<div class="page" style="display:inline-block;*display: inline;*zoom: 1;width:700px">
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
			
			<div class="page secondary" style="height:430px;width:700px">
				<div class="page-header">
					<div class="page-header-content" style="margin-bottom:20px">
						<h1 class="fg-color-orange">Why<small>Ayuveda</small></h1>
					</div>
				</div>
				<div class="page-region">
					<div class="page-region-content">
						<div class="span7" >
							<div class="carousel span5" style="height: 300px;width : 500px" data-role="carousel" data-param-effect="slide" data-param-direction="left" data-param-duration="2000" data-param-period="4000">
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
									<div class="slide image" id="slide4">
										<img src="images/4.jpg" />
									</div>
									<div class="slide image" id="slide5">
										<img src="images/5.jpg" />
									</div>
									<div class="slide image" id="slide6">
										<img src="images/6.jpg" />
									</div>
									<div class="slide image" id="slide7">
										<img src="images/7.jpg" />
									</div>
									<div class="slide image" id="slide8">
										<img src="images/8.jpg" />
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
		
		<script src="js/index.js"></script>
		
	</body>
	

</html>
