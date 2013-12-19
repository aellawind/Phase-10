// Reset the phase submission and send everything back to the player's hand
function resetPhase() {

    var reset_card;
    while (phase1Stack.cards.length > 0) {
        reset_card = phase1Stack.cards[phase1Stack.cards.length - 1];
        node = reset_card.createNode();
        node.firstChild.style.visibility = "";
        $('#playerDivId').append(node);
        playerStack.addCard(phase1Stack.deal());
    }

    while (phase2Stack.cards.length > 0) {
        reset_card = phase2Stack.cards[phase2Stack.cards.length - 1];
        node = reset_card.createNode();
        node.firstChild.style.visibility = "";
        $('#playerDivId').append(node);
        playerStack.addCard(phase2Stack.deal());
    }

    phase1Stack.clearCards();
    phase2Stack.clearCards();
    $('#phaseField1 .card').remove();
    $('#phaseField2 .card').remove();
}

// This phase card drop only checks to make sure a card is not a skip; otherwise accepts a card
function handlePhaseCardDrop(event, ui) {

    var cardID = $(ui.draggable).data('id');
    var cardNumber = cardID.slice(5);
    var cardColor = cardID[4];

    // Drop is only allowed if it is not a skip
    if (cardID.slice(4) != "XS") {
        // Appending visual node
        //$(this).css('z-index', '1');
        ui.draggable.remove();
        mycard = new Card(cardNumber, cardColor);
        cardNode = mycard.createNode();
        cardNode.firstChild.style.visibility = "";
        $(this).append(cardNode);
        $(cardNode).css('left', '0px');
        $(cardNode).css('top', '0px');
        $(cardNode).css('position', 'relative');
        //$(ui.draggable).css('z-index', '100');
        // ui.draggable.draggable('disable');
       // ui.draggable.draggable('option', 'revert', false);

        // Appending card ID to phaseStack and removing it from playerstack
        var discardedCard = playerStack.removeCard(cardNumber, cardColor);
        if ($(this).attr("id") == "phaseField1") {
            phase1Stack.addCard(discardedCard);
        }
        if ($(this).attr("id") == "phaseField2") {
            phase2Stack.addCard(discardedCard);
        }
    }
}





// Clicking the submit phase button to reveal the submit phase field and turns the cards
// into draggables that can go to the submit divs
$('#submitPhasePrep').click(function () {

    $('#phaseField1').droppable({

        accept: '#playerDivId div',
        hoverClass: 'hovered',
        drop: handlePhaseCardDrop
    });

    $('#phaseField2').droppable({

        accept: '#playerDivId div',
        hoverClass: 'hovered',
        drop: handlePhaseCardDrop
    });

    var title_id;
    var phase_number = player.current_phase;
    $('.prepareSubmitPhase').hide();
    $('#phaseField').css('display', 'block');
    $('#phaseField1').css('display', 'block');
    title_id = '#phase' + player.current_phase + 'Title1';
    $(title_id).css('display', 'block');

    if (phase_number == 1 || phase_number == 2 || phase_number == 3 ||
        phase_number == 7 || phase_number == 9 || phase_number == 10) {
        $('#phaseField2').css('display', 'block');
        title_id = '#phase' + player.current_phase + 'Title2';
        $(title_id).css('display', 'block');

    }

    $('#submitphasebutton').css('display', 'block');
    $('#resetphasebutton').css('display', 'block');
    $('#cancelphasebutton').css('display', 'block');

    
});

// When user clicks to submit their phase, we check to see if it is a phase
$('#submitphasebutton').click(function () {
    if (phase2Stack.cardCount() == 0 || phase1Stack.cardCount() ==0) {
        alert('Please place cards to submit.')
    }
    else {
        submit_phase_array = new Array();
        if (phase2Stack.cardCount() > 0) {
            submit_phase_array.push(phase1Stack.cards);
            submit_phase_array.push(phase2Stack.cards); // combining into one array for simpler processing
        } else {
            submit_phase_array = phase1Stack.cards;
        }

        var isPhase = checkPhase(player.current_phase, submit_phase_array);

        if (isPhase == "True") {
            player.current_phase += 1;
            $('#submitphasebutton').css('display', 'none');
            $('#resetphasebutton').css('display', 'none');
            $('#cancelphasebutton').css('display', 'none');
            $('.prepareSubmitPhase').css('display', 'none');

            // Player can now add to other player's fields!
            $("#c1p1field, #c1p2field, #c2p1field, #c2p2field, #c3p1field, #c3p2field, #phaseField1, #phaseField2").droppable({
                accept: "#playerDivId div",
                hoverClass: "ui-state-hover",
                drop: addToPhase
            });
            // Just in case they got rid of all their cards, we check, to see if we should
            // Move them on to the next phase
            if (playerStack.cardCount() == 0) {
                showRoundCompleteMessage();
            }
        } else {
            alert('Sorry, that is not a phase.'); // Make this more informative later
            resetPhase();
        }
    }
});

