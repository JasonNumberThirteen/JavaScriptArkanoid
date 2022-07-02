class Paddle extends MovableObject
{
	#renderer;
	#collider;
	#health;

	constructor()
	{
		const size = new Point(GAME_PADDLE_WIDTH, GAME_PADDLE_HEIGHT);
		const x = (GAME_WIDTH - size.x) >> 1;
		const y = GAME_HEIGHT - size.y - GAME_PADDLE_OFFSET_FROM_BOTTOM;

		super(new Point(x, y), GAME_PADDLE_MOVEMENT_SPEED);

		this.#renderer = new PaddleRenderer(this);
		this.#collider = new PaddleCollider(this);
		this.#health = new Counter(GAME_PADDLE_LIVES);

		const input = new PlayerInput(this);
	}
	
	update()
	{
		this.move();
		this.#collider.checkCollision();
	}

	draw(context)
	{
		this.#renderer.draw(context);
	}

	setMovingLeftState(value)
	{
		this.setMovementDirectionX((value) ? -1 : 0);
	}

	setMovingRightState(value)
	{
		this.setMovementDirectionX((value) ? 1 : 0);
	}

	getHealth()
	{
		return this.#health.getValue();
	}

	takeDamage()
	{
		this.#health.decreaseBy(1);
	}

	isAlive()
	{
		return this.getHealth() > 0;
	}

	rightEdgeX()
	{
		return GAME_WIDTH - GAME_PADDLE_WIDTH;
	}
}