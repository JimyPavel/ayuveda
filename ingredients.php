<?php

	require("Data.class.php");
	
	// we start the session
	session_start();
	$d = new Data();
	if(isset($_SESSION['data'])){
		$d = $_SESSION['data'];
	}
	else{
		$d->getContent();
		// store session data
		$_SESSION['data']=$d;
	}
	
	$allValues = "";
	$ingreds = $d->allIngredients;
	foreach($ingreds as $val){
		$allValues = $allValues.$val."|";
	}
?>

<html lang="en">
	
	<meta charset="utf-8" />
    <title>Ayuveda</title>
    <link rel="stylesheet" href="css/jquery-ui.css" />
    <script src="js/jquery-1.9.1.js"></script> 
   <!-- <script src="js/jquery-1.7.1.min.js"></script> -->
    <script src="js/jquery-ui.js"></script>
    <link rel="stylesheet" href="/resources/demos/style.css" />
	
	<link href="css/modern.css" rel="stylesheet">
	<link href="css/modern-responsive.css" rel="stylesheet">
	<link href="css/site.css" rel="stylesheet" type="text/css">
	<link href="js/google-code-prettify/prettify.css" rel="stylesheet" type="text/css">

	<script type="text/javascript" src="js/myScript.js"></script>
	<script type="text/javascript" src="js/qrCode.js"></script>
	
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
	
	<script type="text/javascript" src="js/jsPDF/jspdf.js"></script>
	<script type="text/javascript" src="js/jsPDF/FileSaver.js"></script>
	<script type="text/javascript" src="js/jsPDF/BlobBuilder.js"></script>
	<script type="text/javascript" src="jsPDF/jspdf.plugin.from_html.js"></script>
	<script type="text/javascript" src="jsPDF/jspdf.plugin.ie_below_9_shim.js"></script>
	<script type="text/javascript" src="jsPDF/jspdf.plugin.sillysvgrenderer.js"></script>
	<script type="text/javascript" src="jsPDF/jspdf.plugin.split_text_to_size.js"></script>
	<script type="text/javascript" src="jsPDF/jspdf.plugin.standard_fonts_metrics.js"></script>
	
    
