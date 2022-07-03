class CanvasContext
{
	#context;
	#renderer;

	constructor(game, board)
	{
		this.#init(game, board);
		this.#setCanvasSize();
		this.#setContextValues();
	}

	draw()
	{
		this.#context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
		this.#renderer.draw(this.#context);
	}

	#init(game, board)
	{
		this.#context = document.getElementById("gameWindow").getContext("2d");
		this.#renderer = new Renderer(game, board);
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