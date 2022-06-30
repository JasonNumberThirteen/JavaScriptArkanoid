class GameObject
{
	#position;

	constructor(position)
	{
		this.setPosition(position);
	}

	setPosition(position)
	{
		this.#position = position;
	}

	getPosition()
	{
		return this.#position;
	}
}