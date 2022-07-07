class Counter
{
	#value;

	constructor(value)
	{
		this.#value = value;
	}

	increaseBy(n)
	{
		this.#value += n;
	}

	decreaseBy(n)
	{
		this.#value -= n;
	}

	getValue()
	{
		return this.#value;
	}
}