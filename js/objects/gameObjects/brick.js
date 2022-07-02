class Brick extends GameObject
{
	#renderer;
	#fillStyle;
	#health;
	#points;

	constructor(position, values)
	{
		super(position);

		this.#renderer = new BrickRenderer(this);
		this.#fillStyle = values.fillStyle || "#000";
		this.#health = new Counter(values.health || 1);
		this.#points = new Counter(values.points || 0);
	}

	draw(context)
	{
		this.#renderer.draw(context);
	}

	takeDamage()
	{
		this.#health.decreaseBy(1);
	}

	isAlive()
	{
		return this.#health.getValue() > 0;
	}

	getFillStyle()
	{
		return this.#fillStyle;
	}

	getPoints()
	{
		return this.#points.getValue();
	}
}