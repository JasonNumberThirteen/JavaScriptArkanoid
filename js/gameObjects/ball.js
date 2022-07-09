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

	checkCollisionWith(object, event)
	{
		this.#collider.checkCollisionWith(object, event);
	}

	deflectFromPaddle(paddle)
	{
		this.deflect(paddle);
		this.#accelerate();

		if(this.#collider.hasHitARectangularObjectFromVerticalSide(paddle))
		{
			this.#changeDirectionAfterPaddleHit(paddle);
		}
	}

	deflect(object)
	{
		if(this.#collider.hasHitARectangularObjectFromHorizontalSide(object))
		{
			this.deflectInXAxis();
		}
		else if(this.#collider.hasHitARectangularObjectFromVerticalSide(object))
		{
			this.deflectInYAxis();
		}
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
		this.#resetPosition();
		this.#resetWaitTime();
		this.setMovementDirectionX(randomSign());
		this.setMovementDirectionY(GAME_BALL_INITIAL_MOVEMENT_DIRECTION_Y);
		this.setMovementSpeed(GAME_BALL_MOVEMENT_SPEED);
	}

	#changeDirectionAfterPaddleHit(paddle)
	{
		const halfOfPaddleWidth = paddle.getSize().x >> 1;
		const paddleCenterX = paddle.getPosition().x + halfOfPaddleWidth;
		const x = (this.getPosition().x - paddleCenterX) / halfOfPaddleWidth;
		const direction = normalisedVector(new Point(x, 1));

		this.setMovementDirectionX(direction.x);
	}

	#init()
	{
		this.#renderer = new BallRenderer(this);
		this.#collider = new BallCollider(this);
		this.#trigger = new BallTrigger(this);
	}

	#resetPosition()
	{
		const x = GAME_WIDTH >> 1;
		const y = GAME_HEIGHT - GAME_PADDLE_HEIGHT - GAME_PADDLE_OFFSET_FROM_BOTTOM - GAME_BALL_OFFSET_FROM_PADDLE;
		
		this.setPosition(new Point(x, y));
	}

	#resetWaitTime()
	{
		const offset = (typeof GameInstance !== "undefined") ? GameInstance.time() : 0;

		this.#waitTime = GAME_BALL_WAIT_TIME_IN_MS + offset;
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