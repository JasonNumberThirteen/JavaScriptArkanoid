class Game
{
	#context;
	#renderer;
	#score;
	#size;
	#board;
	#ui;

	constructor()
	{
		this.#init();
		this.#initRenderer();
		this.#setCanvasSize();
		this.#setContextValues();
		this.#requestAnimationFrame();
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
		this.#renderer.draw(this.#context);
		this.#ui.draw();
	}

	#init()
	{
		this.#context = document.getElementById("gameWindow").getContext("2d");
		this.#score = 0;
		this.#size = new Point(GAME_WIDTH, GAME_HEIGHT);
		this.#board = new Board(this);
		this.#ui = new UI(this, this.#context);
	}

	#initRenderer()
	{
		const renderers = [this.#board.getPaddle(), this.#board.getBall()];

		this.#board.getBricks().forEach(e => renderers.push(e));

		this.#renderer = new Renderer(renderers);
	}

	#setCanvasSize()
	{
		this.#context.canvas.width = GAME_WIDTH;
		this.#context.canvas.height = GAME_HEIGHT;
	}

	#setContextValues()
	{
		this.#context.font = GAME_FONT_SIZE + GAME_FONT_UNIT + " " + GAME_FONT;
		this.#context.lineWidth = GAME_WINDOW_SCALE;
	}
}