$("document").ready(function () {

    // Preload card images
    preloadImages(cardPath, cardPics, cardWidth, cardHeight);

    // Globals
    deck = new Stack;
    numPacks = 2;
    numShuffles = 10;

    // Create player variables to hold phases and scores
    // Score keeping will be added later as an additional feature
    player = new Player;
    computer1 = new Player;
    computer2 = new Player;
    computer3 = new Player;

    // Phase stack globals
    phase1Stack = new Stack();
    phase2Stack = new Stack();
    c1phase1Stack = new Stack();
    c1phase2Stack = new Stack();
    c2phase1Stack = new Stack();
    c2phase2Stack = new Stack();
    c3phase1Stack = new Stack();
    c3phase2Stack = new Stack();

    // Create computer and player hands
    computer1Stack = new Stack;
    computer2Stack = new Stack;
    computer3Stack = new Stack;
    playerStack = new Stack;
    discardStack = new Stack;

    // To keep track of how many card nodes we've created
    nodesCreated = 0;

    // Upon page load, display buttons for rules and game play
    //$("#rulesbutton").click(showRules);
    $("#rulesbutton").click(showRules);
    $('#boxclose').click(closeBox);

    // Play button; deals out the cards and essentially starts the game
    // with the necessary initializations
    $("#playbutton").click(function () {
        $("#playbutton").css('display', 'none');
        $("#playbuttons").css('display', 'none');
        $("#playgameoverlay").css('display', 'none');
        $("#rulesbutton").css('display', 'none');
        $("#submitPhasePrep").css('display', 'none');
        $("#discardbutton").css('display', 'block');
        $("#drawDeck").css('display', 'block');
        $("#readrules").css('display', 'block');
        // Initalize card deck
        newDeck(deck);
        dealDeck(deck);


        
        var drawCard = deck.deal();
        discardStack.addCard(drawCard);
        var node = drawCard.createNode();
        node.firstChild.style.visibility = "";
        $('#discardDeck').append(node);
        $(node).click(takeDiscard); // Player has option to take from discard pile...
        
        $('#drawDeck').click(takeDeck); // OR player has option to take from the deck

        // Reset the phase field
        $('#resetphasebutton').click(function () {
            resetPhase();
        });

        // Allows player to sort his cards
        $("#playerDivId").sortable({
            connectWith: '#phaseField1, #phaseField2, #c1p1field, #c1p2field, #c2p1field, #c2p2field, #c3p1field, #c3p2field, #discardDeck'
        }).disableSelection();

        $("#discardDeck").droppable({
            accept: "#playerDivId div",
            hoverClass: "ui-state-hover",
            drop: handleCardDiscard
        });

        
    });

});

// Show the rules in the beginning
function showRules() {

    $('#overlay').fadeIn(200, function () {
        $('#box').animate({
            'top': '20px'
        }, 200);
    });
    return false;
}

// Close the rules box
function closeBox() {
    $('#box').animate({
        'top': '-1500px'
    }, 500, function () {
        $('#overlay').fadeOut('fast');
    });
}

// Create a player object to keep track of the current phase and the score
function Player() {

    this.current_phase = 1;
    this.score = 0;
}

// Create a deck
function newDeck(deck) {

    deck.makeDeck(numPacks);
    deck.shuffle(numShuffles);
}

// Take a card from the discard pile
function takeDiscard() {

    console.log("Function take discard");
    $(this).css('left', '0px');
    $(this).css('top', '0px');
    id = $(this).data('id');
    moveAnimate(id, '#playerDivId', '#discardDeck');
    $('#lockScreen').css('display', 'block');
    $('#submitPhasePrep').css('display', 'block');
    $('#playerFieldLock').css('display', 'none');

}

//Animation function
function moveAnimate(dataid, newParent, oldParent) {

    query_string = "[data-id='" + dataid + "']";
    el = document.querySelector(query_string);
    console.log(query_string);

    element = $(el); //Allow passing in either a JQuery object or selector
    oldparent = $(oldParent);
    newParent = $(newParent); //Allow passing in either a JQuery object or selector

    var oldOffset = oldparent.offset();
    newParent.append(element);
    var newOffset = element.offset();

    var temp = element.clone().appendTo('body');
    temp.css('position', 'absolute')
        .css('left', oldOffset.left)
        .css('top', oldOffset.top)
        .css('zIndex', 1000);
    element.hide();
    temp.animate({
        'top': newOffset.top,
        'left': newOffset.left
    }, 'slow', function () {
        element.show();
        temp.remove();

    });

}



function takeDeck() {
    drawCard = deck.deal();
    startTurn(drawCard);
    $('#lockScreen').css('display', 'block');
    $('#submitPhasePrep').css('display', 'block');
    $('#playerFieldLock').css('display', 'none');
}

// Deals out the deck to the players
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

    console.log('Turn started.');
    playerStack.addCard(drawCard);
    node = drawCard.createNode();
    id = $(node).data('id');
    node.firstChild.style.visibility = "";
    //$('#playerDivId').append(node);
    $('#drawDeck').append(node);
    moveAnimate(id, '#playerDivId', '#drawDeck');
    console.log(computer1Stack.cards);
    console.log(computer2Stack.cards);
    console.log(computer3Stack.cards);

}

function revertBack() {

    $('#playerDivId').append(node);
    return true;
}