</head>
	
	<body class="metrouicss" style="text-align:center" >
		
		<input type='hidden' id='hiddenData' value="<?php echo $allValues ?>" />
		<script>
			var items = new Array();
			var selectedItems = new Array();
			var allDishes = new Array();
			var text = document.getElementById("hiddenData").value;
			var currentExpandedDish = -1;	// no dish is expanded
			var editPanelDim = 0;
			if (text != null && text != "") {
				items = text.split("|");
			}
			
			// autocomplete for the ingredients
		  $(function() {
			var availableTags = items;
			$( "#tags" ).autocomplete({
			  source: availableTags
			});
		  });
		  
		  // autocomplete for dish category
		  var categoryItems = new Array();
		  categoryItems[0] = "Pizza";
		  categoryItems[1] = "Salads";
		  categoryItems[2] = "Appetizers";
		  categoryItems[3] = "Beverages";
		  categoryItems[4] = "Chicken";
		  categoryItems[5] = "Pasta";
		  categoryItems[6] = "Seafood";
		  categoryItems[7] = "Rib/Steaks";
		  categoryItems[8] = "Burger/Sandwiches";
		  categoryItems[9] = "Healty Options";
		  categoryItems[10] = "Desserts";
		  categoryItems[11] = "Drinks";
		  categoryItems[12] = "Other";
		  
		  $(function() {
			var availableTags = categoryItems;
			$( "#category" ).autocomplete({
			  source: availableTags
			});
		  });
		  
	  </script>
	  
		<div style="float:left ; margin-top:190px ; height:300px; margin-left:20px"
		id="navigationMenu">
			<p >Navigation Menu</p>
			<div class="page-sidebar" style="margin-right:10px;width:120px">
				<ul>
					<li class="sticker sticker-color-orange">
						<form id="indexForm" method="post" action="index.php">
							<input type="hidden" name="indexData" id="indexData" />
							<a href = "javascript:{submitForm('indexForm')}">About us</a>
						</form>
					</li>
					<li class="sticker sticker-color-green" style="background-color:green">
						<a style="color:white" >Create menu</a>
					</li>
				</ul>
			</div>
		</div>
		
		<div style="float:right;margin-top:190px; width:200px;height:300px"
		id = "optionsMenu">
			<p >Options Menu</p>
			<div class= "page-sidebar" style="width:150px; margin-left:25px">
				<ul>
					<li>
						<a id="addDishMenu" style="visibility:collapse" 
						href="javascript:{addDish()}"><i class="icon-box-add"></i> Add dish</a>
						<a id="exportPdf" style="visibility:collapse" 
						href="javascript:{exportPDF()}"><i class="icon-download"></i> Export to PDF</a>
						<a id="deleteDish" style="visibility:collapse" 
						href="javascript:{deleteDish()}"><i class="icon-remove"></i> Delete dish</a>
					</li>
				</ul>
			</div>
		</div>
		
		<div class="page" >
			<div class="page-header">
				<div class="page-header-content">
					<h1> Welcome to Ayuveda </h1>
				</div>
			</div>
			
			
			<div class="page secondary bg-color-greenDark" style="height:430px ; margin-top:50px;margin-bottom:50px">
				<div class="page-header">
					<div class="page-header-content" style="margin-bottom:20px">
						<h1 class="fg-color-white">Create menu<small> with your custom dishes</small></h1>
					</div>
				</div>
				<div class="page-region" >
					<div class="page-region-content" >
						<div class="grid" >
							<div class = "row" >
								<div class ="span5" style="margin-left:-60px;margin-right:50px;height:430px" >
									<div class="input-control text" style="margin-bottom:50px">
										<input id="category" 
										onkeypress="appear('div_dishName')" 
										type="text" 
										class="with-helper" placeholder="Enter Category. Eg: Pizza"/>
										<button class="helper"></button>
									</div>
									<div id="div_dishName"
									class="input-control text" 
									style="visibility:collapse;margin-bottom:50px">
										<input id="dishName"
										type="text" 
										onkeypress="appear('div_price')" 
										class="with-helper" placeholder="Enter Dish Name. Eg: Rustic Pizza"/>
										<button class="helper"></button>
									</div>
									<div id="div_price" style="visibility:collapse;margin-bottom:50px"
									onkeypress="appear('div_ingredients')">
										<div class="input-control text span3">
											<input id="price" type="text" class="with-helper" placeholder="Enter price"/>
											<button class="helper"></button>
										</div>
										<p> euro</p>
									</div>
									<div id="div_ingredients" style="visibility:collapse">
										<div class="input-control text ui-widget">
											<input id="tags" type="text" class="with-helper" placeholder="Enter Ingredient Name"/>
											<button class="helper"></button>
										</div>
										<div>
											<button  onclick="addIngredient()">Add Ingredient</button>
										</div>
									</div>
								</div>
								<div class="span5">
									<div style="width:400px;height:420px;overflow-x:hidden;overflow-y:auto">
										<ul 
										class="listview" id="ingredientList" style=" margin-top:10px">
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div >
			<div class="page secondary with-sidebar bg-color-blueDark"
			name="editContent" id="editContent" style="height:300px">
				<div class="page-header">
					<div class="page-header-content" style="margin-bottom:20px">
						<h1 class="fg-color-white">Edit menu</h1>
					</div>
				</div>
				<div class="page-region" >
					<div class="page-region-content" >
						<ul class="accordion dark span10 fg-color-white" data-role="accordion" 
						style="margin-left:-200px"
						id="editAccordion"
						>
						</ul>

					</div>
				</div>
			</div>
		</div>
		<script>
			editPanelDim = parseInt(document.getElementById("editContent").style.height);
		</script>
	</body>

	
</html>