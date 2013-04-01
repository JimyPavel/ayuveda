
var items = new Array();
var selectedItems = new Array();
var allDishes = new Array();
var text = document.getElementById("hiddenData").value;
var currentExpandedDish = -1;	// no dish is expanded
var editPanelDim = 0;
if (text != null && text != "") {
	items = text.split("|");
}

// we restore the ingredients
var saved = document.getElementById("savedDishes").value;
if(saved != ""){
	// we split the dishes
	var savedDishes = new Array();
	savedDishes = saved.split("|");
	for(var i =0; i < savedDishes.length ; i++){
		var dishElements = new Array();
		dishElements = savedDishes[i].split("@");
		var catName = dishElements[0];
		var dishName = dishElements[1];
		var ingred = new Array();
		ingred = dishElements[2].split("#");
		var price = dishElements[3];
		var dishObj = new dish(catName , dishName,price, ingred);
		allDishes.push(dishObj);
	}
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


// function used for deleting a row from the table
function removeRow(rowNo) {
    var table = document.getElementById("selectedTable");
    table.deleteRow(rowNo);
    selectedItems.splice(rowNo, 1);
    // change the id (all rows between the deleted row will have a smaller id number)
    for (var i = rowNo; i < table.rows.length; i++) {
        var row = table.rows[i];
        var cell2 = row.cells[1];
        var button = cell2.childNodes[0];
        var currentNo = parseInt(button.id.substring("removeButton".length));
        var newId = "removeButton" + (currentNo - 1);
        button.setAttribute('id', newId);
    }
}

function loadViews(){

	for(var i=0 ; i < allDishes.length ; i++){
		// we create the view for this dish
		createView(allDishes[i] , i);
		prepareView();
	}
}

// function used for deleting a meal from the list
function removeMeal(rowNo) {
    var table = document.getElementById("mealList");
    table.deleteRow(rowNo);
    selectedQRImages.splice(rowNo, 1);
    selectedMeals.splice(rowNo, 1);

    // change the id (all rows between the deleted row will have a smaller id number)
    for (var i = rowNo; i < table.rows.length; i++) {
        var row = table.rows[i];
        var cell2 = row.cells[2];
        var button = cell2.childNodes[0];
        var currentNo = parseInt(button.id.substring("removeMeal".length));
        var newId = "removeMeal" + (currentNo - 1);
        button.setAttribute('id', newId);
    }
}

// this function verifies if the meal is already there
// returns true if it does, and false if is not.
function verifyDish(mealName) {
    var table = document.getElementById("mealList");
    // verify if this meal is already in list
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var cell = row.cells[0];
        if (cell.innerHTML == mealName) {
            return true;
        }
    }
    return false;
}

// Dish object
// categoryName and dishName are  strings
// ingredients is an array of strings
// canv will store the qr Code generated for this dish
function dish(categoryName, dishName,price,ingredients) {
	this.categoryName = categoryName;
	this.dishName = dishName;
	this.price = price;
	this.ingredients = ingredients;
	this.canv = document.createElement('canvas');
	this.quantity = "500 g";

	this.addIngredient = addIngredient;
	function addIngredient(name) {
		this.ingredients.push(name);
	}
	
	this.setCanvas = setCanvas;
	function setCanvas(canv){
		this.canv = canv;
	}
}


//this function will submit a form before navigating to another page
function submitForm(id , dataF){
	
	// we create a string which will be sent to a php script
	// format of the result will be:
	// 			cat1@dishName1@ingred1#ingred2|cat2@dishName2@ingred1
	// @ - delimitator between dish elements
	// # - delimitator between dish ingredients
	// | - delimitator between dishes
	
	var result = giveContent();
	// with result created we store it into the hidden element and make the post
	document.getElementById(dataF).value = result;
	document.getElementById(id).submit();
}

function giveContent(){
	var result = "";
	for(var  i = 0 ;  i < allDishes.length ; i++){
		var obj = allDishes[i];
		result += obj.categoryName + "@" + obj.dishName + "@";
		for ( var j = 0; j < obj.ingredients.length ; j++){
			var ing = obj.ingredients[j];
			result += ing;
			if( j < obj.ingredients.length -1){
				result += "#";
			}
		}
		result += "@";
		result += obj.price + "@" + obj.quantity;
		
		if(i < allDishes.length - 1){
			result += "|";
		}
	}
	return result;
}

