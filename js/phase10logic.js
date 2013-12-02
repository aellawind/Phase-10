//undo to this point!!!



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

	//var numCardsPerPlayer = 10;
	//var playerCards = new Array(numCardsPerPlayer);
	//var computer1Cards = new Array(numCardsPerPlayer);
	//var computer2Cards = new Array(numCardsPerPlayer);
	//var computer3Cards = new Array(numCardsPerPlayer);

	var playerCardStrings = "";
    var computer1CardStrings = "";
    var computer2CardStrings = "";
    var computer3CardStrings = "";
    var phaseDictionary = {};
    var gamePlay = 'True';
    var playerTurnOn = 'True';
	
	$('#phaseCompleteMessage').hide();
	$('#phaseCompleteMessage').css( {
	    left: '580px',
	    top: '250px',
	    width: 0,
	    height: 0
	  } );

	for (var i=1; i<11;i++) {

		phaseId = '#submitPhase' + i;
		$(phaseId).css('display','none');
	}


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



    	while (gamePlay == 'True') {
    		playerTurn();
    		computer1Turn();
    		computer2Turn();
    		computer3Turn();
    	}

	    

	});


	function playerTurn() {
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

	function computer1Turn() {
		gamePlay = 'False';
	}

	function computer2Turn() {
		
	}

	function computer3Turn() {
		
	}




	// When the player clicks the deck of cards he takes from 
	// the top of the deck
	$("#drawDeck").click(function() {

		drawCard = deck.deal();
		playerCards.addCard(drawCard);
		playerCardStrings += drawCard.toString() + '\n';
        playerStack.addCard(drawCard);
        node = drawCard.createNode();
        $('#playerDivId').append(node);

        $('.card').draggable({
        	revert:  true,
        	stack: '#playerDivId div',   		
        });

        $('#discardDeck').droppable({
        //accept:'.card',
        accept: '#playerDivId div',
        hoverClass: 'hovered',
        drop: handleCardDiscard
    	});

    	//If card is dropped to the correct slot,
    	//Position it directly on top of the slot
    	//And prevent it from being dragged again

    	function handleCardDiscard(event,ui) {
    		// What happens when you discard a card
    		// Get rid of it from the stack
    		// Get rid of it from from the node thing
    		// End the turn

    		ui.draggable.draggable('disable');
    		//$(this).droppable('disable');
    		ui.draggable.position({ of: $(this), my: 'left top', at: 'left top' });
    		ui.draggable.draggable('option', 'revert',  false);

    		playerTurnOn = 'False';
    		alert('Your turn is over');


    	}
           
	});

	$('#submitPhase1').click(function() {

		$('.sortable').sortable({ disabled: true });
		$('.card').draggable({
        	revert:  true,
        	stack: '#playerDivId div',   		
        });

		for(var i = 0; i <6; i++) {
			if (i ==0 || i == 3) {
				$('<div>Set of 3</div>').attr('class', 'phaseMsg').appendTo('#phaseField')
			}
			$('<div></div>').data('number', i).attr('class', 'phaseFieldDiv').appendTo('#phaseField').droppable( {

				accept: '#playerDivId div',
				hoverClass: 'hovered',
				drop: handlePhaseCardDrop
				
			});

		}


    	function handlePhaseCardDrop(event,ui) {
    		//if (something)
    		//	ui.draggable.addClass('correct');
    		//$(this).droppable('disable');
    		var cardID = $(ui.draggable).attr("id");
    		var cardNumber = cardID.slice(1);
    		var cardColor = cardID[0];
    		var draggedPlace = $(this).data('number');
 


    		console.log('you just moved' + cardNumber + 'color of' + cardColor);
    		console.log(playerStack.cardCount());

    		ui.draggable.position({ of: $(this), my: 'left top', at: 'left top' });
    		ui.draggable.draggable('option', 'revert',  false);
    		phaseDictionary[draggedPlace] = cardNumber;
    		//phaseDictionary.key = draggedPlace;
    		//phaseDictionary.val = cardID;
  	
  			console.log('This dictionary has values currently:');
  			for (var i in phaseDictionary) {

  				console.log('key:' + i + 'value:' + phaseDictionary[i]);

  			}

  			// Make sure it's not empty
	    	if (phaseDictionary[0] != undefined && phaseDictionary[0] == phaseDictionary[1] && phaseDictionary[1] == phaseDictionary[2]) {
	    		if (phaseDictionary[3] != undefined && phaseDictionary[3] == phaseDictionary[4] && phaseDictionary[4] == phaseDictionary[5]) {
	    			ui.draggable.draggable('disable');
	    			$(this).droppable('disable');
		   			console.log('equal of' +phaseDictionary[0] +phaseDictionary[1]+phaseDictionary[2]);

	    			$('#phaseCompleteMessage').show();
				    $('#phaseCompleteMessage').animate( {
					      left: '380px',
					      top: '200px',
					      width: '400px',
					      height: '100px',
					      opacity: 1
		    			});
		    		}
	    		}
	    	}
    	


	});

	// Discard a card
	//$("cardface").click(function() {

	//	discardCard = 
	//	discardStack.push(discardCard);

	//})

	function newDeck() {

		// Create a deck
		deck.makeDeck(numPacks);
		deck.shuffle(numShuffles);
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

