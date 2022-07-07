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
		this.#changeDirectionX(paddle);
		this.#accelerate();
	}

	deflect(object)
	{
		if(this.#hasHitARectangularObjectFromHorizontalSide(object))
		{
			this.deflectInXAxis();
		}
		else if(this.#hasHitARectangularObjectFromVerticalSide(object))
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

	#hasHitARectangularObjectFromHorizontalSide(object)
	{
		const ballPosition = this.getPosition();
		const objectPosition = object.getPosition();
		const objectCollisionBox = object.collisionBox();
		
		return ballPosition.x < objectPosition.x || ballPosition.x > objectCollisionBox.x && (ballPosition.y > objectPosition.y && ballPosition.y < objectCollisionBox.y);
	}

	#hasHitARectangularObjectFromVerticalSide(object)
	{
		const ballPosition = this.getPosition();
		const objectPosition = object.getPosition();
		const objectCollisionBox = object.collisionBox();
		
		return ballPosition.y > objectPosition.y || ballPosition.y < objectCollisionBox.y && (ballPosition.x > objectPosition.x && ballPosition.x < objectCollisionBox.x);
	}

	#changeDirectionX(paddle)
	{
		const paddleCenterX = paddle.getPosition().x + (GAME_PADDLE_WIDTH >> 1);
		let x = (this.getPosition().x - paddleCenterX) / GAME_PADDLE_WIDTH;
		const magnitude = Math.sqrt(x*x + 1);

		if(magnitude > Number.EPSILON)
		{
			x /= magnitude;
		}
		else
		{
			x = 0;
		}

		this.setMovementDirectionX(x);
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
		const waitTimeOffset = (typeof GameInstance !== "undefined") ? GameInstance.time() : 0;

		this.#waitTime = GAME_BALL_WAIT_TIME_IN_MS + waitTimeOffset;
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