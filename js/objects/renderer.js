class Renderer
{
	#board;
	#ui;

	constructor(game, board)
	{
		this.#init(game, board);
	}

	draw(context)
	{
		this.#drawBG(context, 0, GAME_HUD_HEIGHT, GAME_HUD_FILL_STYLE);
		this.#drawBG(context, GAME_HUD_HEIGHT, GAME_HEIGHT - GAME_HUD_HEIGHT, GAME_BG_FILL_STYLE);
		this.#getDrawables().forEach(e => e.draw(context));
	}

	#init(game, board)
	{
		this.#board = board;
		this.#ui = new UI(game);
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