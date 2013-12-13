/*  This section is the brains behind the computer logic. Currently
    if the player has the first phase, made even with wilds, then
    he plays that phase. This also evaluates each turn what the best
    card is to discard from their deck. Eventually computer will have
    brains to take from the discard pile if it helps them, and they will
    also have the brains to add cards to other phases. */
function computer_phase1function(computer_num, phase_cards) {

    $('#screen').show();
    // Decide our variables depending on which computer we are.
    if (computer_num == 1) {
        var computerStack = computer1Stack;
        var computerDivId = '#computer1DivId';
        var phaseField1 = '#c1p1field';
        var phaseField2 = '#c1p2field';
        var phase1Stack = c1phase1Stack;
        var phase2Stack = c1phase2Stack;
    }
    if (computer_num == 2) {
        var computerStack = computer2Stack;
        var computerDivId = '#computer2DivId';
        var phaseField1 = '#c2p1field';
        var phaseField2 = '#c2p2field';
        var phase1Stack = c2phase1Stack;
        var phase2Stack = c2phase2Stack;
    }
    if (computer_num == 3) {
        var computerStack = computer3Stack;
        var computerDivId = '#computer3DivId';
        var phaseField1 = '#c3p1field';
        var phaseField2 = '#c3p2field';
        var phase1Stack = c3phase1Stack;
        var phase2Stack = c3phase2Stack;
    }

    // Draw a card
    computerDrawCard(computerStack, computerDivId);

    // Get an array of the best current numbers that match our phase.
    array_best_nums = best_matches(phase_cards);

    // True means we have a phase, Wilds means we have a phase with wilds.
    // Both are placed as phases differently.
    if (array_best_nums[0] == "True") {
        setTimeout(computerPlayPhase(array_best_nums, phase_cards, "False"), 1000);
    }

    if (array_best_nums[0] == "Wilds") {
        setTimeout(computerPlayPhase(array_best_nums, phase_cards, "True"), 2000);
    }

    // COME BACK TO LATER.
    //Eventually computers will be able to take into account other phases
    // on the floor and add their cards to them.

    // Algorithm to get a randomly good card object to discard
    discard_this_card = pickDiscardCard(array_best_nums, phase_cards, computerStack);
    computerDiscard(computerStack, computerDivId, discard_this_card);

    // Should be set of 3 for Phase 1
    function best_matches(phase_cards) {
        var matched_counter = identicalCards(phase_cards);
        var num_sets = Object.keys(matched_counter).length;

        myarray = _.pairs(matched_counter);

        function Comparator(a, b) {
            if (a[1] < b[1]) return 1;
            if (a[1] > b[1]) return -1;
            return 0;
        }
        myarray = myarray.sort(Comparator);
        keys_array = new Array();
        values_array = new Array();
        for (i = 0; i < myarray.length; i++) {
            if (myarray[i][0] != '"W"') { // no wilds
                trimmed_string = myarray[i][0].replace(/"/g, "");
                keys_array.push(trimmed_string);
                values_array.push(myarray[i][1]);
            }
            // now count the wilds
            else {
                var num_wilds = myarray[i][1];
            }
        }

        var best_nums = new Array();
        var num_with_largest_matches = keys_array[0];
        var num_with_next_largest_matches = keys_array[1];

        // Now we evaluate to see if we have a phase with just our cards! Two sets of 3.
        if (values_array[0] > 2 && values_array[1] > 2) {
            console.log("Computer has a phase!");
            best_nums.push("True");
            best_nums.push(num_with_largest_matches); // We know we can make a phase with this
            best_nums.push(num_with_next_largest_matches);
        }

        // Now we evaluate to see if we have a phase if we use our wilds.
        // This particular if statement checks to see if the highest match amount is 3 or more
        // And that there's 1 card that matches it, with another card that has 2 or more
        else if (num_wilds > 0) {

            if (values_array[0] + values_array[1] + num_wilds > 5) {
                console.log("We have a phase with a wild!");
                best_nums.push("Wilds");
                best_nums.push("W");
                best_nums.push(num_with_largest_matches);
                best_nums.push(num_with_next_largest_matches);


            } else {
                console.log("There were wilds but no matches.")
                best_nums.push("False");
                best_nums.push(num_with_largest_matches);
                best_nums.push(num_with_next_largest_matches);
            }

        } else {
            console.log("No matches.");
            best_nums.push("False");
            best_nums.push(num_with_largest_matches);
            best_nums.push(num_with_next_largest_matches);
        }
        return best_nums;
    }

    // This function takes in our array of best numbers and builds
    // a phase for playing. We remove the cards from the computer's hand
    // and virtual stack.
    function computerPlayPhase(array_of_nums, phasecards, wilds) {

        var firstMatchSet = new Array();
        var secondMatchSet = new Array();
        var lasts_removed = 1;

        if (wilds == "False") {
            var first_num = array_of_nums[1];
            var second_num = array_of_nums[2];
        } else if (wilds == "True") {
            var first_num = array_of_nums[2];
            var second_num = array_of_nums[3];
        }

        var indexes_to_remove1 = new Array();
        var indexes_to_remove2 = new Array();
        for (var i = 0; i < phasecards.length; i++) {
            if (phasecards[i].rank == first_num) {
                firstMatchSet.push(phasecards[i]);
                cardNode = phasecards[i].createNode();
                cardNode.firstChild.style.visibility = "";
                $(phaseField1).append(cardNode);
                indexes_to_remove1.push(i);
            }
        }

        indexes_to_remove1.sort().reverse();

        for (j = 0; j < indexes_to_remove1.length; j++) {
            var discardedCard = computerStack.removeCardIndex(indexes_to_remove1[j]);
            phase1Stack.addCard(discardedCard);
            var last = '#computer' + computer_num + 'DivId div:last(' + lasts_removed + ')';
            $(last).remove();
            lasts_removed += 1;
        }

        for (var i = 0; i < phasecards.length; i++) {

            if (phasecards[i].rank == second_num) {
                secondMatchSet.push(phasecards[i]);
                cardNode = phasecards[i].createNode();
                cardNode.firstChild.style.visibility = "";
                $(phaseField2).append(cardNode);
                indexes_to_remove2.push(i);
            }
        }

        indexes_to_remove2.sort().reverse();

        for (j = 0; j < indexes_to_remove2.length; j++) {
            var discardedCard = computerStack.removeCardIndex(indexes_to_remove2[j]);
            phase2Stack.addCard(discardedCard);
            var last = '#computer' + computer_num + 'DivId div:last(' + lasts_removed + ')';
            $(last).remove();
            lasts_removed += 1;
        }



        var wild_indexes_to_remove = new Array();
        for (var i = 0; i < phasecards.length; i++) {
            if (phasecards[i].rank == "W") {
                wild_indexes_to_remove.push(i);
            }
        }


        if (wilds == "True") {
            var num_wilds_needed1 = 0;
            var num_wilds_needed2 = 0;
            if (firstMatchSet.length < 3) {
                num_wilds_needed1 = 3 - firstMatchSet.length;
                for (var i = 0; i < num_wilds_needed1; i++) {
                    wildcard = new Card("W", "X");
                    cardNode = wildcard.createNode();
                    cardNode.firstChild.style.visibility = "";
                    $(phaseField1).append(cardNode);
                    phase1Stack.addCard(wildcard);
                }
            }
            if (secondMatchSet.length < 3) {
                num_wilds_needed2 = 3 - secondMatchSet.length;
                for (var i = 0; i < num_wilds_needed2; i++) {
                    wildcard = new Card("W", "X");
                    cardNode = wildcard.createNode();
                    cardNode.firstChild.style.visibility = "";
                    $(phaseField2).append(cardNode);
                    phase2Stack.addCard(wildcard);
                }
            }
            var wilds_needed = num_wilds_needed1 + num_wilds_needed2;
            wild_indexes_to_remove.sort().reverse();
            wilds_removed = 0;
            for (j = 0; j < wilds_needed; j++) {
                computerStack.removeCardIndex(wild_indexes_to_remove[j]);
                var last = '#computer' + computer_num + 'DivId div:last(' + lasts_removed + ')';
                $(last).remove();
                lasts_removed += 1;
            }
        }
    }
}

// Computer draws a card
function computerDrawCard(computerStack, computerDivId) {

    var drawCard = deck.deal();
    computerStack.addCard(drawCard);
    var node = drawCard.createNode();
    $('#drawDeck').append(node);
    id = $(node).data('id');
    moveAnimate(id, computerDivId);
}

//Picks a good card to discard
function pickDiscardCard(best_nums, phase_cards, computerStack) {
    // Returns the values that are in our phase_cards that are not in our best_nums array
    for (i = 0; i < phase_cards.length; i++) {
        if (_.contains(best_nums, phase_cards[i].rank)) {
            continue;
        }
        if (phase_cards[i].rank == "W") {
            continue;
        } else {
            var mycard = phase_cards[i];
            computerStack.removeCardIndex(i);
            return mycard;
        }
    }
}

// Discard a card
function computerDiscard(computerStack, computerDivId, card) {

    var cardNode = card.createNode();
    discardStack.addCard(card);
    var last = computerDivId + ' div:last(1)';
    $(last).remove();
    $(computerDivId).append(cardNode);
    $(cardNode).css('z-index', '300');

    id = $(cardNode).data('id');
    cardNode.firstChild.style.visibility = "";

    discardAnimate(id, '#discardDeck');
    $(cardNode).css('display', '');
    $(cardNode).position({
        of: $('#discardDeck'),
        my: 'left top',
        at: 'left top'
    });

    // Let the card be clickable
    $(cardNode).click(takeDiscard);


    // Special animation function needed for the discard
    function discardAnimate(dataid, newParent) {

        query_string = "[data-id='" + dataid + "']";
        el = document.querySelector(query_string);
        console.log(query_string);

        element = $(el); //Allow passing in either a JQuery object or selector
        console.log(element);
        newParent = $(newParent); //Allow passing in either a JQuery object or selector

        var oldOffset = element.offset();
        newParent.append(element);
        (element).position({
            of: $('#discardDeck'),
            my: 'left top',
            at: 'left top'
        });
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
            $('#screen').css('display', 'none');

        });

    }

}

/*  Eventually when we've created all of the logic for the computer for each
    phase, this switch function will help determine which function
    will evaluate at each turn.
    Functions that take in an array of cards and evaluates if they are a phase (1-10)
    phase_cards is an array; assumes we have an array of cards and each card has card.rank = # and card.suit = color
    When cards go into this function, we still have wilds we need to 'clean'*/
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