// User decides they don't have a phase, so we can hide the phase fields again
$('#cancelphasebutton').click(function () {
    var cur_id = '#submitPhase' + player.current_phase;
    $(cur_id).css('display', 'block');
    $('#phaseField').css('display', 'none');
    $('#submitphasebutton').css('display', 'none');
    $('#resetphasebutton').css('display', 'none');
    $('#cancelphasebutton').css('display', 'none');
    $('.prepareSubmitPhase').css('display', 'block');


    resetPhase();

});

// Takes in an array of cards and checks to see if there are consecutive numbers
// Useful for checking the computer's cards for duplicate cards to play a phase
function get_consecutive_card_sequences(cards) {
    var sorted_cards = [];

    sorted_cards = _.map(cards, function(card) {
       return new Card(card.rank, card.colors);
    });

    sorted_cards.sort(function (a, b) {
        return a.rank - b.rank;
    });

    var result = [];
    var current = [sorted_cards[0]];
    var number = sorted_cards[0].rank;
    for (var i = 0; i < sorted_cards.length; ++i) {

        var cur_card = sorted_cards[i];
        num1 = parseInt(number) + 1;
        if (cur_card.rank == number) {
            continue;
        } else if (parseInt(cur_card.rank) == num1) {
            current.push(cur_card);
            number = cur_card.rank;
        } else {
            if (current.length > 1) {
                result.push(current);
            }
            current = [cur_card];
            number = cur_card.rank;
        }
    }
    if (current.length > 1) {
        result.push(current);
    }
    //Returns an array of array of cards that are consecutive
    return result;
}

function showRoundCompleteMessage() {

    console.log("Function working");
    $('#completeoverlay').fadeIn(200, function () {
        $('#roundCompleteMessage').animate({
            'top': '80px'
        }, 200);
    });
    return false;
}



// Currently returns a dictionary with each unique card and how many times it appears in the array
// Useful for checking the computer's cards for duplicate cards to play a phase
// Can use it to find the indexes of the duplicate cards too
function  identicalCards (phase_cards) {
    counter = {};

    phase_cards.forEach(function (obj) {
        var key = JSON.stringify(obj.rank);
        counter[key] = (counter[key] || 0) + 1;
    });

    //console.log("Identical cards counter:", counter);
    return counter;


}

// Helps check if array of cards have sets of same colors
function sameColorCards(phase_cards) {
    counter = {};

    phase_cards.forEach(function (obj) {
        var key = JSON.stringify(obj.colors);
        counter[key] = (counter[key] || 0) + 1;
    });

    return counter;

}

// Function that takes in an array of cards and evaluates if they are a phase (1-10)
// phase_cards is an array; assumes we have an array of cards and each card has card.rank = # and card.suit = color
// When cards go into this function, we still have wilds we need to 'clean'
function checkPhase(user_phase, phase_cards) {
    var phaseFunction;
    switch (user_phase) {

        // 2 Sets of 3
    case 1:
        phaseFunction = phase1function(phase_cards);
        break;
    case 2:
        phaseFunction = phase2function(phase_cards);
        break;
    case 3:
        phaseFunction = phase3function(phase_cards);
        break;
    case 4:
        phaseFunction = phase4function(phase_cards);
        break;
    case 5:
        phaseFunction = phase5function(phase_cards);
        break;
    case 6:
        phaseFunction = phase6function(phase_cards);
        break;
    case 7:
        phaseFunction = phase7function(phase_cards);
        break;
    case 8:
        phaseFunction = phase8function(phase_cards);
        break;
    case 9:
        phaseFunction = phase9function(phase_cards);
        break;
    case 10:
        phaseFunction = phase10function(phase_cards);
        break;
    }

    if (phaseFunction == "True") {
        console.log("Switch statement is true");
        return "True";
    } else {
        return "False";
    }
}

