// This is the constructor function to create the Card object
function Card(rank, colors) {

    this.rank = rank;
    this.colors = colors;

    // Returns the value of the card as a text string
    this.toString = cardToString;
    // Used to graphically display the card
    this.createNode = cardCreateNode;
}

function newDeck(deck) {
    // Create a deck
    deck.makeDeck(numPacks);
    deck.shuffle(numShuffles);
}

// Function that converts a card to a string for easier debugging
function cardToString() {

    var cardRank, cardColor;

    switch (this.rank) {
    case "1":
        cardRank = "One";
        break;
    case "2":
        cardRank = "Two";
        break;
    case "3":
        cardRank = "Three";
        break;
    case "4":
        cardRank = "Four";
        break;
    case "5":
        cardRank = "Five";
        break;
    case "6":
        cardRank = "Six";
        break;
    case "7":
        cardRank = "Seven";
        break;
    case "8":
        cardRank = "Eight";
        break;
    case "9":
        cardRank = "Nine";
        break;
    case "10":
        cardRank = "Ten";
        break;
    case "11":
        cardRank = "Eleven";
        break;
    case "12":
        cardRank = "Twelve";
        break;
    case "S":
        cardRank = "Skip";
        break;
    case "W":
        cardRank = "Wild";
        break;
    default:
        cardRank = null;
        break;
    }

    switch (this.colors) {
    case "Y":
        cardColor = "Yellow";
        break;
    case "B":
        cardColor = "Blue";
        break;
    case "G":
        cardColor = "Green";
        break;
    case "R":
        cardColor = "Red";
        break;
    case "X":
        cardColor = "Special";
        break;
    default:
        cardColor = null;
        break;
    }

    if (cardRank == null || cardColor == null)
        return "NULL";

    return cardRank + " of " + cardColor;
}

// Helper function to create unique ID for each card
function pad(str, max) {
    return str.length < max ? pad("0" + str, max) : str;
}

// Creates div node for each card
function cardCreateNode() {

    var cardNode, frontNode;
    var stringNodesCreated = pad(String(nodesCreated), "4");

    idCard = stringNodesCreated + this.colors + this.rank;

    // This is the main node, a DIV tag
    cardNode = document.createElement("DIV");
    cardNode.className = "card";
    cardNode.className += " sortable";
    //cardNode.id = idCard;
    cardNode.setAttribute("data-id", idCard);

    // For the image of the card, which is hidden until we need to see it
    imgNode = document.createElement("IMG");
    imgNode.height = "140";
    imgNode.width = "100";
    imgNode.className = "cardface";
    imgNode.style.visibility = "hidden";

    // Get the proper image for the card suit and number
    if (this.colors == null || this.rank == null)
        return "NULL";

    src_link = '/images/' + this.rank + this.colors + '.png';
    imgNode.src = src_link;
    nodesCreated += 1;

    cardNode.appendChild(imgNode);


    return cardNode;
}

// The following defines everything relevant to the stack, which is an array of cards
function Stack() {

    /* Allows us to use Card objects in a manner similar to how
       a real stack of cards is used. Creates an ordered set of cards
       that can be drawn from, added to, shuffled, or combined with other stacks */

    this.cards = new Array();
    this.makeDeck = stackMakeDeck;
    this.shuffle = stackShuffle;
    this.deal = stackDeal;
    this.addCard = stackAddCard;
    this.combine = stackCombine;
    this.cardCount = stackCardCount;
    this.removeCard = stackRemoveCard;
    this.removeCardIndex = stackRemoveCardIndex;
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
    for (var i = 0; i < n; i++)
        for (var j = 0; j < suits.length; j++)
            for (var k = 0; k < ranks.length; k++)
                this.cards[i * m + j * ranks.length + k] =
                    new Card(ranks[k], suits[j]);


    //Append the wilds
    for (var l = 0; l < n * 4; l++)
        this.cards.push(new Card("W", "X"));

    //Append the skips
    for (var m = 0; m < n * 2; m++)
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

    for (i = 0; i < n; i++) {
        for (j = 0; j < this.cards.length; j++) {
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

/* Combines stacks together
   Usage: stack1.combine(stack2) leaves stack with the cards
   and leaves stack2 empty */

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
            this.cards[i].colors == cardColor) {
            cardIndex = this.cards.indexOf(this.cards[i]);
        }
    }

    var removedCard = new Card(cardNumber, cardColor);
    this.cards.splice(cardIndex, 1);
    return removedCard;

}

function stackRemoveCardIndex(cardIndex) {

    var nColor = this.cards[cardIndex].colors;
    var nRank = this.cards[cardIndex].rank;
    removedCard = new Card(nRank, nColor);
    this.cards.splice(cardIndex, 1);
    return removedCard;

}

function stackClearCards() {
    while (this.cards.length > 0) {
        this.cards.pop();
    }

}


/** Preload Images For Faster Viewing Times 
    NOTE: ALL images were made by AMIRA ANUAR in photoshop **/

var cardPath = "/images/";
var cardWidth = 100;
var cardHeight = 140;

var cardPics = new Array(
    "cardback.png",
    "1B.png",
    "1G.png",
    "1R.png",
    "1Y.png",

    "2B.png",
    "2G.png",
    "2R.png",
    "2Y.png",

    "3B.png",
    "3G.png",
    "3R.png",
    "3Y.png",

    "4B.png",
    "4G.png",
    "4R.png",
    "4Y.png",

    "5B.png",
    "5G.png",
    "5R.png",
    "5Y.png",

    "6B.png",
    "6G.png",
    "6R.png",
    "6Y.png",

    "7B.png",
    "7G.png",
    "7R.png",
    "7Y.png",

    "8B.png",
    "8G.png",
    "8R.png",
    "8Y.png",

    "9B.png",
    "9G.png",
    "9R.png",
    "9Y.png",

    "10B.png",
    "10G.png",
    "10R.png",
    "10Y.png",

    "11B.png",
    "11G.png",
    "11R.png",
    "11Y.png",

    "12B.png",
    "12G.png",
    "12R.png",
    "12Y.png",

    "SX.png",
    "WX.png");

var myPics = preloadImages(cardPath, cardPics, cardWidth, cardHeight);

function preloadImages(path, pics, width, height) {

    var images = new Array;

    for (var picNum = 0; picNum < pics.length; picNum++) {
        images[picNum] = new Image(width, height);
        images[picNum].src = (path + pics[picNum]);
    }

    return (images);
}