class Ball
{
	#position;
	#radius;
	#gameSize;
	#movementDirection;
	#movementSpeed;
	#waitTime;
	
	constructor(radius, gameSize)
	{
		this.#radius = radius;
		this.#gameSize = gameSize;
		
		this.#setInitialState();
	}

	update(timeStamp)
	{
		if(this.#canMove(timeStamp))
		{
			this.#move();
	
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

	getPosition()
	{
		return this.#position;
	}

	deflectFromPaddle()
	{
		this.deflectInYAxis();
		this.#accelerate();
	}

	deflectInXAxis()
	{
		this.#movementDirection.x = -this.#movementDirection.x;
	}

	deflectInYAxis()
	{
		this.#movementDirection.y = -this.#movementDirection.y;
	}

	#setInitialState(timeStamp)
	{
		const x = this.#gameSize.x >> 1;
		const y = this.#gameSize.y - GAME_PADDLE_HEIGHT - GAME_PADDLE_OFFSET_FROM_BOTTOM - GAME_BALL_OFFSET_FROM_PADDLE;
		const waitTimeOffset = timeStamp || 0;

		this.#position = new Point(x, y);
		this.#movementDirection = new Point(this.#randomInitialDirectionX(), GAME_BALL_INITIAL_MOVEMENT_DIRECTION_Y);
		this.#waitTime = GAME_BALL_WAIT_TIME_IN_MS + waitTimeOffset;
		this.#movementSpeed = GAME_BALL_MOVEMENT_SPEED;
	}

	#randomInitialDirectionX()
	{
		return (Math.random() > 0.5) ? -1 : 1;
	}

	#canMove(timeStamp)
	{
		return timeStamp > this.#waitTime;
	}

	#move()
	{
		this.#position.x += this.#movementSpeed*this.#movementDirection.x;
		this.#position.y += this.#movementSpeed*this.#movementDirection.y;
	}

	#touchesLeftOrRightEdge()
	{
		return this.#touchesLeftEdge() || this.#touchesRightEdge();
	}

	#touchesLeftEdge()
	{
		return this.#position.x < this.#radius;
	}

	#touchesRightEdge()
	{
		return this.#position.x > this.#gameSize.x - this.#radius;
	}

	#touchesTopEdge()
	{
		return this.#position.y < this.#radius + GAME_HUD_HEIGHT;
	}

	#hasFallen()
	{
		return this.#position.y > this.#gameSize.y + this.#radius;
	}

	#accelerate()
	{
		this.#movementSpeed += GAME_BALL_MOVEMENT_SPEED_GROWTH_PER_PADDLE_DEFLECT;

		if(this.#movementSpeed > GAME_BALL_MAX_MOVEMENT_SPEED)
		{
			this.#movementSpeed = GAME_BALL_MAX_MOVEMENT_SPEED;
		}
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
		context.beginPath();
		context.arc(this.#position.x, this.#position.y, this.#radius, 0, Math.PI << 1);
		context.closePath();
	}
}