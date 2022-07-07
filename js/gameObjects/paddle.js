class Paddle extends MovableObject
{
	#renderer;
	#collider;
	#health;

	constructor()
	{
		const x = (GAME_WIDTH - GAME_PADDLE_WIDTH) >> 1;
		const y = GAME_HEIGHT - GAME_PADDLE_HEIGHT - GAME_PADDLE_OFFSET_FROM_BOTTOM;

		super(new Point(x, y), GAME_PADDLE_MOVEMENT_SPEED);
		this.#init();
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

	onBallHit(ball)
	{
		this.#collider.onBallHit(ball);
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

	getSize()
	{
		return this.#collider.getSize();
	}

	getCollisionBox()
	{
		return this.#collider.getCollisionBox();
	}

	#init()
	{
		this.#renderer = new PaddleRenderer(this);
		this.#collider = new PaddleCollider(this);
		this.#health = new Counter(GAME_PADDLE_LIVES);
	}
}