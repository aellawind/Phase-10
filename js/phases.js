
$('#resetphasebutton').click(function() {
    resetPhase();
});

// Reset the phase submission and send everything back to the player's hand
function resetPhase() {

    //console.log('phase button clicked');
    while(phase1Stack.cards.length > 0) {
        var reset_card = phase1Stack.cards[phase1Stack.cards.length-1];
        node = reset_card.createNode();
        $('#playerDivId').append(node);
        playerStack.addCard(phase1Stack.deal());
    }

    while(phase2Stack.cards.length > 0) {
        var reset_card = phase2Stack.cards[phase2Stack.cards.length-1];
        node = reset_card.createNode();
        $('#playerDivId').append(node);
        playerStack.addCard(phase2Stack.deal());
    }

    phase1Stack.clearCards();
    phase2Stack.clearCards();
    $('#phaseField1').empty();
    $('#phaseField2').empty();
}


// This phase card drop only checks to make sure a card is not a skip 
function handlePhaseCardDrop(event, ui) {

    var cardID = $(ui.draggable).attr("id");
    var cardNumber = cardID.slice(1);
    var cardColor = cardID[0];

    // Drop is only allowed if it is not a skip
    if (cardID != "XS") {
        // Appending visual node
        $(this).css('z-index', '1');
        $(ui.draggable).css('left', '0px');
        $(ui.draggable).css('top', '0px');
        $(this).append(ui.draggable);
        $(ui.draggable).css('position', 'relative');
        $(ui.draggable).css('z-index', '100');
        ui.draggable.draggable('disable');
        //ui.draggable.position({ of: $(this), my: 'left top', at: 'left top' });
        ui.draggable.draggable('option', 'revert', false);

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
$('.prepareSubmitPhase').click(function() {

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

    //var phase_number = $(this).attr("id");
    //console.log(phase_number.slice(11));
    var phase_number = player.current_phase;
    $('.prepareSubmitPhase').hide();
    $('#phaseField').css('display', 'block');
    $('#phase1Title1').css('display', 'block');
    if (phase_number == 1 || phase_number == 2 || phase_number == 3 ||
        phase_number == 7 || phase_number == 9 || phase_number == 10) {
        $('#phase1Title2').css('display', 'block');
    }
    $('#submitphasebutton').css('display', 'block');
    $('#resetphasebutton').css('display', 'block');
    $('#cancelphasebutton').css('display', 'block');
    
    $('.card').draggable({
        disable: false,
        revert: true,
        stack: '#playerDivId div',
    });
});

// WRITTEN IN THE CAR, MAKE SURE IT WORKS
$('#submitphasebutton').click(function() {
    submit_phase_array = new Array();
    if (phase2Stack.cardCount() > 0) {
        submit_phase_array.push(phase1Stack.cards);
        submit_phase_array.push(phase2Stack.cards); // combining into one array for simpler processing
    }
    else {
        submit_phase_array = phase1Stack.cards;
    }

    var isPhase = checkPhase(player.current_phase, submit_phase_array);
    
    if (isPhase == "True") {
        $('#screen').show();
        showPhaseCompleteMessage();
        //player.current_phase += 1;
    }
    else {
        alert('Sorry, that is not a phase.'); // Make this more informative later
        resetPhase();
    }
});

$('#cancelphasebutton').click(function() {
    var cur_id = '#submitPhase' + player.current_phase;
    //console.log(cur_id);
    $(cur_id).css('display', 'block');
    $('#phaseField').css('display', 'none');
    $('#phase1Title1').css('display', 'none');
    $('#phase1Title2').css('display', 'none');
    $('#submitphasebutton').css('display', 'none');
    $('#resetphasebutton').css('display', 'none');
    $('#cancelphasebutton').css('display', 'none');

    $('.card').removeClass("ui-draggable");
    $('#playerDivId').sortable(); //why won't it become sortable again after canceling?
    
    resetPhase();

});

// Takes in an array of cards and checks to see if there are consecutive numbers
// Useful for checking the computer's cards for duplicate cards to play a phase
function get_consecutive_card_sequences(cards) {
    var sorted_cards = [];
    var sorted_cards_array = new Array;
    
    for (i = 0; i<cards.length; i++) {
        //console.log(cards[i]);
        sorted_cards.push([cards[i], cards[i].rank])
    }
    sorted_cards.sort(function(a,b) {return a[1]-b[1]})

    
    var result = []
    var current = [sorted_cards[0][0]]
    var number = sorted_cards[0][0].rank
    for (var i = 0; i < sorted_cards.length; ++i) {
       
        var cur_card = sorted_cards[i][0];
        num1 = parseInt(number) + 1;
        if (cur_card.rank == number) {
            continue;
        } 

        else if (cur_card.rank == num1) {
            current.push(cur_card);
            number = cur_card.rank;
        } 
        else {
            if (current.length > 1) {
                result.push(current);
            }
            current = [cur_card];
            number = cur_card.rank;
        }
    }
    
    //Returns an array of array of cards that are consecutive
    return result;
}

function showPhaseCompleteMessage() {

    $('#phaseCompleteMessage').css('visibility', 'visible');
        $('#phaseCompleteMessage').animate({
            left: '380px',
            top: '200px',
            width: '400px',
            height: '100px',
            opacity: 1
        });
}

// Currently returns a dictionary with each unique card and how many times it appears in the array
// Useful for checking the computer's cards for duplicate cards to play a phase
// Can use it to find the indexes of the duplicate cards too
function identicalCards(phase_cards) {
    counter = {}

    phase_cards.forEach(function(obj) {
        var key = JSON.stringify(obj.rank)
        counter[key] = (counter[key] || 0) + 1
    })

    console.log(counter);
    return counter;


}

function sameColorCards(phase_cards) {
    counter = {}

    phase_cards.forEach(function(obj) {
        var key = JSON.stringify(obj.colors)
        counter[key] = (counter[key] || 0) + 1
    })

    return counter

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
    }
    else {
        return "False";
    }
}

// function to change matches in terms of numbers
// converts wilds to the identity of another number in that array
// so if they're all the same then it will work just fine
function makeMatches(cards) {

    var num_to_match;
    // Test on a new array so we don't modify the originals
    var set_cards = new Array();
    for(i=0; i<cards.length;i++) {
        set_cards.push(new Card(cards[i].rank, cards[i].colors));
    }

    for (i=0; i < set_cards.length; i++) {
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
   
    for (i=0; i < set_cards.length; i++) {
        if (set_cards[i].rank == "W") {
            //console.log("Card rank befores" + set_cards[i].rank);
            set_cards[i].rank = num_to_match;
            //console.log("Card rank afters" + set_cards[i].rank);
        }
    }
    return set_cards;
    
}

function makeColor(cards) {

    var color_to_match;
    // Test on a new array so we don't modify the originals
    var set_cards = new Array();
    for(i=0; i<cards.length;i++) {
        set_cards.push(new Card(cards[i].rank, cards[i].colors));
    }

    for (i=0; i < set_cards.length; i++) {
        //console.log(set_cards[i]);
        //console.log("Card rank is" + set_cards[i].rank);
        if (set_cards[i].rank != "W") {
            color_to_match = set_cards[i].colors;
            break;
        }
    }

    // Just in case the user has ALL wilds in his match array
    if (color_to_match == null) {
        color_to_match = "B";
    }
   
    for (i=0; i < set_cards.length; i++) {
        if (set_cards[i].rank == "W") {
            //console.log("Card rank befores" + set_cards[i].rank);
            set_cards[i].rank = num_to_match;
            //console.log("Card rank afters" + set_cards[i].rank);
        }
    }
    return set_cards;
    
}

// Looks for wilds in a supposedly consecutive set of numbers and if they exist
// Then this function changes them to be consecutive
function makeRuns(cards) {

        // Test on a new array so we don't modify the originals
        var set_cards = new Array();
        var has_only_wilds = "True"; 
        for(i=0; i<cards.length;i++) {
            if (cards[i].rank != "W") {
                has_only_wilds = "False";
            }
            set_cards.push(new Card(cards[i].rank, cards[i].colors));
        }

        // Normal people won't play all wilds in a sequence, but just in case...
        if (has_only_wilds == "True") {
            for(i=0; i<set_cards.length;i++) {
                set_cards[i].rank = String(i);
            }
            return set_cards;
        }

        // First make sure the last value has a number so we can base all other Wilds on it
        x = set_cards.length-1
        if (set_cards[x].rank == "W") {
            console.log(x);
            if(set_cards[x-1].rank != "W") {
                set_cards[x].rank = String(parseInt(set_cards[x-1].rank)+1);
            }
            else if(set_cards[x-2].rank != "W") {
                set_cards[x].rank = String(parseInt(set_cards[x-2].rank)+2);
            }
            else if(set_cards[x-3].rank != "W") {
                set_cards[x].rank = String(parseInt(set_cards[x-3].rank)+3);
            }
            else if(set_cards[x-4].rank != "W") {
                set_cards[x].rank = String(parseInt(set_cards[x-4].rank)+4);
            }
            else if(set_cards[x-5].rank != "W") {
                set_cards[x].rank = String(parseInt(set_cards[x-5].rank)+5);
            }
            else if(set_cards[x-6].rank != "W") {
                set_cards[x].rank = String(parseInt(set_cards[x-6].rank)+6);
            }
            else if(set_cards[x-7].rank != "W") {
                set_cards[x].rank = String(parseInt(set_cards[x-7].rank)+7);
            }
        }

        for (i=0; i < set_cards.length-1; i++) {
            var cur_card = set_cards[i].rank;
            if (set_cards[i].rank == "W") {

                if(set_cards[i+1].rank != "W") {
                    set_cards[i].rank = String(set_cards[i+1].rank-1);
                }
                else if(set_cards[i+2].rank != "W") {
                    set_cards[i].rank = String(set_cards[i+2].rank-2);
                }
                else if(set_cards[i+3].rank != "W") {
                    set_cards[i].rank = String(set_cards[i+3].rank-3);
                }
                else if(set_cards[i+4].rank != "W") {
                    set_cards[i].rank = String(set_cards[i+4].rank-4);
                }
                else if(set_cards[i+5].rank != "W") {
                    set_cards[i].rank = String(set_cards[i+5].rank-5);
                }
                else if(set_cards[i+6].rank != "W") {
                    set_cards[i].rank = String(set_cards[i+6].rank-6);
                }
                else if(set_cards[i+7].rank != "W") {
                    set_cards[i].rank = String(set_cards[i+7].rank-7);
                }

            }
        }
        return set_cards;
    }


var phase1function = function(phase_cards) {
    // Should be set of 3
    var first_set = makeMatches(phase_cards[0]);
    var second_set = makeMatches(phase_cards[1]);
    var num_sets_1 = Object.keys(identicalCards(first_set)).length;
    var num_sets_2 = Object.keys(identicalCards(second_set)).length;
 
    if (num_sets_1 == 1 && first_set.length > 2 &&
        num_sets_2 == 1 &&  second_set.length > 2) {
            
            console.log("Phase 1 function is true");
            return "True";
        }
    else {
        return "False";
    }
}

var phase2function = function(phase_cards) {
    var first_set = makeMatches(phase_cards[0]); // Should be set of 3
    var second_set = makeRuns(phase_cards[1]); // Should be run of 4
    var num_sets_1 = Object.keys(identicalCards(first_set)).length;
    var num_consecutive_seq = get_consecutive_card_sequences(phase_cards).length;
    
    if (num_sets_1 == 1 && first_set.length > 2) {
        if (num_consecutive_seq == 1 && second_set.length > 3) {
            return True;
        }
    }
    else {
        return "False";
    }
}


var phase3function = function(phase_cards) {
    var first_set = makeMatches(phase_cards[0]); // Should be set of 4
    var second_set = makeRuns(phase_cards[1]); // Should be run of 4
    var num_sets_1 = Object.keys(identicalCards(first_set)).length;
    var num_consecutive_seq = get_consecutive_card_sequences(phase_cards).length;
    
    if (num_sets_1 == 1 && first_set.length > 3) {
        if (num_consecutive_seq == 1 && second_set.length > 3) {
            return True;
        }
    }
    else {
        return "False";
    }
}

var phase4function = function(phase_cards) {
    var second_set = makeRuns(phase_cards[1]); // Should be run of 7
    var num_consecutive_seq = get_consecutive_card_sequences(phase_cards).length;
    
    if (num_consecutive_seq == 1 && second_set.length > 6) {
            return True;
        }
    else {
        return "False";
    }
}

var phase5function = function(phase_cards) {
    var second_set = makeRuns(phase_cards[1]); // Should be run of 8
    var num_consecutive_seq = get_consecutive_card_sequences(phase_cards).length;
    
    if (num_consecutive_seq == 1 && second_set.length > 7) {
            return True;
        }
    else {
        return "False";
    }
}

var phase6function = function(phase_cards) {
    var second_set = makeRuns(phase_cards[1]); // Should be run of 9
    var num_consecutive_seq = get_consecutive_card_sequences(phase_cards).length;
    
    if (num_consecutive_seq == 1 && second_set.length > 8) {
            return True;
        }
    else {
        return "False";
    }
}

var phase7function = function(phase_cards) {
    var first_set = makeMatches(phase_cards[0]); // Should be set of 4
    var second_set = makeMatches(phase_cards[1]); // Should be set of 4
    var num_sets_1 = Object.keys(identicalCards(first_set)).length;
    var num_sets_2 =Object.keys(identicalCards(second_set)).length;

    if (num_sets_1 == 1 && first_set.length > 3) {
        if (num_sets_2 == 1 &&  second_set.length > 3) {
            return "True";
        }
    }
    else {
        return "False";
    }
}

var phase8function = function(phase_cards) {
    // 7 cards of one color
    phase_set = makeColors(phase_cards);
    var num_sets = Object.keys(sameColorCards(phase_set)).length;
   
    if (num_sets == 1 && first_set.length > 6) {
        return "True";
    }
    else {
        return "False";
    }
}

var phase9function = function(phase_cards) {
    var first_set = makeMatches(phase_cards[0]); // Should be set of 5
    var second_set = makeMatches(phase_cards[1]); // Should be set of 2
    var num_sets_1 = Object.keys(identicalCards(first_set)).length;
    var num_sets_2 =Object.keys(identicalCards(second_set)).length;

    if (num_sets_1 == 1 && first_set.length > 4) {
        if (num_sets_2 == 1 &&  second_set.length > 1) {
            return "True";
        }
    }
    else {
        return "False";
    }
}

var phase10function = function(phase_cards) {
    var first_set = makeMatches(phase_cards[0]); // Should be set of 5
    var second_set = makeMatches(phase_cards[1]); // Should be set of 3
    var num_sets_1 = Object.keys(identicalCards(first_set)).length;
    var num_sets_2 =Object.keys(identicalCards(second_set)).length;

    if (num_sets_1 == 1 && first_set.length > 4) {
        if (num_sets_2 == 1 &&  second_set.length > 2) {
            return "True";
        }
    }
    else {
        return "False";
    }
}



// BELOW IS THE COMPUTER LOGIC

// Function that takes in an array of cards and evaluates if they are a phase (1-10)
// phase_cards is an array; assumes we have an array of cards and each card has card.rank = # and card.suit = color
// When cards go into this function, we still have wilds we need to 'clean'
function checkComputerPhase(computer_phase, cards) {
    var phaseFunction;
    switch (computer_phase) {

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
    }
    else {
        return "False";
    }
}

/*
var computer_phase1function = function(phase_cards) {
    // Should be set of 3
    var matched_counter = identicalCards(phase_cards);
    var num_sets = Object.keys(matched_counter).length;
    var longest_set;




    if (num_sets_1 == 1 && first_set.length > 2 &&
        num_sets_2 == 1 &&  second_set.length > 2) {
            
            console.log("Phase 1 function is true");
            return "True";
        }
    else {
        return "False";
    }
}


*/


