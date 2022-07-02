class Renderer
{
	#board;
	#paddle;
	#ball;
	#ui;

	constructor(game, board, context)
	{
		this.#board = board;
		this.#paddle = this.#board.getPaddle();
		this.#ball = this.#board.getBall();
		this.#ui = new UI(game, context);
	}

	draw(context)
	{
		this.#drawBG(context, 0, GAME_HUD_HEIGHT, GAME_HUD_FILL_STYLE);
		this.#drawBG(context, GAME_HUD_HEIGHT, GAME_HEIGHT - GAME_HUD_HEIGHT, GAME_BG_FILL_STYLE);
		this.#paddle.draw(context);
		this.#ball.draw(context);
		this.#board.getBricks().forEach(e => e.draw(context));
		this.#ui.draw();
	}

	#drawBG(context, y, height, fillStyle)
	{
		context.fillStyle = fillStyle;

		context.fillRect(0, y, GAME_WIDTH, height);
	}
}