var events = JSON.parse(JSON.stringify(game_events));
var currentCard, money, force, party, rating, currentMonth, year, cards, aFlag;
var month=['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
var aFlag=true;
var curDate = new Date();

function getAnswer(answer) {
if (aFlag) {
	aFlag=false;
	document.getElementById('statusbar').style.visibility='visible';	
	
	if (('nextCard' in currentCard) && currentCard.nextCard===1) {
		document.getElementById('card').classList.add('shake_animation');
		
		if (answer===1) {currentCard=currentCard.toRigth;document.getElementById('lAnswer').classList.add('hide_animation'); if ('toRigthDeck' in currentCard) addCards(currentCard.toRigthDeck);}
				
		if (answer===0) {currentCard=currentCard.toLeft;document.getElementById('rAnswer').classList.add('hide_animation'); if ('toLeftDeck' in currentCard) addCards(currentCard.toLeftDeck);}
		
		setTimeout(function() {		
			showCard(currentCard);
			document.getElementById('card').classList.remove('shake_animation');
			document.getElementById('lAnswer').classList.remove('hide_animation');
			document.getElementById('rAnswer').classList.remove('hide_animation');
			aFlag=true;
			}, 1000);
		} 
		else {
			document.getElementById('card').classList.add('rotate_scale_animation');
			
			if (answer===1) {	
				if ('toRigthDeck' in currentCard) addCards(currentCard.toRigthDeck);
				document.getElementById('lAnswer').classList.add('hide_animation');
				if (('toRigth' in currentCard) && currentCard.toRigth[0]!=0) {money+=Number(currentCard.toRigth[0]); document.getElementById('money').classList.add('status_animation');}
				if (('toRigth' in currentCard) && currentCard.toRigth[1]!=0)  {force+=Number(currentCard.toRigth[1]); document.getElementById('force').classList.add('status_animation');}
				if (('toRigth' in currentCard) && currentCard.toRigth[2]!=0)  {party+=Number(currentCard.toRigth[2]); document.getElementById('party').classList.add('status_animation');} 
				if (('toRigth' in currentCard) && currentCard.toRigth[3]!=0) {rating+=Number(currentCard.toRigth[3]); document.getElementById('rating').classList.add('status_animation');} 
			} else  if (answer===0) {
				if ('toLeftDeck' in currentCard) addCards(currentCard.toLeftDeck);
				document.getElementById('rAnswer').classList.add('hide_animation');
				if (('toLeft' in currentCard) && currentCard.toLeft[0]!=0) {money+=Number(currentCard.toLeft[0]); document.getElementById('money').classList.add('status_animation');}
				if (('toLeft' in currentCard) && currentCard.toLeft[1]!=0) {force+=Number(currentCard.toLeft[1]); document.getElementById('force').classList.add('status_animation');}
				if (('toLeft' in currentCard) && currentCard.toLeft[2]!=0) {party+=Number(currentCard.toLeft[2]); document.getElementById('party').classList.add('status_animation');}
				if (('toLeft' in currentCard) && currentCard.toLeft[3]!=0)  {rating+=Number(currentCard.toLeft[3]); document.getElementById('rating').classList.add('status_animation');}
			} else {return 0;}	
			
			{
			if (money<0) {money=0;}
			if (force<0) {force=0;}
			if (party<0) {party=0;}
			if (rating<0) {rating=0;}

			if (money>10) {money=10;}
			if (force>10) {force=10;}
			if (party>10) {party=10;}	
			if (rating>10) {rating=10;}	
			}
					
			document.getElementById('money').style.width=(money*10) + '%';
			document.getElementById('force').style.width=(force*10) + '%';
			document.getElementById('party').style.width=(party*10) + '%';
			document.getElementById('rating').style.width=(rating*10) + '%';
			
			if (money<=0) {
				retakeCards();
				cards.push(events[1]);
				money=2;
				force=2;
				party=0;
			}		
			
			if (money>=10) {
				retakeCards();
				cards.push(events[2]);
				money=1;
				force=1;
				party=0;
				year+=2;
			}	
			
			if (force<=0) {
				retakeCards();
				cards.push(events[3]);
				money=5;
				force=5;
				party=0;
			} 
			
			if (force>=10) {
				retakeCards();
				cards.push(events[4]);
				money=5;
				force=5;
				party=0;
			}
			
			if (party<0) {
				retakeCards();
				cards.push(events[5]);
				money=5;
				force=5;
				party=5;
				rating=5
			}
			
			if (party>=10) {
				retakeCards();
				cards.push(events[6]);
				money=5;
				force=5;
				party=5;
				rating=5
			}
			
			currentCard=getNextCard();
			curDate.setDate(curDate.getDate() + 1);
				setTimeout(function() {		
					showCard(currentCard);	
					document.getElementById('card').classList.remove('rotate_scale_animation');
					document.getElementById('lAnswer').classList.remove('hide_animation');
					document.getElementById('rAnswer').classList.remove('hide_animation');
					document.getElementById('money').classList.remove('status_animation');
					document.getElementById('force').classList.remove('status_animation');
					document.getElementById('party').classList.remove('status_animation');	
					document.getElementById('rating').classList.remove('status_animation');	
					aFlag=true;
				}, 1000);
			}
	}
}

window.onload = function() {
        var sources = {
            resource1: "images/general.svg",
            resource2: "images/culture.svg",
            resource3: "images/robot.svg",
			resource4: "images/intelligence.svg",
			resource5: "images/reptiloid.svg",
			resource6: "images/secretary.svg",
			resource7: "images/newspaper.svg",
			resource8: "images/opposition.svg",			
			resource9: "images/lottery.svg",
			resource10: "images/questionbg.svg",
			resource11: "images/deskbg.svg"
        };
        loadSrc(sources, initGame);
    };

    function loadSrc(sources, callback) {
		document.getElementById('container').style.display='none';
		var allSources = {};
        var loadedSrc = 0;
        var numSrc = 0;
        for (var src in sources) {
            numSrc++;
        }
        for (var src in sources) {
            allSources[src] = new Image();
            allSources[src].onload = function(){
                if (++loadedSrc >= numSrc) {
                    callback(allSources);
                }
            };
			console.log(allSources[src]);
            allSources[src].src = sources[src];
        }
    } 
	
function initGame() {
	currentCard=restartGame();
	showCard(currentCard);
	document.getElementById('loading').style.display='none';
	document.getElementById('container').style.display='block';
}

function restartGame() {
	cards = JSON.parse(JSON.stringify(game_cards));
	cards = cards.concat(JSON.parse(JSON.stringify(intelligence_cards)));
	cards = cards.concat(JSON.parse(JSON.stringify(general_cards)));
	cards = cards.concat(JSON.parse(JSON.stringify(culture_cards)));
	cards = cards.concat(JSON.parse(JSON.stringify(secretary_cards)));
	retakeCards();
	cards.push(events[0]);	
	money=5;
	force=5;
	party=5;
	rating=5
	return getNextCard();
}

function retakeCards() {
	cards.sort(compareRandom);
	cards.sort(compareRandom);
}

function getNextCard()
{
	return cards.pop();
}

function addCards(deck) {
	switch (deck) {
	case 1:
		cards = cards.concat(JSON.parse(JSON.stringify(robot_cards)));
		retakeCards();
    break;
	case 2:
		cards = cards.concat(JSON.parse(JSON.stringify(reptiloid_cards)));
		retakeCards();
    break;
	case 4:
		alert('В точку!');
    break;
	case 5:
		alert('Перебор');
    break;
	default:
		alert('Нет колоды');
	}
}


function showEvent(money, force, party) {
	document.getElementById('statusbar').style.visibility='hidden';
	document.getElementById('legend').style.visibility='hidden';
	document.getElementById('card').style.background='linear-gradient(to right, #DC304B 50%, #B2273D 50%)';

}

function showCard(card) {
	document.getElementById('title').innerHTML = '<p>'+card.title+'</p>';
	document.getElementById('image').innerHTML = '<object type=\"image/svg+xml\" data=\"images\\'+card.image+'\" width=\"100%\" height=\"100%\">SVG error!</object>';
	document.getElementById('description').innerHTML = '<p>'+card.description+'</p>';	
	document.getElementById('lAnswer').innerHTML = '<p>'+card.lAnswer;//+" "+card.toLeft+'</p>';
	document.getElementById('rAnswer').innerHTML = '<p>'+card.rAnswer;//+" "+card.toRigth+'</p>';	
	document.getElementById('legend').innerHTML = '<p>'+curDate.getDate()+' '+month[curDate.getMonth()]+' '+curDate.getFullYear()+'</p>';	
}

function compareRandom(a, b) {
  return Math.random() - 0.5;
}