// rowsNo = identifier for the textBox from the correct dish
// no = number of items from the unordered list  
function insideAddIngredient(rowNo, no){
	var textId = "insideIngredText" + rowNo;
	var destinationId = "ul" + rowNo;
	
	var text = document.getElementById(textId).value;
	
	// adding into ingredients list from the object
	allDishes[rowNo].ingredients.push(text);
	
	// adding the view
	addInside(text,destinationId,rowNo,no);
	
}


// this method will create a view for a dish object
function createView(obj , currentObjCount){
	var liElem = document.createElement('li');
	var a_liElem = document.createElement('a');
	var div_liElem = document.createElement('div');
	var gridElem = document.createElement('div');
	var rowElem_1 = document.createElement('div');
	
	// we create the elements inside of rowElem_1
	var canvasElem = document.createElement('canvas');
	var textsElem = document.createElement('div');
	
	// we create the elements inside of textsElem
	var categoryDiv = document.createElement('div');
	var input_categoryDiv = document.createElement('input');
	var button_categoryDiv = document.createElement('button');
	
	var dishNameDiv = document.createElement('div');
	var input_dishNameDiv = document.createElement('input');
	var button_dishNameDiv = document.createElement('button');
	
	var priceDivBig = document.createElement('div');
	var priceDiv = document.createElement('div');
	var input_priceDiv = document.createElement('input');
	var button_priceDiv = document.createElement('button');
	var p_priceDivBig = document.createElement('p');
	
	var ingredDivBig = document.createElement('div');
	var ingredDiv = document.createElement('div');
	var input_ingredDiv = document.createElement('input');
	var button_ingredDiv = document.createElement('button');
	var ingredButDiv = document.createElement('div');
	var ingredBut = document.createElement('button');
	
	
	// row 2
	var rowElem_2 = document.createElement('div');
	var content_rowElem_2 = document.createElement('div');
	var ul_content = document.createElement('ul');
	
	
	//create li items (ingredients)
	for(var i = 0 ; i < obj.ingredients.length ; i++){
		var name = obj.ingredients[i];
		var liElem2 = document.createElement('li');
		var divElem2 = document.createElement('div');
		
		divElem2.className = "icon";
		var imgElem2 = document.createElement('img');
		imgElem2.src = "images/excel2013icon.png";
		
		divElem2.appendChild(imgElem2);
		liElem2.appendChild(divElem2);
		
		var div2Elem2 = document.createElement('div');
		div2Elem2.className = "data fg-color-white";
		var h3Elem2 = document.createElement('h3');
		h3Elem2.innerHTML = name;
		h3Elem2.className = "fg-color-white";
		var pElem2 = document.createElement('p');
		pElem2.innerHTML = "Tap to remove";
		
		div2Elem2.appendChild(h3Elem2);
		div2Elem2.appendChild(pElem2);
		liElem2.appendChild(div2Elem2);
		
		
		liElem2.setAttribute('id',currentObjCount + "_insideLi" + i);
		liElem2.onclick = function () {
			var objNo = parseInt(this.id.substring(0,this.id.indexOf("_insideLi")));
			var rowNo = parseInt(this.id.substring(this.id.indexOf("_insideLi") +
						"_insideLi".length));
						
			allDishes[objNo].ingredients.splice(rowNo,1);
			// redo the qr code
			changeQRCode(objNo);
			
			var id = "ul" + objNo;
			var ingredList = document.getElementById(id);
			ingredList.removeChild(document.getElementById(this.id));
			
			var no = allDishes[objNo].ingredients.length;
			// we update the item's id
			for (var i = rowNo; i < no; i++) {
				var elem = ingredList.children[i];
				var currentNo = parseInt(elem.id.substring(elem.id.indexOf("_insideLi") + "_insideLi".length));
				var objNo = elem.id.substring(0,elem.id.indexOf("_insideLi"));
				var newId = objNo + "_insideLi" + (currentNo - 1);
				elem.setAttribute('id', newId);
			}
		}
		
		// we add this liElem into the unordered list
		ul_content.appendChild(liElem2);
	}

	
	// ul_content is created , now let's do the right settings
	//for ul_content
	ul_content.className = "listview";
	var id = "ul" + (allDishes.length-1);
	ul_content.setAttribute('id',id);
	ul_content.style.marginTop = "10px";
	ul_content.style.marginLeft = "10px";
	
	// content_rowElem_2 contains ul_content
	content_rowElem_2.appendChild(ul_content);
	// do the right settings for content_rowElem_2
	content_rowElem_2.style.width = "350px";
	content_rowElem_2.style.height = "220px";
	content_rowElem_2.style.marginLeft = "405px";
	content_rowElem_2.style.overflowX = "hidden";
	content_rowElem_2.style.overflowY = "auto";
	
	
	//rowElem_2 contains content_rowElem_2
	rowElem_2.appendChild(content_rowElem_2);
	// do the right settings for row_Elem_2
	rowElem_2.className = "row";
	
	// add ingredient buttons
	ingredBut.className = "bg-color-green";
	id = "addBut" + (allDishes.length -1);
	ingredBut.setAttribute('id',id);
	ingredBut.onclick = function(){
		// id = ul id where the item will be added
		// textId = textField id with the name of the ingredient 
		
		var rowNo = parseInt(this.id.substring("addBut".length));
		insideAddIngredient(rowNo , obj.ingredients.length);
	}
	ingredBut.innerHTML = "Add Ingredient"
	ingredButDiv.appendChild(ingredBut);
	ingredButDiv.style.height = "30px";
	ingredButDiv.style.float = "right";
	
	// ingredDivBig
	id = "insideIngredText" + (allDishes.length - 1);
	input_ingredDiv.setAttribute('id',id);
	input_ingredDiv.setAttribute('type',"text");
	input_ingredDiv.className = "with-helper insideIngredText";
	input_ingredDiv.placeholder ="Add more ingredients";
	var options1 = {
        source: items
    };
	$("input.insideIngredText").live("keydown.autocomplete", function() {
        $(this).autocomplete(options1);
    });
	
	button_ingredDiv.className = "helper";
	
	ingredDiv.appendChild(input_ingredDiv);
	ingredDiv.appendChild(button_ingredDiv);
	ingredDiv.className = "input-control text ui-widget span3";
	ingredDiv.style.height = "50px";
	ingredDiv.style.float = "left";
	// we enable the input-control for this div
	$(function(){
		$["Input"](ingredDiv);
	});
	
	ingredDivBig.appendChild(ingredDiv);
	ingredDivBig.appendChild(ingredButDiv);
	ingredDivBig.style.height = "100px";
	ingredDivBig.style.marginTop = "50px";
	
	// priceDivBig
	p_priceDivBig.innerHTML = "euro";
	p_priceDivBig.style.float = "right";
	p_priceDivBig.style.marginRight = "30px";
	id = "price" + (allDishes.length-1);
	input_priceDiv.setAttribute('id',id);
	input_priceDiv.setAttribute('type',"text");
	input_priceDiv.className = "with-helper";
	input_priceDiv.placeholder = "old: " + obj.price;
	input_priceDiv.value = obj.price;
	// we add listener for price textbox in order to update the object and the qr code
	input_priceDiv.onkeyup = function() {
	  var index = parseInt(this.id.substring("price".length));
	  allDishes[index].price = document.getElementById(this.id).value;
	  // we update qrcode
	  changeQRCode(index);
	};
	button_priceDiv.className = "helper";
	
	priceDiv.appendChild(input_priceDiv);
	priceDiv.appendChild(button_priceDiv);
	priceDiv.className = "input-control text span3";
	priceDiv.style.height = "0px";
	// we enable the input-control for this div
	$(function(){
		$["Input"](priceDiv);
	});
	
	priceDivBig.appendChild(priceDiv);
	priceDivBig.appendChild(p_priceDivBig);
	
	// dishNameDiv
	id = "dishName" + (allDishes.length-1);
	input_dishNameDiv.setAttribute('id',id);
	input_dishNameDiv.setAttribute('type',"text");
	input_dishNameDiv.className = "with-helper";
	input_dishNameDiv.placeholder = "old: " + obj.dishName;
	input_dishNameDiv.value = obj.dishName;
	
	// we add listener for dishName textbox in order to update the object and the qr code
	input_dishNameDiv.onkeyup = function() {
	  var index = parseInt(this.id.substring("dishName".length));
	  allDishes[index].dishName = document.getElementById(this.id).value;
	  // we update qrcode
	  changeQRCode(index);
	};
	
	button_dishNameDiv.className = "helper";
	
	dishNameDiv.appendChild(input_dishNameDiv);
	dishNameDiv.appendChild(button_dishNameDiv);
	dishNameDiv.className = "input-control text";
	// we enable the input-control for this div
	$(function(){
		$["Input"](dishNameDiv);
	});
	
	// categoryDiv
	id = "dishCategory" + (allDishes.length-1);
	input_categoryDiv.setAttribute('id',id);
	input_categoryDiv.setAttribute('type',"text");
	input_categoryDiv.className = "with-helper insideText";
	input_categoryDiv.value = obj.categoryName;
	input_categoryDiv.placeholder = "old: " + obj.categoryName;
	// we enable suggestions for category items
	var options = {
        source: categoryItems
    };
	$("input.insideText").live("keydown.autocomplete", function() {
        $(this).autocomplete(options);
    });
	// we add listener for category textbox in order to update the object and the qr code
	input_categoryDiv.onkeyup = function() {
	  var index = parseInt(this.id.substring("dishCategory".length));
	  allDishes[index].categoryName = document.getElementById(this.id).value;
	  // we update qrcode
	  changeQRCode(index);
	};
	
	button_categoryDiv.className = "helper";
	
	categoryDiv.appendChild(input_categoryDiv);
	categoryDiv.appendChild(button_categoryDiv);
	categoryDiv.className = "input-control text";
	// we enable the input-control for this div
	$(function(){
		$["Input"](categoryDiv);
	});
	
	// textsElem
	textsElem.appendChild(categoryDiv);
	textsElem.appendChild(dishNameDiv);
	textsElem.appendChild(priceDivBig);
	textsElem.appendChild(ingredDivBig);
	textsElem.className = "span5";
	textsElem.style.marginBottom = "80px";
	textsElem.style.height = "200px";
	
	// canvasElem
	id = "canvas" + (allDishes.length -1);
	canvasElem.setAttribute('id',id);
	canvasElem.style.float = "right";
	canvasElem.style.marginBottom = "20px";
	canvasElem.style.marginRight = "50px";
	canvasElem.style.border = "1px solid #000000";
	// generate qr code
	var qrText = obj.categoryName + "#" + obj.dishName + "#" + obj.price;
	for(var i = 0 ; i <obj.ingredients.length ; i++){
		if(i ==0){
			qrText += "->";
		}
		qrText += obj.ingredients[i];
		if(i < obj.ingredients.length - 1){
			qrText += "|";
		}
	}
	
	setupqr(canvasElem,200,200);
    doqr(qrText);
	obj.setCanvas(canvasElem);
	
	// rowElem_1
	rowElem_1.appendChild(canvasElem);
	rowElem_1.appendChild(textsElem);
	
	
	rowElem_1.style.height = "250px";
	rowElem_2.style.height = "220px";
	
	// grid
	gridElem.appendChild(rowElem_1);
	gridElem.appendChild(rowElem_2);
	
	// div_liElem
	div_liElem.appendChild(gridElem);
	
	// a_liElem
	a_liElem.setAttribute('href',"#");
	a_liElem.innerHTML = obj.dishName;
	var a_liElemId = "object" + currentObjCount;
	a_liElem.setAttribute('id',a_liElemId);
	
	div_liElem.style.height = "530px";
	//liElem
	liElem.setAttribute('id',"liElem" + currentObjCount);
	liElem.appendChild(a_liElem);
	liElem.appendChild(div_liElem);
	
	// we add this big item to the accordion unordered list
	document.getElementById("editAccordion").appendChild(liElem);
	 $(function(){
        $["Accordion"](document.getElementById("editAccordion"));
    });
	
	// at each 5 dishes added we increase the height for the container
	if(allDishes.length % 5 == 0 ){
		editPanelDim += 150;
		var dimension = editPanelDim + "px";
		document.getElementById("editContent").style.height = dimension;
	}
	
	
}