function handleCardDiscard(event, ui) {
    var cardID = $(ui.draggable).data('id');
    var cardNumber = cardID.slice(5);
    var cardColor = cardID[4];
    $("#submitPhasePrep").css('display', 'none');

    /*$(this).css('z-index', '1');
    $(this).append(ui.draggable);
    $(ui.draggable).css('position', 'relative');
    $(ui.draggable).css('z-index', '100');
    ui.draggable.position({
        of: $(this),
        my: 'left top',
        at: 'left top'
    });

    // Remove the card from the player's div and stack
    var discardedCard = playerStack.removeCard(cardNumber, cardColor);
    discardStack.addCard(discardedCard);*/

    ui.draggable.remove();
    playerStack.removeCard(cardNumber, cardColor);
    for (var i = 0; i< playerStack.cardCount(); i++) {
        console.log("The player's card:", playerStack.cards[i].rank, playerStack.cards[i].colors);
    }
    mycard = new Card(cardNumber, cardColor);
    discardStack.addCard(mycard);
    cardNode = mycard.createNode();
    cardNode.firstChild.style.visibility = "";
    $(this).append(cardNode);
    $(cardNode).position({
        of: $('#discardDeck'),
        my: 'left top',
        at: 'left top'
    });
    
    if (playerStack.cardCount() == 0) {
        showRoundCompleteMessage();
    }
    else {
        runComputer();
        nextTurn();
    }

}

// This function allows the user to add a card to another player's cards
function addToPhase(event, ui) {
    var cardID = $(ui.draggable).data('id');
    var cardNumber = cardID.slice(5);
    var cardColor = cardID[4];
    var phaseStack;

    if ($(this).attr("id") == "c1p1field") {
        phaseStack = c1phase1Stack;
    } else if ($(this).attr("id") == "c1p2field") {
        phaseStack = c1phase2Stack;
    } else if ($(this).attr("id") == "c2p1field") {
        phaseStack = c2phase1Stack;
    } else if ($(this).attr("id") == "c2p2field") {
        phaseStack = c2phase2Stack;
    } else if ($(this).attr("id") == "c3p1field") {
        phaseStack = c3phase1Stack;
    } else if ($(this).attr("id") == "c3p2field") {
        phaseStack = c3phase2Stack;
    } else if ($(this).attr("id") == "phaseField1") {
        phaseStack = phase1Stack;
    } else if ($(this).attr("id") == "phaseField2") {
        phaseStack = phase2Stack;
    }

    var cardnum;
    for (i = 0; i < phaseStack.cardCount(); i++) {
        if (phaseStack.cards[i].rank != "W") {
            cardnum = phaseStack.cards[i].rank;
            break;
        }
    }

    console.log('cardnum is', cardnum);
    console.log('cardnumber is', cardNumber);
    if (cardNumber == cardnum || cardNumber == "W") {
        ui.draggable.remove();
        playerStack.removeCard(cardNumber, cardColor)
        mycard = new Card(cardNumber, cardColor);
        cardNode = mycard.createNode();
        cardNode.firstChild.style.visibility = "";
        $(this).prepend(cardNode);

        if (playerStack.cardCount() == 0) {
            showRoundCompleteMessage();
        }
    }

}


// Goes to the next turn and remove blocker screens
function nextTurn() {

    $('#screen').css('display', 'none');
    $('#lockScreen').css('display', 'none');
    $('#playerFieldLock').show();

}

// Restarts the next round
function nextRound() {

    //Hide the win screen again
    $('#roundCompleteMessage').animate({
        'top': '-2000px'
    }, 500, function () {
        $('#completeoverlay').fadeOut('fast');
    });
    

    $('#screen').css('display', 'none');
    $('#phaseCompleteMessage').css('visibility', 'hidden');

    //player.current_phase += 1;
    console.log(player.current_phase);
    deck.clearCards();
    discardStack.clearCards();
    computer1Stack.clearCards();
    computer2Stack.clearCards();
    computer3Stack.clearCards();
    playerStack.clearCards();
    c1phase1Stack.clearCards();
    c1phase2Stack.clearCards();
    c2phase1Stack.clearCards();
    c2phase2Stack.clearCards();
    c3phase1Stack.clearCards();
    c3phase2Stack.clearCards();

    $('#playerDivId').empty();
    $('#computer1DivId').empty();
    $('#computer2DivId').empty();
    $('#computer3DivId').empty();
    $('#discardDeck').empty();
    $('#phaseField1').empty();
    $('#phaseField2').empty();
    $('#c1p1field').empty();
    $('#c1p2field').empty();
    $('#c2p1field').empty();
    $('#c2p2field').empty();
    $('#c3p1field').empty();
    $('#c3p2field').empty();


    playerCardStrings = "";
    computer1CardStrings = "";
    computer2CardStrings = "";
    computer3CardStrings = "";

    newDeck(deck);
    dealDeck(deck);

    $('#discardLockScreen').css('display', 'none');
    $('#phaseField').css('display', 'none');
    $('#phaseField').css('display', 'none');
    $('#phaseField1').css('display', 'none');
    $('#phaseField2').css('display', 'none');

}

function runComputer() {

    $('#screen').show();
    setTimeout('computer_phase1function(1)', 1000);
    setTimeout('computer_phase1function(2)', 2000);
    setTimeout('computer_phase1function(3)', 3000);
    $('#screen').css('display','none');
    // This is a placeholder function to hold all of the computer turns
}






