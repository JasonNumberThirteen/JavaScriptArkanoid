class Brick
{
	#position;
	#health;

	constructor(position, health)
	{
		this.#position = position;
		this.#health = health;
	}

	draw(context)
	{
		context.fillStyle = "#46f";

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