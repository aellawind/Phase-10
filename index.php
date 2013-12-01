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

	<!-- Deck pick up and throw away -->
	<div id="deckPiles">
		<input id="playbutton" type="reset" value="Play!">
		<br>
		<div id="drawDeck">
		Click to draw
		</div>
		<div id="discardDeck">
		Deck goes here
		</div>
		<span class='error' id='errorthing'></span>
	</div>

	<!-- Player playing fields -->
	<div class="playingField" id="playerDivId">
		Player!<br>
	</div>

	<!-- Section to click to submit a phase -->
	<div id="submitPhase1" class="submitPhase">
		Click to submit phase 1
	</div>
	
	<!-- Section to play a phase -->
	<div id="phaseField">
		<br>

		<div id="phaseCompleteMessage">
		<h6>Phase Complete!</h6>
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
</body>
</html>