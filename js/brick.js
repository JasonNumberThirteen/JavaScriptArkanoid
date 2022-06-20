class Brick
{
	#position;
	#health;
	#fillStyle;

	constructor(position, health, fillStyle)
	{
		this.#position = position;
		this.#health = health;
		this.#fillStyle = fillStyle;
	}

	draw(context)
	{
		context.fillStyle = this.#fillStyle;

		context.fillRect(this.#position.x, this.#position.y, GAME_BRICK_WIDTH, GAME_BRICK_HEIGHT);

		context.fillStyle = "#000";

		context.strokeRect(this.#position.x, this.#position.y, GAME_BRICK_WIDTH, GAME_BRICK_HEIGHT);
	}

	isAlive()
	{
		return this.#health > 0;
	}

	getPosition()
	{
		return this.#position;
	}
}