class Brick
{
	#position;
	#fillStyle;
	#health;
	#points;

	constructor(position, values)
	{
		this.#position = position;
		this.#fillStyle = values.fillStyle;
		this.#health = values.health;
		this.#points = values.points;
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

	getPosition()
	{
		return this.#position;
	}

	getPoints()
	{
		return this.#points;
	}

	#drawRectangle(context)
	{
		context.fillStyle = this.#fillStyle;

		context.fillRect(this.#position.x, this.#position.y, GAME_BRICK_WIDTH, GAME_BRICK_HEIGHT);
	}

	#drawStroke(context)
	{
		context.strokeStyle = GAME_BRICK_STROKE_FILL_STYLE;

		context.strokeRect(this.#position.x, this.#position.y, GAME_BRICK_WIDTH, GAME_BRICK_HEIGHT);
	}
}