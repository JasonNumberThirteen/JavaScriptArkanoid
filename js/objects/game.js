class Game
{
	#board;
	#gameManager;
	#context;
	#input;
	#time;

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

	time()
	{
		return this.#time;
	}

	#init()
	{
		this.#board = new Board();
		this.#gameManager = new GameManager(this.#board);
		this.#context = new CanvasContext(this.#board);
		this.#input = new PlayerInput(this.#board.getPaddle());
	}
	
	#requestAnimationFrame()
	{
		if(this.isRunning())
		{
			window.requestAnimationFrame(this.#loop.bind(this));
		}
	}

	#loop(timeStamp)
	{
		this.#updateTime(timeStamp);
		this.#board.update(timeStamp);
		this.#context.draw();
		this.#requestAnimationFrame();
	}

	#updateTime(timeStamp)
	{
		this.#time = timeStamp;
	}
}