<script>
// !!!!! Remember to fix all comments on this page

// This is the constructor function to create the Card object

function Card(rank, suit) {

	this.rank = rank;
	this.suit = suit;

	// Returns the value of the card as a text string
	this.toString = cardToString;
	// Used to graphically display the card
	this.createNode = cardCreateNode;
}

function cardToString() {

	var rank, suit;

	switch (this.rank) {
		case "A" :
			rank = "Ace";
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
		case "J" :
			rank = "Jack";
			break;
		case "Q" :
			rank = "Queen";
			break;
		case "K" :
			rank = "King";
			break;
		// For skips
		case "O" :
			rank = "Skip";
			break
		case "W"
			rank = "Wild";
			break
		default :
			rank = null;
			break
	}

	switch (this.suit) {
		case "C" :
			suit = "Clubs";
			break;
		case "D" :
			suit = "Diamonds"
			break;
		case "H" :
			suit = "Hearts"
			break;
		case "S" :
			suit = "Spades"
			break;
		// For wilds and skips
		case "Z" : 
			suit = "Special"
			break;
		default :
			suit = null;
			break;
	}

	if (rank == null || suit == null)
		return "";

	return rank + " of " + suit;
}