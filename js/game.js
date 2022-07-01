class Game
{
	#context;
	#renderer;
	#size;
	#board;
	#gameManager;
	#ui;

	constructor()
	{
		this.#init();
		this.#setCanvasSize();
		this.#setContextValues();
		this.#requestAnimationFrame();
	}

	getGameManager()
	{
		return this.#gameManager;
	}

	getSize()
	{
		return this.#size;
	}

	isRunning()
	{
		return !(this.#gameManager.wonTheGame() || this.#gameManager.lostTheGame());
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
		this.#size = new Point(GAME_WIDTH, GAME_HEIGHT);
		this.#board = new Board(this);
		this.#gameManager = new GameManager(this.#board);
		this.#renderer = new Renderer(this.#board);
		this.#ui = new UI(this, this.#context);
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