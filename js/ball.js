class Ball
{
	#position;
	#radius;
	#gameSize;
	#movementDirection;
	#movementSpeed = GAME_BALL_MOVEMENT_SPEED;
	
	constructor(radius, gameSize)
	{
		const x = gameSize.x >> 1;
		const y = gameSize.y - GAME_PADDLE_HEIGHT - GAME_PADDLE_OFFSET_FROM_BOTTOM - GAME_BALL_OFFSET_FROM_PADDLE;

		this.#position = new Point(x, y);
		this.#radius = radius;
		this.#gameSize = gameSize;
		this.#movementDirection = new Point(GAME_BALL_INITIAL_MOVEMENT_DIRECTION_X, GAME_BALL_INITIAL_MOVEMENT_DIRECTION_Y);
	}

	update()
	{
		this.#position.x += this.#movementSpeed*this.#movementDirection.x;
		this.#position.y += this.#movementSpeed*this.#movementDirection.y;

		if(this.#position.x < this.#radius || this.#position.x > this.#gameSize.x - this.#radius)
		{
			this.#movementDirection.x = -this.#movementDirection.x;
		}

		if(this.#position.y < this.#radius || this.#position.y > this.#gameSize.y - this.#radius)
		{
			this.#movementDirection.y = -this.#movementDirection.y;
		}
	}

	draw(context)
	{
		this.#drawArc(context, GAME_BALL_FILL_STYLE);
		context.fill();
		this.#drawArc(context, GAME_BALL_STROKE_FILL_STYLE);
		context.stroke();
	}

	#drawArc(context, fillStyle)
	{
		context.fillStyle = fillStyle;

		context.beginPath();
		context.arc(this.#position.x, this.#position.y, this.#radius, 0, Math.PI << 1);
		context.closePath();
	}
}