// Function to change matches in terms of numbers
// Converts wilds to the identity of another number in that array
//  so if they're all the same then it will work just fine
function makeMatches(cards) {

    var num_to_match;
    // Test on a new array so we don't modify the originals
    var set_cards = new Array();
    for (i = 0; i < cards.length; i++) {
        set_cards.push(new Card(cards[i].rank, cards[i].colors));
    }

    for (i = 0; i < set_cards.length; i++) {
        //console.log(set_cards[i]);
        //console.log("Card rank is" + set_cards[i].rank);
        if (set_cards[i].rank != "W") {
            num_to_match = set_cards[i].rank;
            break;
        }
    }

    // Just in case the user has ALL wilds in his match array
    if (num_to_match == null) {
        num_to_match = "1";
    }

    for (i = 0; i < set_cards.length; i++) {
        if (set_cards[i].rank == "W") {
            //console.log("Card rank befores" + set_cards[i].rank);
            set_cards[i].rank = num_to_match;
            //console.log("Card rank afters" + set_cards[i].rank);
        }
    }
    return set_cards;

}

// Function that makes wilds be the same color as everything else
function makeColor(cards) {

    var color_to_match;
    // Test on a new array so we don't modify the originals
    var set_cards = new Array();
    for (i = 0; i < cards.length; i++) {
        set_cards.push(new Card(cards[i].rank, cards[i].colors));
    }

    for (i = 0; i < set_cards.length; i++) {
        if (set_cards[i].rank != "W") {
            color_to_match = set_cards[i].colors;
            break;
        }
    }

    // Just in case the user has ALL wilds in his match array
    if (color_to_match == null) {
        color_to_match = "B";
    }

    for (i = 0; i < set_cards.length; i++) {
        if (set_cards[i].rank == "W") {
            set_cards[i].rank = num_to_match;
        }
    }
    return set_cards;

}

/*-------------------------------------------------------------------------------------------------
 Looks for wilds in a supposedly consecutive set of numbers and if they exist
 Then this function changes them to be consecutive
 Looks for wilds in a supposedly consecutive set of numbers and if they exist
 Then this function changes them to be consecutive
 Takes in card objects that have card.rank which is the number (or W) of the card
 In order for function to work, the number has come out as a string...
-------------------------------------------------------------------------------------------------*/

function makeRuns(test) {

    // Test on a new array so we don't modify the originals
    var has_only_wilds = true;

    var set_cards = _.map(test, function (element) {
            if (element.rank !== 'W') {
                has_only_wilds = false;
            }
            return new Card(element.rank, element.colors);
    });

    // Normal people won't play all wilds in a sequence, but just in case...
    if (has_only_wilds) {
        for (i = 0; i < set_cards.length; ++i) {
            set_cards[i].rank = String(i + 1);
        }
        return set_cards;
    }
    var lowest = 0;
    while (set_cards[lowest].rank === 'W') {
        lowest++;
    }
    var first = set_cards[lowest].rank - lowest;

    for (var j = 0; j < set_cards.length; ++j) {
        if (set_cards[j].rank === 'W') {
            set_cards[j].rank = String(first + j);
        }
    }
    return set_cards;
}

/*-------------------------------------------------------------------------------------------------
The following are all functions that will evaluate when the player
wants to submit a phase (1-10), if it is True or False. 
-------------------------------------------------------------------------------------------------*/


var phase1function = function (phase_cards) {
    // Should be set of 3
    var first_set = makeMatches(phase_cards[0]);
    var second_set = makeMatches(phase_cards[1]);
    var num_sets_1 = Object.keys(identicalCards(first_set)).length;
    var num_sets_2 = Object.keys(identicalCards(second_set)).length;

    if (num_sets_1 == 1 && first_set.length > 2 &&
        num_sets_2 == 1 && second_set.length > 2) {

        console.log("Phase 1 function is true");
        phase1Stack.phase = "SET";
        phase2Stack.phase = "SET";
        return "True";
    } else {
        return "False";
    }
}

var phase2function = function (phase_cards) {
    var first_set = makeMatches(phase_cards[0]); // Should be set of 3
    console.log("First set is", first_set);
    var second_set = makeRuns(phase_cards[1]); // Should be run of 4
    console.log("Second set is", second_set);
    var num_sets_1 = Object.keys(identicalCards(first_set)).length;
    console.log("num sets 1", num_sets_1);
    var num_consecutive_seq = get_consecutive_card_sequences(second_set).length;
    console.log("num consecutive sequences", num_consecutive_seq)

    if (num_sets_1 == 1 && first_set.length > 2) {
        if (num_consecutive_seq == 1 && second_set.length > 3) {
            phase1Stack.phase = "SET";
            phase2Stack.phase = "RUN";
            return "True";
        }
    } else {
        return "False";
    }
}


