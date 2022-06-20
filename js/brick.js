class Brick
{
	#position;
	#health;

	constructor(position, health)
	{
		this.#position = position;
		this.#health = health;
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