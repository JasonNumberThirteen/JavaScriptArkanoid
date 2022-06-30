class Ball extends MovableObject
{
	#radius;
	#gameSize;
	#waitTime;
	
	constructor(radius, gameSize)
	{
		super();
		
		this.#radius = radius;
		this.#gameSize = gameSize;
		
		this.#setInitialState();
	}

	update(timeStamp)
	{
		if(this.#canMove(timeStamp))
		{
			this.move();
	
			if(this.#touchesLeftOrRightEdge())
			{
				this.deflectInXAxis();
			}
	
			if(this.#touchesTopEdge())
			{
				this.deflectInYAxis();
			}
			else if(this.#hasFallen())
			{
				this.#setInitialState(timeStamp);
				GameInstance.onBallFall();
			}
		}
	}

	draw(context)
	{
		this.#drawArc(context);
		this.#drawStroke(context);
	}

	deflectFromPaddle()
	{
		this.deflectInYAxis();
		this.#accelerate();
	}

	deflectInXAxis()
	{
		const oldDirection = this.getMovementDirection();
		const newDirection = new Point(-oldDirection.x, oldDirection.y);
		
		this.setMovementDirection(newDirection);
	}

	deflectInYAxis()
	{
		const oldDirection = this.getMovementDirection();
		const newDirection = new Point(oldDirection.x, -oldDirection.y);
		
		this.setMovementDirection(newDirection);
	}

	#setInitialState(timeStamp)
	{
		const x = this.#gameSize.x >> 1;
		const y = this.#gameSize.y - GAME_PADDLE_HEIGHT - GAME_PADDLE_OFFSET_FROM_BOTTOM - GAME_BALL_OFFSET_FROM_PADDLE;
		const waitTimeOffset = timeStamp || 0;

		this.setPosition(new Point(x, y));
		this.setMovementDirection(new Point(this.#randomInitialDirectionX(), GAME_BALL_INITIAL_MOVEMENT_DIRECTION_Y));
		this.setMovementSpeed(GAME_BALL_MOVEMENT_SPEED);

		this.#waitTime = GAME_BALL_WAIT_TIME_IN_MS + waitTimeOffset;
	}

	#randomInitialDirectionX()
	{
		return (Math.random() > 0.5) ? -1 : 1;
	}

	#canMove(timeStamp)
	{
		return timeStamp > this.#waitTime;
	}

	#touchesLeftOrRightEdge()
	{
		return this.#touchesLeftEdge() || this.#touchesRightEdge();
	}

	#touchesLeftEdge()
	{
		return this.getPosition().x < this.#radius;
	}

	#touchesRightEdge()
	{
		return this.getPosition().x > this.#gameSize.x - this.#radius;
	}

	#touchesTopEdge()
	{
		return this.getPosition().y < this.#radius + GAME_HUD_HEIGHT;
	}

	#hasFallen()
	{
		return this.getPosition().y > this.#gameSize.y + this.#radius;
	}

	#accelerate()
	{
		const increasedSpeed = this.getMovementSpeed() + GAME_BALL_MOVEMENT_SPEED_GROWTH_PER_PADDLE_DEFLECT;
		const clampedSpeed = clamp(GAME_BALL_MOVEMENT_SPEED, increasedSpeed, GAME_BALL_MAX_MOVEMENT_SPEED);

		this.setMovementSpeed(clampedSpeed);
	}

	#drawArc(context)
	{
		context.fillStyle = GAME_BALL_FILL_STYLE;
		
		this.#createArc(context);
		context.fill();
	}

	#drawStroke(context)
	{
		context.strokeStyle = GAME_BALL_STROKE_FILL_STYLE;

		this.#createArc(context);
		context.stroke();
	}

	#createArc(context)
	{
		const position = this.getPosition();
		
		context.beginPath();
		context.arc(position.x, position.y, this.#radius, 0, Math.PI << 1);
		context.closePath();
	}
}