var phase3function = function (phase_cards) {
    var first_set = makeMatches(phase_cards[0]); // Should be set of 4
    var second_set = makeRuns(phase_cards[1]); // Should be run of 4
    var num_sets_1 = Object.keys(identicalCards(first_set)).length;
    var num_consecutive_seq = get_consecutive_card_sequences(phase_cards).length;

    if (num_sets_1 == 1 && first_set.length > 3) {
        if (num_consecutive_seq == 1 && second_set.length > 3) {
            phase1Stack.phase = "SET";
            phase2Stack.phase = "RUN";
            return "True";
        }
    } else {
        return "False";
    }
}

var phase4function = function (phase_cards) {
    var second_set = makeRuns(phase_cards[1]); // Should be run of 7
    var num_consecutive_seq = get_consecutive_card_sequences(phase_cards).length;

    if (num_consecutive_seq == 1 && second_set.length > 6) {
        phase1Stack.phase = "RUN";
        return "True";
    } else {
        return "False";
    }
}

var phase5function = function (phase_cards) {
    var second_set = makeRuns(phase_cards[1]); // Should be run of 8
    var num_consecutive_seq = get_consecutive_card_sequences(phase_cards).length;

    if (num_consecutive_seq == 1 && second_set.length > 7) {
        return "True";
    } else {
        return "False";
    }
}

var phase6function = function (phase_cards) {
    var second_set = makeRuns(phase_cards[1]); // Should be run of 9
    var num_consecutive_seq = get_consecutive_card_sequences(phase_cards).length;

    if (num_consecutive_seq == 1 && second_set.length > 8) {
        return "True";
    } else {
        return "False";
    }
}

var phase7function = function (phase_cards) {
    var first_set = makeMatches(phase_cards[0]); // Should be set of 4
    var second_set = makeMatches(phase_cards[1]); // Should be set of 4
    var num_sets_1 = Object.keys(identicalCards(first_set)).length;
    var num_sets_2 = Object.keys(identicalCards(second_set)).length;

    if (num_sets_1 == 1 && first_set.length > 3) {
        if (num_sets_2 == 1 && second_set.length > 3) {
            return "True";
        }
    } else {
        return "False";
    }
}

var phase8function = function (phase_cards) {
    // 7 cards of one color
    phase_set = makeColors(phase_cards);
    var num_sets = Object.keys(sameColorCards(phase_set)).length;

    if (num_sets == 1 && first_set.length > 6) {
        return "True";
    } else {
        return "False";
    }
}

var phase9function = function (phase_cards) {
    var first_set = makeMatches(phase_cards[0]); // Should be set of 5
    var second_set = makeMatches(phase_cards[1]); // Should be set of 2
    var num_sets_1 = Object.keys(identicalCards(first_set)).length;
    var num_sets_2 = Object.keys(identicalCards(second_set)).length;

    if (num_sets_1 == 1 && first_set.length > 4) {
        if (num_sets_2 == 1 && second_set.length > 1) {
            return "True";
        }
    } else {
        return "False";
    }
}

var phase10function = function (phase_cards) {
    var first_set = makeMatches(phase_cards[0]); // Should be set of 5
    var second_set = makeMatches(phase_cards[1]); // Should be set of 3
    var num_sets_1 = Object.keys(identicalCards(first_set)).length;
    var num_sets_2 = Object.keys(identicalCards(second_set)).length;

    if (num_sets_1 == 1 && first_set.length > 4) {
        if (num_sets_2 == 1 && second_set.length > 2) {
            return "True";
        }
    } else {
        return "False";
    }
}

/*-------------------------------------------------------------------------------------------------
Functions necessary to submit a phase for the player
-------------------------------------------------------------------------------------------------*/
var current_phase;
var phase1Stack = new Stack();
var phase2Stack = new Stack();

$('#phaseField1').droppable({

    accept: '#playerDivId div',
    hoverClass:'hovered',
    drop: handlePhaseCardDrop
});

$('#phaseField2').droppable({

    accept: '#playerDivId div',
    hoverClass:'hovered',
    drop: handlePhaseCardDrop
});











