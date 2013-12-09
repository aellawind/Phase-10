// !!!!! Remember to fix all comments on this page
// Remember to pre load the images for faster loading
// Remember to make wild and skip cards

// This is the constructor function to create the Card object

function Card(rank, colors) {

	this.rank = rank;
	this.colors = colors;

	// Returns the value of the card as a text string
	this.toString = cardToString;
	// Used to graphically display the card
	this.createNode = cardCreateNode;
}

function newDeck() {

		// Create a deck
		deck.makeDeck(numPacks);
		deck.shuffle(numShuffles);
	}

function cardToString() {

	var cardRank, cardColor;

	switch (this.rank) {
		case "1" :
			cardRank = "One";
			break;
		case "2" :
			cardRank = "Two";
			break;
		case "3" :
			cardRank = "Three";
			break;
		case "4" :
			cardRank = "Four";
			break;
		case "5" :
			cardRank = "Five";
			break;
		case "6" :
			cardRank = "Six";
			break;
		case "7" :
			cardRank = "Seven";
			break;
		case "8" :
			cardRank = "Eight";
			break;
		case "9" :
			cardRank = "Nine";
			break;
		case "10" :
			cardRank = "Ten";
			break;
		case "11" :
			cardRank = "Eleven";
			break;
		case "12" :
			cardRank = "Twelve";
			break;
		case "S" :
			cardRank = "Skip";
			break;
		case "W" :
			cardRank = "Wild";
			break;
		default :
			cardRank = null;
			break;
	}

	switch (this.colors) {
		case "Y" :
			cardColor = "Yellow";
			break;
		case "B" :
			cardColor = "Blue";
			break;
		case "G" :
			cardColor = "Green";
			break;
		case "R" :
			cardColor = "Red";
			break;
		case "X":
			cardColor = "Special";
			break;
		default :
			cardColor = null;
			break;
	}

	if (cardRank == null || cardColor == null)
		return "NULL";

	return cardRank + " of " + cardColor;
}

/** 
cardCreateNode(): Returns a DIV node which can be used to 
display a card on a page.
Pre load the images for faster loading time.
**/


function cardCreateNode() {

	var cardNode, frontNode;
	
	// Build the front of the card

	frontNode = document.createElement("DIV");
	frontNode.className = "front";

	idCard = this.colors + this.rank;

	// This is the main node, a DIV tag
	cardNode = document.createElement("DIV");
	cardNode.className = "card";
	cardNode.className += " sortable";
	cardNode.id = idCard;

	// For the image of the card
	imgNode = document.createElement("IMG");
	imgNode.className = "cardface";

	// Get the proper image for the card suit and number
	imgNode.src = "/images/4green.png";

	if (this.colors == null || this.rank == null)
		return "NULL";

	src_link = '/images/' + this.rank + this.colors + '.png';
	imgNode.src = src_link;

	
	frontNode.appendChild(imgNode);
	cardNode.appendChild(frontNode);

	return cardNode;
}

// The following defines everything relevant to the stack, which is an array of cards

function Stack() {

	// Allows us to use Card objects in a manner similar to how
	// a real stack of cards is used. Creates an ordered set of cards
	// that can be drawn from, added to, shuffled, or combined with 
	// Other stacks

	this.cards = new Array();
	this.makeDeck = stackMakeDeck;
	this.shuffle = stackShuffle;
	this.deal = stackDeal;
	this.addCard = stackAddCard;
	this.combine = stackCombine;
	this.cardCount = stackCardCount;
	this.removeCard = stackRemoveCard;
	this.clearCards = stackClearCards;
	
}



// This function takes in an integer argument for the number of
// Packs to include. For phase 10 rules it will be 2.
function stackMakeDeck(n) {

	var ranks = new Array("1", "2", "3", "4", "5", "6", "7", "8",
							"9", "10", "11", "12");
	var suits = new Array("Y", "B", "G", "R");

	var m = ranks.length * suits.length;

	// Set array of cards excluding Wilds and Skips
	this.cards = new Array(n * m);

	/**
	Creates an array of card objects based off of n, which is the
	number of decks needed; then iterates over j, which is the suits,
	then appends the skips and wilds.
	**/
	for (var i=0; i < n; i++)
		for (var j=0; j < suits.length; j++)
				for (var k=0; k < ranks.length; k++)
					this.cards[i*m+j*ranks.length + k] =
						new Card(ranks[k], suits[j]);

	
	//Append the wilds
	for (var l=0; l<n*4; l++)
		this.cards.push(new Card("W", "X"));

	//Append the skips
	for (var m=0; m<n*2; m++)
		this.cards.push(new Card("S", "X"));


}	

/** 
This is the shuffle method that randomizes the order of the cards n times.
For each shuffle it loops through every card in the array and swaps it with
another card randomly selected from the array.
**/

function stackShuffle(n) {

	var i, j, k;
	var temp;

	for (i=0; i<n; i++) {
		for (j=0; j<this.cards.length; j++) {
			k = Math.floor(Math.random() * this.cards.length);
			temp = this.cards[j];
			this.cards[j] = this.cards[k];
			this.cards[k] = temp;

		}
	}
}

/** 
This is the deal method that simualates dealing one card
from the stack/deck. The first card is removed and returned
to the player.
**/

function stackDeal() {

	if (this.cards.length > 0)
		return this.cards.pop();
	else
		return null;
}



/** 
Add cards to the end of a stack's card array
**/

function stackAddCard(card) {

	this.cards.push(card);
}

// Combines stacks together
// Usage: stack1.combine(stack2) leaves stack with the cards
// and leaves stack2 empty
function stackCombine(stack) {

	this.cards = this.cards.concat(stack.cards);
	stack.cards = new Array();

}

function stackCardCount() {
	
	return this.cards.length;
}

function stackRemoveCard(cardNumber, cardColor) {

	var cardIndex;
	for (var i = 0; i < this.cards.length; i++) {
			
		if (this.cards[i].rank == cardNumber && 
			this.cards[i].colors == cardColor ) {
				cardIndex = this.cards.indexOf(this.cards[i]);
		}
	}
	
	var removedCard = new Card(cardNumber, cardColor);
	return removedCard;

}

function stackClearCards() {
	while (this.cards.length > 0) {
        this.cards.pop();
	}

}


