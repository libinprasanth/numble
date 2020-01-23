
class numble{
 
	level = 2; // creates board with level X level size
	max = Math.pow(this.level, 2) - 1; // used while iterating over tiles
	board; // board 
	count = 0; // counting moves made
	timer;  // timer variable, it is global because we are setting it from one function, and stopping from another
	
	target; // where to show game board 
	boardOuter;
	 
    // target elements 
	counter;
	hours;
	minutes;
	seconds; 
	moves;
	empty;
	levelComplete;
	GameComplete;
	
	time = {
	  seconds: 0,
	  minutes: 0,
	  hours: 0 
	}

	constructor(target){
		this.target = document.getElementById(target); 
		// Check target is exist or not 
		if(this.target != undefined && this.target != null){
			this.init(); 
		} else {
			alert("Target Not Found..");
		}
	} 
	
	// Initialize based layout
	init(){
		var wrp = this.createElement('div', '', 'wrp', this.target);
		var row = this.createElement('div', '', 'row', wrp);
	     
		// create structure
		this.createLeftLayout(row); 
		this.createBoardLayout(row);
		this.createRightLayout(row);
		
		this.startTimer();
		this.updateCount();
		this.startGame();
	}
	
	// Board layout 
	createBoardLayout(target){
	   var card = this.createElement('div', '', 'col-card', target);
	   this.boardOuter = this.createElement('div', '', 'board-outer', card);
	   
	   var gFooter = this.createElement('div','','level-change', this.target,'');
	   this.createElement('button', '', '', gFooter, 'Easy')
		    .addEventListener("click", this.startLevel.bind(this, 2), false);
			
	   this.createElement('button', '', '', gFooter, 'Medium')
		    .addEventListener("click", this.startLevel.bind(this, 5), false);
	   this.createElement('button', '', '', gFooter, 'Hard')
		    .addEventListener("click", this.startLevel.bind(this, 8), false);
	}
	// Left layout 
	createLeftLayout(target){
		var colLeft = this.createElement('div', '', 'col-left', target);
		var colLeftInner = this.createElement('div', '', 'col-left-inner', colLeft);
		var counter = this.createElement('div', '', 'counter', colLeftInner, 'Moves: ');
		this.counter = this.createElement('span', '', '', counter, '0'); // this is used for update move counter 
		
		var timer = this.createElement('div', '', 'timer', colLeftInner, 'Time: ');
		this.hours = this.createElement('span', '', 'hours', timer, '00');
		timer.append(':');
		this.minutes = this.createElement('span', '', 'minutes', timer, '00');
		timer.append(':');
		this.seconds = this.createElement('span', '', 'seconds', timer, '00');
		
		/* Action Buttons */
		this.createElement('button', '', 'btn undo', colLeftInner, 'Undo')
		    .addEventListener("click", this.undoAction.bind(this), false);
		 
		this.createElement('button', '', 'btn ', colLeftInner, 'New Game')
		    .addEventListener("click", this.newGame.bind(this), false);
			
		this.createElement('button', '', 'btn auto_solve', colLeftInner, 'Auto Solve')
		    .addEventListener("click", this.autoSolve.bind(this), false);
		
		// Level Complete 
		this.levelComplete = this.createElement('div', '', 'completedLevel', '', '');  
		this.createElement('h4', '', '', this.levelComplete, 'Well Done, all tiles have been sorted!'); 
		this.createElement('button', '', 'btn', this.levelComplete, 'Next Level')
		    .addEventListener("click", this.nextLevel.bind(this), false);
			
		// All Complete 
		this.GameComplete = this.createElement('div', '', 'gameCompleted', '', '');  
		this.createElement('h4', '', '', this.GameComplete, 'Congratulations, You Completed The Game!'); 
		this.createElement('button', '', 'btn', this.GameComplete, 'Star Again')
		    .addEventListener("click", this.startLevel.bind(this), false);
			 
		
	}
	
	// Board Layout 
	createRightLayout(target){
		var cardRight = this.createElement('div', '', 'col-right', target);
		var moves = this.createElement('div', '', 'moves', cardRight);
		this.createElement('h4', '', '', moves, 'Your Moves');
		this.moves = this.createElement('ul', '', '', moves, '');
	}
	
