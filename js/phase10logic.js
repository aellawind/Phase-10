

$("document").ready(function () {

	// Globals

	var deck;
	var player;
	var computer1;
	var computer2;
	var computer3;
	var numPacks = 8;
	var numShuffles= 10;
	

	$("#playbutton").click(function() {
	    $("#playbutton").css('display', 'none');
	   
	    // Initalize card deck
		deck = new Stack();
		newDeck();

		// Create computer and player hands
		computer1Stack = new Stack;
		computer2Stack = new Stack;
		computer3Stack = new Stack;
		playerStack    = new Stack;

		var numCardsPerPlayer = 10;
		var playerCards = new Array(numCardsPerPlayer);
		var computer1Cards = new Array(numCardsPerPlayer);
		var computer2Cards = new Array(numCardsPerPlayer);
		var computer3Cards = new Array(numCardsPerPlayer);

		var k = numCardsPerPlayer;

		while (k > 0 && deck.cardCount() > 0) {

			playerCards.push(deck.deal());
			computer1Cards.push(deck.deal());
			computer2Cards.push(deck.deal());
			computer3Cards.push(deck.deal());
			k--;
		}

		//just testing, delete later
		 $("#errorthing").html('test');

		var playerCardStrings = "";
        var computer1CardStrings = "";
        var computer2CardStrings = "";
        var computer3CardStrings = "";

        _.each(playerCards, function(card) {
            playerCardStrings += card.toString() + '\n';
            playerStack.addCard(card);
            node = card.createNode();
            $('#playerDivId').append(node);
        });

        _.each(computer1Cards, function(card) {
            computer1CardStrings += card.toString() + '\n';
            computer1Stack.addCard(card);
            node = card.createNode();
            $('#computer1DivId').append(node);
        });

         _.each(computer2Cards, function(card) {
            computer2CardStrings += card.toString() + '\n';
            computer2Stack.addCard(card);
            node = card.createNode();
            $('#computer2DivId').append(node);
        });

          _.each(computer3Cards, function(card) {
            computer3CardStrings += card.toString() + '\n';
            computer3Stack.addCard(card);
            $('#computer3DivId').append( card.createNode() );
        });

        console.log('Your opponent1 was dealt these cards: \n\n' + computer1CardStrings);
        console.log('Your opponent2 was dealt these cards: \n\n' + computer2CardStrings);
        console.log('Your opponent3 was dealt these cards: \n\n' + computer3CardStrings);
        console.log('You were dealt these cards: \n\n' + playerCardStrings);
        console.log('opponentStack has [' + computer1Stack.cardCount() +'] cards\nplayerStack has [' + playerStack.cardCount() +'] cards');

	    

	})

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