// function used to add a meal into the list
function addDish() {
	// we create a dish object
	var catName = document.getElementById("category").value;
	var dishName = document.getElementById("dishName").value;
	var ingred = selectedItems;
	var price  = document.getElementById("price").value;
	
	// and we save it in the dishes array
	var dishObj = new dish(catName , dishName,price, ingred);
	allDishes.push(dishObj);
	
	// we create the view for this dish
	createView(dishObj , allDishes.length -1);
	
	prepareView();

}

function prepareView(){

    // clear the panel and the data for adding another dish
	selectedItems = [];
	var ingredList = document.getElementById("ingredientList");
	while (ingredList.hasChildNodes()) {
		ingredList.removeChild(ingredList.lastChild);
	}
	document.getElementById("div_ingredients").style.visibility = "collapse";
	document.getElementById("div_dishName").style.visibility = "collapse";
	document.getElementById("addDishMenu").style.visibility = "collapse";
	document.getElementById("div_price").style.visibility = "collapse";	
	document.getElementById("exportPdf").style.visibility = "visible";	
	document.getElementById("category").value = ""; 
	document.getElementById("dishName").value = ""; 
	document.getElementById("tags").value = "";
	document.getElementById("price").value = ""; 
	
	document.getElementById("editContent").scrollIntoView();
}