	// function to create element to avoid more line codes
	createElement(ele, id, clas, target, txt){
		var el = document.createElement(ele);
		if(id != ''){ // Check ID is not empty
			el.id = id;
		}
		el.className = clas; // adding class   
		el.textContent = txt; // adding text  
		if(target != ''){ // appending element to target location  
			target.appendChild(el);
		}
		if(target != ''){ // add text  
			target.appendChild(el);
		}
		return el;		
	}
	
	undoAction(){
	  alert("this option not yet completed");
	}
	
	// create new game 
	newGame(){
	  this.time = {
		  seconds: 0,
		  minutes: 0,
		  hours: 0 
	  };
	  this.count = 0;
	  this.moves.innerHTML = '';
	  if(this.boardOuter.querySelector('.completedLevel') != undefined){
		this.boardOuter.removeChild(this.levelComplete);  
	  } 
	  if(this.boardOuter.querySelector('.gameCompleted') != undefined){
		this.boardOuter.removeChild(this.GameComplete);  
	  } 
	  if(this.boardOuter.querySelector('.board') != undefined){
		this.boardOuter.removeChild(this.board);   
	  } 
	  this.startTimer();
	  this.updateCount();
	  this.startGame();
	  if(this.board) {
		for(var i = 0; i < (200 * this.level); i++) {
		  this.shuffle();
		}
	  }
	}
	
	
	
	autoSolve(){
	  alert("this option not yet completed");
	}
	
	// Next level 
	nextLevel(){
	  this.level = (this.level+1 <=8 )?this.level+1:2; // creates board with level X level size
	 
	  this.max = Math.pow(this.level, 2) - 1; // used while iterating over tiles
	  this.newGame();
	}
	
	// Level Again
	startLevel(level = 2){
	  this.level = level; // creates board with level X level size
	 
	  this.max = Math.pow(this.level, 2) - 1; // used while iterating over tiles
	  this.newGame();
	}
	
	// updates timer display
	updateTimer() { 
	 
		this.time.seconds = this.time.seconds + 1; 	
		if(this.time.seconds >= 60) {
		  this.time.seconds = this.time.seconds % 60;
		  this.time.minutes = this.time.minutes + 1;
		  
		}

		if(this.time.minutes >= 60) {
		  this.time.minutes = this.time.minutes % 60;
		  this.time.hours = this.time.hours + 1;
		}
		
		this.updateElement(this.seconds, this.time.seconds);
		this.updateElement(this.minutes, this.time.minutes);
		this.updateElement(this.hours, this.time.hours);
	}
	// starting timer
	startTimer() {  
	  var _this = this;
	  // creating timer
	  this.timer = setInterval(function(){
		_this.updateTimer()
	  }, 1000);

	}
	// update count of moves
	updateCount() {
      this.counter.textContent = this.count++;
    }

	startGame(){ 
	   var w = this.boardOuter.offsetWidth - 30;
		var tile_width = w / this.level;
		if(isNaN(tile_width)){
			tile_width = 50;
		}  
		this.board = this.createElement('div', '', 'board', this.boardOuter);
	   
		this.board.style.height = this.level * tile_width + 'px';
		this.board.style.width = this.level * tile_width + 'px';
	    for(var i = this.max; i >= 0; i--) {
		  // adding tiles, one by one to the board
		  this.addTile(this.board, tile_width, i);
	    }  
	}
	
	// stops the timer
	stopTimer() {
	  clearTimeout(this.timer);
	}
	
	// updating element, used in timer to update seconds, minutes, hours on the DOM
	updateElement(el, value) {
	  el.textContent = value < 10 ? '0' + value : value;
	}
	
	// restarts count of moves on next level
	restartCount() {
	  count = 0;
	  updateCount();
	}
	
