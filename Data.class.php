
<?php
	require("HttpClient.class.php");
	class Data{
	
		public $allIngredients ;
		
		public function getContent(){
		
			$this->allIngredients = array();
			$pageContents = HttpClient::quickGet('http://ayuvedb.cloudapp.net/Ingredient/export');
			$ingred = explode("|",$pageContents);
			foreach ($ingred as $value)
			{
				$item = explode("@",$value);
				if($item[1]){
					array_push($this->allIngredients,$item[1]);
				}
				
			}
		}
	}
?>