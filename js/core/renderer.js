class Renderer
{
	#context;
	#board;
	#ui;

	constructor(context, board)
	{
		this.#init(context, board);
	}

	draw()
	{
		this.#drawBG(0, GAME_HUD_HEIGHT, GAME_HUD_FILL_STYLE);
		this.#drawBG(GAME_HUD_HEIGHT, GAME_HEIGHT - GAME_HUD_HEIGHT, GAME_BG_FILL_STYLE);
		this.#getDrawables().forEach(e => e.draw(this.#context));
	}

	#init(context, board)
	{
		this.#context = context;
		this.#board = board;
		this.#ui = new UI(this.#context);
	}

	#drawBG(y, height, fillStyle)
	{
		this.#context.fillStyle = fillStyle;

		this.#context.fillRect(0, y, GAME_WIDTH, height);
	}

	#getDrawables()
	{
		const drawables = [this.#board.getPaddle(), this.#board.getBall(), this.#ui];

		this.#board.getBricks().forEach(e => drawables.push(e));

		return drawables;
	}
}