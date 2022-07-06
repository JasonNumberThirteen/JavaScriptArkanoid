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
}