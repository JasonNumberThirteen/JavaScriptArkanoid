class BoxCollider
{
	#object;
	#size;

	constructor(object, size)
	{
		this.#object = object;
		this.#size = size;
	}

	getObject()
	{
		return this.#object;
	}

	getSize()
	{
		return this.#size;
	}

	getCollisionBox()
	{
		const position = this.#object.getPosition();
		
		return new Point(position.x + this.#size.x, position.y + this.#size.y);
	}
}