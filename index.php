<!DOCTYPE html>
<html>
<head>

	<title>Amira's Phase 10</title>
	<link rel="shortcut icon" href="images/phase10.ico"/>
	
	<link rel="stylesheet" href="css/cards.css" type="text/css">
	<link rel="stylesheet" href="css/game.css" type="text/css">
	<link href='http://fonts.googleapis.com/css?family=Purple+Purse' rel='stylesheet' type='text/css'>

	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/underscore-min.js"></script>

</head>

<body>

<!-- do-not-click screen; activated when we don't want the user to be able to click on anything -->
<div id='screen'></div>

<div id="wrapper">
<h1>Phase 10</h1>



<div id="gameArea">

	<div id="phaseCompleteMessage">
		<h6>Phase Complete!</h6>
		<button onclick="nextRound()">Play Next Phase!</button>
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

	
	<!-- Section to click to submit a phase -->
	<!-- Will possibly move these buttons to go "Success! Pop up"-->
	
	<div id="submitPhase2" class="prepareSubmitPhase">
		Click to submit phase 2: 1 set of 3 and 1 run of 4
	</div>
	<div id="submitPhase3" class="prepareSubmitPhase">
		Click to submit phase 3: 1 set of 4 and 1 run of 4
	</div>
	<div id="submitPhase4" class="prepareSubmitPhase">
		Click to submit phase 4: 1 run of 7
	</div>	
	<div id="submitPhase5" class="prepareSubmitPhase">
		Click to submit phase 5: 1 run of 8
	</div>
	<div id="submitPhase6" class="prepareSubmitPhase">
		Click to submit phase 6: 1 run of 9
	</div>
	<div id="submitPhase7" class="prepareSubmitPhase">
		Click to submit phase 7: 2 sets of 4
	</div>
	<div id="submitPhase8" class="prepareSubmitPhase">
		Click to submit phase 8: 7 cards of one color
	</div>
	<div id="submitPhase9" class="prepareSubmitPhase">
		Click to submit phase 9: 1 set of 5 and 1 set of 2
	</div>
	<div id="submitPhase10" class="prepareSubmitPhase">
		Click to submit phase 10: 1 set of 5 and 1 set of 3
	</div>
	


	<!-- Deck pick up and throw away -->

	<div id="deckPiles">
		<input id="playbutton" type="reset" value="Play!">
		<input id="discardbutton" type="button" value="Discard Card and End Turn">
		<input id="submitPhase1" type="button" class="prepareSubmitPhase" value="Submit Your Phase">
		<div id="drawDeck"></div>
		<div id="discardDeck">
			<div id="discardLockScreen">
			</div>
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
		<input id="submitphasebutton" type = "button" value="Submit Your Phase!">
		<input id="resetphasebutton" type="button" value="Reset Phase Cards!">
		<input id="cancelphasebutton" type = "button" value="Cancel Submit Phase">
		<!--Section for first part of phase-->
		<div id="phaseField1">
			<span class="phaseTitles" id="phase1Title1">Set of 3</span>
			<span class="phaseTitles" id="phase2Title1">Set of 3</span>
			<span class="phaseTitles" id="phase3Title1">Set of 4</span>
			<span class="phaseTitles" id="phase4Title1">Run of 7</span>
			<span class="phaseTitles" id="phase5Title1">Run of 8</span>
			<span class="phaseTitles" id="phase6Title1">Run of 9</span>
			<span class="phaseTitles" id="phase7Title1">Set of 4</span>
			<span class="phaseTitles" id="phase8Title1">7 Cards of One Color</span>
			<span class="phaseTitles" id="phase9Title1">Set of 5</span>
			<span class="phaseTitles" id="phase10Title1">Set of 5</span>
		</div>
		<!--Section for second part of phase if it exists-->
		<div id="phaseField2">
			<span class="phaseTitles" id="phase1Title2">Set of 3</span>
			<span class="phaseTitles" id="phase2Title2">Run of 4</span>
			<span class="phaseTitles" id="phase3Title2">Run of 4</span>
			<span class="phaseTitles" id="phase7Title2">Set of 4</span>
			<span class="phaseTitles" id="phase9Title2">Set of 2</span>
			<span class="phaseTitles" id="phase10Title2">Set of 3</span>
		</div>

		
		
	</div>

	</div>

</div>



<!-- JS Scripts -->
<script src="js/phase10cards.js"></script>
<script src="js/phase10logic.js"></script>
<script src="js/phases.js"></script>
<script src="js/fun.js"></script>

</body>
</html>