window.onscroll = function (e) {
  var vertical_position = 0;
  if (pageYOffset)//usual
    vertical_position = pageYOffset;
  else if (document.documentElement.clientHeight)//ie
    vertical_position = document.documentElement.scrollTop;
  else if (document.body)//ie quirks
    vertical_position = document.body.scrollTop;

  
  var optionsMenu = document.getElementById('optionsMenu');
  optionsMenu.style.marginTop = (vertical_position + 200) + 'px';
  
  var navigationMenu = document.getElementById('navigationMenu');
  navigationMenu.style.marginTop = (vertical_position + 200) + 'px';
}

//function which make visible the element with the id = "id"
function appear(id){
	document.getElementById(id).style.visibility = "visible";
}


// text = the text which has to be added
// destinationId = unordered list Id where the text will be added
// no = number of items in the destination unordered list
// objNo = number of the correct dish from allDishes
function addInside(text,destinationId,objNo,no){
	if(text == ""){
		return;
	}
	else{
		 for (var i = 0; i < items.length; i++) {
            if (text == items[i]) {
				
				var ingredList = document.getElementById(destinationId);
				var liElem = document.createElement('li');
				
				var divElem = document.createElement('div');
				divElem.className = "icon";
				
				var imgElem = document.createElement('img');
				imgElem.src = "images/excel2013icon.png";
				divElem.appendChild(imgElem);
				liElem.appendChild(divElem);
				
				var div2Elem = document.createElement('div');
				div2Elem.className = "data fg-color-white";
				var h3Elem = document.createElement('h3');
				h3Elem.innerHTML = text;
				h3Elem.className = "fg-color-white";
				var pElem = document.createElement('p');
				pElem.innerHTML = "Tap to remove";
				
				
				div2Elem.appendChild(h3Elem);
				div2Elem.appendChild(pElem);
				liElem.appendChild(div2Elem);
				
				// redo the qr code
				changeQRCode(objNo);
				
				liElem.setAttribute('id',objNo + "_insideLi" + no);
				liElem.onclick = function () {
					var objNo = parseInt(this.id.substring(0,this.id.indexOf("_insideLi")));
					var rowNo = parseInt(this.id.substring(this.id.indexOf("_insideLi") +
								"_insideLi".length));
					
					allDishes[objNo].ingredients.splice(rowNo,1);
					
					// redo the qr code
					changeQRCode(objNo);
					
					var id = "ul" + objNo;
					var ingredList = document.getElementById(id);
					ingredList.removeChild(document.getElementById(this.id));
					
					var no = allDishes[objNo].ingredients.length;
					// we update the item's id
					for (var i = rowNo; i < no; i++) {
						var elem = ingredList.children[i];
						var currentNo = parseInt(elem.id.substring(elem.id.indexOf("_insideLi") + "_insideLi".length));
						var objNo = elem.id.substring(0,elem.id.indexOf("_insideLi"));
						var newId = objNo + "_insideLi" + (currentNo - 1);
						elem.setAttribute('id', newId);
					}
				}
				
				ingredList.appendChild(liElem);
				
				break;
			}
		}
	}

}

