

<script>

$('.cardsDeck').click(function() {

	var new_card = $(this).clone();

	new_card.addClass('playerHand');

	// Place the card in the player's hand
	$(#player0Cards).prepend(new_image);

}




// Constants

var numPacks = 8;
var numShuffles = 10;

// Globals

var deck;
var burnCard;
var computer1;
var computer2;
var computer3;
var player;
var curPlayerHand;
var curPlayerPhases;

// Initialize game on page load

window.onload = initGame;

function initGame() {

	// Initalize card deck
	deck = new Stack();
	newDeck();

	// Create computer and player hands
	computer1 = new Hand("computer1");
	computer2 = new Hand("computer2");
	computer3 = new Hand("computer3");
	player    = new Hand("player");


}

//Phase 10 hand object

function Hand(id) {

	this.cards = new Array();

	// Get page elements based on the id

	this.fieldNode = document.getElementById(id);
	this.cardsNode = document.getElementById(id + "Cards");
	this.scoreTextNode = document.getElementById(id+ "Score").firstChild;
	
	this.reset = handReset;
	this.addCard = handAddCard;
	this.removeCard = handRemoveCard;
	this.getScore = handGetScore;
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
	pass;
	// Remove the card node from the display 
	this.cardsNode.removeChild(this.cardsNode.lastChild);

	// Return the card

function checkPhase() {

	pass;
}

function handClearCards() {
	// Remove the card nodes in the associated card area
	while (this.cardsNode.lastChild)
		this.cardsNode.removeChild(this.cardsNode.lastChild)

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





function startRound() {
    var pbutton = document.getElementById("playbutton");
    pbutton.style.display="none";
}

$("#playbutton").click(function() {
    $('#playbutton').css('display', 'none');
    
})


function pass() {

	var i;

	// Reset everyone's hands
	computer1.reset();
	computer2.reset();
	computer3.reset();
	player.reset();

	// If the burn card was reached, start a new deck
	if (deck.cardCount() < burnCard) {
		alert("New Deck.");
		newDeck();
	}

	// Deal the cards
	dealRound();

	var x = document.getElementById("playbutton");
	x.style.display = 'none';




}

function getCard() {

	// If the player chooses to get a card from the top of the deck,
	// this function deals it to them

	switch(dealRound)
	pass;	
}

function getDiscardCard() {

	// Should the player choose to get a card from the top of the discard
	// pile, this function takes it and gives it to them
	if top card is not skip or wild!
	pass;
}

function playRound() {

	pass;

}

function addPhase() {

	pass;
}

function show(){
	if(document.layers) document.layers['mydiv'].visibility="show";
	if(document.getElementById) document.getElementById("mydiv").style.visibility="visible";
	if(document.all) document.all.mydiv.style.visibility="visible";
}

function hide(){
	if(document.layers) document.layers['mydiv'].visibility="hide";
	if(document.getElementById) document.getElementById("mydiv").style.visibility="hidden";
	if(document.all) document.all.mydiv.style.visibility="hidden";
}


}
</script>