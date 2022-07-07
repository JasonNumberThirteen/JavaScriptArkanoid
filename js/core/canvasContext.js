class CanvasContext
{
	#context;
	#renderer;

	constructor(board)
	{
		this.#init(board);
		this.#setCanvasSize();
		this.#setContextValues();
		this.#initRenderer(board);
	}

	draw()
	{
		this.#context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
		this.#renderer.draw();
	}

	#init()
	{
		this.#context = document.getElementById("gameWindow").getContext("2d");
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

	#initRenderer(board)
	{
		this.#renderer = new Renderer(this.#context, board);
	}
}