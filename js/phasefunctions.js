


var current_phase;
var phase1Stack = new Stack();
var phase2Stack = new Stack();







$('#phaseField1').droppable({

			accept: '#playerDivId div',
			hoverClass:'hovered',
			drop: handlePhaseCardDrop
		})

$('#phaseField2').droppable({

			accept: '#playerDivId div',
			hoverClass:'hovered',
			drop: handlePhaseCardDrop
		})

// Reset the phase submission and send everything back to the player's hand
$('resetPhaseField').click(function() {


});

// PHASE ONE
$('#submitPhase1').click(function() {

	$('#submitPhase1').hide();

	$('#phaseField').css('display', 'block');
	$('#phase1Title1').css('display', 'block');
	$('#phase1Title2').css('display', 'block');
	$('#submitphasebutton').css('display','block');
	
	$('.sortable').sortable({ disabled: true });
	$('.card').draggable({
    	revert:  true,
    	stack: '#playerDivId div',   		
    });


	// This phase card drop only checks to make sure a card is not a skip 
	function handlePhaseCardDrop(event,ui) {
		
		var cardID = $(ui.draggable).attr("id");
		var cardNumber = cardID.slice(1);
		var cardColor = cardID[0];

		// Appending visual node
		$(this).css('z-index','1');
		$(this).append(ui.draggable);
		$(ui.draggable).css('position', 'relative');
		$(ui.draggable).css('z-index', '100');
		ui.draggable.draggable('disable');
		//ui.draggable.position({ of: $(this), my: 'left top', at: 'left top' });
		ui.draggable.draggable('option', 'revert',  false);

		// Appending card ID to phaseStack and removing it from playerstack
		var discardedCard = playerStack.removeCard(cardNumber, cardColor);
		if ($(this).attr("id") == "phaseField1") {
			phase1Stack.addCard(discardedCard);
		}
		if ($(this).attr("id") == "phaseField2") {
			phase2Stack.addCard(discardedCard);
		}
	}
