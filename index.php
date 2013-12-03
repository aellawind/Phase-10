<!DOCTYPE html>
<html>
<head>

	<title>Amira's Phase 10</title>
	<link rel="shortcut icon" href="images/phase10.ico"/>
	
	<link rel="stylesheet" href="css/cards.css" type="text/css">
	<link rel="stylesheet" href="css/game.css" type="text/css">

	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/underscore-min.js"></script>

</head>

<body>



<h1>Phase 10</h1>


<div id="gameArea">

	
	<!-- Section to click to submit a phase -->
	<!-- Will possibly move these buttons to go "Success! Pop up"-->
	<div id="submitPhase1" class="submitPhase">
		Click to submit phase 1: 2 sets of 3; remember to bump out cards when i try to drag them onto divs that already have one
	</div>
	<div id="submitPhase2" class="submitPhase">
		Click to submit phase 2: 1 set of 3 and 1 run of 4
	</div>
	<div id="submitPhase3" class="submitPhase">
		Click to submit phase 3: 1 set of 4 and 1 run of 4
	</div>
	<div id="submitPhase4" class="submitPhase">
		Click to submit phase 4: 1 run of 7
	</div>	
	<div id="submitPhase5" class="submitPhase">
		Click to submit phase 5: 1 run of 8
	</div>
	<div id="submitPhase6" class="submitPhase">
		Click to submit phase 6: 1 run of 9
	</div>
	<div id="submitPhase7" class="submitPhase">
		Click to submit phase 7: 2 sets of 4
	</div>
	<div id="submitPhase8" class="submitPhase">
		Click to submit phase 8: 7 cards of one color
	</div>
	<div id="submitPhase9" class="submitPhase">
		Click to submit phase 9: 1 set of 5 and 1 set of 2
	</div>
	<div id="submitPhase10" class="submitPhase">
		Click to submit phase 10: 1 set of 5 and 1 set of 3
	</div>
	


	<!-- Deck pick up and throw away -->

	<div id="deckPiles">
		<input id="playbutton" type="reset" value="Play!">
		<input id="reset" type="reset" value="Reset">
		<br>
		<div id="drawDeck">
		Click to draw from the deck
		</div>
		<div id="discardDeck">
		</div>
		<span class='error' id='errorthing'></span>
	</div>

	<!-- Player playing fields -->
	<div class="playingField" id="playerDivId">
		Player!<br>
	</div>

	<!-- Section to play a phase -->
	<div id="phaseField">
		<br>
		<!--Section for first part of phase-->
		<div id="phaseField1">sdfafd
		</div>
		<br>
		<!--Section for second part of phase if it exists-->
		<div id="phaseField2">asdfasfs
		</div>

		<div id="phaseCompleteMessage">
		<h6>Phase Complete!</h6>
		<button onclick="playbutton()">Play Again</button>
		</div>
	</div>

	<!-- Computer playing fields -->
	<div class="playingField" id="computer1DivId">
		Computer 1 goes here<br>
	</div>

	<div class="playingField" id="computer2DivId">
		Computer 2 goes here<br>
	</div>

	<div class="playingField" id="computer3DivId">
		Computer 3 goes here<br>
	</div>

</div>



<!-- JS Scripts -->
<script src="js/phase10logic.js"></script>
<script src="js/phase10cards.js"></script>
<script src="js/phases.js"></script>
</body>
</html>