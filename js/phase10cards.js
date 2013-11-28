// !!!!! Remember to fix all comments on this page

// This is the constructor function to create the Card object

function Card(rank, color) {

	this.rank = rank;
	this.color = color;

	// Returns the value of the card as a text string
	this.toString = cardToString;
	// Used to graphically display the card
	this.createNode = cardCreateNode;
}

function cardToString() {

	var rank, color;

	switch (this.rank) {
		case "1" :
			rank = "One";
			break;
		case "2" :
			rank = "Two";
			break;
		case "3" :
			rank = "Three";
			break;
		case "4" :
			rank = "Four";
			break;
		case "5" :
			rank = "Five";
			break;
		case "6" :
			rank = "Six";
			break;
		case "7" :
			rank = "Seven";
			break;
		case "8" :
			rank = "Eight";
			break;
		case "9" :
			rank = "Nine";
			break;
		case "10" :
			rank = "Ten";
			break;
		case "11" :
			rank = "Eleven";
			break;
		case "12" :
			rank = "Twelve";
			break;
		case "S" :
			rank = "Skip";
			break
		case "W"
			rank = "Wild";
			break
		default :
			rank = null;
			break
	}

	switch (this.color) {
		case "Y" :
			suit = "Yellow";
			break;
		case "B" :
			suit = "Blue"
			break;
		case "G" :
			suit = "Green"
			break;
		case "R" :
			suit = "Red"
			break;
		case "X";
			suit = "Special"
		default :
			suit = null;
			break;
	}

	if (rank == null || color == null)
		return "";

	return rank + " of " + color;
}

/** 
cardCreateNode(): Returns a DIV node which can be used to 
display a card on a page.
**/
var cardImg1yellow = new Image();  cardImgImg1yellow.src="/images/01yellow.png";
var cardImg2yellow = new Image();  cardImg2yellow.src="/images/02yellow.png";
var cardImg3yellow = new Image();  cardImg3yellow.src="/images/03yellow.png";
var cardImg4blue = new Image();    cardImg4blue.src="/images/04blue.png";
var cardImg5blue = new Image();    cardImg5blue.src="/images/05blue.png";
var cardImg6blue = new Image();    cardImg6blue.src="/images/06blue.png";
var cardImg7green = new Image();   cardImg7green.src="/images/07green.png";
var cardImg8green = new Image();   cardImg8green.src="/images/08green.png";
var cardImg9red = new Image();     cardImg9red.src="/images/09red.png";
var cardImg10red = new Image();    cardImg10red.src="/images/10red.png";
var cardImg11red = new Image();    cardImg11red.src="/images/11red.png";
var cardImg12blue = new Image();   cardImg12blue.src="/images/12blue.png";
var cardImg12green = new Image();  cardImg12green.src="/images/12green.png";
var cardImg12red = new Image();    cardImg12red.src="/images/12red.png";
var cardImg12yellow = new Image(); cardImg12yellow.src="/images/12yellow.png";

function cardCreateNode() {

	var cardNode, frontNode, indexNode, spotNode, tempNode, textNode;
	var indexStr, spotChar;

	// Build the front of the acrd

	frontNode = document.createElement("DIV");
	frontNode.className = "front";
	
	// This is the main node, a DIV tag
	cardNode = document.createElement("DIV");
	cardNode.className = "card";


	// Get the proper image for the card suit and number
	if (this.rank == "1" && this.color =="Y")
		cardNode.src = "images/01yellow.png";
	if (this.rank == "2" && this.color =="Y")
		cardNode.src = "images02/yellow.png";
	if (this.rank == "3" && this.color == "Y")
		cardNode.src = "images/03yellow.png";
	if (this.rank == "4" && this.color =="B")
		cardNode.src = "images/04blue.png";


	return cardNode;
}


function Stack() {

	// Allows us to use Card objects in a manner similar to how
	// a real stack of cards is used. Creates an ordered set of cards
	// that can be drawn from, added to, shuffled, or combined with 
	// Other stacks

	this.cards = new Array();

	this.makeDeck = stackMakeDeck;
	this.shuffle = stackShuffle;
	this.deal = stackDeal;
	this.draw = stackDraw;
	this.addCard = stackAddCard;
	this.combine = stackCombine;
	this.cardCount = stackCardCount;

}

// This function takes in an integer argument for the number of
// Packs to include. For phase 10 rules it will be 8.
function stackMakeDeck(n) {

	var ranks = new Array("A", "2", "3", "4", "5", "6", "7", "8",
							"9", "10", "11", "12");
	var suits = new Array("C", "D", "H", "S");


	// The length is based off of the suits and ranks as well as 
	// n, the number of wilds per pack, and n*0.5, the number of skips.
	var L = ranks.length * suits.length + n + n*0.5

	// Set array of cards
	this.cards = new Array(n * m);

	/**
	Creates an array of card objects based off of n, which is the
	number of decks needed; then iterates over j, which is the suits,
	then appends the skips and wilds.
	**/
	for (var i=0; i < n; i++)
		for (var j=0; j < suits.length, j++)
				for (var k=0; k < ranks.length, k++)
					this.cards[i*m+j*ranks.length + k] =
						new Card(ranks[k], suits[j]);


	//Append the wilds
	for (var l=0; l<n; l++)
		this.cards.push(new Card["W", "X"]);

	//Append the skips
	for (var m=0; m<n*0.5)
		this.cards.push(new Card["S", "X"])


}	

	/** 
	This is the shuffle method that randomizes the order of the cards n times.
	For each shuffle it loops through every card in the array and swaps it with
	another card randomly selected from the array.
	**/

	function stackShuffle(n) {

		var a, b, c;
		var tempt;

		for (var a=0; a<n;, a++)
			for (var b=0; b<this.cards.length; b++) {
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

	function stackDeal() {}

		if (this.cards.length > 0)
			return this.cards.shift();
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




}