// function which change the qr code
// it takes the canvas 
// from object allDishes[objNo]
function changeQRCode(objNo){
	var qrText = allDishes[objNo].categoryName + "#" + 
		allDishes[objNo].dishName + "#" + allDishes[objNo].price;
	for(var i = 0 ; i < allDishes[objNo].ingredients.length ; i++){
		if(i ==0){
			qrText += "->";
		}
		qrText += allDishes[objNo].ingredients[i];
		if(i < allDishes[objNo].ingredients.length - 1){
			qrText += "|";
		}
	}
	var canvasElem = allDishes[objNo].canv;
	setupqr(canvasElem,200,200);
	doqr(qrText);
	allDishes[objNo].setCanvas(canvasElem);
}

// function used to add one ingredient into the list
function addIngredient() {
    var inputText = document.getElementById("tags").value;
    if (inputText == "") {
    }
    else {
		// we enable "add Dish" button
		document.getElementById("addDishMenu").style.visibility = "visible";
        for (var i = 0; i < items.length; i++) {
            if (inputText == items[i]) {
                // add item in the list
                var ingredList = document.getElementById("ingredientList");
				
				var liElem = document.createElement('li');
				
				var divElem = document.createElement('div');
				divElem.className = "icon";
				
				var imgElem = document.createElement('img');
				imgElem.src = "images/excel2013icon.png";
				
				divElem.appendChild(imgElem);
				liElem.appendChild(divElem);
				
				var div2Elem = document.createElement('div');
				div2Elem.className = "data fg-color-white";
				var h3Elem = document.createElement('h3');
				h3Elem.innerHTML = inputText;
				h3Elem.className = "fg-color-white";
				var pElem = document.createElement('p');
				pElem.innerHTML = "Tap to remove";
				
				div2Elem.appendChild(h3Elem);
				div2Elem.appendChild(pElem);
				liElem.appendChild(div2Elem);
				
	
				var id = "li" + selectedItems.length;
				liElem.setAttribute('id',id);
				liElem.onclick = function () {
					var rowNo = parseInt(this.id.substring("li".length));
					selectedItems.splice(rowNo,1);
					ingredList.removeChild(document.getElementById(this.id));
					
					// we update the item's id
					for (var i = rowNo; i < selectedItems.length; i++) {
						var elem = ingredList.children[i];
						var currentNo = parseInt(elem.id.substring("li".length));
						var newId = "li" + (currentNo - 1);
						elem.setAttribute('id', newId);
					}
					
					// we check if this was the last item => we hide the "add dish" button
					var len = document.getElementById("ingredientList").children.length;
					if(len == 0){
						document.getElementById("addDishMenu").style.visibility = "collapse";
					}
				}
				
				ingredList.appendChild(liElem);
				selectedItems.push(inputText);

                break;
            }
        }
    }
}

