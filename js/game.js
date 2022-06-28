class Game
{
	#context;
	#size;
	#score = 0;
	#board;
	#ui;

	constructor()
	{
		const canvas = document.getElementById("gameWindow");

		this.#context = canvas.getContext("2d");
		this.#context.canvas.width = GAME_WIDTH;
		this.#context.canvas.height = GAME_HEIGHT;
		this.#context.font = GAME_FONT_SIZE + GAME_FONT_UNIT + " " + GAME_FONT;
		this.#context.lineWidth = GAME_WINDOW_SCALE;
		this.#size = new Point(GAME_WIDTH, GAME_HEIGHT);
		this.#board = new Board(this, this.#context);
		this.#ui = new UI(this, this.#context);
		
		this.#requestAnimationFrame();
		document.addEventListener("keydown", this.#onKeyDown.bind(this), false);
	}

	addScore(points)
	{
		this.#score += points;
	}

	getScore()
	{
		return this.#score;
	}

	getSize()
	{
		return this.#size;
	}

	getPaddleLives()
	{
		return this.#board.getPaddle().getLives();
	}

	isRunning()
	{
		return !(this.wonTheGame() || this.#lostTheGame());
	}
	
	wonTheGame()
	{
		return this.#board.destroyedAllBricks();
	}

	onBallFall()
	{
		this.#board.getPaddle().loseLife();
	}

	#lostTheGame()
	{
		return this.#board.getPaddle().lostAllLives();
	}

	#requestAnimationFrame()
	{
		window.requestAnimationFrame(this.#loop.bind(this));
	}

	#loop(timeStamp)
	{
		this.#update(timeStamp);
		this.#draw();

		if(this.isRunning())
		{
			this.#requestAnimationFrame();
		}
	}

	#update(timeStamp)
	{
		this.#board.update(timeStamp);
	}

	#draw()
	{
		this.#context.clearRect(0, 0, this.#size.x, this.#size.y);
		this.#board.draw();
		this.#ui.draw();
	}

	#onKeyDown(e)
	{
		if(!this.isRunning() && e.key.toLowerCase() === GAME_REFRESH_KEY)
		{
			document.location.reload();
		}
	}
}