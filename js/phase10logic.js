//http://www.jqueryscript.net/layout/Dynamic-Drag-Drop-Grid-Layout-Plugin-With-jQuery-Gridly.html

$("document").ready(function () {

	// Globals

	var deck;
	var player;
	var computer1;
	var computer2;
	var computer3;
	var numPacks = 8;
	var numShuffles= 10;
	
	// Create computer and player hands
	computer1Stack = new Stack;
	computer2Stack = new Stack;
	computer3Stack = new Stack;
	playerStack    = new Stack;

	discardStack = new Stack;

	var playerCardStrings = "";
    var computer1CardStrings = "";
    var computer2CardStrings = "";
    var computer3CardStrings = "";
    var phaseDictionary = {};
    var gamePlay = 'True';
    var playerTurnOn = 'True';

    $('#phaseField1').css('display', 'none');
    $('#phaseField2').css('display', 'none');
    
	
	$('#phaseCompleteMessage').hide();
	$('#phaseCompleteMessage').css( {
	    left: '580px',
	    top: '250px',
	    width: 0,
	    height: 0
	  } );

	for (var i=1; i<11;i++) {

		phaseId = "#submitPhase" + i;
		console.log(phaseId);
		$(phaseId).css('display','none');
	}

	// Play button; deals out the cards and essentially starts the game
	// Re work later so it starts new phases / the next phase
	$("#playbutton").click(function() {
	    $("#playbutton").css('display', 'none');
	   	$("#submitPhase1").css('display', 'block');
	    // Initalize card deck
		deck = new Stack();
		newDeck();		

		var k = 10;

		while (k > 0 && deck.cardCount() > 0) {

			playerStack.addCard(deck.deal());
			computer1Stack.addCard(deck.deal());
			computer2Stack.addCard(deck.deal());
			computer3Stack.addCard(deck.deal());
			k--;
		}

		// The following iterates over the cards we've just dealt to each player
		// It turns the cards into strings we can view in the console
		// It also creates nodes for each card and appends the nodes
		// to the respective divs for proper viewing!
		for(var c=0; c<10; c++) {
			var pcard = playerStack.cards[c];
			playerCardStrings += pcard.toString() + '\n';
			node = pcard.createNode();
			$('#playerDivId').append(node);

			var c1card = computer1Stack.cards[c];
			computer1CardStrings += c1card.toString() + '\n';
			node = c1card.createNode();
			$('#computer1DivId').append(node);

			var c2card = computer2Stack.cards[c];
			computer2CardStrings += c2card.toString() + '\n';
			node = c2card.createNode();
			$('#computer2DivId').append(node);

			var c3card = computer3Stack.cards[c];
			computer3CardStrings += c3card.toString() + '\n';
			node = c3card.createNode();
			$('#computer3DivId').append(node);

			
		}

		

        console.log('Your opponent1 was dealt these cards: \n\n' + computer1CardStrings);
        console.log('Your opponent2 was dealt these cards: \n\n' + computer2CardStrings);
        console.log('Your opponent3 was dealt these cards: \n\n' + computer3CardStrings);
        console.log('You were dealt these cards: \n\n' + playerCardStrings);
        console.log('opponentStack has [' + computer1Stack.cardCount() +'] cards\nplayerStack has [' + playerStack.cardCount() +'] cards');

        

    	//while (gamePlay == 'True') {
    	//	playerTurn();
    	//	computer1Turn();
    	//	computer2Turn();
    	//	computer3Turn();
    	//}
	});



	function computer1Turn() {
		gamePlay = 'False';
	}

	function computer2Turn() {
		
	}

	function computer3Turn() {
		
	}

	// The following resets so we can pretend like we're starting a new turn
	$("#reset").click(function() {

		draw_deck();
		
	});

	// When the player clicks the deck of cards he takes from 
	// the top of the deck
	// Player must click this before their turn can start
	// This function allows them only click or draw from the deck
	function draw_deck() {

		$("#drawDeck").unbind('click').one("click", function() {		
			drawCard = deck.deal();
			startTurn(drawCard);
			
		});
	}

	draw_deck();

	//$("#coverDiscard").click( function() {		
	//	drawCard = discardStack.deal();	
	//	startTurn(drawCard);

	//	$("#coverDiscard").css('visibility', 'hidden');

					
	//	});	


	function startTurn(drawCard) {

		console.log('before anything happens:');
		playerCardStrings += drawCard.toString() + '\n';
        playerStack.addCard(drawCard);
        node = drawCard.createNode();
        $('#playerDivId').append(node);

        $('.card').draggable({
        	revert:  true,
        	stack: '#playerDivId div',   		
        });

        $('.card').css('position', 'relative');

        console.log('after anything happens:');
		console.log(playerStack.cards);

        $('#discardDeck').droppable({
        //accept:'.card',
        accept: '#playerDivId div',
        hoverClass: 'hovered',
        drop: handleCardDiscard
    	});

        $('#discardDeck').click(function() {

        	console.log('you clicked the discard deck');
        });

    	//If card is dropped to the correct slot,
    	//Position it directly on top of the slot
    	//And prevent it from being dragged again

    	function handleCardDiscard(event,ui) {
    		// What happens when you discard a card
    		// Get rid of it from the stack
    		// Get rid of it from from the node thing
    		// End the turn

    		var cardID = $(ui.draggable).attr("id");
    		var cardNumber = cardID.slice(1);
    		var cardColor = cardID[0];

    		$(this).css('z-index','1');
    		$(this).append(ui.draggable);
    		$(ui.draggable).css('position', 'relative');
    		$(ui.draggable).css('z-index', '100');
    		ui.draggable.draggable('disable');
    		//$(this).droppable('disable');
    		ui.draggable.position({ of: $(this), my: 'left top', at: 'left top' });
    		ui.draggable.draggable('option', 'revert',  false);
 
 			// remove
    		var discardedCard = playerStack.removeCard(cardNumber, cardColor);
    		discardStack.addCard(discardedCard);
    
    		$(ui.draggable).click(function() {

    			console.log('clicked');
    			$(ui.draggable).css('left', '0px');
    			$(ui.draggable).css('top', '0px');

				
				id = '#' + $(this).attr('id');
				ui.draggable.draggable('enable');
				moveAnimate(id, '#playerDivId')
				

			});
    		
    		playerTurnOn = 'False';
    		alert('donesies'); // end turn!

    		//function playerTurn() {
		//while (PlayerTurnOn = 'True') {
		//	console.log(playerStack.cardCount());
		//	$( ".sortable" ).sortable({
		//		stop: function(event, ui) {
		  //      var index = ui.item.index()+1;
		   //    console.log(index);}
   			 //})
	    	//$( ".sortable" ).disableSelection();
    	//}

	

    	}
           
	}

	


	

	// Animate the card form the discard pile to the end of the player stack
	function moveAnimate(element, newParent){


	    element = $(element); //Allow passing in either a JQuery object or selector
	    newParent= $(newParent); //Allow passing in either a JQuery object or selector
	    var oldOffset = element.offset();
	    console.log('old offset' + oldOffset.left, oldOffset.top);
	    //element.appendTo(newParent);
	    newParent.append(element);
	    var newOffset = element.offset();
	    console.log('new offset' + newOffset.left, oldOffset.top);

	    var temp = element.clone().appendTo('body');
	    temp    .css('position', 'absolute')
	            .css('left', oldOffset.left)
	            .css('top', oldOffset.top)
	            .css('zIndex', 1000);
	    element.hide();
	    temp.animate( {'top': newOffset.top, 'left':newOffset.left}, 'slow', function(){
	       element.show();
	       temp.remove();

	    element.draggable({
	        		revert:  true,
	        		stack: '#playerDivId div',   		
        });


	    });
	}





//Phase 10 hand object

function Hand(id) {

	this.cards = new Array();

	// Get page elements based on the id

	this.fieldNode = document.getElementById(id);
	this.cardsNode = document.getElementById(id + "Cards");
	//this.scoreTextNode = document.getElementById(id+ "Score").firstChild;
	
	this.reset = handReset;
	this.addCard = handAddCard;
	//this.removeCard = handRemoveCard;
	//this.getScore = handGetScore;
	this.clearCards = handClearCards;

	// Initialize as an empty hand
	this.reset();

}

function handReset() {

	// Remove any cards and initialize properties
	this.clearCards();

	this.cards = new Array();
	this.phase = false;	

}

function handAddCard(card, down) {

	var n;
	var node;

	// Add the given card to the hand

	n = this.cards.length;
	this.cards[n] = card;

	// Create a card node for th display, set as face down if requested

	node = this.cards[n].createNode();
	if(down) 
		node.firstChild.style.visibility = "hidden";

	node.style.left = this.left + "em";
	node.style.top = this.top + "em";
	this.cardsNode.appendChild(node);
	this.left += this.leftIncr;
	if (this.cards.length % this.rollEvery ==0)
		this.top = 0;
	else
		this.top += this.topIncr;

}

function handRemoveCard(card) {

	// Remove the chosen card in the array and save it
	// card = this.cards.pop();
	//pass;
	// Remove the card node from the display 
	//this.cardsNode.removeChild(this.cardsNode.lastChild);

	// Return the card
}


function handClearCards() {
	// Remove the card nodes in the associated card area
	//while (this.cardsNode.lastChild)
		//this.cardsNode.removeChild(this.cardsNode.lastChild)

}


// Game functions

function newDeck() {

	// Create a deck
	deck.makeDeck(numPacks);
	deck.shuffle(numShuffles);

	// Burn card to know if we need to reshuffle
	burnCard = Math.round(Math.random() * 26) + 26;

}

function getNextCard() {

	// If no cards are remaining, a new deck starts
	// For phase 10 we probably won't run out of cards..

	if (deck.cardCount() == 0) {
		alert("New Deck");
		newDeck();
	}

	return deck.deal();
}

});