function exportPDF(){
	startPDF(allDishes);
}

function deleteDish(){

	// we delete the visible element
	var id = "liElem" + currentExpandedDish;
	document.getElementById("editAccordion").removeChild(document.getElementById(id));
	
	// we delete the object from allDishes array
	allDishes.splice(currentExpandedDish,1);
	
	// for all dishes below this one which is deleted we modify the id
	for(var i = currentExpandedDish ; i < allDishes.length ; i++){
		// modify the liElem id
		var oldId = "liElem" + (i+1);
		var newId = "liElem" + i;
		document.getElementById(oldId).setAttribute('id',newId);
		
		// modify the a_liElem id
		oldId = "object" + (i+1);
		newId = "object" + i;
		document.getElementById(oldId).setAttribute('id',newId);
		
		// modify the canvas id
		oldId = "canvas" + (i+1);
		newId = "canvas" + i;
		document.getElementById(oldId).setAttribute('id',newId);
		
		// modify the id for "dishCategory" textBox
		oldId = "dishCategory" + (i+1);
		newId = "dishCategory" + i;
		document.getElementById(oldId).setAttribute('id',newId);
		
		// modify the id for "dishName" textBox
		oldId = "dishName" + (i+1);
		newId = "dishName" + i;
		document.getElementById(oldId).setAttribute('id',newId);
		
		// modify the id for "price" textBox
		oldId = "price" + (i+1);
		newId = "price" + i;
		document.getElementById(oldId).setAttribute('id',newId);
		
		// modify the id for "insideIngredText" textBox
		oldId = "insideIngredText" + (i+1);
		newId = "insideIngredText" + i;
		document.getElementById(oldId).setAttribute('id',newId);
		
		// modify the id for "addBut" button
		oldId = "addBut" + (i+1);
		newId = "addBut" + i;
		document.getElementById(oldId).setAttribute('id',newId);
		
		// modify the id for "ul" unordered list
		oldId = "ul" + (i+1);
		newId = "ul" + i;
		document.getElementById(oldId).setAttribute('id',newId);
		
		// modify the id for ingredients divs
		for(var  j = 0; j < allDishes[i].ingredients.length ; j++){
			oldId = (i+1)+"_insideLi" + j;
			newId = i + "_insideLi" + j;
			document.getElementById(oldId).setAttribute('id',newId);
		}
	}
	
	// no dish is expanded now
	currentExpandedDish = -1;
	
	// make the delete button invisible
	document.getElementById("deleteDish").style.visibility = "collapse";
}

