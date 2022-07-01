class GameObject
{
	#position;

	constructor(position)
	{
		this.setPosition(position);
	}

	setPosition(position)
	{
		this.#position = position || new Point(0, 0);
	}

	getPosition()
	{
		return this.#position;
	}
}