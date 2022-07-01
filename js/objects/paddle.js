class Paddle extends MovableObject
{
	#renderer;
	#lives = GAME_PADDLE_LIVES;

	constructor(gameSize)
	{
		const size = new Point(GAME_PADDLE_WIDTH, GAME_PADDLE_HEIGHT);
		const x = (gameSize.x - size.x) >> 1;
		const y = gameSize.y - size.y - GAME_PADDLE_OFFSET_FROM_BOTTOM;

		super(new Point(x, y), GAME_PADDLE_MOVEMENT_SPEED);

		this.#renderer = new PaddleRenderer(this);

		const input = new PlayerInput(this);
	}
	
	update()
	{
		this.move();
	}

	isTouchingLeftEdge()
	{
		return this.getPosition().x < 0;
	}

	isTouchingRightEdge()
	{
		return this.getPosition().x > this.#rightEdgeX();
	}

	onLeftEdgeTouch()
	{
		this.getPosition().x = 0;
	}

	onRightEdgeTouch()
	{
		this.getPosition().x = this.#rightEdgeX();
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

	getLives()
	{
		return this.#lives;
	}

	loseLife()
	{
		--this.#lives;
	}

	lostAllLives()
	{
		return this.#lives <= 0;
	}

	#rightEdgeX()
	{
		return GAME_WIDTH - GAME_PADDLE_WIDTH;
	}
}