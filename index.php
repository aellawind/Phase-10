<!DOCTYPE html>
<head>

	<title>Amira's Phase 10</title>
	<link rel="shortcut icon" href="images/phase10.ico"/>
	
	<link rel="stylesheet" href="css/game.css" type="text/css">
	<link href='http://fonts.googleapis.com/css?family=Purple+Purse' rel='stylesheet' type='text/css'>

	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/underscore-min.js"></script>

</head>

<body>

<!--When page first loads, this shows up to ask user to play-->
<div id="playgameoverlay"></div>

<div id="playbuttons">	
	<input id="playbutton" type="reset" value="Play Phase 10!">
	<input id="rulesbutton" type="reset" value="Read the Rules">
</div>


<!--When users want to see the rules, this pop ups-->
<div class="overlay" id="overlay"></div> 
<div class="box" id="box">
	<a class="boxclose" id="boxclose"></a>
	<h1>Phase 10 Rules</h1>

	<p>Welcome to Amira's version of Phase 10! Currently you can only play
	the first phase. This is a work in progress. I will be building out the game
	so players can play all 10 phases. Apologies-this is a fairly complex game. Have fun!</p>
	<p>At the start of your turn, you will draw a card, either from the deck or the discard pile if you choose. 
	The goal is to 
	complete your phase first and subsequently get rid of all of your 
	cards by adding them to your current phases or to the other 
	player's phases (you cannot add to another player's phase until you've made your own. 
	Wilds can be used to replace any card, and
	skips can be used to skip another player's turn (note: skips not implemented yet).</p>
	<p>Each round ends when a player has run out of cards. When the 
	next turn begins, each player will work on completing their next
	phase. The player to complete all ten phases first, wins.</p>
	<p>The following are the phases:</p>

	<p>
	Phase 1: Two sets of three<br>
	Phase 2: 1 set of 3 and 1 run of 4<br>
	Phase 3: 1 set of 4 and 1 run of 4<br>
	Phase 4: 1 run of 7<br>
	Phase 5: 1 run of 8<br>
	Phase 6: 1 run of 9<br>
	Phase 7: 2 sets of 4<br>
	Phase 8: 7 cards of one color<br>
	Phase 9: 1 set of 5 and 1 set of 2<br>
	Phase 10: 1 set of 5 and 1 set of 3
	</p>

	<p>Sets are matches, regardless of color. Runs are sets of cards
	in consecutive order, such as 1-2-3. Click to submit your phase.
	Once you have completed your turn, discard a card.</p>

	<p>All card images drawn by Amira Anuar.</p>
</div>

<!-- Round complete! -->
<div class="overlay" id="completeoverlay"></div> 
<div class="box" id="roundCompleteMessage">
<h2>Phase Complete!</h2>
	<br><br>
	<img src="http://vector-magz.com/wp-content/uploads/2013/07/great-job-clip-art.gif" alt="Good job!"/>
	<br>
	<button id="nextphasebutton" onclick="nextRound()">Play Next Phase!</button>
</div>

<!-- do-not-click screen; activated when we don't want the user to be able to click on anything -->
<div id='screen'></div>

<div id="wrapper">
	<h1>Phase 10</h1>
	<button  id="readrules" onclick="showRules()">Rules</button>

	<div id="gameArea">

	<!-- Computer playing fields -->
	<div class="playingField" id="computer3DivId"></div>

	<div class="playingField" id="computer2DivId"></div>

	<div class="playingField" id="computer1DivId"></div>

	<!-- Computer phase fields -->
	<div id="computerLockScreen"></div>	
	<div id="computer1PhaseField"><div class ="phaseFields" id="c1p1field"></div><div class ="phaseFields" id="c1p2field"></div></div>
	<div id="computer2PhaseField"><div class ="phaseFields" id="c2p1field"></div><div class ="phaseFields" id="c2p2field"></div></div>
	<div id="computer3PhaseField"><div class ="phaseFields" id="c3p1field"></div><div class ="phaseFields" id="c3p2field"></div></div>

	<input id="submitPhasePrep" type="button" class="prepareSubmitPhase" value="Submit Your Phase">
	
	<!-- Deck pick up and throw away -->

	<div id="deckPiles">
		
		<div id="lockScreen"></div>
		<div id="drawDeck"></div>
		<div id="discardDeck"></div>
		
	</div>

	<!-- Player playing fields -->
	<div id="playerFieldLock"> </div>
	<div class="playingField" id="playerDivId"></div>
	

	<!-- Section to play a phase -->
	<div id="phaseField">
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

<!-- JS Scripts -->

<script src="js/phase10cards.js"></script>
<script src="js/phase10logic.js"></script>
<script src="js/computerlogic.js"></script>
<script src="js/phases.js"></script>

</body>
</html>