// we delete all dishes
function deleteAllDishes(){

	var conf = confirm("Are you sure you want to delete all your dishes?");

    if(conf == true){
         // create a form with an input with a flag
		var f = document.createElement("form");
		f.setAttribute('method',"post");
		f.setAttribute('action',"ingredients.php");

		var i = document.createElement("input"); //input element, text
		i.setAttribute('type',"text");
		i.setAttribute('name',"deleteAll");

		f.appendChild(i);
		f.submit();
    }

	
}

// function will iterate through "arrayOfNames" and for every item
// will check if it's equal with "name"
// if it's found, the function will return the index in array
// if it's not found, the function will return -1
function checkExistance(arrayOfNames, name){
	var result = -1;
	
	for(var i=0; i<arrayOfNames.length; i++){
		if(arrayOfNames[i] == name){
			return i;
		}
	}
	
	return result;
}


function exportPDF() {
	var dishes = allDishes;
    var doc = new jsPDF();
	var x = 20;
	var y = 20;
	var xInc = 60;
	var yInc = 20;
	var height = 40;

	doc.setFont("times", "italic");
	doc.setTextColor(204, 0, 0);

	
	var dataURL = 'data:image/jpeg;base64,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';
	doc.addImage(dataURL, 'JPEG', 0, 0, 220, 300);
    doc.setFontSize(30);
	
	// array with categories
	// each category will be an array of dishes
	var categories = new Array();
	
	// array with the names of the categories
	// categories[0] name is categoriesNames[0]
	var categoriesNames = new Array();
	
	for(var i = 0 ; i < dishes.length; i++){
		var dishObj = dishes[i];
		var catName = dishObj.categoryName;
		var index = -1;
		// if this category exists we add the dish in the proper array
		if((index = checkExistance(categoriesNames, catName)) != -1){
			categories[index].push(dishObj);
		}
		// else we create a new category and add it to "categories"
		// we also save the new name
		else{
			var category = new Array();
			category.push(dishObj);
			
			categories.push(category);
			categoriesNames.push(catName);
		}
	}

	var prodprod = 0;
	var elemOnPage = 0;
	for (var i = 0; i < categories.length; i++) {
		// category is an array of dishes
		var category = categories[i];
		prodprod = 0;
		elemOnPage = 0;
		for(var j=0 ; j < category.length ; j++){
			var dishObj = category[j];
			doc.setFontSize(30);
			doc.text(80, 40, dishObj.categoryName);
			doc.setFontSize(20);
			doc.text("Quantity", 150, 50);
			doc.text("Price", 180, 50);

			doc.setFontSize(20);
			doc.text(50, 65 + prodprod, dishObj.dishName);
			doc.text(155, 70 + prodprod, dishObj.quantity);
			doc.text(180, 70 + prodprod, dishObj.price);
			
			var dataURL2 = dishObj.canv.toDataURL("image/jpeg");
			doc.addImage(dataURL2, 'JPEG', 15, 55 + prodprod, 20, 20);
			doc.setFontSize(10);
			var ingredy = "";
			var count = 0;
			for (var k = 0 ; k < dishObj.ingredients.length; k++) {
				count += dishObj.ingredients[k].length;
				if (count <= 50) {
				  ingredy += dishObj.ingredients[k] + ", ";
				}
				else {
				   ingredy += "\n" + dishObj.ingredients[k] + ", ";
				   count = 0;
				}
			}
			doc.text(50, 70 + prodprod, ingredy.substring(0, ingredy.length - 2));
			prodprod += 25;
		   
		   elemOnPage += 1;
		   if (elemOnPage >= 9) {
			   doc.addPage();
			   doc.addImage(dataURL, 'JPEG', 0, 0, 220, 300);
			   elemOnPage = 0;
			   prodprod = 0;
		   }
		}
		
		// if after this iteration exists another category, we add a new page for it
		if(i < categories.length - 1){
			doc.addPage();
			doc.addImage(dataURL, 'JPEG', 0, 0, 220, 300);
		}
	}
	doc.save('Test.pdf');
}