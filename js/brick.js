class Brick
{
	#position;
	#fillStyle;
	#health;
	#points;

	constructor(position, fillStyle, health, points)
	{
		this.#position = position;
		this.#fillStyle = fillStyle;
		this.#health = health;
		this.#points = points;
	}

	draw(context)
	{
		context.fillStyle = this.#fillStyle;

		context.fillRect(this.#position.x, this.#position.y, GAME_BRICK_WIDTH, GAME_BRICK_HEIGHT);

		context.strokeStyle = GAME_BRICK_STROKE_FILL_STYLE;

		context.strokeRect(this.#position.x, this.#position.y, GAME_BRICK_WIDTH, GAME_BRICK_HEIGHT);
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
}