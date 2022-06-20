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

		context.fillRect(this.#position.x, this.#position.y, 16, 4);

		context.fillStyle = "#000";

		context.strokeRect(this.#position.x, this.#position.y, 16, 4);
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