/*  This section is the brains behind the computer logic. Currently
    if the player has the first phase, made even with wilds, then
    he plays that phase. This also evaluates each turn what the best
    card is to discard from their deck. Eventually computer will have
    brains to take from the discard pile if it helps them, and they will
    also have the brains to add cards to other phases. */

function computer_phase1function(computer_num) {

    $('#screen').show();
    // Decide our variables depending on which computer we are.
    console.log("");
    console.log("COMPUTER", computer_num, "IS GOING NOW.");

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
    array_best_nums = best_matches(computerStack.cards);
    console.log("Array of best nums is", array_best_nums);

    if (phase1Stack.cardCount() ==0) {
        // True means we have a phase, Wilds means we have a phase with wilds.
        // Both are placed as phases differently.
        if (array_best_nums[0] == "True") {
            setTimeout(computerPlayPhase(array_best_nums, "False"), 1000);
        }

        if (array_best_nums[0] == "Wilds") {
            setTimeout(computerPlayPhase(array_best_nums, "True"), 2000);
            console.log("Cards are", computerStack.cards);
        }
    }

    // Computers will be able to take into account other phases
    // on the floor and add their cards to them.
    if (phase1Stack.cardCount() > 0) {
        setTimeout(addToOtherPhases(computerStack, computerDivId),3000);
    }

    // Algorithm to get a randomly good card object to discard
    discard_this_card = pickDiscardCard(computerStack, array_best_nums);
    setTimeout(computerDiscard(computerStack, computerDivId, discard_this_card),4000);

    // Should be set of 3 for Phase 1
    function best_matches() {
        var matched_counter = identicalCards(computerStack.cards);
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
    function computerPlayPhase(array_of_nums, wilds) {

        var new_cards = new Array();
        var cards_removed = 0;
        var num_wilds = 0;
        var num_wilds_needed1 = 0;
        var num_wilds_needed2 = 0;
        phase1Stack.phase = "SET";
        phase2Stack.phase = "SET";

        if (wilds == "False") {
            var first_num = array_of_nums[1];
            var second_num = array_of_nums[2];
        } else if (wilds == "True") {
            var first_num = array_of_nums[2];
            var second_num = array_of_nums[3];
        }

        for (var i = 0; i < computerStack.cardCount(); i++) {
            var new_card = new Card(computerStack.cards[i].rank, computerStack.cards[i].colors);
            if (new_card.rank == first_num) {
                phase1Stack.addCard(new_card);
                cardNode = new_card.createNode();
                cardNode.firstChild.style.visibility="";
                $(phaseField1).append(cardNode);
                cards_removed += 1;
            }
            else if (new_card.rank == second_num) {
                phase2Stack.addCard(new_card);
                cardNode = new_card.createNode();
                cardNode.firstChild.style.visibility="";
                $(phaseField2).append(cardNode);
                cards_removed +=1;
            }
            else if (new_card.rank == "W") {
                num_wilds += 1;
            } 
            else {
                new_cards.push(new_card); // create a new list of all the non matching cards
            }
        }

        if (wilds == "True") {
            console.log("Wilds is true.");
            if (phase1Stack.cardCount() < 3) {
                num_wilds_needed1 = 3 - phase1Stack.cardCount();
                for (var i = 0; i < num_wilds_needed1; i++) {
                    wildcard = new Card("W", "X");
                    cardNode = wildcard.createNode();
                    cardNode.firstChild.style.visibility = "";
                    $(phaseField1).append(cardNode);
                    phase1Stack.addCard(wildcard);
                }
            }
            if (phase2Stack.cardCount() < 3) {
                num_wilds_needed2 = 3 - phase2Stack.cardCount();
                for (var i = 0; i < num_wilds_needed2; i++) {
                    wildcard = new Card("W", "X");
                    cardNode = wildcard.createNode();
                    cardNode.firstChild.style.visibility = "";
                    $(phaseField2).append(cardNode);
                    phase2Stack.addCard(wildcard);
                }
            }
            var wilds_left = num_wilds - num_wilds_needed1 - num_wilds_needed2;
            for (var i = 0; i<wilds_left; i++) {
                new_cards.push(new Card("W","X"));
            }
        }

        cards_removed = cards_removed + num_wilds_needed2 + num_wilds_needed1;
        for (var i = 1; i < cards_removed+1; i++) {
            var last = '#computer' + computer_num + 'DivId div:last(' + i + ')';
            $(last).remove();
        }

        console.log("New cards are", new_cards);
        console.log("Before being cleared", computerStack);
        console.log("the cards are", computerStack.cards)
        computerStack.clearCards();
        console.log("Computer stack cleared is", computerStack);
        computerStack.addCards(new_cards); // new hand without the played phase cards
        console.log("Computer stack with added cards is", computerStack);
    }
}

// Computer draws a card
function computerDrawCard(computerStack, computerDivId) {

    var drawCard = deck.deal();
    computerStack.addCard(drawCard);
    var node = drawCard.createNode();
    $('#drawDeck').append(node);
    id = $(node).data('id');
    moveAnimate(id, computerDivId, '#drawDeck');
}

// Computer will add cards to other existing phases if possible
function addToOtherPhases(computerStack, computerDivId) {

    var array_phase_stacks = [phase1Stack, phase2Stack, c1phase1Stack, c1phase2Stack, c2phase1Stack,
                        c2phase2Stack,c3phase1Stack, c3phase2Stack];

    var current_array_stack;
    var current_phase;
    var current_div;
    var new_cards = new Array();
    

    for (var j=0; j<computerStack.cardCount();j++) {
        var card_used = "False";
        var cur_card = computerStack.cards[j];
        for (var i=0; i<array_phase_stacks.length; i++) {
            current_array_stack = array_phase_stacks[i]; //the current stack we're evaluating against to place a 
            switch (current_array_stack) {
                case phase1Stack:  
                    current_phase = phase1Stack.phase;
                    current_div = '#phaseField1'; 
                    break;        
                case phase2Stack:
                    current_phase = phase2Stack.phase;
                    current_div = '#phaseField2';
                    break;
                case c1phase1Stack:
                    current_phase = c1phase1Stack.phase;
                    current_div = '#c1p1field';
                    break;
                case c1phase2Stack:
                    current_phase = c1phase2Stack.phase; 
                    current_div = '#c1p2field';
                    break;
                case c2phase1Stack:
                    current_phase = c2phase1Stack.phase;
                    current_div = '#c2p1field';
                    break;
                case c2phase2Stack:
                    current_phase = c2phase2Stack.phase;
                    current_div = '#c2p2field';
                    break;
                case c3phase1Stack:
                    current_phase = c3phase1Stack.phase;
                    current_div = '#c3p1field';
                    break;
                case c3phase2Stack:
                    current_phase = c3phase2Stack.phase;
                    current_div = '#c3p2field';
                    break;
            }
        
            if (current_array_stack.phase == "SET") {
                //console.log("ITS A SET");
                //console.log("cur card rank:", cur_card.rank);
                //console.log("phase match num is", current_array_stack.matchingNumber());
                if (cur_card.rank == current_array_stack.matchingNumber()) {
                    var card_used = "True";
                    console.log("MATCH: Rank is", cur_card.rank);
                    console.log("MATCH: Matching number is", current_array_stack.matchingNumber());
                    current_array_stack.addCard(cur_card);
                    var node = cur_card.createNode();   
                    $(computerDivId).append(node);
                    id = $(node).data('id'); 
                    moveAnimate(id, current_div, computerDivId);
                    console.log("Moving", id, "from", computerDivId, "to", current_div);
                    $(current_div).append($(node));
                    node.firstChild.style.visibility = "";
                    $(node).css('display', 'block');
                    var last = computerDivId + ' div:last(1)';
                    $(last).remove();
                }
            }
            else if (current_array_stack.phase == "RUN") {
                if (cur_card.rank == parseInt(current_array_stack.lastCard) + 1) {
                    console.log("Rank is", cur_card.rank);
                    console.log("Matching color is", cur_card.colors);
                    current_array_stack.addCard(cur_card);
                    var node = cur_card.createNode();
                    //$(computerDivId).append(node);
                    //node.firstChild.style.visibility = "";
                    id = $(node).data('id');
                    //moveAnimate(id, computerDivId, current_div);
                }
                else if (cur_card.rank == parseInt(current_array_stack.firstcard) - 1) {
                    var card_used = "True";
                    // check back later
                    current_array_stack.addCard(cur_card);
                    var node = cur_card.createNode();
                    //$(computerDivId).append(node);
                    //node.firstChild.style.visibility = "";
                    id = $(node).data('id');
                    //moveAnimate(id, computerDivId, current_div);
                }
            }
            else if (current_array_stack.phase == "COLORS") {
                if (cur_card.rank == current_array_stack.matchingColor) {
                    var card_used = "True";
                    current_array_stack.addCard(cur_card);
                    var node = cur_card.createNode();
                    //$(computerDivId).append(node);
                    //node.firstChild.style.visibility = "";
                    id = $(node).data('id');
                    //moveAnimate(id, computerDivId, current_div);
                }
            }
        }

        if (card_used == "False") {
            new_cards.push(cur_card);
        }

    }
    computerStack.clearCards();
    computerStack.addCards(new_cards);




}

//Picks a good card to discard
function pickDiscardCard(computerStack, best_nums) {
    // Returns the values that are in our computer's hand that are not in our best_nums array
    var mycard;
    for (i = 0; i < computerStack.cardCount(); i++) {
        console.log("I is,",i);
        
        if (_.contains(best_nums, computerStack.cards[i].rank)) {
            continue;
        }
        if (computerStack.cards[i].rank == "W") {
            continue;
        } else {
            mycard = computerStack.cards[i];
            console.log("I is", i);
            console.log("Discarded card is", mycard);
            break;
        }
    }
    if (typeof mycard == 'undefined') {
        return computerStack.cards[0];
    }
    else {
        return mycard;
    }
}

// Discard a card
function computerDiscard(computerStack, computerDivId, card) {

    computerStack.removeCard(card);
    var cardNode = card.createNode();
    discardStack.addCard(card);
    var last = computerDivId + ' div:last(1)';
    $(last).remove();
    $(computerDivId).append(cardNode);

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
        element = $(el); //Allow passing in either a JQuery object or selector
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
    computerStack.cards is an array; assumes we have an array of cards and each card has card.rank = # and card.suit = color
    When cards go into this function, we still have wilds we need to 'clean'*/
    function checkComputerPhase(computerStack) {
    var phaseFunction;
    switch (computer_phase) {

        case 1:  
            phaseFunction = phase1function(computerStack.cards);
            break;            
        case 2:
            phaseFunction = phase2function(computerStack.cards); 
            break;    
        case 3:
            phaseFunction = phase3function(computerStack.cards);
            break;     
        case 4:
            phaseFunction = phase4function(computerStack.cards);
            break;     
        case 5:
            phaseFunction = phase5function(computerStack.cards);
            break;
        case 6:
            phaseFunction = phase6function(computerStack.cards);
            break;
        case 7:
            phaseFunction = phase7function(computerStack.cards);
            break;
        case 8:
            phaseFunction = phase8function(computerStack.cards);
            break;
        case 9:
            phaseFunction = phase9function(computerStack.cards);
            break;
        case 10:
            phaseFunction = phase10function(computerStack.cards);
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