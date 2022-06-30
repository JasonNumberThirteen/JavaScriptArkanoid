class Brick extends GameObject
{
	#fillStyle;
	#health;
	#points;

	constructor(position, values)
	{
		super(position);

		this.#fillStyle = values.fillStyle || "#000";
		this.#health = values.health || 1;
		this.#points = values.points || 0;
	}

	draw(context)
	{
		this.#drawRectangle(context);
		this.#drawStroke(context);
	}

	takeDamage()
	{
		--this.#health;
	}

	isAlive()
	{
		return this.#health > 0;
	}

	getPoints()
	{
		return this.#points;
	}

	#drawRectangle(context)
	{
		const position = this.getPosition();
		
		context.fillStyle = this.#fillStyle;

		context.fillRect(position.x, position.y, GAME_BRICK_WIDTH, GAME_BRICK_HEIGHT);
	}

	#drawStroke(context)
	{
		const position = this.getPosition();
		
		context.strokeStyle = GAME_BRICK_STROKE_FILL_STYLE;

		context.strokeRect(position.x, position.y, GAME_BRICK_WIDTH, GAME_BRICK_HEIGHT);
	}
}