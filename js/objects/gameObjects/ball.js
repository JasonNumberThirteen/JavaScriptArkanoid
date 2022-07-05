class Ball extends MovableObject
{
	#renderer;
	#collider;
	#trigger;
	#waitTime;
	
	constructor()
	{
		super();
		this.#init();
		this.setInitialState();
	}

	update()
	{
		if(this.#canMove())
		{
			this.move();
			this.#collider.checkCollision();
			this.#trigger.checkTrigger();
		}
	}

	draw(context)
	{
		this.#renderer.draw(context);
	}

	deflectFromPaddle()
	{
		this.deflectInYAxis();
		this.#accelerate();
	}

	deflectInXAxis()
	{
		this.setMovementDirectionX(-this.getMovementDirectionX());
	}

	deflectInYAxis()
	{
		this.setMovementDirectionY(-this.getMovementDirectionY());
	}

	setInitialState()
	{
		const x = GAME_WIDTH >> 1;
		const y = GAME_HEIGHT - GAME_PADDLE_HEIGHT - GAME_PADDLE_OFFSET_FROM_BOTTOM - GAME_BALL_OFFSET_FROM_PADDLE;
		const waitTimeOffset = (typeof GameInstance !== "undefined") ? GameInstance.time() : 0;

		this.setPosition(new Point(x, y));
		this.setMovementDirection(new Point(this.#randomInitialDirectionX(), GAME_BALL_INITIAL_MOVEMENT_DIRECTION_Y));
		this.setMovementSpeed(GAME_BALL_MOVEMENT_SPEED);

		this.#waitTime = GAME_BALL_WAIT_TIME_IN_MS + waitTimeOffset;
	}

	#init()
	{
		this.#renderer = new BallRenderer(this);
		this.#collider = new BallCollider(this);
		this.#trigger = new BallTrigger(this);
	}

	#randomInitialDirectionX()
	{
		return (Math.random() > 0.5) ? -1 : 1;
	}

	#canMove()
	{
		return GameInstance.time() > this.#waitTime;
	}

	#accelerate()
	{
		const increasedSpeed = this.getMovementSpeed() + GAME_BALL_MOVEMENT_SPEED_GROWTH_PER_PADDLE_DEFLECT;
		const clampedSpeed = clamp(GAME_BALL_MOVEMENT_SPEED, increasedSpeed, GAME_BALL_MAX_MOVEMENT_SPEED);

		this.setMovementSpeed(clampedSpeed);
	}
}