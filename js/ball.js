class Ball
{
	#position;
	#radius;
	#gameSize;
	#movementDirection;
	#movementSpeed = GAME_BALL_MOVEMENT_SPEED;
	#waitTime;
	
	constructor(radius, gameSize)
	{
		this.#radius = radius;
		this.#gameSize = gameSize;
		
		this.#setInitialState();
	}

	update(timeStamp)
	{
		if(timeStamp > this.#waitTime)
		{
			this.#position.x += this.#movementSpeed*this.#movementDirection.x;
			this.#position.y += this.#movementSpeed*this.#movementDirection.y;
	
			if(this.#position.x < this.#radius || this.#position.x > this.#gameSize.x - this.#radius)
			{
				this.#movementDirection.x = -this.#movementDirection.x;
			}
	
			if(this.#position.y < this.#radius)
			{
				this.#movementDirection.y = -this.#movementDirection.y;
			}
			else if(this.#position.y > this.#gameSize.y + this.#radius)
			{
				this.#setInitialState(timeStamp);
				GameInstance.onBallFall();
			}
		}
	}

	draw(context)
	{
		this.#drawArc(context, GAME_BALL_FILL_STYLE);
		context.fill();
		this.#drawArc(context, GAME_BALL_STROKE_FILL_STYLE);
		context.stroke();
	}

	#setInitialState(timeStamp)
	{
		const x = this.#gameSize.x >> 1;
		const y = this.#gameSize.y - GAME_PADDLE_HEIGHT - GAME_PADDLE_OFFSET_FROM_BOTTOM - GAME_BALL_OFFSET_FROM_PADDLE;
		const directionX = (Math.random() > 0.5) ? -1 : 1;
		const waitTimeOffset = timeStamp || 0;

		this.#position = new Point(x, y);
		this.#movementDirection = new Point(directionX, GAME_BALL_INITIAL_MOVEMENT_DIRECTION_Y);
		this.#waitTime = GAME_BALL_WAIT_TIME_IN_MS + waitTimeOffset;
	}

	#drawArc(context, fillStyle)
	{
		context.fillStyle = fillStyle;

		context.beginPath();
		context.arc(this.#position.x, this.#position.y, this.#radius, 0, Math.PI << 1);
		context.closePath();
	}
}