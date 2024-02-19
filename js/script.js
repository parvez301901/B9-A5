console.log('test');

const seats = document.querySelectorAll('.seat');
let clickCount = 0;
for (let index = 0; index < seats.length; index++) {
    const singleSeat = seats[index];
    singleSeat.addEventListener('click', function(){

		if (clickCount < 4 ) {
			if (singleSeat.classList.contains('selectedSeat')) {
				singleSeat.classList.remove('selectedSeat');
				clickCount--;
				let promoApplyButtonHolder = document.getElementById('promoApplyButton');
				promoApplyButtonHolder.classList.add('btn-disabled');				
				const promCodeField = document.getElementById('promCode');					
				promCodeField.disabled = true;
				let seatName = singleSeat.innerText;				
				let ff = document.querySelectorAll('#'+seatName);	
				ff.forEach(element => {
					element.remove();
				});				
				increaseNumber('total-seat-left' , 1);
				decreaseNumber('selectedTicketNumber' ,1);
				decreaseNumber('initial-total', 550);
				decreaseNumber('grand-total', 550);			

			} else {
				singleSeat.classList.add('selectedSeat');
				let seatName = singleSeat.innerText;
				clickCount++;
				/*add seat here*/
				let readyDiv =`<div id="`+seatName+`" class="flex flex-row justify-between pb-4"><div class="text-primaryheadingColor">`+ seatName +`</div><div class="text-primaryheadingColor">Economoy</div><div class="text-primaryheadingColor">550</div></div>`;
				document.querySelector('.add-seat-list').innerHTML += readyDiv;
				decreaseNumber('total-seat-left', 1);
				increaseNumber('selectedTicketNumber', 1);
				increaseNumber('initial-total', 550);
				increaseNumber('grand-total', 550);
				if ( clickCount == 4 ) {
					let promoApplyButtonHolder = document.getElementById('promoApplyButton');
					promoApplyButtonHolder.classList.remove('btn-disabled');
					const promCodeField = document.getElementById('promCode');					
					promCodeField.disabled = false;
				}

			}
		} else {
			console.log('four selected');			
			if (singleSeat.classList.contains('selectedSeat')) {
				singleSeat.classList.remove('selectedSeat');				
				clickCount--;
				let promoApplyButtonHolder = document.getElementById('promoApplyButton');
				promoApplyButtonHolder.classList.add('btn-disabled');				
				const promCodeField = document.getElementById('promCode');					
				promCodeField.disabled = true;

				let seatName = singleSeat.innerText;				
				let ff = document.querySelectorAll('#'+seatName);
				ff.forEach(element => {
					element.remove();
				});
				
				increaseNumber('total-seat-left', 1);
				decreaseNumber('selectedTicketNumber', 1);
				decreaseNumber('initial-total', 550);
				decreaseNumber('grand-total', 550);
				

			}
		}
    });
}


/*increase number*/
function increaseNumber(selectorNameById , number) {
	let totalSeatLeftHolder = document.getElementById(selectorNameById);
	let totalSeatLeft = document.getElementById(selectorNameById).innerText;
	totalSeatLeftHolder.innerText = ((parseInt(totalSeatLeft)) + number);
}

/*increase number*/
function decreaseNumber(selectorNameById, number) {	
	let totalSeatLeftHolder = document.getElementById(selectorNameById);
	let totalSeatLeft = document.getElementById(selectorNameById).innerText;
	totalSeatLeftHolder.innerText = ((parseInt(totalSeatLeft)) - number);
}

/*promo code mechanism*/
let promoApplyButton = document.getElementById('promoApplyButton');


promoApplyButton.addEventListener('click', function(){
	let promoCode = document.getElementById('promCode');
	if ( promoCode.value === 'NEW15' ) {
		
		let old_grand_total_holder = document.getElementById('grand-total');
		let old_grand_total = document.getElementById('grand-total').innerText;
		let initialTotal = document.getElementById('initial-total').innerText;
		old_grand_total_holder.innerText = initialTotal - ((((parseInt(initialTotal)) * 15 )) / 100);	
		let promo_success = document.getElementsByClassName('promo-success');		
		promo_success[0].classList.remove('hidden');
		document.getElementById('promo-block').classList.add('hidden');		
		let readyDiv =`<div id="discountBar" class="flex flex-row justify-between pb-4"><div class="text-primaryheadingColor">Discount</div><div class="text-primaryheadingColor">BDT -`+ ((((parseInt(initialTotal)) * 15 )) / 100) +`</div></div>`;
		document.querySelector('.add-discount-list').innerHTML += readyDiv;		

	} else if ( promoCode.value === 'Couple 20' ) {

		let old_grand_total_holder = document.getElementById('grand-total');
		let initialTotal = document.getElementById('initial-total').innerText;
		old_grand_total_holder.innerText = initialTotal - ((((parseInt(initialTotal)) * 20 )) / 100);
		let promo_success = document.getElementsByClassName('promo-success');
		promo_success[0].classList.remove('hidden');
		document.getElementById('promo-block').classList.add('hidden');		
		let readyDiv =`<div id="discountBar" class="flex flex-row justify-between pb-4"><div class="text-primaryheadingColor">Discount</div><div class="text-primaryheadingColor">BDT -`+ ((((parseInt(initialTotal)) * 20 )) / 100) +`</div></div>`;
		document.querySelector('.add-discount-list').innerHTML += readyDiv;	
		
	} else {
		let promo_error = document.getElementsByClassName('promo-error');
		promo_error[0].classList.remove('hidden');		
	}
});


/*Final Button Processing*/


let emailField = document.getElementById('emailField');

emailField.addEventListener('keyup', function(event) {
	let old_grand_total_holder = document.getElementById('grand-total').innerText;
	let emailFieldValue = emailField.value;
	console.log(old_grand_total_holder);
	if ( (emailFieldValue !== '') && ( parseInt(old_grand_total_holder) > 500 ) ) {
		
		let final_button = document.getElementById('final_button');
		final_button.classList.remove('btn-disabled');	
		
		let finalError = document.getElementsByClassName('final-error');
		finalError[0].classList.add('hidden');

		console.log('Email field is not empty');
	} else {
		let finalError = document.getElementsByClassName('final-error');
		finalError[0].classList.remove('hidden');	
		let final_button = document.getElementById('final_button');
		final_button.classList.add('btn-disabled');	
	}
});