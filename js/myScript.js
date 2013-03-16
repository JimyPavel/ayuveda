
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

//this function will submit a form before navigating to dishes
function submitForm(id){
	
	// we create a string which will be sent to a php script
	// format of the result will be:
	// 			cat1@dishName1@ingred1#ingred2|cat2@dishName2@ingred1
	// @ - delimitator between dish elements
	// # - delimitator between dish ingredients
	// | - delimitator between dishes
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
		
		if(i < allDishes.length - 1){
			result += "|";
		}
	}
	
	// with result created we store it into the hidden element and make the post
	document.getElementById("indexData").value = result;
	document.getElementById(id).submit();
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


function startPDF(dishes) {
    var doc = new jsPDF();
	var x = 20;
	var y = 20;
	var xInc = 60;
	var yInc = 20;
	var height = 40;

	doc.setFont("times", "italic");
	doc.setTextColor(204, 0, 0);

	
	var dataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAMAAh8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD8XLPt9DW7pnWsKz7fQ1u6Z1rx6ux+nZbujo9I/h+tei+GPhL4t1jwZL4is/Cnia88OwsRJqsGlzyWUZHXMyqUGO/PFecaapaIgcE9K+jLr9t/4h6P43t7zwP468aeFtD0e3gs9J0231F4razhjjVdnkKfKILBicqd24k5JNeXUULXm/uPvsHPFLlWFim+vM2lpbTS+r/Q4LRnDLlTkZrptK6L+NfQnxX+GUP7QH7BFr+0A3hvTND8YxeJjoutnTGFta6vZRqqNqa2ijbG5ubiCGQphdyZABY1wv7In7L+sftV/Ey10GxvLfRdLWaJdS1i5G6GwR2wMD+ORudqDsrE4VWI8rEYOftFThrzar0P0XIuJMKsDUxmKfs1RbjO7vZxtdK29+ml32vocjYc1rRcpXd+NfGfwzl0fxho/hvwc1qIb+NfDWsTXs0t5NAszB3ny3l/PGFIULwTjPFcFC37sV4+KpKnKykn6H6hw/mE8ZRdSVGVPspWu00mmrN6a27pproSUUZorkPfCiiigAooooAKKCcUtlBNqlyILWGS4mY4CxjdTUW9jjx2YYbB0vbYuooR7t2/4d+S1EJxSwwyXUojhRpHboFGTXovgj9m3Utb2TapILKHrsHLmvYPAPwZsNKlS30nT1uboj/WSdvcnsB/+rNRzx5uWOr8v8z8tzzxWw9GLWWw5v70rqPyj8T+fKeJ+Bf2fNZ8XXdussUlvHOwVBj55D7D9c9BX1j8Iv2Y/D/wx0+OaWzhv7/Kt5k0Yk8lh3XPfPf8q6vwN4Bt/CUBlYi4vpF2vORjA/uqP4V9u/euiZsrXZTTivM/D8+4qzLN5f7ZVbj0jtH/AMBWn33fmSR8r+NWFAzUMI5qZBk02fOkiDLVIlNTlakQcVAEirtWpAMLTUXkVIvWgCRByKkUfMPamIMsalj6GgB6ffqSMc5pkYxUiDCUASRjAz61IgwKYBhalXtQA5BgVIozimoMmpIxhqTZSHoM/wA6lQZao4h8tTRjC1BQ9BlqlQfJ/nmo1GE+tTIPmFADlHFSKmKav36kjGWz+VAEiDkVIoy1Nj7mpIxgf55oAegy30qSMYPrTFHy+9SqOPegBVXJyamjHGe9RqMDipgO1ADlXAz3p6DHNIBnipEXJoAci4571Ii4HvTVXcfpUgXeaABR3NSRrQBuNSBdwoKQAbj7VIBnpRj/AAp6jmpuUIi7fepFXA96FXbUirjrUgNVN3tT9uDx3pVXdTlTsKAGhM9acFWniPjmnAUAMwfSgKxNSbGNL5eaAIyhFJtYe9S+XxS+X70AQketNZBmpirA03bg/oaAISpWmsgb/GpimKaybvagD+Tqz7fQ1u6Z1rCs+30Nbumda/TKuxy5bujrPC+j3mrxXUlraz3CafAbu5aNCwghDKhkb0UM6DJ4yw9a3tGiknZY4Y2mmkYJHGoy0jE4VQPUk4rtP2H9Q0W5+I2veF9e1C10fT/iB4Y1HwzHqF02yCxu5VSazkkb+FPtUECsx4CsSeAa9M/Z/wDhRL+yb4wj+IfxR02Gx/4RNzc6B4fnmSS48Saon/HuFRSf9EjkxLJKflKoFUlnGPNqUeZJ9OvkfbYHNFQlKDV5WTiusm9kvnv2Wr0PqbQPDs9x8V9c/Zx0mM6gfCvwTuvDDWsPIutfLJrF0yj/AJ6fbT5Wev7kelc54D1q1+DOk/ETR9CmWfSPgt4Tu47i7g5GveJ9Q2adLdA/xLF500NuO0cW4YaRq8A/ZS/bG179nX9ozUPikYf7c8U31pqa+ZPIVBu72GRDO3c7WkL4BySBzXafsv8AxY8NeD/gh48s9c1aO11y61/w/wCILS1mtZZl1xLC5mnmtNyKQjO7R8vhcZPOMHP61Tk1rZ6/JJaL7/yO9cO4yhSneLnD907JX5qkpWqSstdIt9Le830uvdPDn7B/hXwr8R/B/wAK/ElrHceLtWfRo9W1G116Nry0u7m4jkvLZLNJCyQW1mZEaWSPLTAkEAAG/B+y98IfFfinww01vrmg6brWueJL7UfsOo7l0/w/pFk8jeWZFbc4mTymlOfMkWTbhdpry7Tf2ztF8J/tD+NPiL4X8M6vb614outV1SC81K+jku7S8vVlVMFFCrFB57sANzOyR5ZQMVreFv20/DHhb4U2GgR/DmTUb61+H8ngqS6utWKRM0t41zNKqIuRHKWPmLu3vnbuUc1j7bAfC+X7r6Jq3Trrf9T1/wCyeMm1WpOs3JLRTUbSlF8zs5tJRfK4q9t9FsvPvih8OdL+HHwn8Au1pejxV4r09vEV+ZpTt0+zmldLOALwMukbSljyQy4wOvAV6Z+0x+0Pa/tAa5pd9a6HNo81vpGn2OoSS3Ama9ntrZINyKqqsUIw7LGAceY3PYeZ9BXzeOdP2r9jtofuXCccestjLMk41ZOTabu1dt2vqrLaK7JX1uFFVdV1u10S3826uIoE7F2xn6Vl2Gv6j4vnEOh6fJIjHH2m4UpGPcL1P44rCnRnPVLTv0LzzirK8pj/ALdVUZdIrWT9Iq7+e3dm3LOsKFmZVUdSTwKi06e48Q3Qh0u1lvpGONyjEY+rf4Zrr/AP7Ns2tzR3GtXEt6+QfLPyxr9B0r3Xwh8NbHwxZqscMcSqOgGKzqVKVLT4n+B+TZv4q43EXp5XT9nH+aVnL5R+FfPmPJvAn7NV5rXlza1cbE6+RD8o/E9a9g8OeB9H8BWIW3t4Ydo5YDk/jU2ueLbXQYNqsu4dKn+HHgTUPivcm6uvOs9JU8SAYaX2XP8APtWC9tXfZfgfmGYZnUq1Pb4uo6k+7d38uy8lZFzw1p998QNT+z6evl26H99cMPkiH9T6AfpXs3hjw3b+GdKS2tweB8zt96Q+po0HQrXw7pcdrZwrBBHwFXv7k9z71ojpXdSoxpq0T56tXnVleQ9OVpcfzoA2inIM/XNaGJNCMj9KmRaig4Wpl6VLAkA/lUy9qjHIFSLywqQJEGW+lSp941HH96pY+hoAkj4LVIgwlRpwlSAYWgCRRtSpVHygfhTBztqRBlvpQBIPvCpFGWqNBk1KnGaAJE+WnoO9NHGPepI1yMVLKiSKMJj8KlHamIMt9KkQZapKJFTcfapYxk5pkYxUifcoAkjHGakT7gpiDt71Kgy1ADwMDFSqMmmIMt9KlQZB+tADkGW+lSJy/wCFNj+7UkY+X60ASIOakRcDNRrwKmx2oAdGuT/KpFXaKai5qROWoAco2LUiLximquT/ALtSRjJzQND1GBT0GBSIueaeibqksci7f941IiYoQc09Bk5qQFVcc05VOcmlVcmnou80AATcfSnqMdKVVzTlXacUAJ5fqaf16c05Ux1pwj5oAZsJo8vj71SiPB5o2gUARbBnrS+X/nNSbcf/AKqCgoAhKkUhGamKYpjJk/N+lAETJimlQ3+elSlMU1l3igD+TKz7fQ1u6Z1rCs+30Nbumda/TKuxy5bujotKUMBnntXT6X8/zMWZlG0EnOAO1czpH8P1rptJ+5+NePiNj9MybdHT6R0/Kul0ofdrmtI6flXSaY21AxIwuSfavErH6xk+yN6xrWj+5Xm+v/HTQ/DLtDDK+qXg4ENp84B92+6PzrnLjxt4t+JMvlRt/Yti3Hl2xJmcf7UnX/vnH41lHL6tTV+6u7/q4Zt4mZHlKdN1Pa1P5Yau/m/hXnd38meoeKfiPpHhD5by8jFx2gj/AHkp/wCAjn865yLxp4i8dzeVo9l/Zds3HnzgPMw9l+6v45/CrXww/Z3V5lkeFpJGOWd/mYn3NfRXw4+BsdpHGzQqOPSpqPDYdfzPz2+7/O5+T5x4mZ9mt6eG/wBnpv8Al1lbzm9V/wBuqJ5N8OP2cDqV4l3qDTX9yxyZJ2LHP419CeBPhBb6RBGTEqhfaut0Xwta6HACVUbR6VQ8UfEO10OBlV13KK8ivjKtd8sT5GGHjTvUqu8nq29W35s1y1n4et+dq7RXE+MviwFb7Pa5kkY4VV6k1wvif4n3nifUls7FZJppm2oiDJJr3H9nX9mtvDQj1rxCqzajIA0UDDPk+59/ataOBS9+ocuIzD7FMofBj4DX3jGeLWvEiyQ2Z+aK1PDTfX0H86+gLK0jsrSOGGNI44xtRFGFUe1EY2oPTH5VJH92uzyWx5t23d7kqLxipccVGvUVIv3hQBIeR+FOjHApvRW+lPUYWgCWHhM1MoyFqGL/AFa1YQZqWBIpywqWP71RIMmpY+BUgSxnFSIMLUajCVL0AoAkAwBUo+8P85qNfvVIoy30oAlRcn6VLGKij61LH92gB8YzmnqPlFNUfJUiHNAEi88dKmThqjU5IqRBk1DLJU61LGeDUcfQ/WpEHyUhkijCVMBjH1qMDJAqRR89AEiffqWMZao4+BUqDC0ASR9KkT7lRqOMVMo5WgB4G0VIgxj2pi/fqVF5oAeo3NUsa5OaYgx+NSIvFAEkfT61JGMCmBeKlC5oAVF/8eqVV2rTUXBxUiDLUFIeBgYqQDP1pqAE1Ki1JQ4LngVIoyaan3c96kRcDjvUgOUbjUgH5U0LtFSBdooAAuOBUgUDpQq4FSIu0c9aAEWPI5p6ru/z1pVTNPALDigBuwUowv8AhTwgHvS7eelAxhGKbgGpsUhXjpQFiJo8dKYy561OUz0qMjP3qBELJjpTSmV4qZlx9KjZdq5FAH8lln2+hrd0zrWFZ9voa1U1S30uPdcSrGOwP3m+g6mv0ypdrQ48BKMPek7I6vSP4frXQ2d5DYWrS3EscMS/ed2CqPxNeYt8QLif93p9vt/6ayj/ANl/+vT7Pw5eeI7lZL6aa6bPAY/Kv0HQfhXn1MNf43Y9yPGOHwqth4+0l9y+/d/JfM72/wDjha2eYdLt5NRm6bzlIh+PU/lWbJN4h+IbhdQvJFtWP/HrAPLiH1HVvxJrb8D/AAnkvGQLDx9K91+GnwFaQxlofT+GuGtXoUNYrXuzzcZxBm+aL2dWo4wf2Y6L59X82zzL4cfA9pjHth2/hX0H8MvgIFEZaH06ivSvh/8ABaKxjRmiUfhXpFnpVpoNtn5V296+ZxubSm7RNsDlMYK8jn/B/wAMLfSIVLRqMe1b1/q9n4etzyo2jpmud8ZfFS30eF1R1+XjrXi/j34wyXRf97tX61wUcLVru8jurYqlRVonoHj740rAjpC/t1rzGDUdY+KfiRNN0uGa6uJmxhBkJ7msf4d+Dte+PfipdP0eGRos/vrkj93Evck19vfA34C6P8FNBW3s41mvpFHn3TD55D7e1ezDD06C13PEqYqdd6bGT+z5+zPp/wAKLNb69CX2tSDLSMMiDjov+NetRDioU6VNH0rOUnJ3YRiktCRPlSpgOKhT7lTL0FSMkU9KlX71RLy4qRBl6AJB0apB0qMHAP1p+aAJYfuCrC8kVDAPkWpk6/zNT1Alj+9UqcpUUfWpV+5UgTDnFSKMkVGBnFSJ96gCRB81TRnmo4+pqSPofrQBJH0qROFqOM4WpF+5QBKvC1Kv3qjXmpE+9/nigESRnBNSJ901HF1qaMcGoZaJEG1KljXG0VEv3KmT7w+lIZIgy30NSoOpqOP7/wCFSR9GoAlQYWpcbVqNfu+tSrwVoAkTll+lSpy1RqMmpIhzQBIg5qWP7tRRnipRwnegCRT8oqZRnbUQ5xUqjJoAkXk/55qRBzUYGWqROtAEsXANSxnio0/1dSAYWpLWxJGOPepQu0YqNRgCpV++PpSGPxjH+c1Ki5ao0GXqaP7v1pAOjGWqRBlvpTU4WpEHyD3oAdGMmpEGTSKeKkVflxQAqjcfapFGT7UgHanqKCgC7elOCHHpTlXbTlj59KBkfln1ppGOanaPA6/nSYxQMgZc9KayYP8AhUzpuNMZcigkrkbuKYwxU7jKe9RyAkcUEn8hNpr0mrMFt5Io1/2WDNWzo/hRrqXc+6Rm6s3JNeTA7TW34e+ImseGZla1vJMKfuSfvFP4Gv1iph5W9xn5usc5v97d/wBdj3vwp8OpLx1/d/pXsnw5+B8l48e6L9K4r9jz9oPw58R/Etr4f1+ODRtZumEdtKW/0a7bsgJ+457A8E8A5wD9++BvhDDpkSlowMeor4vOMdVw8vZ1FZn2OT4GniI+0pu6POfhp8B1gWNmh/SvaPDXgG20aBSyqMetah+yeHrf+FdtcP45+L8Wnxsscg9Bivk5Va2IlofVwpUsPHU67XPFtroFuRuXcoryf4gfGktvWOT2615/47+LUl0zlpse2a8g8afFTYWxJ+tepg8qu7s8vGZtZWTO38a/FIsWLS5P1rQ/Z/8AgLr/AO0t4hEiiSz0GFx592w4Yf3V9TU37J37HOsfH3Uode8RJPp/hqNgyIw2yXnsB/d96+/vCnhPT/BWh2+m6XaxWdnbKESONcAfWvUrVIUFyQ1l+R48Oes+aW35lP4X/C7R/hL4Zh0vR7ZYYYx8z4+eU9yTXTp1qJDyKkQ4b8K8yUm3dndGNtESx8VLGcJUcQxmpI/uUiiRR8lTL/DUKfcqZf4aAJE5cVLH96ol+/Usf3qAHf41KBiowfu/nTx/SgCeD/VrU8ZxVa3bIUdxViMZ/wAKnqBNH0qRR8uKjj+5UqnIHapAlA5FSJ96ox1H9KkTqKAJo+pqSM8H61HH1NSR9D9aAJEHy1KD8oqJBhKlHCUASj71SJwaj/iqSPigESR9fwqZFwtQx1MhytQzQlz8v1/WpUHzfSoQfwqaPrSAlj+9UsY+WooxyfWpYzx9DQBJHyoqZeoqJOQKlX7w+tAEqfeqWP7pqJPvVLH0/GgCRPuVIv8ADUaD5Km6kUASAc/SpE+9Uaj5hUkYy2aAJY+9PTgGmR8CnpytAEy/dHFSjnFR9AKlxnFSaEiff/CpoxyahQ4b8Kmj71ID46lUbVqOL7tTLzQBJ2FSBcnFRgcipE+9QBIn3xUqDLUxOtSIOKAJEGOaeq7RTEHyVIOgoKHoO/5VIqZHNIo59KkHLfrQUN8tcU1121MV3Co3+6aAIWXafr3qNxh6lk4WopDQBGRzUeMGpH+9UZzuNBDP4x6VF3tikq1p9v5jg1+yN2PyYSK3kiZZI2ZWUgqw4II7iv1Z/YH/AGxJPi9+zjbf2xN5viDw8/8AZ15Ix+a4CqDHIfdlIyfUGvzBt9O8xOle5/sP+J5PB2reJYN7LDcxQOVz1YGT/Gvn8+wcMVhveWsXdfkz6DIMZPC4n3XpJWf5o+6fH3xnacuEk2r65rxvxn8UcF90uT9a4jxt8WNof95+teW6l4x1DxlrcOm6XDNeX104jiiiUszE+1eHg8rSR7mNzRt7nX+LvihJeXHkw7pZZG2oiDLMT0AFfTn7Fn/BPu58VPa+LvH0MkdvkS2mmScGTuGkH9K6b9hj/gnND8O/s3izxxHHfa+wEttZt80dnnkE+rfyr7EiCqm0cY4AHYVOMxsYL2VD5v8AyM8NhZT/AHlb7v8AMXTbCHTLKO3t40hhhUKkaDCqB0AFWh8o4qJDlalXpXinqbEqfw1Ih/lUa8kVIh5oLJoqkj+7UUZqWMYFAyROUqYdvrUK/wCrqYDGKAJEGXqWPqaiX79Sx/e/CgB6rup46UkZ4xSIcq1AEtrzJVpDg1Vs+BVpDg1LAlToamHygfrUMXNSpyoqQJl5IqVfvVEOCKkT7wzQBNH1NSR/dqOM/MakjNAEifcqQfdH4VGn3Kl/hoAlH3qkXnNRjhhUkZ+agESRjIqZPuVDEctU0f3TUM0JA2QDUydRUI4FTJwRSAlj61LGflqOM4yPxqRPun60ASg8CpVHzVEv3alXrQBLGMtUsfQ/WokOGqWPofrQBIg+SpQcD/dqKP7lSg7gKAJOpqaM44/GoegFSp9+gCWMZzUqHK1Chw1SR80AT9qk7VEOUFSjoKRoSocP+FTRnrUIOG/lUkZ+aoAmjPy/jUin5ahjOG/pUyfcoAlHQVMh+aoQeAfSpFOcUATx9TUiVCp2tUina1AyZB8tSLyKhV9rVIhwMGgZMjcf7tTK3zVXHH9akV8nqaCiVnyKY5xxTSxxTXfbQA1zio5OGp+/PNMP3ielAiNuWqPO45p7NgE1EzbFoEfxkqMtWxpVtuK1l2qb5RXSaNb521+wVGflNNamrp1nla6vwHra+E472bdtabC9ewz/AImsCOSPTrJ5pOFQZrc+AvwQ8W/tSeNY9E8M2Ukqlwbm5I/c2qHux/pXDUs4tzdkdlJtSShqzT8I6N4k+O/jKHQ/DdjcalfXDAYjUlYx/eY9h9a/Tj9h79gHR/2ZdGXVNWEOr+LboBpblkytr/sJ/jXWfshfsheH/wBk/wCH0Wn6fElxq06hr6/Zf3k798Hso7CvYxwBXyOYZn7T91R0j+Z9Pgcv9n+8q6y/IlThv51LGMg1En3vwqRB89eOeqTKcipc5Woo+9SJwgoAmTg//WqROM/So14qRD+tBpEmj71JGOtQx/eqaM8UASLylTA5FQp92pEOVoAmHDCpU+9UQOSKlX71AEsfU00tt3D3p0femN/WgCzaj5KsJy1V7fhfxqwhweKmQEsfWpU4SokOD9alT7n1qQJs5FSKcNUQ5WpQeaAJU4b61LHUKH56mTrQBIn3KlH3aiThakjPy0ASg5AqVPv1CvKipUb5qARLGeami5WoY2+b/PNSx8GoZZKv+rqZTgrUKfc+nFSIcAGkMnjPzU9DgVGPvCpE+/QBOvIFSg8ioU5DVIOUoAmU/MKmj6moUOCv0qSNvmoAmTipE/1f4VCnD1NHxQBKOgqVOo96hTlKmQ5FAEgOGqSPljUYOGFSKcNQBLGcpUqH5ahj61LHxx+VSy0Sxn5amB5BqGPnNSL0pDJl4apY+G/WoQflqQN0NICeM4GKfGc8VEDg1JnBoAmQ/J9KkU7l561CrbfxqRG20ATIdy/SpA+761CG44pytuH9aBkyyY9KcSP8moQ5pwINAyQf55oY4qPdn6daGdVoGOLb6jLZNBbNMZueKBXEc7jj0qOQ7vlpztt/z0qNm2/4mgk/jY0uPdL+NdXo0HIrm9Ej3MtfXH7D/wDwT51j9pO9h1XWFm0rwhC48yYjbJe46pH7erV+r4vEQpR55uyPzPC0Z1JcsFdnDfsv/sdeJv2yvGsdrp8clh4VsZB9t1J1Plk9wn95vSv1q/Z6/Z28M/s2+A7fQfDdjHbxRqPOmI/e3L92Zu5NbPw5+HWjfCrwrZ6JoNhb6fptkgSOKJcfifUn1roolJPSviswzKeIfKtIrp/mfYYHL4Ydcz1l3/yJE5SpE5So41O2pkT5K8k9AkU/MKkT79MEeNvzU8HDfoaAJU4H51KnK4qJPvVJEeaAJUO5amT/APXUKfcqVTigolT71TRnioFOGqWPlqCiaOpIzhKhRsGpoz2oAmDcA1Ip+YVDGMpT0U570ATqcN9aJBz+NNj+7+NPxlBQBPDwhqdDyKqRykHpxnFWUY5+lTICdThqljFQocnNSpw1SBMnzJUg+ZRUcZ4PtUkZ+X6dKAJgcNUiH5qhU5UVMOGH60ASxn5qlj6fjUKHB+tSx/eoAlQ5WpFqKPnNSocrQBKow9Tp96q46frUqDBFQy0Txnk1In3Kij61LHSGSg8KfxqUHBFQp9ypQc4NAEsfJqaM5qFeoqVOGoAlT7lShuhqKPvUicpQBMrYb61Kh5/pUCnIzUqHO2gCeKnxnqKiB5zUg+9QBMOUqUHK1FGe1PjOPloAljblamU/Nmq8fK/0qZDlfegomB2t9aljbnFQg5WnqfSpKJ4zg4p6HDY9aiVsj9aeG3CpAnjOKkQ8YqANkVIp3LQBMrbfpUitt/z0qFW3e39acrbRigCwDtNODBqhU7afuBoAlDsKd5gxUIYrTvMz2oAk8xaDJzUe/FHme1ADs5NNZ8dKbnJprPgcUAKzY60zPrTScf4ZprZagD8NtC/4Ik/D/Rr21lk1zWplhdXdNy4kx1HToa+xvDXh3T/BugWumafBDa2VnGIookUKqqBjpTAeM1Kpwa9jEYqtWt7WTZ5dHC0qP8ONiysip2pySYb/ABquOfYVMgyf5VznQTJKR9akSXjHFQqAalQc+9ZgTpKT/wAB/Snqc4PvUSdP51KuOPSgCVDk1JHwKjThhUsZ7UASJwKlVdo9fwqONvlx/SpEIPc/lQUSp1HNSx8GoVwe7flUynB+tBRIvDVNFjPzVChw1SIcP+FAEwP93ipFfNRIcNUqfdxQBMhwacx5qND8v0qZTytAEkPK/wAqmU7qhU4OKlSpAlVdv41Mv3hUKHK1JH0WpAnQ4apYm4qFPvVKn3qAJYz8uPSpAdyVHH1NSR9KAJQcAGpUPzCoU5SpAcrQBMn3vwqRD1qMHBzUi/eoAlQ5HapV+7UIGDUsRw1TIqJODkqakX79Qx/dqRTkVJRPGecfjUsfIx6VCDyKkQ/NQBMh+Wph29qrxnDYqVPSgCdWwc1Ihw1Qqdy1Ju3DNAE6HrUitxjvUSn5hUgODQBMGyKlXlf61BGfmqaM44oAkjPAP51MDg1XQ4P1qZDkEUASqcHPapVbB7VCjbuKchzxQBYRttSKecioY24qRHzxSLRMrYp6nBzUKvtFSK2Bg1IycHnNPR/7tQK+KkBwaQEwf86kV+PmqBWyc09Xz1oAmDYp25TUIYinb+aAJlfAoDkGogcilyfWgCUyZ7Um81HuOaQtzQBIW9frikL4PFRlgtIZOOKAHE0xnJ6UM2epphfJ4oA/P6PqRUyncv6VCv36mj6fjXoHGSD7tSqc4qKPkVJHwlAEyn5v6VIvD1EDyPY1Kv3lqZATRnk1In3aij+/+FSxdKkCZTwKkXlhUKHKVKjYx7UATJ1qRDzUSnnNSLxQUiVORUqHKVHGetSRn5aCiQHgfzqbOKhT7lTBuM0ASL98VLGcNUQORUq8EUASR9/WpVOUqJPvVLGeMUASqen9KlXg1Cn3KkQ8bvxpATxn8qlQ5WoUbDVInL1AEynCipgcGoU5FSJylAEyH5qlj+/+FQKcr9KmB+YUATRnBqSM5H0qEHDA1Ipw1AEyHK1KGyuahjOCaljPGKAJlanxnBqJDzUinK/hUgiaLj+dTRnjFVxnINTKcMKk0JkO5akQ5H0qFTtP1NSJ1xQBYU8g1Ipw1Qo2RipEbI+lAEyHa31qWM4OKgRs8/nUytnmgCWPpipkOVqBHxz2qRW20ATI+alXpUCnac1IhwaAJ1OV4qSNxn6VAhwakU7TQBYVu/anhs81Ah2mpFbaaAJlORn86kVtw4/GoVfaeKdnHSgpMsIdy09X7GohxTlbcKkomVttSK2B/nioUbsacHKikBMrbjT9/HNQq/NOEnHP40gJ1bHenebioEaneYRQBKHBPvTicd/zqDzMj/PFLvX3oAm3f7Rpueaj3rSF+aAJN60GTPao/MPpSFif/wBVADmf/wDVTc5PXFNLgGm7zQB8DjhhUkf36hzlalRs4r0DjJ4zg09D2/Kooz834VIn3xQBMv3KlU5Wooxx+NSRn5amQEyHJHv+tSp96oEPyfSpV6ipAnjPOKkQ7lqFTh/rUqffoAlU7hUqnIqKM8YqSM/L/u0FEyfeqSM81CnQGps7TmgomjPJqRD8lQqeRUicNQBMh3LUinKrUUf3qkj/AIhQBOpwwqRDk1Chyv0/SpAcjPpQBNGalj6VEvUe9SI2GxzQBMvI/pUyHDVXQ8/jUyHIqQJk+/UsZwagVsjNTA8ipAmj6YqROUqFThqljPzUASg5WpQeA1RIeKkQ54oAmHDCpFPzioUO5akVsr70ATIcNUikg1CrZxUitxQBNH09qmRtwqBGw1So3P1qGaEyHKipQeAagU8/yqROuKQFhW5zUi8MPyqGM5GKkQ7xQBMhw31qaM8Y9Kro24e9SKflzQBPGeNtSo3H+eagB4zUinigCdDUiN781Ah6GnhtwzQBYQ7xUiNng1Ajd6erc/55oAnRs1KpyOarjn6ipFbI5oAmRuKkVtoqFG3CnB9oxQBOOOR0qRWzUAOw05W4/p60FXLCtu6/nTg+DUKvuNODEVJRMrA+1ODkHnpUKuDTgSO/0FAEwb8M04M1Qh80objrSAmEhHWlEn4VCCwH+eaPM/zikBL5ntSiT2qHecUB2FAEpkOaQvUZc+1Ju460APLBaazF19KYZPSkySOtMD4NjJx/KpE4T8aijOCaenX3rvOMsBuc1IDioU+7Uo7UASoPnqWPqagRvumpkb5qQE0Z7VIhytQocNU0fOagCXOalX7wqFDlT61KnSgCZD81SR8E1Ep5FSKcNQBKhqUfMtQocGpUPag0JgcrUoPIqGM5zUiNlaAJgcMKlT79RA5FPDZGRQBNGcNUsfTFQqfmFSKcNQBMpytSKajRu1SJ0+lAEy9c1Ih5xUKHK/hUi8NUgTR9amQ5WoVPzCpEOD9akCZGyufSpVPANQx8H+VSx9MUATA4wakBwVqFDkVIhyv6UATIdrfWpEOG+tQqcpUobjNAEsfBxUsfeogcVIGxzQBIjcVNGcr9KgDYp6tipZUSwhytSg55qBHxUiHDfWpKLAbHIqRThvrVdDjipkOeDQBMG2mpIzg1DG3FPQ8Y/KgCwjYp6nDVAh4xUqtuWgCZWwetSKdrVCrZXFSK2TQBMG2mpEOD7VCj05W2nHagCwrYNP8AvVAj4HtT1bBoAnV8j3qRXyOf/wBdV1bd9aer4+9QBOrYNPBx0qBWwP609Wz0oAmV808MVqHdTg208UDuT7s0obAquG9acGI+6aB3LG//AD6UoINQeZzTvMU0rDuSk980u44qI4Apcn1pDJASBQST3qPdg/WgtkUAPzk0m4Co9wH/ANejzFBoEPMlNJ9TTN+aazZ6n86oVz4VRsNUinD1Ch+X6VMDxXYcpLGeTUsR4qFT81SocGgCWMfKakHK1Cpw31qZDlaAJc8bqlQ4b2NQpytSRn5fpWYE8Z+Y1JH3FRKckVIv3xQBMhytSKcrUSNg/WpY+poAmU1IjYIqGM8YqRTlaCkTJ9+pIzgmogflFSA8igomj7ipUOeKhXrUinDUATIdy+9SKcr/ALtRJ1qWM/40ATA4wakU7TmoUPGKkQ5WgCZTg/WpIyMVCGyP61KrZpMCdWyPpUinj6VDGeakU4PpUATq2eRUoODUKHPFSIc+1AEyn5vrUiHDfWoU5WpFbcPpQBMp2n61InDYqINlc/jUgOKAJozg1LGccflUAbIqQNnn0oAlWpUbNQA8VKrDPFAE6NkVIrb1qujbakQ4H41m0WWFbP1FSI2fwqEHBzTwfTOKBk4bfUitnmoEbHNSq23/AD0oAmQ7hnvUqnIzUCnbzUitxQBMrbqkU5+tQK2PmqQEHp/+ugCdG+X3qRWzxUCtmnq2aAJlbaakRsGoVbA5pyvtFAE6tnkU9XzUCtk596eGB+tAEwbbT1bA/pUCvjrTlbPSgCwr5PNODFRVfzPWng/N15oAm8zil4NRebSqwNAEwdvY0okzUQPHBpd/PSgCTeM0bwT1phkz2pPM46UASF+ev1o3j3pjOAKPMoAk3r70m+mGTjik8w0APJJ6mm5G6ms27/PWmllHegD4bjORipE5WoVOGqRDhvbrXYc5Mh+UfzqVW4zUMfBP51Ih4oAnBwwqRWwfrUKn5akVun9KAJozg1Khw1RA4IqQHDCoYE0Z+SpA25ahU4b61LGcZFICYHp9alX74qCP0qVG3D3FAEw4epEOKiU5ANSKcge9BSJ0PH6U9DuGKiU85qQHDUFEynctSKdwqGPhqmjPP4UASKcrUytzuqBDg4/GpYzQBMDg5qRDhvrUKfdxUifdoAnTqRUiHIqFTT1PNAFhOlSq2Rn9KgU89akjOGqALAPepFbBz+dQRtzipI+lICdWwfY1IrbTUKNkVIp3LQBMpwRUicNUKPuHvUiPkUATodrVIjYOKgQ5H0qRW30ATI2DipFbFQqdy1Ijbh9KAJlbipFPNQodwp6nigpE6HafrUqNjioEbcPepFfJ96zKJ0ODipA3GKgVtwqRWyOaAJlfbUitioFfPFSI1AE6tipFbBquG2n2qQPigCcNnmnpJk+hqAN/dqRWyKAJlbj+tPRttQq/PPXtTg+KALANOV8nmoVO3pTlbdQBMHxUgbBquCQfWnK2aAJxJ6/nTlORUKyY605Wz0oAmD4HSjf6/pUQdvrTvMoAlV9x4pQ5qEMCfenBqAJN5xTvMz/+qoQxAoLsRQBKJMdqUy5FQlmxRv4/wNAEm9v1o3VHuIFBoAczetJ5npTN6+tJv4oA+IEO4VMrYINQKealU/L612HOTdxUkfWoQdwqRDkZ9KALEZxmnoecdqhU8ipQcUATIcrUinK1CnDVLGcHFSwJlbIzUqnJFQRnHFSocr71IEythqlj4aoEO4VIjYUH86ALEZxUiGoVOCDUnSgCYHAqReahU4NSIaDREyvxu/GplbHNV4zzg1NGaAJQehqXOOahjOQakjORQBMhw1SKdrVDGeKkX5loAmj4JFTI2RUAPFSBuM0AToeKkRqgDbakU80gJweKlB71BGcGpI2/+tUAWFbBz/SpA22oI3/hqVGxxQBMhwakRtpqCM84qWM9qAJgdpqRTtaoYznino2OKAJwccipFODn86gjOKerbfpQBYBwaepwKgVtv+elSA4NAEwOB9KlVsVArYNPB21LKRYRt3Ip6ncKrq+O/WpQflz/AJNSUTq27jvUitnrVdTmpFORQBYR88U5Xx9KhVsnFOVsH2oAsBtp4pytnpUIO0f0pytnpQBYV809Gx/OoFYMP88U5Xx70AWFbuKcr1CD6U5ZPWgCYMR705SCKhVyp/zxTlbLf1oAmDFaUSY6/pUW4qacHBoAmDMBTvM5qAHPSlDMB1oAm3Yo3+/5VCHx1/lTg4+lAEwPNGT6moQ4B6/rS7/9o/nQBLknvRnnrUO//ao3A0ATbtoxmmhqjMgx1/Wk8welAEvmfjSFyTxUZcn2pM89fyoA+J0ODUkZw1Qp933qVH4Wuw5yaM8/rUsZxUIPIqRTg5oAmj5WpEOVqGM5P61Kh5oAlRuntUynGP8AOarxnDVMh3LSAmHUVIpwahQ5WpFbK+9QwJ4zhqkjPJqHORUgOOaAJ4+mKkTlahV6kUkGgCZW3CpFPFQqdpqRKCkTZxUyN3quh61LG3G2gonBwf51Ipw1QocjH51Ih3LQBMpw1SKcH2qFDlakQ7hQBMhwfapUbBqANuFSK24UATRt2qVOjVArd6kDd6AJ1ORUq81ArcVKrbalgTIc1IpyoqFHx/M1IjYxUgTg5p4ORUKNg+xqRTg+1AEwbcKkXkCoVbaakVtn0oAmVtwqRDlfeoAfSpFbI4oAnRtwxTkbH/16iU5p4bdQBMjZ71Ijf/WNQq+etPV+aAJw+2ng96gU5FSK+KloonBzyKerZ+oqBW5yO9PVs/WpKJ1bsakVqgD7vanq/rQBOrbaeGz0qBWwacslAFgSc+lOR8VCr5HPWnK233oAnDYPBFPEnrVdXzUgkwKAJVPpTw+Rz/KoA2DxTlk5oAnRsfdxThJkVAG3Uu9qAJtymnBv9qoQ/HOaAQelAE/mN7Uok/zioQ5J60b2oAm3gCjeKj359qPMoAkDD/JoLKPeo9/H/wBak8zigCXzB70GSo/M59qaXJ7UAS+YcU0n3+tM3cdabvUUAfFqHFSJw1RIcVIprsOYmj5FSxtkfzqFTtNTJ1oGSJ9z/dqUdKgU4b61NGePpQBMD3qRTyKhjbIxT06H9KAJ1OG+vFSL96oUbIqRTuWpkBOhwcVLGeMVXRsrmpgelSBMnIqRTuX3qENjpUiP09DQBOpytSK2eagVttSI2DQUTK2eakVsHNRRnBqRKCkyZTjmpQ2KgTipIz8tAE4OOfz96kBxzUKNmno3agCdG2tUinafb+VQo3bvUitnjvQBMrbTUiGoUbd1qRDlaAJkbFSIc1CrbhUitmkBMhqRWxxUIbNSA5FSBOjZGD/+upEbPH+TUCncP88VIG3CkBOjdvyqRGxUCtuFSIdwxQBMjbTUgba3+eKhRsmno2OKAJ1bHIp4bnP+TUCtt+lSKcUATBg1SB81Crc5FPV89KAJVOT2qQNUKvnrTlfFAEyNhqkD85qENxTgeakosB91PV+xqBWzUivk1JRMpK//AF6cjZ5qFWx704NuoAsCTJpyvj3+tVw3zfNUitjpQBMHB/3qeGx7/WoN+fanK5FAEwcf7tODlahEgNOBx0oAmDBj707JFQb/AFpQ+TwaALAko3rUIc4pQ/qP/r0AShlJ4pwYjvUIcHFGfegCbcaXzG9qiV8d6Nzev6UAS7zR5hqLe3rRuJoAkyc9fwoLH+9UW7g+lIGyOtAEhdfWjzAKjMmDSeZ6UAfGaHj2qVOlQKcNUqHFdhykyHIqRGyKhU4I96kT71BRMpyuf8ipEPGaijODj8alQ9qAJQef881KODUKHK1IhGMUATKcNUicN9ahRsj6VIDnn8qTAmQ81NGeMVXVsrmpVPQ/nUATxnAqSM8VCrd6kVsc0ATK2R71IpzUIO01IjbfpQBOpzT1fAzUKnDVIjYPtQUiYHvUgbPNQqcN9akjODQUWAfSnjpkVCjYOKkRsHHagCcHvT1bvUCna31qVDg/54oAmBzzT1bPNQocH2qRW2/SgCwDjmnK2On5etQo2KkRsGgCZG4zUitioVOD7VIjYFSwLAPNOVuc1Cjf5FSK+DUgWA2BmpAfeq6NzxUiPjpQBMjZFSK24fSoFbuKerZoAsI1OU7T7VCrbqkV88HrQBMG2/SpEb0qurbT7VIDtoAmVtw96eHx1/OoVbPSnq2RzQBMrY96eG4FQB9vX86kBx0oAmDZ9vpTlk9agVqkV+aVirk4cgfLyKcr5P8AWoAxFPDZPvU2KJxJgfN+dOU9xUCuRTlbPSkBPv46Zp6nvVcSGn0AT+ZShuODUAcj3pwYE96AJxJilDg1DualD5HPWgCcHHT8qFdhUJYE/pTgxA60ASh/9mjeP7v6VEHYUvmH0FAEoYZpS+P4jUIf1FL5i0ASeYP71Bf/AGqj8wUeYMUASFx60nmf7NR76PMb2oAk8w+lIWJPpUe5qRm460AfHK+lSo2ahzhqkQ4NdhyEw+ZakRsjioUPzVJG3P1oLJweM1IKhjbHFSRnHFAE6txn86kHDZqBG7VKrbqAJgcGpE4NQo24VIjZHvQBNG3zVIhwahDbxUituHuKiQFhTgc0+NuMVArZFSg0gJ4zmpFbdUKnoakU4OaAJlbcKkRsioV4apA200ATIcjrUinK1CrZNSK2DQaEyfMtSI26oA2D1qUHnNAEyNuFSI2RUKtjmng55oAnQ5H0qRDnrVdWyakDZHFAFiPpinxnIxUAORUincPegCdTkYp6vjqahU7hUiNkUATK3FSIcmoVbIpyNUgWEbFSI236VCjZ/wA9acjYqQLCnaakB7iq6NtP+eKkBwfagCZTmpFbcP8APFQqcdDTlbdQBYRucGnBttQo3Y//AK6cjbfpQBOrZHFPU7qhVsHIpysGoAnV8dfzp6nHSoFfHWnhsH2oAmVgx96cD/kVCGBp6tzz+dAEwalDc+lR9uKdvFAE3mFT607fkVAHwfX604PxU8pSZOJDjsacHyf8KgDbTT1fNKxRMGYd6cHBqBWx6UolpAWA2eho8w49ahDBqdvx3oAl8wE/dpQ4x1/WohJxzS+YKAJg5Pejcw71CGU0Aj+9+VAE29qXzPaos/7Royf71AEvmH0o3mosn1NGT60ASeYcfyo3N61GW7Z/+vSEqKAJC3PP4UhdSfvfrUeV/pRvoA+PkORipUORUIOGzUinBrsOMmU5NSA5FQocGpEbBoKJ0Pc1J1NQJwamjbtQUSg1Kh+YGoIzj+dPQ9vagCwrYPt3qQHBqFGqSPnNAEyH5qkRtv41Ah4xUqncDSYEytg1IrbeKhQ7hUiNuHuKgCdHx/SpEODioEbIqRTkUATIecdqmjbtVdWzUitu/CgCdG7U9Dj1qFG3LUiNlfxoKTJkOM1IjbahU7hUgOR2oKJlbb16VIh2moVbIqRGz1oAmVtpqRW2nNQo3Y05W2ntQBYBwc09WyMioEbBqRW20ATqe4qRTkA1ApxUitx+tAEwbipFfNQA9/8AJqRTnpQBMr8VKHzVdXyf51Ir5qbATK2Dj1qRX2j1qBW3U9GxU2AsK200/OelQK2Ker5GRQBOr5p6yYFQK27609XwOaAJ1baaeDuqBWxT1bPSgCdXx1pyttqFXzx/OnA7T/jQBMHz9aesnHIqANupyv60ATq392nh/wC961Aren/66eJKAJc+9PD+tQA4PFPD89PxoAmVvQ0b6hDA04NQBMrU4SFV6VAGyafu/HFIq5N5mTQrAnjrUIbmlLYpcoXJwT/epRIcdKgVsU7cc0WGTbwaN4NQmTigyZNTYLkwcHv9KCwPU1H5gH40m7B70DuShlPf9aXIz1/WojIDTd60WAmY4HWgSAVF5i/3f0pPMx/SmBMX5pvmHPSozLRuzRZiufIiHjbUqHctQq3INSK2Dmus5CZOQKkQ5FQDg/zqVW5FAyZWyPpUitxUKNipFbB+tBZOvSpR61DGe1PRuaAJlbPNSq2Gqup2n2qRWwf60AWA2KkV8VDG3NOQ4oAsKcc09WzhqijbtT0bBx+VTICdWxzUinBz+dQI2Gp6NjipAsK2Dnt3qRWwc/yquhwcVKrbaAJ0fFPDVCnFSI2DigCdTgU9WxUCNj+eakQ4NBSJgdpqRWyM1ChxUittoKJlbNSK26oEbHNSg8cUASocHbUit2qBW3flUitke9AEyttNSK201CrZ4p6NyBQBOrY+npUiN3FV1bb/AJ6VIrY6UATB88/jUivUCN3p6njg0ATo2R+lPV/WoA+6nrJzUgWFbaaerZ5FQK//AOupFbbnpUgTBt1SK+TVdW59KerZoAnVtvvT1buKgD09W9KAJw/rTlbbUIf1pwYgUATA5FP34qAMD/8AWp4kxQBMpx0pwkx1qFTnoacJCP8A61AEytjpTxJVdSGpwYigCYNmnBm9ahDBqcGPrQBN5mRSg+hqESeopQQTQBMGxS76izS7zntQGpKHHt+VAbNR+Z7Ubx60ATb8mlElQg4/Gl3UASbv85oDcVHv4o3YPb8qAuSbsHpSiTjpUW76Ubvp+VFh3JBJg9DRvwajzQX460BckLZFJu9/wqLfk0FlAoEfJKGplftUAOfrT1ORmug5yxGcjHpUiHIqFWwakDYYUATI24VIhyKgU1KrUFImU5H0qVTnmoAcdKkU7TQUTK25akVs/h61CrYb2qQNtNAEy8rUinetQo2D9akB2/4UATI3HuKkVsj3qFWw2akDUATKdwqRDuH0qBTjmpQcVDAmRuKkRtwqBWzz0qVTg0gJkbP1qRG3DmoA3pT1bNAFiM8fSpEbmoFbIzUituFAyZWp6tzUKNuqRWoKRMhwfapFO01Apyaejc0DJ0bFSA5GRUCttNSBsGgCZDuFPV89aiVvTvTkbcKAJw3ODT1bH0qANk809Wx1oAsI+KerZ6VADtp6tnpQBOrbh704PjrUKtn2NSK2TigCYPxUgbB4qurY/pT1PH+eakCdTmn7/WoA3+RT0akBOr7aejZHFQBiO9OR8+1ICwrZ69acGwOKgVvWnhiP/r0ATI+6nByKhVt1OVivvQBMGDU9ZMdagVgf/rU4MQfWgCdXzShmFQqwb604MRQBMHB+tOB461CH554pRyOKAJt5pQ65qEOw96d5ntQBMHz3o3NUQb/Ipcn1oAmEnrR5imoQ5HvTvM46UASAginA4qEOoo8wGgCYHb3o6iogQaXPufzoAk/GjPNR59z+dGfegCTNGeaiJ460nmCgCUtgUgkFR71//UKTzDQB8nIdpqRDhvrUKsCtSIcr710HOTxnBqSPvUCNx/tVIh4H1oAmTgVKh4qAMGFSIeKBosIcrT0ODioUNPU5oKLCNkU9DUCNnmpAcjNAydDzipENQKd4qRDke4oAnRucU9Dg/wAqhU5FSKcigCdGwafGcGoUbdUituFJgTK201IhwfY1CjcY/wAmnocVAE6NtqQNg1CjcY/yaejY4oAnVsc08HmoFbaeelSI2DQBODmnq24VCrYP+zUgPORQBMGyKerbhzUKtk5p4bNBoiZHqRW2/wCelQg5p6vmgCcNjkU9Tn/PWoFbB9qkDY+7QBMrbhUiv61ADkU9X9aAJo2x/SpA3p0qBG29aer+nIoAmVtwqRW45quGzUivQBMrc/1p+cc1Ar7akVvf8KAJlbdTlbC81CG3U4Ngc0AWFfFOVuagV8U8NmpAmL05TkcVCsnHSnBqnXYCwH45pwbb71Ar4HNODYPFAE6vxzxTlO0e1QiTmnA+lAE3mBqcGx3zUIkoDZoAnEmKcCDUAf8AGnbwTQBMGPrThJUAbI+U8UocigCbevqPzpQfSog/FAYGgCYs2KA7Af41EDg9aXzD7UATeZz0o8we/wCVRLJjtS+Z7UASbwRRvBqPzKPMzQBJuFG4GoxJx/SjzPagCTeM0GTFR+ZR5me1ADy5pCzH2qPe2KN7GgD5TVuc09W54qBDhvrUqNjiug5ydWxzUitg/wCeKhjbjbT0OOPyoAnU4b61Ipw1Qo3rUiH5aAJlbFSBsf8A1+1QKeakR6CidTg1IrY/GoUbtTo+DigosK20/WpMnHpUCNT0ODigCwjY5qRXwc1XVtpqRWx9O1AE4OTkU9H5/nUIbbUinbQBMDx/KpFIYVCjflT1apAnRs8GpEbI9xUAOeRT1bPPepAsK1PDhRioA24VIjZ4oAmRtoqRGwKgV/4aerYP1oAsA4PFSA5FV0bBqQHBoKJlbIqQNkVArbqepz+FBSJkbB9qkU7TUKvmnI+0e1AE6tnkf/rp4fP1qBXx/hT1bIoAnRtp5/CnqcGoVbPBpwbb9KAJlbd9akV81Ar5NPD5oAmD4FPVvSoQ/NPU+lAE0bbvrTw+B/Wq4f1p4fbQBMG/u08MPSolfB4pwcGgCZX4pyvmoVOOlODcVNgJlk56flTg2ah305X/AAosBOJOKUNnpUIenBs1IEwkx7+lODhjUO8qKcJMnpQBMGIFO82oFbI4NO3nFAEuVY07cc9ah8wH2pVbnigCcSUeYPT9KhDnPrTvM9qAJAy/Sjdz1qPzFoBBoAm3GjewqPd/tUbj60AShzmlElQhjRvPrQBN5lHmcdKh3NS7zQBIXNIHPtUZdt1JnPegCUsSaaWHrTQeOtNLhTQB8rq24VIrZ+tQq3NSA4NdBzkytnHtUgbcM1Cjc1Ij4+lAEynOP6VKvIyKgU4apEbJoAmU5H4VIrZFQq22pFODQBMrc1IpqFDg1Ipwc0FEysWqReVqANjmpVb0oKJkbIqRD2qujZGakU5HvQBYR8nBp6uc1Ah3fhUincvvQBMh2mpFbH41Cr5HvTkODigCwr4NPBzzUCVIr4FS0BOjcZ46elPU7qhBwc05W5yKkCwh3LT1bjBqEGnq27jvQBOr4+lPVtv+elQo3anK2DQBYU4NOVs/zqENtqQc0DJg/FOVvx96hVt1SK/NBSZKG2/5608Nn61CH5pwODxQMsK+4c05Xx71CrbjTw+36UATg/NTg+VqFTjp/wDrpwYNQBOr7eO1OVv15+tQB8GpAcdKAJg+4U4OR71Crg/1pwfHvQBMGBNPD+tQq2eVNOD4oAnVsClD5PNRA46U4SfLzQBNnbThJuqFW5pQ/PzUATq3FKJB6VCp7/lShzj1qQLAfINAl5qFXHb9acHoAm3inbyahV89aA+f8aVgJvMpwcf7tRCQ/WgOBmkBOsmT1pd5FQBs07cR3oAm83Hb9aA6kVCHPr+lAcg0ATb1oBqLzDSiSgCYP/tfnRu/2qh3qf8A9VAdfWgCbd/tUbufvGod+aPMGetAEpfjr+NIXAqMSDNIXyeBQBLvWgvj7tReZz92kMhzQB8uIecflUiHPH41Ar7vrUgbcK6TnJlP8qmRuNtVw+Rn0qRTn60gLEZ7U9DxtqBG3D0qRTuFAE6NzUiNgbagRtw96kVtwoAmRvmqRWw1QqSw/GnRnAoGWFepFbaahT3qRWoGTI3NPVsGoVODT1ODQUThueKejZ5qEHaakzzmgCZX3VIrbqgVu4qTdQBPGTn6U9WNQK26no2eKAJ0fH0qQHHIqFH9acp2t/SpYE6mnq24e9Qg45pyvnpUgWFfNOEnrUKtuqRGyMH/APXQBMrc+1SBtpquG21IGxQBMrbhT1fjmoFOR/hUofIoAlD4P9akU4/wquG2/SpFbnigpE6tkU9ZMnFVw+TTw/rQUTg46U5SDUIYrTlbd9aAJ1fB5p4PHH/66gVyDzTqAJw2etOVtvvUKvu604Eg8UATK4NODlfeoVbcKcGxQBOpz7f0pQ5FQqwP/wBanByooAmDAjin7yKgDbqcGI96AJ1bPQ0u78ahVwR9eTTgSO9AEwfdSqcVD5nqKdvx3oAlD4HNOV8+1QiQ07zAetAEwbigPjsKhHPenAlRSAm35oV896hDkClEmaVgJyxPegyc9ag3jFO3UWAl8w+oo3/7tRhv85o30AS+Zml8z2qHeaN+DRYCYyUnme1RF8mgOc0rASl6Qyc9qjL8/rRu5p2Ak8zntRux/wDWqPccdaaDn/8AXRYZ8wg4OakVuc1AjYp6naa6DmLAO05qQHvVdTtPtUiHaakCcGpFb0qBTtPtUivg+1AFgH0p4OeRUCtg/wCeKkU7T9aALAb+KnZz/hmoVbBp6kA5oAnRsVIrcVCDinBs0DLCHinI/FQqeKkBzQUTo2KejYPtUIfI5qRGzQMmDbT7VIrY/wAKrqxzUmdpzQBOrZ5p6tvqEHFOU5HFAEyN2qUPgVArbhT0bPFAE6ts96eGyM1Ar4NSIxFSBMrbvrUiPk/SoAe9PV93WpAnV+eaeGxUKNk805W20ATK+TxUgfdUA9aerbqAJ1bHX86eDioA+DzT1bbQBMsmRTlfI5qFWzTg+2gpMsA4/wAKcpyKhVsU4PuNAyZZCBTwe4qEPTs4HWgZOHzxTlbb9KhD+tOVsdKAJtwJpwbHvUIenA4+lAEwkBpwOO9QhwacDjpQBMHzTgdp61D5nHNKGB6GgCcSetKDnoahV8df0pQ4JoAmDYNODhqhDEf/AF6cHz1oAlDccGnK+PeoAQxp2SO9AE24NS7sd8fjUIel3r/kUATBzjqKA9RBv9qlBwaAJhJk0F1zUO9qdvoAkyM/4UA571H5me1G8Z9KAJc+9BOO9Rb1oLrQBL170biO5qIOvrRvX/JoAlzn+Kkzj+Koyy0B6AJNyijcCf8A61RmSgye1AHzGr5Hv1qRH3VCDn5qerdDXQc5OrZGKkRs+uarq2TkVIrbqlgWEbjBp6N83NQI24VIp3CpAnRucVIrc1ArZ781Irbh70ATK23ipEbFQqwYf54p6nPH60ATocGpA2D/ADqFGzxUiGgCZWp6tn/PWoFbb9KkVsD1oKuTBs09X9etQhqeGyKCkTq24U8PjrmoFbj39alD0ATBtlSK2OlV1fB5/wD1VIDtoAmB3dKkV91QK3pT1OaAJlfaOakVsCoVkyacjbTigCdW/u09W3fWoVbBp6tn2qbATK3rT1bbUKNu605X21IFiNsNTlbcfeoFbI4p6vnpkHvQBOr4609Tg1CJOeacpx/hQBMrZPHapBJzVdXyf0p4b1oAnFO35qFW/L0pwfdQBOr496UMBUKtinhsmgonVsnmlDbaiEnr/wDrpysRQNE3mZpwOyoA/NOU49/60DJ/MyOlO3YqAPz81KrDselAFgSetLnPQ1CJaUHB4/SgCcORS+YDUIYj3pwl55496AJQ3HBpwcgVCCG6UoYj/wCvQBNvBpQ2DxUPmf7NKGWgCcOQaXzPaoQSO9L5lAEu9aUNkfeqLzCO1G9aAJgdvegO3tUO4Y607fnvQBLvOaUSe1QhiBTt9AEgejzPao95pN5oAl8z2oEnsaiEh9qPMNAEvme1JvOaj3n2pCxNAEm5qNxqPd/tUbv9qgD5nRtp/lUiHBqFG3CpFbPB/wD110HOTIcH61Irbaro3b2qVG5xQBOj96kB5yKrq20+1SK2D7VIE6nPNPR+/cVCrY+lSA96kCcNT1bcKgVvSpA2fu0ATo26pFbd1qBWyKejZHvQBYR+1OVtv0qFGyOaejYG2gCcNUiNg1XRtowakDY+lAydWyfenq+TUAOTT1bdQWWFfnn65p6vg1XVu3+TUit2NAE4bbT0ORn/ACKgWTH0p4PHFAE6vmnq+BtNQB8nipA4b6+lAEynaaeGz0qBX2mng+lAE6tvp4kx1qur+tSK+D9aQE6nHIpyvk1CGwOKcGzUW1AnD+tPDbRVcOc1IrbfpQBOrZPFOD461Ar5p4fHWgCcHHSnK+6oQeODSq/HNAE6vg08EGoFfFODjPFAE4kxT1bcKgEmDzTg2ehoKuTB8UoNQhyP89acp3CgLk4f1pwbJqDcRTlbJoKRMHKineYtQhqdvHegCbfS+YRUIOB6Uok/KgCYPnvTgStQqcinBvQ0AS+Z7UodWNQrIacHBFAE3SjcfWoQymnbs/xUAS+YRSiT1qHe3tSiTHagCXepNAINR+b7UAg0ASg+9Lu/2qhyuaUYNAEuT60Fqj6UUASBsUu41Fu96Cc0ASbvejd71FkE0mRQBKTik3qpqPcv/wBegOtAHzWG/iFSA7hUKnH0qQHafb0roOVEyNuqRDkc1ADzxT0bP5UFFiNs05XwcVChyPf+dSKdwpWAmRsH+VSK201Cr+tOQ4OKkCwDg1IGwePxqujYPtUitt+lICcNjkU8NnpUKNzxTw2TkUATq2761IrZHNV1bNShs0ATI3Y08NioVbIp6NjigCdTg1Irc+tV1O009W5oGidDkU9WwPeoFbipA+aCyYSYqRTgioA/NPVvTpQBODuGaesnHNQZwaerbv8ACgCZH2jnp2qRW7iq6ttqRGxQBMrbhTg23rUIbNSK2etAEwbFOU5qENzwacr59qALCtng05TtPFQLJj/GnK3pU2AnV9xp6yY61ArbqcrbfpUgWAcjinK/FQA5PBp6vn60ATBiKcr5NQA+lPDg0ATBiPenK2ahyQRTg+aAJw+Ov6UocEVCr496d5nFAEwJB9acJBUKtgcGnLJQMmDU4NioAaUORQO5OG5+lKGNQhxinBuf6UDuSbwacG4/+vUYbmgNmgdyYMRQJcdjUSv6H/61KHI60ATeYD1oBx3qLfz0NKGXFAEwJ9TRubFQ5pQcHg0ATeZge9J5gz0/Sow2DQHOaAJt4J/+tQHWohJzS+bQBLvHrRvAH3v1qLzef60eb7UASBwf/wBdG4VGZAaPNoAlyKQsKiMntR5vtQBJ5me1L5ntUPm5FAds0AfOCNxtP4U9GxwahVtwqRGycV0HGTIdh5qRG2moEbNPQ87aCkThs81IrZ5FQK201IrYOaCiYNuWpFbcKgBz0p6ncKALCvmnI2BzUIYMKkV+1QBMp2n1qRGwM/jVdH2/0qRH2/SkBOrZ561IDn/GoFbHSng55FAE6tu+tSB89arq26nq+etAFhW4p4+U/wBKgV8nmnhtooAmVwRUitmoM09XyaCrlhWpytioEapFfAoGSq3PH5VJu3D0qANkZp4fdQMnWTnmnjg1CH4pyPtzQBMjbue9Sb+Oarg7hT1fA5oAnDYpwOahU4FOBDUATK+Pvc1Irf59KgElPHB4oAmVtw96crf/AK6hD5NOV8f/AFqQEwO7mnh8D5qgDU7zMHmlYCdWzinCT1qHOR1p3metSBODjp+VL5nrUKtkcU4Pjr+lAEwPHFPElQBvSnCTAoAmV89KcHxUIbPNODmgCXcDzTgxHvUPmDvTgTjrQBN5gFKCCahD4NKGHbigCYMfrTvM9qhWTAzThJxzQMkDj6U4Ng1D5gwadux3oH6EganB6hDECl8ygLku8ZpQRUXmUeYtAcxMTnvQGwKh3A04N70DuSeZR5vtUfm+9G4+tA7ku/igyY96i3UpcmgVyQPg0Fqj3UhagdyUPjtSF/ao9xo3e9AEm/FAbH8VR7vejdkf/WoFc+cgc8ino2cVCDg1IG2mug5CZW3f71SA7h71AGzT1bNAE6P2/wAmno22oVO4f7VSI2aCiZW2mnhv/rioFfbUitjFBRMG3VIrbjzUIbHSnq+48VIE6Nk4p6NioFbcKkVsnmpAmB21Ipx/Xiq6tt+lSBsD2oAmRsmpA2+oVbnIp4boe9AE6vk4p6vioFbf+FO34+lAFhW2/wCelPVs1Ar7RUinjNAEyPg05W5qFX3exFOD7aALANOV84/SoUbFODc0FXJ1bJwaeHx7/wBahVsmnBvSgomVtxqQPz0qBH/wp6vnrQBMGK07eN3+eahD7R7U4HI/zzQBYEmacrY/wqvvIqRZM0ATK+frTlO2oQ24+9OVsCgCZXyfSnK+2oVbcKcG20ATBsn3pwkxUKvn8KeH2j1pWAlDZ56U4SEVCrZ9qdvIpATbhTg5FQhg1OVsH1qbATBw31pwfHvUIkz1pyvQBN5vtTgc96g3n0pdwoAn3kUeZ7VEG20okoAmBzS72qEMDTgfegCbf60b1NQ7yBS7/WgCfJI60B8f41CHXP3v1pwbHegCXzKUS8d/yqHcaXefagCXzFNG9c1GJPWjzKAJAVanc+tQhwaAwPegCbNGaiD/AO1Sb+etA7k2aM81Fuz3pC2O/wCtArkxc5/+tSdqjDZHU0hYY60ASFgKN4JqPzAKDJntQB86q20+1SI20+1QI3Y1IjYOK6DnJ1bbUitiq6HB9qkVtpoAsA56U5Tu+tQhsc0/PcUAiZHzT1fjnvUKtuHvT0bIoLJ1baf88VIrYP8AOq6vtNSI200DJ1bdzTlbJ5qIHI4pytuHvQBYRs8U5XwahRqcr7agCwDjpTlO7pUKtjp0pwbd0pAWEbJ96cr46/nUKNn61Ir5NAEwbb9Keh4yKgDbf89KkB44oAmVt2PWnh/WoVbPSnB+KAJwdtOBzUIbafan5wOKAJ1bmnK2KhVsn3p2/wBaCidTk04PUCvzmpA9AyYNj6U9TkZqAHjg05WyPSgZOrY608dagElPU0ASh+efwp+8g1Cr5pwPPFAEytmnbmFQCTHWnq+2gCYSA/7NODHHBqENTlYgcUATCTn+tODYqESZ60oJ9fyoAn3g9qcrccVXVyBTlfI64pATCTA5pwIPSod9OVhSsBNuNODj6VDk+tO3/wB4UrATA0KxFQhs+1OBPrSAm8wHrQrDtUO8inCTcKAJg7A0ocjrzUW7PejeT6fnQBN5mevFKGB6GoRJgUvmZP8A9agCbJo3H1qEMDS7uOtAEu9qUORUW5vWjcaAJt/HSk3j0/TpUYcijzPagCXzOOlHmVF5h9KBJjrQBJv/ANmjeKZ5tIJfagCTzP8AZpfM9v0qMyelIJCKAJDIc0eY3tURkJFBcn2oA+eVbNSI2VqurbvwqQPn610HOTo2OKerc1CrZFSI3Y0ATK+0+38qkBx0qBG2jFPVttAFhTTgdw96hBx0pwbPIoAsI+f89acrbT/nioQ2761Ij0FpkynFPDZ6f/rqBW2mnqf/ANVAycNuHvTlY5xUQbNPVsigCZW2/SnhueKhV9tPVsGpAmBzT1fnBqAHdUivnrUgTI2O/FSBuciq6ttP+eKerc8UATgginq/rUAOef1NSB+OaAJlbBp4ORkVArbfpTlf0P4UAWFfIpynB9ahV805W2/SgCZWp4bmoVbJ4NKsnPNA/UsK/FODg1AGp4fPWgZNvIp4bFQK2KcGyKCix5n4UqEg1CsmP8acrf3aAJw+4U7FQB/WnK2ehoAmD+tPVsVCsmBz/KlFAE/mcUoOah8zFKrjPH696AJg5xTlO4VCH9fwpwfNAEwbFKj/AN6od2KeJKAJQePanByPeoevelDEY5oAmDA0u7H/ANc1EHyOaA4zxxQBMHwacJOKhBz+FHmYqbAT5BNLn3qHeCP8adiiwEgO004Se1QFqVXOfWlYCbzfagsM1F5hpRIBSAk3LSg5HWovMFAZT3/WiwE27/aoz71DlfalJA70ASgn1o3GogePpSj60ASbzmgsfWozk0jH1NAEpY+tAf8A2hUVAwPagCQt70btp+9+ZqPikBXH/wBegD58Dc5FPVsioVOGp+fSug5ydWz+FPRs/WoAwJ4qRWyM0ATq3Y1Ir4FQB93X8qcr4/xoAsK2PpUgb0qurbfpUitg0ATA5qRW3cVCGzTlbd9aAJlfnmpFba1QCTJ5xTw+0c0FXJw2eRTw2RUAODmnqd31oKLAfApwO01AH45p4fHvRYCYNnpUgfIqBTkZFPDDvUgTK+0e3rTwecioFfHWpFOBx0qQJgwNPV8df/11AGDCpFkwMGgCZWx9KeDuFQByKcp3exoAnD+tPV8CoVf1pwOP8KAJw3cU9XyOarhtx96eJMdaAJweOKcH/wA4qENxwacG3cUATBsU4PUIPftTg+T3oKJg9ODA1Cr04PkUDuTq+0UqtUKvTgcmgZOJMClVuKhV+KcHUn0/rQBOJMU4EEVAHIpVbI96AJwSO9Kr/wB6olc4pwkoAlzx7U8S57VX3A//AK6dnFAE24GnBiBwag3/AN4UqyDs34UATiSlEi1CHP8A9YU4SetAEoxSg4PBqEMpPFODEjrQBNvwPWk31GJKUSfWgCQOv+RTg+2oQ6mjcpoAm3/Wl8zioufWjJx1NAE28f5FHm1EHOO1HmH0oAl3jpQGDf8A16i3+3FLvB7UASBu1G4VEHFLvUdqAJNwB60uRiot6+n6Ub19PyosBIGBoLKKj35PSk3/AOzSsBLuUUb+ah34pfMNMD5+WTH0+lSIcVXDY+lSK20/7NbM5yxmnI2eahRsH2zTwc9KkCdW3CpFbPFV1fJ/zzUiNkUATrJgf1p6vtH+eKhRsmnK236UAWFbBp6vk1ApxTw2eRQBOHzTw+ODUAYNUiv/AHhQBMDt+lODbhUKvg+1OB7igpMnWSnq22oVbcacsnP+NBRYBxTg+6oVbH+FORt31oAmV9owakV9o9agD4HNPU7RxU2AnBDU4SetQK+T6VIJPWkBMDt+npTg26oVbb705W3UgJw3PNPVsVXBx15p6Pj39aAJw+72pytt+lQht1OD7fegCdWzTg9QKc9Kf5nHNAE6vxTlYGoVfj605Xz1oAmDYpyybjUO78fWnB8nmgCZWxTg/FQ5alV+aBk4anb81CG4/wAaUPQMn3YpQ/HNQ7qUPQUT7zxTg2DUCtmnBiKAJg4J9KcG/wDrVB5lOVs96AJRJg04PuqLfQGyP50ATg80B2qIE7etKJDjtQBL5nqKUNjvUQlpQymgCbd70pf5en61EPajJHegCbzB6H8qBJ7VF5ho8z1FAEuad5pqEPkentQJP9qgCbcVo38VFvyfvUoODQBN5h9P1o8zj7v61DuIoLmgCbzPajzPaod5/wD10b2oAm8z2o8z2qHfRvP/AOqgCbzcdv8A69Hme1ReYaQsTQBN5me1NMhzUYc0F/egDwFXzwacDj6VCr+vWno+Tiug5ycNtPtUitjpVfdtNODY+lSBYByMipA+ahVsCnqdwqQJ1bd7U8Sc/NUCtkY71Ir7jQBMp2mpFbnNV1bB9akDYoAnV9x4p6vnrUCtnpT1YN/npQBMrbfpUitxVdXx1/OpFagCbIanK/HNQg5+tSBwfrQNEwbb0p6tnvUAbb705W44oKLAk7GnK22oFf8AvU9W2+4oGTBg3SnB8VEDkf4U5ZPX86VgJ93vTkbdUIO3p+VODbqQE4fBp4PFVxJgc09W44pATh8nmnK+PeoRID/9enA7elICZWz9aeJMdf0qBX4pyvigCcHB4pwfjmoA3+QaeJCP8aAJw2fu05XyahBzQHx96gCwHzThIO4qDd2z+tPEnrQBLu96Xfz/APXqHI7U/wAz2oAmBx3pd3FQq4PtTskUATqTShs1XDYpwbNBVycPS7hioQ+KcrZoC5MG+tLuNQ7/APJpVfFA7k28etOD++ahDc0K2RQMn8w5/wAKXfn+VQ7iKN/PrQBMWA//AF05W9DVcScf4U7evrQBNuagSEdqj3Ejr1oDEUATCT1o8xaiD47H86USj6UASAgn+dLxUSuoo3A/yoAlzxSjpUO4HvTs+/60APzilyahDU7d/tZoAkyc0ZJ71EG3Uv4n86AJCSe9IaZu9/1pu4ZoAlzmkqPeAaPMX2oA8DD5HvT1bJqDduFSK+TXQc5MjbTUgO0/0qBGz1/Ono23vxQBOrYPFPQ5GRUIOKcr/wCcVNgLCtuFOVuOfwqEMGFSK2etICZX55qRWK//AF6rhsGpFbA9qQEynd3qRDke9QK/PFPDbhQBOr4PP509W2mq6vjrUiNj6UATg7ulPV8nmq4ORUgcNQBMG205TzlcVCG208HuKAJ1fdTg2KhDhqcH2n1oKuTqc9OKer+tV1bIz0qRHz1oKJgcCnBgahBweDTg4P1oAmV8GnK+Tx+VQq5FPDZ6VNgJg/rT1f8Au81AHxTwfSiwEyvkU5W2jjFQB/Wnq2Bx0qQJt9ODbfpUIkBpwYg0ATggnj9KVXxUIkHenBjQBMHDU4MV96h3AmnB/wAaAJhJz3FOV9tQ+YCvNOB54NAE3mZNLnHfFRB+OaFb0oAsK9AYeo/OoVfaKdvBP/1qAJgcGlDgmoVfA/zxThJQBNv4pd1QhlJoBzQO5MJMCnB6h3YPNO34oHclDY//AFUofA7VCGB79aXdQFycPkUK/NQh/rS7s0BclJ5pQ3vUW6gvigCbd/tULJj0qIPx9aXfmgdyXzOf8aTzPaow/wBaN/FA7kxejeMf/WqIPijzKAJd6470bwf/AK9RGSl349KAJA4x0oLqD0/So/MwKBJQBJvAo35NReZxSiSgCQvjpSGQgVGXpDJzQB4MGyeKerbhUCtnmnhtw966DnJxJ609XwOahVs05W29aALCPinq+fumoFfHvT1bHPagCdWz25FSB8mq4bdT1bd9aQFhXx1p4bZVdWI4qRWx9KkCdXp6tn61CjZ5pytn6+tICdXx1p6tgfLUCvtFPVto/wDr0ATKwJ96eGyeRUAbd9akV80ATK/409TzxUG/HWpFOD/SgCZXyKcHIPqKhV805W20ATq3OVp6vk81ADTg+TzQUmTg7fTmnBwahRtvvSh8mgdycORTg2elQhttOV80DJxJinK3oah8w04NnpQBOJMdacr46fSoBJjrTwcj+VSBMJM9acrY/wAKgEmOtOVueDSAnEnHNKDjpUIkxTlOOlICbf6inB8dD+FQiTHX86UHIzQBOr4H9aUMOxqISYpdwJoAnV6UOGNQqxFOD5oAmyR3p2/2qBX54NOEmPegCUPn1FODEVCHDU4cdKAJvM9aA4zxxUQdh70ebz0oAnDH1pwk/wAiq6v6Gnq5+tAEvmLQCD0NRh8GgMG/+vQBMCcdaN5HvUW7B4NLub1/SgCQNz/hTt4z0qIPijzPagCXf/nNG73qPzBnpQXGKAuTBjRuIqEHP/66X8aAJQ/0o3/Sos8YzQDQBLvxQHqPdQGYf/qoGSF80b8dqjLN/kUM2aBEnme1G/moySD+tBOe9AEgb2pPNx/9eos+/wCtLQB4QDjpT1fPTrioFODUgOOldBmTK+aej9j/ACqBXyakD560ATK2we1PVuKgV8GpFbHNAEyNu9v61IrbhUCtT1fI96AJlb1qRW2VAshJ5p4bH0pATq2elPV931qBW4609G3ikBOr4/xp6vtHrUKP2NOB21IE6tnoaer568Gq6tuqQSZHNAEwfbT1bB4/KoA22pAcdKAJg/PPFOV9v+elQq+acrbT7UAThqeHz1quGB/nUivnrQBMp205X3/WoQ3pTg2R70ATFyBTkYFqhD4pw+YcUFXJw/NKp3VCHK05TkfWgonD4pytUAcrTwc0ATCTFOBz0/OoFfFODBqAJ1fHvSq2ahEjD3pwYEVNgJtxHvTg4NQhiBTvM9aLATByKUPz0xUQbBHP4UvmcUrATjijzD6VCrcU4Oc+tICbfn2pwbA4qFZAetOzQBL5metKGz3qHewpQ+TzQBOHI7/nQJeeelR596N7UATAq1OzgVB5nqKUMB3oAmDEUof1H6VEGPrQHI96AJg+TxxQGyevNRiT1/SgSDH/ANagCYSH2/KjeR6VHmjNAE3mf7NIJMHpUW5vWlDkUASb1pd4A/wqLzfagSc80AShgaVXyOtQ+ZnsaUuPegCbdj1o3571DvWjetAE27Pc0Zz/ABGod6//AKqN6/8A6qAJmOB9KaHyaj3r70hcYoAl3qKC6/8A66i8z2o8zNAHhW7FSA4NV1O008HHSugzLCncM09Gz1quGB6VIjZHNAEyNjipFbbVdW2j2qRW2/SgCdT6U9W3VArf44p6tuoAnV+e1PV9v0qBXx/jTw2P8KAJw1Kj5qMNnmnK2RQBMrY4apA3PtVdW2n+tOBx0qQLCtvp6vxzUAYNUivxzUgTK22nK2elQg46dKcH59DQBYV8nmnBttQCTjmnq2KAJlbdTw+OtQK24U4SECgCwGx/hTlbIqAN/dNPV80ATBmFODZ9qhDFacrbqAJlcj3p6sCKgDMKcGzz0oAmD4pwPNQqxX3p25SKCrkwcinBwahDlevSnCQNQUTBsf4U4OGqANinCQHrQBOG96cr8c1XU56GpFk45oAmFAc4qEFWpwcj3pATBxn0p2T61D5g96XIz1+tK3YCYSetKGz3xUIcqPWnB8n3osBMGOKXzMdRmoevelEhBqQJg6+tO3e9QiTNAYE8fpQBNvalD+oqIN7n6Uok9qAJSwx1pwYkdah8wUb1Pf8AWgCYOwpfM9qiB44NAZhQBNvBFCtk9ai8w5pfMz2oAm3c9T+dG/H8VQ71/wAigNn8KAJt7Ub2qLd/tUZz3zQBN5ntQJPaog5I7Ub2oAm8z/Zo8z2qHeT6UbyKAJvNo8z2qHe3rRvNAE3m+1IZPaot5X0o3EmgCTe1G5qiLc0ZHrQB4Yj4qRWwarpIDUits+ldBmTK/NSBw1Qhu/8Ak04PmgCwj+tOVtv0qEPmnK+2gCZWz0qQNuqANn7pp4YEUATrJx/nmnocGq4fAqRX2j2oAmVsnipA2faoFbPIp4fPWgCdXx/jTlbnioFfAp6t6UAThsn0pySc81DuDU4NtHtSAsKfSnBg31quj1IHVjSAmDkHmpAcdKgDkD1pyt3FSBOHBpwfb9KhD+tOWQ+tAEytuHBp4fHXvUCtuPFPV8Dn86AJgfSnhsioAeMinhs9aAJlbb9KcrZNQhiP/r07zBjmgCZWxTt4I5qFWwOKd5gI5oAmDFacXBNQhuOKdv8A/wBdAEwJU0qyc+lQqcHKnrTw/rQVck3ZpyvtqEPnv/8AWpyuRQFyYOGpwbjr/wDXqBXWlzg0FFgSetAcE+9QiTAp3mZoAmDkf40vm+1Qq2enP9KcJMD1oAlDA04MQOKhMimnbsd6AJQ5HWl3hqhDkCnCSpsBIpz0p24ioVZWp2SO9FgJlk5o8yog5pfM9qAJAwPenAkdDUO9SaN3H3qQE29vrTvMqEHJz1o3tQBMZKN6mog5pRJ7UASb1oBBqPzPak3ikBNkZo4/yai3rRvWgCbd/tGkz/tVFvHvRvWgCXPvRn3qLev/ANejetAEuf8Aapc+9Q71o3r60AS596TcuKj3rR5ntQB4aGzUgk28VXDZp6vk10GSLIbFOB3moEkweaerZ6UDJ1f1p6vtFQq24U5X2n1oAsI/ftTg28VCpwO1OVt3tQBOHx1p6tge1QK+eKerY96AJ0fLcU9X3VXVsipFfPXr/OgCZW2inhqgV8e4p6nvQBOHzTg5B5qESZPNODbRQBYU9xS+Zz6VErY6U4SZ60ATB8e+aerZ6VADj3pytn/CpsBYEvrxTg2OlV1kx1qRTjp+VICYPuNODmofMz14pwJHf86QEyvk/LT9/wCVQLJk+lOEhFAE45FP8yq6tn7tPEn+RQBMG9DT1kwKrqd3NPDke9AEytn7pp4kx2quH9+vanBzQBOrZ5p4ciq6Nk04ORQBMG3fWnKxBqFZOeacG9DQBKJM9aUHI4ao/M9qA4J9KB3J9+BQJaiDEUeZjqKBpk27mneYRUKsCeDTtzCgLkvm/wCc0qsOxqESYp27J60FEwbnrml3n0qIZWjzCPSgCYOGoDc8VF5nqKUOtAEwY+tO8z2/Woevc0bjigCbzPUUm8f/AK6iDkGl8z2oAmByOtGcfxfrUQdfpQGVvSkBMG4pd5xUQP8AtUbsGgCXeRS+Z/s1FvIo8xvaiwEvme1Hme1RbzRvb2oAl8z2o8z2qLzPagSe1AEvm0GTmozL7Unme1FgJfNxR5ntUXmUCRsdqVgJfN9qTzM1HvNG9vanYDw9DuPy08Hmog4B4pVOTitTnuTq/wDe/CnoxBqBWz+NOVsUFcxZVt1OVtrf1qujccVIh3n/ADzQUWAcDinKwaoVkw1OVwfrQBOr84NPVttQK/Y09W2+9AEytnpTw+TzUCvnp1p4f+9QBOG2/SnKcnioQxFOVs/1oAsK+etOVto4qAPnr/8Arp4Yg+tAEytnpTw/PNQK27608PjrQBOGpwfdUKtjpTg4P1oAmDEU5GyPT2qEOQacHBNAE6yetPVsDIquH9acG5+lTYCwHBpwbBquJP71SZI6UgJlbcacHK+9Qh89eKcDxxSAmVt1ODke9QB+efzp4bA9qAJg3NOyRUAfmng4oAmD59c05WxUAfNPBx0oAlEnrTlbPSoAxFODgigCcOfrSiTNQhitO832oAmU4PFKHIqENnpShzQBMGBp24461D5gzTg2RwaAJfNx2oDgmogxBpwegCUHNKGZahEi/SnBvQ0BdknmEdqUSZ61FvYH1pd/PIoKuSqfenbjnioQ60objg0Bcl3n1/SgSECo8n1o3sBQHMS+Z/8AXpfMU1D5mT0oEuO1BRNuXFKBzUIkBNKWX1oAmJx3o3f7VQg5HWlH1oC5KGOf6UbmqPPvRk+tAEm5qNzVHk4o3H3oAl3mk3NUe7jvRu+tAEm9vajc3rUYajOfWgCTd70bveoutKWxz+tAHiW7ncO1OXk81EGx9004HcK0OcmzTkbB/pUIbatODc0ATK2ORUgfJ96gDYNPVgRQUTLJipN/cVXV8dakD0FFhX/yacDtOagWXJp4bafWgCZWz0PNSK2TUAORTg/rQBOG2/SnK26oVbB9RTlfPTigCcSU/dtP9KgV8DBp4ODxQBMGDGnK+3rUIbI5pytt96AJ1buOKesnrVcNmpFftQBMG2/1pwcVCp/u0ok9fzoAnDlfpTgwPT9KhD4HrTg+fagCYNg8mnA+jVCHI/2qdndQBMsmBTwfRqgDEe9OD59qmwFgSY60oOe9QLIR7inbgaQEwfb1p4bv0/rUG8j3pwYH2pAT+Zz/AIUocH2qEHHenCSgCYOV/wDr04OpFQBueDTg/wCVAE2efel3nvUIZT7U4MRQBMHUmnbs/wAVQiTmlBBFAEwkweaXzF/z2qFWwOKd5mBQBMDnuaA5A9ahyKdvagCYSZ9qUGofMOaXeDQBNn3p2/AqDIB6/rShzQBN5mO1LvFQiTFKJKAJQfc0ob3zUJdaUHI4/SgCXe3tR5mR0qMHBoDkDtQBN5ntR5g9+fao95o8ygCQstLuBqLzPagyYFAEhIB60Kfc1GXGKAykUDuSE4/ipevc1FuWjK4oC5LjFLn/AGv1qHKgUfKaAuSE5P3qDj+9Ue5aC6igLkm4Y60ZFRl8UCT2oFdnioJU08HPTrXyx/wkWo/9BC//APAh/wDGj/hI9RH/ADENQ/8AAl/8a7/qr7n1X+qc/wDn4vu/4J9VK2aXoa+VD4j1I/8AMR1D/wACX/xo/wCEj1L/AKCOof8AgS/+NH1V9w/1Tn/z8X3f8E+rlORThzXyh/wkmpD/AJiOof8AgS/+NH/CS6l/0EtQ/wDAl/8AGj6q+4f6pz/5+L7v+CfWIJApwyK+TP8AhJdS/wCglqH/AIEv/jS/8JNqf/QS1D/wJf8Axo+qvuNcJz/5+L7v+CfWw5FPRyDzmvkb/hJtT/6CWof+BL/40f8ACT6p/wBBLUf/AAKf/Gj6q+4/9VJ/8/F93/BPrxSVPFSCTFfH/wDwk+qf9BPUv/AqT/Gj/hKNU/6Cmpf+BUn+NH1V9w/1Vn/z8X3f8E+wgdvSnKdx96+O/wDhKNU/6Cmpf+BUn+NH/CUap/0FNS/8CpP8aPqr7j/1Vn/z8X3f8E+xg5FSA4ORXxr/AMJTqn/QU1L/AMCpP8aX/hKtV/6Cmp/+Bcn+NH1V9w/1Vn/z8X3f8E+y1fdTlO2vjL/hKtV/6Cmp/wDgXJ/jR/wlWq/9BTU//AuT/Gj6q+4f6qz/AOfi+7/gn2eGBpwcj3r4u/4SrVf+gpqf/gXJ/jS/8JZq3/QV1T/wLk/xo+qvuH+qs/8An4vu/wCCfaanuKeJOK+Kf+Es1b/oK6p/4Fyf40f8JZq3/QV1T/wLk/xo+qvuH+qs/wDn4vu/4J9rqcdKeHyK+Jf+Et1b/oLap/4Fyf40f8Jbq3/QW1T/AMC5P8aPqr7h/qrP/n4vu/4J9uBiD607f9a+If8AhLtXH/MW1T/wLk/xo/4S/V/+gtqn/gZJ/jR9VfcP9VZ/8/F93/BPuAMQKcGz1r4d/wCEv1f/AKC2qf8AgZJ/jR/wl+r/APQW1T/wMk/xo+qvuH+qs/8An4vu/wCCfcmT604Nn6/Svhr/AITDWP8AoL6r/wCBkn/xVH/CYax/0F9V/wDAyT/4ql9UfcP9VZ/8/F93/BPudS2TinK2R81fC/8AwmOsD/mL6t/4GSf/ABVH/CY6x/0GNW/8DJP/AIqj6m+4f6qz/wCfi+7/AIJ90jn7ufyp4YgfdNfCf/CY6x/0GNW/8DJP/iqP+Ez1n/oMat/4GSf/ABVH1N9w/wBVZ/8APxfd/wAE+7B8x757VJuYD7tfB/8AwmWsf9BjVv8AwMk/+Ko/4TPWf+gxq3/gZJ/8VS+pvuL/AFVn/wA/F93/AAT7wBye/wCVOBOe/wDjXwb/AMJnrP8A0GNW/wDAyT/4qj/hM9a/6DGrf+Bkn/xVH1N9w/1Vn/z8X3f8E+9F3Y5U/lR97+E18F/8JprX/QY1b/wNk/8AiqP+E01r/oMat/4Gyf8AxVH1N9w/1Vn/AM/F93/BPvYKwHGacpbP3fyr4I/4TbWv+g1q/wD4Gy//ABVH/Cba1/0GtX/8DZf/AIqj6m+4f6qz/wCfi+7/AIJ989ex/KgdeM/lXwN/wm2tf9BrV/8AwNl/+Ko/4TbWv+g1q/8A4Gy//FUfU33D/VWf/Pxfd/wT76CsPX8qUFj/AAtXwH/wmmtf9BrWP/A2X/4qj/hNNa/6DWsf+Bsv/wAVR9TfcP8AVWf/AD8X3f8ABPv3OOzD8KUcD+KvgH/hNNa/6DWsf+Bsv/xVH/Caa1/0GtY/8DZf/iqPqb7h/qrP/n4vu/4J9/DcR/8AWpy7u4P5V8Af8JtrX/Qa1j/wOl/+Ko/4TbWv+g1rH/gdL/8AFUfU33D/AFVn/wA/F93/AAT9AMn+635UuPY/lX5/f8JtrX/Qa1j/AMDpf/iqP+E21r/oNax/4HS//FUfU33D/VWf/Pxfd/wT9AQvs1ADAd6/P7/hNta/6DWsf+B0v/xVH/Cba1/0GtY/8Dpf/iqPqb7h/qrP/n4vu/4J+gOGB/i/KnZb+7X5+f8ACba1/wBBrWP/AAOl/wDiqP8AhNta/wCg1rH/AIHS/wDxVH1N9w/1Vn/z8X3f8E/QPLf3aMtn7pr8/P8AhNta/wCg1rH/AIHS/wDxVH/Cba1/0GtY/wDA6X/4qj6m+4f6qz/5+L7v+CfoIC2fut+VGf8AZb8q/Pv/AITbWv8AoNax/wCB0v8A8VR/wm2tf9BrWP8AwOl/+Ko+pvuH+qk/+fi+7/gn6C5/2W/Kkz/st+Vfn3/wm2tf9BrWP/A6X/4qj/hNta/6DWsf+B0v/wAVR9TfcP8AVSf/AD8X3f8ABP0Fz/st+VJn/Zb8q/Pv/hNta/6DWsf+B0v/AMVR/wAJtrX/AEGtY/8AA6X/AOKo+pvuH+qs/wDn4vu/4J+gmT/db8qDuPQH8q/Pv/hNta/6DWsf+B0v/wAVR/wm2tf9BrWP/A6X/wCKo+pvuH+qs/8An4vu/wCCfoGSw/hajLf3a/Pz/hNta/6DWsf+B0v/AMVQfGutEf8AIa1j/wADpf8A4qj6m+4f6qz/AOfi+7/gmZXcfs1/BqT9oT48eFfBcd5Dp/8AwkV+lq91KwVbePlnfJ44UMeeM1w9dF8JfidqXwY+Jei+KtI8htR0O6S6hWdd0UmOqOAQdrKSpwQcE4IODXoxtfXY+wrc7pyVP4rO3r0P0Z8dfA39kP4dftMaV8HI/hx4+8US6CLQeIPEljNdSp5kwidHcRyh/IKSDzGSNSASUUHp8yn/AIJ26t8avjf8VJfBs2j+Dfhv4U8SXdlYal4puprWFIGuG+xw52yStIYWiOSCAGBZucn3nwF/wVP+B+heNbz4j3nhH4jWvxA1LSxYaha2F5GtnqIUARxTSCVPMjVVA8xo9/CjZhRjmfg9/wAFYdJ8TaJ8RNL8dyeJvBk3jPxCmu2uq+FIbeaW0iESRGzdZ1IK+XFEAwXJK5IHful7KT1t8tPQ+Rw6zGjFuEZN2Sbk76395pa+e2lraHmPgT/gkV8TvGf7RXiT4YXWp+C/DniTw3ZRakzarqTx2+oW0mds0DRxOWQAEsWVdvRsHiuL/ah/4J++Nf2Vk0SXUrzw/wCJLTXryTTra50G4luYRcqQPJJeNDuYcqVBDAHByCB9FfCj/gpF8NE/be1D4ieK734k3uh2fh+PQ9IbUI7bUrz5nBnd1yoUAAlF3NyTyAQq8z42/bc+Ebfs8X2g6Fb+O5vEnh/4gv408LtfwW62rL9qdlhuGVi20xTSlgqqd6ockZBzdOjyuz7ndTxWZKtHnjdWjdW0u07636Oz8tTifH3/AASS+KXw/wDhZrXiSa68I6heeGLFdS1vw/Zak0mraRbsCd8sZjEZwASQkjHAOAcHHQab/wAEUvitqfw4j8Xf298OYPDrac2pSX0uuFYYkFv9oVN3l4eRlyoCbvmGCRkE+o/HP/gq74J8aeGfFereH9c+MFhrnijSv7Pt/D6SWdvpulNsVTmUIWkj+/w2/cD91CQycH8fv2uvgn8Sv+Cf/hj4X6bN8So9c8ExLPpIZLaO0uLtuJDdnkyIN8oQRrGVG3Jc5NU4UFe3buZU8VmslFSVrys/dvZW16rZ7P8AO2vm3hr/AIJffErxd8E4fGmn3HhC7+1WJ1O30SHW4ptWmtQu4y+UmVXABJR3WT/ZyRnY8ffsNaX4S/YJ8G+OrLUbHVPGHi3VLdo1ju5H+0xzK6Jp9pEqYe4jfBm34KspVMhSX+lP2fP+CqXwA+H3wu8I6De6H480GOz0U6RqdlpWlWElrG7LGJrlZiwuHkbDqG3YwSzIzNgfO9v+2D8NtA/Zv8M6DY6f4uuPFHw38WNrfho3LR/Y7iJb+W5j+0FSpy0chR9oBDKpU4JxLp0UtH0/yKhicxqTtODSUl0tda767aK/qZvxD/4JLfFD4c/CjW/E0934R1C68L6cmq67oNhqRm1XR7ZskySpsEbBVG4+XI+FBPQHHqn7C3/BOGWy8IQ+MfiZ4Z8M6ppvi7To5dB0y91eW31KFHkj23YtlXbJG6NgZkDLuDbSK3fj/wD8FWfBPjzwf4w1Dw9rnxfsta8X6IdJg0BZLK10zSt1uIJA0ioWlibLkqd24MQBFuBTO+F//BRP4NeIW8H654/s/Htj4q8P6UdGkfSIIri3WMsjyMqtNGNr+XhQV+TfghwgLVGNFT0ZhUrZpUw7U42u+id9r23Wl+vbTU+Kfjdotj4b+NHi7TtLiWHTbDWry2tIwxYRwpO6oMnk4UAZNfVX/BNL9mT4e/tc/AX4qaFqng+CTx/oNhLcaJ4hn1y4t4jPPbyrawtCGWJBHNCZDIxYMpZSABmvmT9pLxL4V8ZfHnxZrHgmHXYPC+q6jJeWEesvG98iyHewkMYCH5y2MD7u3POTX0L/AME5/wBr34Sfst/CD4mWPjnR/Fmuax44szphtbB0jt3tfKdQFk3K8chM0uTzwq4wSTWNHlVT3rW1PWzL28sCnRUuf3bW33V76rpe93YwNf8A+CVfjfRfjTpng1fE3ga4XW9HOs6drC3039n3yLLHC8MR8rzHmV5VyiocqdwyvNHxT/4JU+OfhB8PfFXiTVfE3gNrLwiZI7yOC8umkklQKWhTNuFEvzKNjspyatftW/tf6H8WfFHwf8P/AAZ0LXtP0r4WR7dG+3DzNQvLySSFiNqOxKjyIVUZyTvOBkV6T/wWe+Pr63c+E/BcVnDo+o6pbxeL/FVlDEIiuoTxbIkmHUzrHvdixORNH0xgW40rSa6HHTxGYOrRhJpc176K6Se716q3o3Y+D6/TL9lb9jrwH8Xv2YPBOvzfDXTTrmp2IjS2uLqSSTU5Yw0fnvKqotus7xFwHD7FlBy4AB/Nnw7/AGf/AMJBY/2t9s/sr7RH9t+ybftHk7h5nl7vl37c43cZxniv0R0z/gp98J9G1DwfplhqXxK0zwboFi+nXGjw2Vq9rdQpGqWwmjLK0jpsX5xIM45XBKlYbkTbmbZ5HEShGOHTvq21fottO580fs7/ALAHiX9ska3rHhPUvCPhyzt7+dBp2rahMLizjX5/m8uFsIinG9woO1jgYONi+/4JU+NtPn8MwyeKvAIuPFdrJd2EP2y68yREhE3A+z/vNykY8veD9Oa9S/Zk+NWieIv+CrEfiL4L6D4pvPC/jjzbbxBZatZx4hF0WNxIyQtgWyyeXKQSCQJE6EZ4v4s/tmaN4M/4KZaf4sWxGseBvhvOfDlhY2ZVI/sMUUls5gAKoV3PI6L8oYBFJAyafJSUbvvb/gmP1nHSrOFPRcnMlbVOz916736nA/Eb/gnN40+F/wAHNY8banrPg9tN0O5W1ureC/kkuVY3SW3C+Xt4dwSCwIXnHQH0ab/gih8TJdR0G1sPFnw11h/EltLd6cbLUrmQXUcaxs5jBtwZMLKhOwMACScAZrvf2jv+CgP7PvxI+AHxQ8F6Do/xRtp/GtydYs5WS0SAahuWZWlJlZhF5kaBo1U4DPtbIBPOfs/f8FRNF+Gv7GVn4b1zT9R1L4ieBEvLTwVcpbp9ns47kD95JNu3/KeDGBtZYIhzuch8lFSs3pb+vwM/rOaSpc8Y2lzWs10aVnv0e/kcD4J/4JOfEPxjr3ia2k17wHo+m+HNck8OJq9/qci2GsXySeW0VoyRM8mGyNxVVyCM5BAz/hL/AMEyviV4u/aB8VeDdU0zR9IPw5mjfxLc6tqJtdNt42+eNTcRq5xMgJRkVsqd3SvUP2Sv+CkXhjwX+y9Z/DzxhqnjzwzfaLrMmqxax4cS3nl1WJ3mlaCYzhirGWZjuUc4U5Uht8Nl/wAFIfBvxB+IPxRsfHEPjy+8EePo4IYLma5iudWjjhgjgCzFSgbKxJsG5vLxtJk3GQHLRsnc0liM0UqkXFWWzt5pXWurau7X0f3OP9vf9kDQ7j4s/Djwv8NfDGh+G9U8VS38Bg/thRaMImhEbPczuE2r+9/eEru69cCvE/2ov2DvGn7KOjafq2sXXh3XdC1GU2qapoV/9rtUuACTCxKqwYAHnG04IBJBr6O8f/tz/s66j8U/hP4jtPD3xC18eD7y4bUbbV7e1FtHbSxYjVIvMcyTRSLH87SbSNx2ghRR+3r+378Gf2nf2X77wtobfER/Emn6wNR0ybUtOsLOC5LTSmQy/Zzt2LFIERQiuNi7mY5oqRpPmd9ehng8Rj6bo03BuP2m1rq31v0Vt+nfp8D0UUVxn1Bd8O+H7rxVrlrp1jGst3eSCOJWcICT6sxAA9ycV1+vfs6eIvDup6dbznTXh1OXyIruK7WS3WTaWKM46NhT9cHGaw/hX4h03wn8QtK1HWLNtQ020m3zQhQxYYIBweDhsNg9cYr1L42/HLwj8SfhfPpNj/b39pQ3qXdo0ttDDG7bnDBvL42hJCBwGyqkk5OeepOoppRWh+ecS5xxBh85w2Ey6jzYeaSnPkcuVybSldSWkPdlJNLR7vXl5m8/ZT8SWCTNLdaOq28AuHP2huFO7Gfl4zsPXAIFVbD9mnxDqU9qsM2kst3AZ43N2NpUBScccn5x0z39K7b42/EK7T4F6DFewGz17xBbRwXe5Nkz21ux2l++GYgr0GCwxTvAf7R/hDR/DHhf+0tP1pdW8OoYAbZUaN1KBC3zMNxKgHBxtOMZHNc6qV3HmWvT+vmfGUeJeNJ5Z9epU41ZOdSmlCCfwRa5viV4urFxurq3va3scL4d/Zx1zxPoGp6hb3WjrFpNxNbXKSXW10aP7x6Y2nsSRmptS/Za8VaZ4k0/S2jsXudRjkmUrcYSCONgrPISBtXJ4PfBxmtD4f8Axn0Pwh8TPEjGHUZfCPiRJEnguI0lnIPzDIzt+8WGRzg+tXPDH7TUNl8XNY1e8gvF0rUbRrC28oq9xYxDIjYBsqzAkswORuYnnodJSr3dlpY9TGZpxxDEVnhqUZU40+eCcLNuUUlT0l8cJcza1uopXTkjlPEH7PviTQtd0exjt7fUjr2fsE1nKJIbjb97k427ep3AYANdf8RvgrpvgD4Nu9zY2v8AwkNo0aS3dvfPMsjNLjG3O0YXII25BHWn61+0hY2fiDQfsV14g1Sx0sy/aHu/JjLeZjJiRFG0jvkgEccZ3U3xZ8UvAOqfD3WdNt18TNd3sz3cKlY1h89n35ZixOzPGAAcZ5qeas3HmX3epw1Mx4vr1sA8XSlGCnGUvZRknJe0kvf96PLH2fK3GUWm23pZJclrn7O3ibQfCTaxLDYzQwxCeeG3u0mntoyMh3VScDHvkdwMGsr4cfCnVPijdXKac1jDHZqGnmu7lII488D7xyScdFBNe1S/tJ/D++8LX2lfY9esbXUNN+xiCC1t1S1/duuFcHcSWYEltw4GAMnPLfC/4m/D34X3l+sEGvXH2yxgAvXt7eWeKYBjMiK42hCSuCQScc9BRGtW5XeOvTQ6MLxdxbLLcV7fBSWJTXs7U3yuLcb39/eN3s3tdc9teO034Ca9feNL7QZls7G+sLb7W5uJtsbx5UBlYA7s7hjFaet/sueJPD+rabZXU2kxz6pFLNAPtPVY8buMZ74GAQSD6V22o/Hb4f3vxftfFMlnrl0YdOEQgmhQRrOrYU7Q3QJzySM44rE1341eGI/ilofiK3j1vVZreWRtSnu2XzZkYYVUUYRQmSAoAGABnkmhVK7e3Tt1Jo8ScZYitDlwzgvYtyTpae2UJe6pOatHmS1d37yik1zSjyWr/AHXdD0NNQuJNNWF7wWW0XQLLJ5hj57ABgc5PA5rY8UfsleLPCPh651S6/stra3ChBFdb3uXaRYwka4y7ZYdOMd66L4h/GrwH4m8EaxotnbeJof7Q1Iakr7YtnmM+6TOWJxhnwuODjk8k1/i38cfDOvt4UvtFGuSah4XlgWGC62JbPDEQRuxljISq5YEDrhRRGpXbWn4CwvEHGmIqYdewdNSnPn5qX2FGMoK/tLR5m5Qcne2rs7WOZ8Q/szeJvDPhyfUp/7OkSxCNeww3QeaxV8YaRR2552k471I37MHiKTVLe2t7jSbz7VvKyxXB8oKuOdzKOCWUDGclhXYfEf9pbR9f8P61/Zt54mW51y2+zizZLeK3tlKbGVmCkupBPqeeCvWs/4f/tTDwF8HLPR4beSTXLC9VoJ2iRo0ty4ZxnOdxAKYIxhic5AoVTEct7a3/r7iaOccf1MvjiFQh7VzUeVxcbKUF7zu78tOd1dX5ovry3lys/7OPiWLRLW+SOzm+3XQs4YI5wZnkLFcbfQYOTngc1J4q+AurfDOxt9Z1SKx1XR4Ltbe9+w3e7ym4JiY4ypI43DIyRzyM9d4+/alsdY+NHh/WtPsbhtF0MyHyJQsckxmyJWwOA20gDqPkB7moPih8d9F8U+GrrS7XUfFF3Dq14k90syQQxxRB1YqFVfmYbRg+oBLEDaXGpXbV1vubYPOeN6lbCLF4eMadXWolF80IuTThzJ6SjTSkm+W8pctnZl/4x/sso0kWo+Eo7W105dJF5Jaz3jPPLKHkLrGDknbH5eScAknHPA4c/s663H4L/tqa60e3jaz+3rbS3W24eHGQyrjDemATg8HB4r0rxD+0z4GbWodWsdK1qTVdL0g6bZPIwWJ92/767uMFuTznJ9BWBN8evD/APwrH+yJDrF866QlmlpPGkkK3BTBkEjkuiq3IVTt4XCjmopyrqKTX3ni5Bm3HNHB0aFSjN2lFN1IXnytvmTfPK9lyvnly6tp8qiQXPwJs73wx4EthZx6ffa1JJ9r1RL4TJdJ99VWIn5XCHGMKCRjJOTWT4g/Z7vNQ+JesaXojWkem6ZGs0txcXPyWaFfuytjPmcHKqDz0GK2Lz4y+ELfwR4RsbODXDd+G76O4cuke10JYygHdy3I25AHGPc6Gj/tC+GdD8T+JUtf7ctdP8RxxyG8VI5J7a4DfMQrZBRlx1yQS3UYIFKstUu/5/5HTRx/GFBVKtClOT/epKcW1d10+fWUpaUneEVdLlcYq3uviW/Zt8TReNv7Dkjs45TZ/wBoLcmbdbvb8fvAygkjnsMgZJGATWH4++G158PNdt7C6u9Nunuolmjls7gTRFWJA+bHtn6V6U/7Q+kv8QI777d4oa00/SHsbWd5IxN5jOpyEXC7MAna+5SQMqBwMX4i+N/BXxE1XULy5/tqO6tdNWGzmit4Yft91l8vKijCoMrgLg4B+laQqVbrmWlux9DlGfcU/XKX9p0H7L2a5uSm787dk9XtqnJXutdLJyT9c/Y98VaFYCdrjQ7hmhM8cUF55kkqjngY754JwD61znw7+BeufEnTJL61axs7FJRbrPez+Sk0pxiNOCSeR2wM8kV6jd/tCeCYPEvhG8tz4haHQ7Wezuo1t40WWNogicbhltwDE+30rM8F/tBeH9D8L3WgmbXtOs7bUnu7K6t4oZJp4CzMI5AwIVst1UDoOmOYVSvy7a+nqeFh+JOOf7Pk54fmqtxabpOPLHnqRkuXmk5StGEla+k27NLTB8F/s5zTxeKl12SOwvPD6PD5DyhVjl2hhJIwz+7wRgj7xPXANeWkYNevWnx00PWfFvi6bWl1+fTfEFtFbo2+NrrbGu0BiMDpyOuMAEnlq8ifG87c7c8Z64rooubb5/L8j77hKtnVSviJZwmm1ScUlaCbprnUXdt2nzJ31WmruJRRRW59sFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAXNA1++8K63a6lpt1cWOoWMqz29xA5SSF1OVZWHIIPepvGPjPVviF4lu9Z13Ur3V9Wv333F5dzNNNM2AAWZuTwAPoBWbRRrsTyq/NbUKKKKCjf8Ah98VPEvwn1G4vPDOu6roN1dQm3mmsLloHkjPVSVIOKwKKKLk8qTulqFFFFBQUUUUAFFFFABRRRQAUA7TRRQBc1nxBfeIrhJr+7uLyWNBEjTSFyqDOFGe3J496p0UUbbGdOlCnFQppJLZJWS+QUUUUGgUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH//2Q==';
	var dataURL3 = 'data:image/jpeg;base64,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';
	doc.addImage(dataURL, 'JPEG', 0, 0, 250, 300);
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
			doc.text(40, 40, dishObj.categoryName);
			doc.setFontSize(20);
			doc.text("Quantity", 120, 50);
			doc.text("QR Code", 152, 50);
			doc.text("Price", 185, 50);

			doc.setFontSize(20);
			doc.text(15, 65 + prodprod, dishObj.dishName);
			doc.text(125, 70 + prodprod, dishObj.quantity);
			doc.text(185, 70 + prodprod, dishObj.price);
			
			var dataURL2 = dishObj.canv.toDataURL("image/jpeg");
			doc.addImage(dataURL2, 'JPEG', 155, 55 + prodprod, 20, 20); //pozele vor suferi o incadrare de +10 in jos
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
			doc.text(17, 70 + prodprod, ingredy.substring(0, ingredy.length - 2));
			prodprod += 25;
		   
		   elemOnPage += 1;
		   if (elemOnPage >= 9) {
			   doc.addPage();
			   doc.addImage(dataURL3, 'JPEG', 0, 0, 250, 300);
			   elemOnPage = 0;
			   prodprod = 0;
		   }
		}
		
		// if after this iteration exists another category, we add a new page for it
		if(i < categories.length - 1){
			doc.addPage();
			doc.addImage(dataURL3, 'JPEG', 0, 0, 350, 400);
		}
		/*
		if (dishObj.categoryName == "Pizza" && category[0] == 1) {
			doc.setFontSize(30);
			doc.text(40, 40, dishObj.categoryName);
			category[0] = 0;
		}
		if (dishObj.categoryName == "Supa" && category[1] == 1) {
			doc.addPage();
			doc.addImage(dataURL3, 'JPEG', 0, 0, 350, 400);
			doc.setFontSize(30);
			doc.text(40, 40, dishObj.categoryName);
			category[1] = 0;
			prodprod = 0;
			elemOnPage = 0;
		}
		
		doc.setFontSize(20);
		doc.text("Quantity", 120, 50);
		doc.text("QR Code", 152, 50);
		doc.text("Price", 185, 50);

		doc.setFontSize(20);
		doc.text(15, 65 + prodprod, dishObj.dishName);
		doc.text(125, 70 + prodprod, dishObj.quantity);
		doc.text(185, 70 + prodprod, dishObj.price);
	
		
		var dataURL2 = dishObj.canv.toDataURL("image/jpeg");
		doc.addImage(dataURL2, 'JPEG', 155, 55 + prodprod, 20, 20); //pozele vor suferi o incadrare de +10 in jos
		doc.setFontSize(10);
		var ingredy = "";
		var count = 0;
		for (var j = 0 ; j < dishObj.ingredients.length; j++) {
			count += dishObj.ingredients[j].length;
			if (count <= 50) {
			  ingredy += dishObj.ingredients[j] + ", ";
			}
			else {
			   ingredy += "\n" + dishObj.ingredients[j] + ", ";
			   count = 0;
			}
		}
		doc.text(17, 70 + prodprod, ingredy.substring(0, ingredy.length - 2));
		prodprod += 25;
	   
	   elemOnPage += 1;
	   if (elemOnPage >= 9) {
		   doc.addPage();
		   var dataURL3 = 'data:image/jpeg;base64,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';
		   doc.addImage(dataURL3, 'JPEG', 0, 0, 250, 300);
		   elemOnPage = 0;
		   prodprod = 0;
	   }
	   */
	}
	doc.save('Test.pdf');
}