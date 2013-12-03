// PHASE ONE
	$('#submitPhase1').click(function() {

		$('#submitPhase1').hide();

		$('#phaseField').css('display', 'block');
    	$('#phaseField1').css('display', 'block');
    	$('#phaseField2').css('display', 'block');
		$('.sortable').sortable({ disabled: true });
		$('.card').draggable({
        	revert:  true,
        	stack: '#playerDivId div',   		
        });

		for(var i = 0; i <6; i++) {
			if (i ==0 || i == 3) {
				$('<div>Set of 3</div>').attr('class', 'phaseMsg').appendTo('#phaseField1')
			}
			$('<div></div>').data('number', i).attr('class', 'phaseFieldDiv2').appendTo('#phaseField').droppable( {

				accept: '#playerDivId div',
				hoverClass: 'hovered',
				drop: handlePhaseCardDrop
				
			});

		}


    	function handlePhaseCardDrop(event,ui) {
    		//if (something)
    		//	ui.draggable.addClass('correct');
    		//$(this).droppable('disable');
    		var cardID = $(ui.draggable).attr("id");
    		var cardNumber = cardID.slice(1);
    		var cardColor = cardID[0];
    		var draggedPlace = $(this).data('number');
 


    		console.log('you just moved' + cardNumber + 'color of' + cardColor);
    		console.log(playerStack.cardCount());

    		ui.draggable.position({ of: $(this), my: 'left top', at: 'left top' });
    		ui.draggable.draggable('option', 'revert',  false);
    		phaseDictionary[draggedPlace] = cardNumber;
    		//phaseDictionary.key = draggedPlace;
    		//phaseDictionary.val = cardID;
  	
  			console.log('This dictionary has values currently:');
  			for (var i in phaseDictionary) {

  				console.log('key:' + i + 'value:' + phaseDictionary[i]);

  			}

  			// Make sure it's not empty
	    	if (phaseDictionary[0] != undefined && phaseDictionary[0] == phaseDictionary[1] && phaseDictionary[1] == phaseDictionary[2]) {
	    		if (phaseDictionary[3] != undefined && phaseDictionary[3] == phaseDictionary[4] && phaseDictionary[4] == phaseDictionary[5]) {
	    			ui.draggable.draggable('disable');
	    			$(this).droppable('disable');
		   			console.log('equal of' +phaseDictionary[0] +phaseDictionary[1]+phaseDictionary[2]);

	    			$('#phaseCompleteMessage').show();
				    $('#phaseCompleteMessage').animate( {
					      left: '380px',
					      top: '200px',
					      width: '400px',
					      height: '100px',
					      opacity: 1
		    			});
		    		}
	    		}
	    	}

	});
	// END PHASE ONE CODE