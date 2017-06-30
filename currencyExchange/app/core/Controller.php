<?php
	class Controller
	{
		// basic architecture to facilitate a communication between model, view and controller
		public function model($model)
		{		
			require_once "../app/models/".$model.".php";	
			return new $model();
		}
		public function view($view,$data=[])
		{				
			require_once "../app/views/".$view.".php";	

		}

	}
?>