	// called when tile has been clicked
	play(el) {  
	  
	  var c = el.querySelector('span'); 
	  this.move(el, Number(c.textContent), this.empty);
	  // check if player won
	  if(this.checkWin()) {
		if(this.level < 8) {
		  this.boardOuter.appendChild(this.levelComplete); 
		  // if there are no any levels left, notify the user about it
		} else {  
		  this.boardOuter.appendChild(this.GameComplete); 
		  // if there are no any levels left, notify the user about it
		} 
		this.boardOuter.removeChild(this.board); 
		this.stopTimer();
	  }
	}
	
	// swapping 2 node elements
	swap(el1, el2) { 
	  var tmp = el1.cloneNode(true);
	  el1.parentNode.replaceChild(tmp, el1);
	  el2.parentNode.replaceChild(el1, el2);
	  tmp.parentNode.replaceChild(el2, tmp);
	}
	
	// creating tile for the board
	addTile(parent, width, i) {
	  var tile = this.createElement('div', '', 'tile', parent);
	  var tile_span = this.createElement('span', '', 'tile-span', tile, i); 
		  tile.style.width = width+'px';
		  tile.style.height = width+'px';
		  tile.style.lineHeight = width+'px';
		  tile.classList.add('tile');
		  tile.addEventListener('click', this.play.bind(this, tile)); 
		// if level is even number, end tiles should be 3 1 2, not 3 2 1 at the start
		// otherwise the game would be impossible to solve
		if(this.level % 2 === 0) {
		  if(i === 1) {
					tile_span.textContent = 2;
					var sb = tile.previousSibling; 
			sb.childNodes[0].textContent = 1;
			// tile.previousSibling.textContent = 1;
		  }
		}
		// adding empty class for 0 tile, visibility set to hidden
		if(i === 0) {
		  tile.classList.add('empty');
		  this.empty = tile;
		}  
	}

	// checks if tile can be moved to empty space
	// accepts array of tiles and targets tile textcontent as number
	isMovePossible(arr, tile) {
 
	  for(var i = 0; i < arr.length; i++) {
	 
		if(Number(arr[i].textContent) === tile) {
		  
			// check if moving up possible
		  if((arr[i - this.level] && arr[i - this.level].textContent == 0) || 
			// check if moving down possible
			((arr[i + this.level]) && arr[i + this.level].textContent == 0) ||
			// check if moving left possible
			((i % this.level) && arr[i - 1].textContent == 0) || 
			// check if moving right possible
			(((i + 1) % this.level) && arr[i + 1].textContent == 0)
			) {
			return true;
			} else {
			return false;
		  }
		}
	  }
	}

	// moving tiles if possible
	move(tile, target,empty) {
	   
	  var arr = Array.prototype.slice.call(this.boardOuter.querySelectorAll('.tile'));
	  
	  // check if moving up possible 
	  if(this.isMovePossible(arr, target)) { 
		this.swap(tile, empty);
		console.log(target);
		this.updateCount(); 
		this.createElement('li', '', '', this.moves, 'Moved tile - '+target); 
	  } else { 
		return false;
	  }
	}

	// shuffling tiles
	shuffle() { 
	  // array representation of tiles
	  var tiles =  Array.prototype.slice.call(this.boardOuter.querySelectorAll('.tile'));
	  // getting index of empty space
	  var emptyPosition = tiles.indexOf(this.empty);
	  // get all possible move directions around empty space
	  var directions = [tiles[emptyPosition - this.level], tiles[emptyPosition + this.level], tiles[emptyPosition + 1], tiles[emptyPosition - 1]].filter(direction => direction);
	  var getRandomDirection = directions[Math.floor(Math.random() * directions.length)];
	  // swap random tile and empty if posible
	  if(this.isMovePossible(tiles, Number(getRandomDirection.textContent))) {
		this.swap(this.empty, getRandomDirection);
	  }
	}

	// checking if all tiles are sorted
	checkWin() {
	  var arr = Array.prototype.slice.call(this.boardOuter.querySelectorAll('.tile'));
	  var index = 1;
	  for(var i = 0; i < arr.length; i++) {
		if(i === this.max) {
		  return true;
		} else {
		  if(Number(arr[i].textContent) !== index) {
			return false;
		  }
		}
		index++;
	  }
	  return true;
	}

}

new numble('gameBoard');