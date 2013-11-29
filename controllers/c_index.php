<?php

class index_controller extends base_controller {
	
	/*-------------------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------*/
	public function __construct() {
		parent::__construct();
	} 
		
	/*-------------------------------------------------------------------------------------------------
	Accessed via http://p3.amiraanuar.loc
	-------------------------------------------------------------------------------------------------*/
	public function index() {	
		
		# Any method that loads a view will commonly start with this
		# First, set the content of the template with a view file
			$this->template->content = View::instance('v_index_index');
			
		# Now set the <title> tag
			$this->template->title = "Phase 10 by Amira";
	
		# CSS/JS includes
			
			$client_files_head = ["/css/cards.css", "/css/game.css"];
	    	$this->template->client_files_head = Utils::load_client_files($client_files_head);
	    	
	    	$client_files_body = Array("/js/p3.js", "/js/phase10logic.js", "/js/phase10cards.js");
	    	$this->template->client_files_body = Utils::load_client_files($client_files_body);   
	    	
	      					     		
		# Render the view
			echo $this->template;

	} # End of method
	
	
} # End of class
