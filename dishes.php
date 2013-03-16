<?php

	$dishes = "";
	
	if(isset($_POST["dishData"])){
		$dishes = $_POST["dishData"];
	}
	session_start();
	// if there is a session variable for this dishes
	if(isset($_SESSION['allDishes'])){
		$d = $_SESSION['allDishes'];
		// and our variable came empty , we update our local variable
		if($dishes == ""){	
			$dishes = $d;
		}
		// else , if our local variable is not empty, but it differ from the session variable
		// that means our variable will be added to the list of dishes
		else if($d != $dishes){
			$d = $d. "|" .$dishes;
			$dishes = $d;
			$_SESSION['allDishes']=$dishes;
		}
	}
	// else, if this variable is not set, we set it
	else{
		// store session data
		$_SESSION['allDishes']=$dishes;
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
	
	<body class="metrouicss" style="text-align:center" >
	
		<input type='hidden' id='hiddenData' value="<?php echo $dishes ?>" />
		
		<script>
			var text = document.getElementById("hiddenData").value;
			alert(text);
		</script>
		
		
		<div class="page" >
			<div class="page-header">
				<div class="page-header-content">
					<h1> Welcome to Ayuveda </h1>
				</div>
			</div>
			
			<div class="page secondary with-sidebar">
				<div class="page-header">
					<div class="page-header-content" style="margin-bottom:20px">
						<h1 class="fg-color-red">Dishes</h1>
					</div>
				</div>

				 <div class="page-sidebar" style="margin-right:20px">
					<ul>
						<li class="sticker sticker-color-orange">
							<a href = "index.php" >About us</a>
						</li>
						<li class="sticker sticker-color-green">
							<a href="ingredients.php">Ingredients</a>
						</li>
						<li class="sticker sticker-color-red bg-color-red" >
							<a style="color:white">Dishes</a>
						</li>
					</ul>
				</div>
				<div class="page-region">
					<div class="page-region-content">
						<div class="span10">
							<ul class="listview">
								<li class="bg-color-pinkDark fg-color-white">
									<div class="icon">
										<img src="images/onenote2013icon.png" />
									</div>

									<div class="data">
										<h4 class="fg-color-white">Friptura</h4>
										<div class="static-rating small">
											<div class="rating-value" style="width: 75%"></div>
										</div>
										<p>1 RUB</p>
									</div>
								</li>

								<li>
									<div class="icon">
										<img src="images/excel2013icon.png" />
									</div>

									<div class="data">
										<h4>Excel 2013</h4>
										<div class="static-rating small">
											<div class="rating-value" style="width: 75%"></div>
										</div>
										<p>1 RUB</p>
									</div>
								</li>

								<li class="selected">
									<div class="icon">
										<img src="images/word2013icon.png" />
									</div>

									<div class="data">
										<h4>Word 2013</h4>
										<div class="static-rating small">
											<div class="rating-value" style="width: 75%"></div>
										</div>
										<p>1 RUB</p>
									</div>
								</li>

								<li>
									<div class="icon">
										<img src="images/firefox.png" />
									</div>

									<div class="data">
										<h4>Firefox</h4>
										<div class="progress-bar">
											<div class="bar" style="width: 75%"></div>
										</div>
										<p>Download...</p>
									</div>
								</li>
							</ul>
						</div>
						
					</div>
				</div>
			</div>
		</div>
		

		
		
	<!--	<div class="app-bar">
			
		</div>
		-->
	</body>

</html>