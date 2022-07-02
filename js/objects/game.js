class Game
{
	#context;
	#board;
	#gameManager;

	constructor()
	{
		this.#init();
		this.#requestAnimationFrame();
	}

	getGameManager()
	{
		return this.#gameManager;
	}

	isRunning()
	{
		return !(this.#gameManager.wonTheGame() || this.#gameManager.lostTheGame());
	}

	#init()
	{
		this.#board = new Board(this);
		this.#gameManager = new GameManager(this.#board);
		this.#context = new CanvasContext(this, this.#board);
	}
	
	#requestAnimationFrame()
	{
		window.requestAnimationFrame(this.#loop.bind(this));
	}

	#loop(timeStamp)
	{
		this.#update(timeStamp);
		this.#context.draw();

		if(this.isRunning())
		{
			this.#requestAnimationFrame();
		}
	}

	#update(timeStamp)
	{
		this.#board.update(timeStamp);
	}
}