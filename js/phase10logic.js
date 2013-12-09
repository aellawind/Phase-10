//http://www.jqueryscript.net/layout/Dynamic-Drag-Drop-Grid-Layout-Plugin-With-jQuery-Gridly.html
/* Pre load the card images for faster loading*/

$("document").ready(function () {

    // Globals
    deck = new Stack;
    numPacks = 2;
    numShuffles = 10;

    player = new Player;
    computer1 = new Player;
    computer2 = new Player;
    computer3 = new Player;
    
    // Phase globals
	phase1Stack = new Stack();
	phase2Stack = new Stack();


    // Create computer and player hands
    computer1Stack = new Stack;
    computer2Stack = new Stack;
    computer3Stack = new Stack;
    playerStack = new Stack;
    discardStack = new Stack;


    // Play button; deals out the cards and essentially starts the game
    // Re work later so it starts new phases / the next phase
    $("#playbutton").click(function() {
        $("#playbutton").css('display', 'none');
        $("#submitPhase1").css('display', 'block');
        $("#discardbutton").css('display', 'block');
        // Initalize card deck
        //deck = new Stack();
        newDeck();
        dealDeck(deck);

        var drawCard = deck.deal();
		discardStack.addCard(drawCard);
		var node = drawCard.createNode();
		node.firstChild.style.visibility = "";
    	$('#discardDeck').append(node);
    	$(node).click(takeDiscard);


        $("#drawDeck").unbind('click').one("click", function () {
            drawCard = deck.deal();
            startTurn(drawCard);
        });


    // Important game functions

    function newDeck() {

        // Create a deck
        deck.makeDeck(numPacks);
        deck.shuffle(numShuffles);
    }
    
   	//test out my computers here
   	//runComputer();


    });
		


    $("#discardbutton").click(function() {
   		discardCardEndTurn();
   	});
   	$('#playerDivId').sortable();




});

function takeDiscard() {

    console.log('clicked');
    $(this).off( "click");
    $(this).css('left', '0px');
    $(this).css('top', '0px');
    id = '#' + $(this).attr('id');
    moveAnimate(id, '#playerDivId')
    $('#discardLockScreen').css('display', 'block');

}

// Create a player object to keep track of the current phase and the score
function Player() {

	this.current_phase = 1;
	this.score = 0;
}

// Deals out the deck to the playeers
function dealDeck(deck) {

	// Number of cards a person is 10
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
    for (var c = 0; c < 10; c++) {
        var pcard = playerStack.cards[c];
        node = pcard.createNode();
        node.firstChild.style.visibility = "";
        $('#playerDivId').append(node);

        var c1card = computer1Stack.cards[c];
        node = c1card.createNode();
        $('#computer1DivId').append(node);

        var c2card = computer2Stack.cards[c];
        node = c2card.createNode();
        $('#computer2DivId').append(node);

        var c3card = computer3Stack.cards[c];
        node = c3card.createNode();
        $('#computer3DivId').append(node);

    }
}



function startTurn(drawCard) {

    console.log('turn started');
    playerStack.addCard(drawCard);
    node = drawCard.createNode();
    node.firstChild.style.visibility = "";
    $('#playerDivId').append(node);

 
}

function revertBack() {

	$('#playerDivId').append(node);
	return true;
}

function discardCardEndTurn() {

    alert('Drag a card to the discard pile to end your turn!');
   
    $('.card').draggable({
    	revert: revertBack,
    	stack: '#playerDivId div',
    });

    $('#discardDeck').droppable({
        accept: '#playerDivId div',
        hoverClass: 'hovered',
        drop: handleCardDiscard
    });

    //If card is dropped to the correct slot,
    //Position it directly on top of the slot
    //And prevent it from being dragged again, but allow it to be clicked again
    //For the next person to withdraw from it
    function handleCardDiscard(event, ui) {

        var cardID = $(ui.draggable).attr("id");
        var cardNumber = cardID.slice(1);
        var cardColor = cardID[0];

        $(this).css('z-index', '1');
        $(this).append(ui.draggable);
        $(ui.draggable).css('position', 'relative');
        $(ui.draggable).css('z-index', '100');
        ui.draggable.draggable('disable');
        ui.draggable.position({
            of: $(this),
            my: 'left top',
            at: 'left top'
        });
        ui.draggable.draggable('option', 'revert', false);

        // remove the card from the player's div and stack
        var discardedCard = playerStack.removeCard(cardNumber, cardColor);
        discardStack.addCard(discardedCard);

        // Let the card be clickable
        $(ui.draggable).click(function () {

            console.log('clicked');
            $(ui.draggable).css('left', '0px');
            $(ui.draggable).css('top', '0px');


            id = '#' + $(this).attr('id');
            ui.draggable.draggable('enable');
            moveAnimate(id, '#playerDivId')

            $('#discardLockScreen').css('display', 'block');


        });
        alert('donesies with your turn!'); // end turn!
        nextTurn();

    }
}

// Goes to the next turn
function nextTurn() {

	// run computer 1
	// run computer 2
	// run computer 3

	$('#screen').css('display', 'none');
	$('#phaseCompleteMessage').css('visibility', 'hidden');
		
	$('#phaseField1').empty();
    $('#phaseField2').empty();

	$("#drawDeck").unbind('click').one("click", function () {
            drawCard = deck.deal();
            startTurn(drawCard);
            $('#discardLockScreen').css('display', 'block');
        });

	$("#discardbutton").click(function() {
   		discardCardEndTurn();
   	});

   	$('#playerDivId').sortable({ disabled: false });
   	$('phaseField').css('display', 'none');
   	$('phaseField1').css('display', 'none');
   	$('phaseField2').css('display', 'none');


}

// Restarts the next round
function nextRound() {

	$('#screen').css('display', 'none');

	//player.current_phase += 1;
	console.log(player.current_phase);
	deck.clearCards();
	discardStack.clearCards();
	computer1Stack.clearCards();
    computer2Stack.clearCards();
    computer3Stack.clearCards();
    playerStack.clearCards();

    $('#playerDivId').empty();
    $('#computer1DivId').empty();
    $('#computer2DivId').empty();
    $('#computer3DivId').empty();
    $('#discardDeck').empty();
    $('#phaseField1').empty();
    $('#phaseField2').empty();


    playerCardStrings = "";
    computer1CardStrings = "";
    computer2CardStrings = "";
    computer3CardStrings = "";

    newDeck();
    dealDeck(deck);

	$('#discardLockScreen').css('display', 'none');
	$('#phaseField').css('display', 'none');    

}

function runComputer() {

	$('#screen').show();
	//todo: insert animate from draw pile to their stack of cards

	console.log(computer1.current_phase);
	console.log(computer1Stack.cards);
	// Draw a card
	var drawCard = deck.deal();
	computer1Stack.addCard(drawCard);

	// Check to see if the computer can play any phases
	computer_phase1function(computer1Stack.cards);

	// Discard a card and end the computer's turn
	//var discardedCard = playerStack.removeCard(cardNumber, cardColor);
    //discardStack.addCard(discardedCard);
    //var node = discardedCard.createNode();
    //$('#discardDeck').append(node);

	//todo:animate a card to the discard pile
}

var computer_phase1function = function(phase_cards) {
    // Should be set of 3
    var matched_counter = identicalCards(phase_cards);
    var num_sets = Object.keys(matched_counter).length;
    var longest_set;

}


 