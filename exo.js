$( document ).ready(function() {
	
	var timeGoal = 40;
	var bpm = '';
	var multi = 0;
	var score = 0;
	var timeElapsed = 0;
	var distance = 0;
	var calories = 0;
	var targetScore = 1000;
	var nextLevelXp = 1500;
	var nextNextLevelXp = 4000;
	var currentXp = 200;
	var todayComplete = false;






function audioPlayer(filename){
console.log('audio playing now...');
 var audio = $('<audio>');
 	audio.attr('id', 'audio-'+filename)
	//audio.attr('controls', 'controls');

	
/*	var m4a = $('<source>');
		m4a.attr('type', 'audio/m4a');
		m4a.attr('src', 'audio/'+filename+'.m4a');
	
	audio.append(m4a);
*/

/*
	var ogg = $('<source>');
		ogg.attr('type', 'audio/ogg');
		ogg.attr('src', 'audio/'+filename+'.ogg');
	*/
	var aac = $('<source>');
		aac.attr('type', 'audio/aac');
		aac.attr('src', 'audio/'+filename+'.aac');
	
	console.log('building audio tag...');
	audio.append(aac);	
	//audio.append(ogg);	
	
	console.log('adding audio to body...');
	
	$('body').append(audio);
	console.log('playing audio...');
	var theSound = document.getElementById('audio-'+filename);
	
	theSound.addEventListener("ended", function () {
		console.log('audio ended: '+this);
		$(theSound).remove();
	}, false);
	
	$('body').append(theSound);
	theSound.play();
	
}
function audioStopper(filename){
	var theSound = document.getElementById('audio-'+filename);
	if (theSound){
		theSound.pause();
	}
	$(theSound).remove();
}


$('#collapseOne').collapse("hide");



	function resetRunStatus(){
		bpm = '';
		multi = 0;
		score = 0;
		timeElapsed = 0;
		distance = 0;
		calories = 0;
	}
	
	function haltRunStatus(){	
		clearInterval(tickerInterval);
		clearInterval(timeInterval);
		clearInterval(completionInterval);
	}
	
	
	
	function boot(){
		audioPlayer('mus-main');
		$('#loading').fadeIn(2000).fadeOut(1000);
		setTimeout (function(){
			$('#run').fadeIn(500);
		}, 3000);
		
		setTimeout (function(){
			//gotoScreen('#run');	
			runScreen();
		}, 4500)	;
	}
	
	
	function runScreen(){
		$('#race-day').hide();
			
		if (todayComplete){
			$('#next-run').show();
			$('#today-run').hide();
		} else {
			$('#next-run').hide();
			$('#today-run').show();
		}
			
	}
	
	
	
	
	
	
	function heartmeterInit(){
		//$('#time-goal').html(secondsToMinutes(timeGoal));
	}
	
	function trackTime(){
		timeInterval = setInterval(function(){
			timeElapsed++;
			console.log('timeElapsed...'+timeElapsed);
			updateSeconds();
		}, 1000);
	}
	
	function secondsToMinutes(seconds){
		var minutes = Math.floor(seconds / 60);
		var remainderSeconds = timeElapsed % 60;
		if (remainderSeconds<10){
			remainderSeconds = '0'+remainderSeconds;
		}
		var output = minutes +':'+remainderSeconds;
		return output;
	}
	
	function updateSeconds(){
		console.log('updating seconds...');
	
		$('#time-elapsed').html(secondsToMinutes(timeElapsed));
		
		var completion = (timeElapsed / timeGoal) * 100;
		if (completion < 100){
			$('#time-progress-bar').attr('style', 'width:'+completion+'%;');	
		}
		
		if ((timeElapsed % 15) == 0){
			distance = parseFloat(distance);
			distance = distance + 0.1;
			//console.log('distance...'+distance)
			distance = (distance).toFixed(1);
			//console.log('distancefixed...'+distance)
			$('#distance').html(distance+' mi');
		}
		if ((timeElapsed % 10) == 0){
			calories = calories + 5;
			$('#calories').html(calories+' cal');
		}
		
	}
	
	
	function inrementHeartmeter(){
		console.log('incrementing...');
		var currentClass = $('#heartmeter').attr('class');
				console.log('currentClass...'+currentClass);

		var lastChar = currentClass.substr(currentClass.length - 1);
		var newNum = Number(lastChar);
		newNum++;	
		var newClass = 'zone' + 	newNum;	
		$('#heartmeter').attr('class', newClass);
		console.log('currentClass...'+newClass);
		updateHeartText();

	}
	function decrementHeartmeter(){
		console.log('decrementing...');
		var currentClass = $('#heartmeter').attr('class');
				console.log('currentClass...'+currentClass);

		var lastChar = currentClass.substr(currentClass.length - 1);
		var newNum = Number(lastChar);
		newNum--;	
		var newClass = 'zone' + 	newNum;	
		$('#heartmeter').attr('class', newClass);
		console.log('currentClass...'+newClass);
		updateHeartText();

	}
	function updateHeartText(){
		console.log('updating heart text...');
		var currentClass = $('#heartmeter').attr('class');
		
		
		if (currentClass == 'zone1'){
			bpm = '88';
			multi = 0;
		} else if (currentClass == 'zone2') {
			bpm = '119';
			multi = 1;
		} else if (currentClass == 'zone3') {
			bpm = '120';
			multi = 2;

		} else if (currentClass == 'zone4') {
			bpm = '134';
			multi = 1;

		} else if (currentClass == 'zone5') {
			bpm = '148';
			multi = 0;
		}
		
		$('#bpm').html(bpm);
		$('#multiplier-num').html(multi);
	}
	
	function cycleHeartmeter(){
		for(cycle = 0; cycle < 4; cycle++) {
			console.log('cycling...');
			setTimeout (function(){
				inrementHeartmeter();
			}, 2500)	;
		}
	}
	function updateScore() {
		$('#score').html	(score);
	};
	function scoreTicker(){
			tickerInterval = setInterval (function(){
				console.log('tick...');
				var increase = (1 * multi);
				score = score + increase;
				$('#score').html	(score);
			}, 125)	;
	}
	
	
	function runStatus(){
		
		console.log('runStatus...');
		
		resetRunStatus();
	
		heartmeterInit();
		trackTime();
		updateHeartText();
		scoreTicker();
		
		//cycleHeartmeter();
		setTimeout (function(){
			inrementHeartmeter();
			//$('#multiplier').addClass('upgrade1');
			audioPlayer('sfx-prompt');
		}, 3000)	;
		setTimeout (function(){
			inrementHeartmeter();
			$('#audio-sfx-prompt').remove();
			audioPlayer('sfx-prompt');
		}, 6000)	;
		setTimeout (function(){
			inrementHeartmeter();
			
			audioPlayer('sfx-prompt-confirm');
		}, 9000)	;
		setTimeout (function(){
			inrementHeartmeter();
			$('#audio-sfx-prompt-confirm').remove();
			audioPlayer('sfx-prompt-confirm');
		}, 12000)	;
		setTimeout (function(){
			decrementHeartmeter();
			audioPlayer('sfx-prompt');
		}, 15000)	;
		setTimeout (function(){
			decrementHeartmeter();
			$('#audio-sfx-prompt').remove();
			audioPlayer('sfx-prompt');
		}, 18000)	;
		
		setTimeout (function(){
			audioPlayer('sfx-powerup');
			multi = 3;
			$('#multiplier-num').html(multi);
			$('#multiplier').addClass('upgrade1');
			
		}, 23000)	;
		
		setTimeout (function(){
			audioPlayer('sfx-powerup');
			multi = 4;
			$('#multiplier-num').html(multi);
			$('#multiplier').addClass('upgrade2');
		}, 27000)	;
		
		setTimeout (function(){
			multi = 6;
			audioPlayer('sfx-powerup');

			$('#multiplier-num').html(multi);
			$('#multiplier').addClass('upgrade3');
		}, 31000)	;
		
		completionInterval = setInterval(function(){
			if(timeElapsed >= timeGoal){
				gotoScreen('#run-results');
				haltRunStatus();
				animateRunScreen = false;
				runResults();
				audioStopper('mus-run');
			}
		}, 1000);
		
		
	}
	
	function gotoScreen(target){
		console.log('Going to screen...'+target);
		$('.screen').hide();
		$(target).show();
	}
	
	
	function runResults(){

		score = 799;
		
		audioPlayer('sfx-drumroll');
			
		// the score to add up, as it does ping the stars above. 
		var displayedScore = 0;
		var star1 = Math.floor(targetScore * .33);
		var star2 = Math.floor(targetScore * .66);
		var star3 = targetScore;
		console.log(star1);
		console.log(star2);
		console.log(star3);
		
		function updateDisplayedScore(){
			$('#final-score').html(displayedScore);
			
			if (displayedScore == star1){
				$('#star1').attr('class', 'star earned');
				audioPlayer('sfx-ding');
			} else if (displayedScore == star2){
									console.log('star2...');

				$('#star2').attr('class', 'star earned');
				$('#audio-sfx-ding').remove();
				audioPlayer('sfx-ding');
			} else if (displayedScore == star3){
									console.log('star3...');

				$('#star3').attr('class', 'star earned');
				//$('#audio-sfx-ding').remove();
				audioPlayer('sfx-ding');
			}
			if (currentXp <= nextLevelXp) {
				$('.level-progress').css('width', 100 * (currentXp / nextLevelXp) +'%');
			} else {
				$('.level-progress').css('width', '100%');
			}
		}
		
		tallyScore = setInterval(function(){
			if (displayedScore < score){
				displayedScore++;
				currentXp++;
				
				updateDisplayedScore();
				
			} else {
				clearInterval(tallyScore);
				addRunBonuses();
			}
		}, 9);
	
		
		function addRunBonuses(){
			
			setTimeout(function(){
			
				displayedScore = displayedScore + 100 ;
				currentXp = currentXp + 100;
				
				$('#bonus1').show();
				audioPlayer('sfx-bump');
				
				updateDisplayedScore();
			}, 1000);
			setTimeout(function(){
			
				displayedScore = displayedScore +100 ;
				currentXp = currentXp + 100;
				
				$('#bonus2').show();
				audioPlayer('sfx-bump');
				
				updateDisplayedScore();
			}, 2000);
			setTimeout(function(){
			
				displayedScore = displayedScore +350 ;
				currentXp = currentXp + 350;
				
				$('#bonus3').show();
				audioPlayer('sfx-bump');
				
				updateDisplayedScore();
				$('#star3').attr('class', 'star earned');
				audioPlayer('sfx-ding');
				
			}, 3000);
			setTimeout(function(){
				$('#levelUp').modal();
				audioPlayer('sfx-levelup');
			}, 4500);
			
		}
		
	}
	
	function raceStatus(){
		
		
		$('#audio-mus-main').remove();
		audioPlayer('mus-run');

		/*
		setTimeout(function(){
			$('.runner').attr('class', 'runner move');
		}, 1000);
		*/
		
		var positions = 6;
		var currentPosition = 1;
		moveRunners = setInterval(function(){
			
			if (currentPosition <= positions){
				currentPosition++;
				$('.runner').attr('class', 'runner pos'+currentPosition);
				
			} else {
				
				clearInterval(moveRunners);	
			}
			
		}, 2000);
		
		setTimeout(function(){
			$('#place').attr('class', 'second');
			$('#place-num').html('2');
			audioPlayer('sfx-prompt-confirm');
		}, 3200);
		setTimeout(function(){
			$('#place').attr('class', 'first');
			audioPlayer('sfx-prompt');
			$('#place-num').html('1');
		}, 4000);
		setTimeout(function(){
			$('#place').attr('class', 'second');
			$('#audio-sfx-prompt-confirm').remove();
			audioPlayer('sfx-prompt-confirm');
			$('#place-num').html('2');
		}, 5800);
		
		
		setTimeout(function(){
			$('#place').attr('class', 'first');
			audioPlayer('sfx-prompt');
			$('#place-num').html('1');
		}, 12000);
		
		setTimeout(function(){
			$('#lap').attr('class', 'lap2');
			$('#lap-num').html('2');
			audioPlayer('sfx-bump');
		}, 14000);
		/*
		setTimeout(function(){
			$('#lap').attr('class', 'lap3');
			$('#lap-num').html('3');
		}, 7000);
		*/
		setTimeout(function(){
			gotoScreen('#race-results');	
			raceResults();	
		}, 15000);
	}
	
	function raceResults(){
		
		$('#audio-mus-run').remove();
		audioPlayer('mus-victory');
	
		function paintStar(){
			
			//console.log(newStar);
			
			var totalStars = 15;
			var starTracker = 1;
			
			starDropper = setInterval(function(){
				
				if (starTracker <= totalStars ) {
					starTracker++;
					var newStar = $('#reward-star').clone().css('display', 'inline');
					$('#reward').append(newStar);
					$('#audio-sfx-ding').remove();
					audioPlayer('sfx-ding');
				} else {
					clearInterval(starDropper);
				}
				
			}, 200);
			
			
			
		}
		
		paintStar();
			
	};
	
	function countdownScreen(){
		var count = 5;
		//audioPlayer('sfx-bump');
		stepDown()
		
		function stepDown(){
			if (count >= 0){
				$('#countdown-num').html(count).attr('class', 'step'+count);
				$('#audio-sfx-bump').remove();
				audioPlayer('sfx-bump');
				count--;	
			} else {
				$('#audio-sfx-bump').remove();
				clearInterval(counter);
			}
		}
		
		counter = setInterval(function(){
			stepDown()
		}, 1000);
	}
	
	
	boot();
	//gotoScreen('#race-status');
	//raceStatus();
	//gotoScreen('#run-results');
	//countdownScreen('run-status');
	//runResults();
	//raceStatus();
	//raceResults();
	
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	})
	
	$('#start-run').on('click', function(e){
		e.preventDefault();
		audioStopper('mus-main');
		audioPlayer('sfx-select');
		
		gotoScreen('#countdown-screen');
		countdownScreen('run-status');
		setTimeout(function(){
			gotoScreen('#run-status');
			runStatus();
			audioPlayer('mus-run');
		}, 6000);
		
		$('#today-run').hide();
		$('#tomorrow-run').show();
		
	});
	$('#leave-run-results').on('click', function(e){
		
		todayComplete = true;
		gotoScreen('#run');
		audioPlayer('sfx-select');
		$('#audio-mus-run').remove();
		audioPlayer('mus-main');
		$('#today-run').hide();
		$('#next-run').show();
		$('#race-day').hide();
	});
	
	$('.footer-run').on('click', function(e){
		console.log('clicking footer-run...');
		e.preventDefault();
		gotoScreen('#run');
	});
	
	var countdownDays = 9;
	
	$('#days').on('click', function(e){
		e.preventDefault();
		countdownDays--;
		if (countdownDays >= 0 ){
			$('#days-num').html(countdownDays);	
		}
		if (countdownDays == 0){	
			$('#today-run').hide();
			$('#next-run').hide();
			$('#race-day').show();
		}
	});
	
	$('#start-race').on('click', function(e){
		e.preventDefault();
		$('#audio-mus-main').remove();
		gotoScreen('#race-status');
		raceStatus();
	});
	
	$('.footer-the-shop').on('click', function(e){
		e.preventDefault();
		gotoScreen('#the-shop');
	});
	$('.footer-stats').on('click', function(e){
		e.preventDefault();
		gotoScreen('#stats');
	});
	
	$('#back-to-shop').on('click', function(e){
		e.preventDefault();
		gotoScreen('#the-shop');
	});
	
	$('.item-slot').on('click', function(e){
		e.preventDefault();
		gotoScreen('#the-shop-helmet');
	});
	
	$('#leave-race-results').on('click', function(e){
		e.preventDefault();
		$('#audio-mus-victory').remove();
		gotoScreen('#run');
		$('#today-run').hide();
			$('#next-run').show();
			$('#race-day').hide();
	});
	
	
	
	
	
	
	
});