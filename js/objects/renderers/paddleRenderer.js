class PaddleRenderer
{
	#paddle;

	constructor(paddle)
	{
		this.#paddle = paddle;
	}
	
	draw(context)
	{
		const position = this.#paddle.getPosition();
		
		context.fillStyle = GAME_PADDLE_FILL_STYLE;

		context.fillRect(position.x, position.y, GAME_PADDLE_WIDTH, GAME_PADDLE_HEIGHT);
	}
}