class Renderer
{
	#context;
	#board;
	#ui;

	constructor(board, context)
	{
		this.#init(board, context);
	}

	draw()
	{
		this.#drawBG(this.#context, 0, GAME_HUD_HEIGHT, GAME_HUD_FILL_STYLE);
		this.#drawBG(this.#context, GAME_HUD_HEIGHT, GAME_HEIGHT - GAME_HUD_HEIGHT, GAME_BG_FILL_STYLE);
		this.#getDrawables().forEach(e => e.draw(this.#context));
	}

	#init(board, context)
	{
		this.#context = context;
		this.#board = board;
		this.#ui = new UI(this.#context);
	}

	#drawBG(context, y, height, fillStyle)
	{
		context.fillStyle = fillStyle;

		context.fillRect(0, y, GAME_WIDTH, height);
	}

	#getDrawables()
	{
		const drawables = [this.#board.getPaddle(), this.#board.getBall(), this.#ui];

		this.#board.getBricks().forEach(e => drawables.push(e));

		return drawables;
	}
}