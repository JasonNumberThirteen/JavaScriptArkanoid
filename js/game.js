let GameInstance;

function initGame()
{
	GameInstance = new Game();
}

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
		const width = GAME_WIDTH;
		const height = GAME_HEIGHT;

		this.#context = canvas.getContext("2d");
		this.#context.canvas.width = width;
		this.#context.canvas.height = height;
		this.#context.font = GAME_FONT_SIZE + GAME_FONT_UNIT + " " + GAME_FONT;
		this.#context.lineWidth = GAME_WINDOW_SCALE;
		this.#size = new Point(width, height);
		this.#board = new Board(this, this.#context);
		this.#ui = new UI(this, this.#context);
		
		this.#requestAnimationFrame();
		document.addEventListener("keydown", this.#onKeyDown.bind(this), false);
	}

	onBallFall()
	{
		this.#board.getPaddle().loseLife();
	}

	#loop(timeStamp)
	{
		this.#update(timeStamp);
		this.#draw();

		if(this.isStillRunning())
		{
			this.#requestAnimationFrame();
		}
	}

	#requestAnimationFrame()
	{
		window.requestAnimationFrame(this.#loop.bind(this));
	}

	#update(timeStamp)
	{
		this.#board.update(timeStamp);
	}

	addScore(points)
	{
		this.#score += points;
	}

	isStillRunning()
	{
		return !(this.wonTheGame() || this.#lostTheGame());
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

	wonTheGame()
	{
		return this.#board.destroyedAllBricks();
	}

	#lostTheGame()
	{
		return this.#board.getPaddle().lostAllLives();
	}

	#draw()
	{
		this.#context.clearRect(0, 0, this.#size.x, this.#size.y);
		this.#drawBG(0, GAME_HUD_HEIGHT, GAME_HUD_FILL_STYLE);
		this.#drawBG(GAME_HUD_HEIGHT, this.#size.y - GAME_HUD_HEIGHT, GAME_BG_FILL_STYLE);
		this.#board.draw();
		this.#ui.draw(this.#context);
	}

	#drawBG(y, height, fillStyle)
	{
		this.#context.fillStyle = fillStyle;

		this.#context.fillRect(0, y, this.#size.x, height);
	}

	#onKeyDown(e)
	{
		if(!this.isStillRunning() && e.key === GAME_REFRESH_KEY)
		{
			document.location.reload();
		}
	}
}