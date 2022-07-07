class BrickRenderer
{
	#brick;

	constructor(brick)
	{
		this.#brick = brick;
	}
	
	draw(context)
	{
		this.#drawRectangle(context);
		this.#drawStroke(context);
	}
	
	#drawRectangle(context)
	{
		const position = this.#brick.getPosition();
		
		context.fillStyle = this.#brick.getFillStyle();

		context.fillRect(position.x, position.y, GAME_BRICK_WIDTH, GAME_BRICK_HEIGHT);
	}

	#drawStroke(context)
	{
		const position = this.#brick.getPosition();
		
		context.strokeStyle = GAME_BRICK_STROKE_STYLE;

		context.strokeRect(position.x, position.y, GAME_BRICK_WIDTH, GAME_BRICK_HEIGHT);
	}
}