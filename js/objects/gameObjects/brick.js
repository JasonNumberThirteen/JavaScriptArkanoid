class Brick extends GameObject
{
	#renderer;
	#collider;
	#fillStyle;
	#health;
	#points;

	constructor(position, values)
	{
		super(position);

		this.#renderer = new BrickRenderer(this);
		this.#collider = new BrickCollider(this);
		this.#fillStyle = values.fillStyle || "#000";
		this.#health = new Counter(values.health || 1);
		this.#points = new Counter(values.points || 0);
	}

	draw(context)
	{
		this.#renderer.draw(context);
	}

	onBallHit(ball)
	{
		this.#collider.onBallHit(ball);
	}

	takeDamage()
	{
		this.#health.decreaseBy(1);

		if(!this.isAlive())
		{
			this.#onDestroy();
		}
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

	#onDestroy()
	{
		const gameManager = GameInstance.getGameManager();

		gameManager.addScore(this.getPoints());
		gameManager.onBrickDestroy();
	}
}