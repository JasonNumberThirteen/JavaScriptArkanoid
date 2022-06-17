class Ball
{
	#x;
	#y;
	#radius;
	#gameWidth;
	#gameHeight;
	#movementDirectionX = GAME_BALL_INITIAL_MOVEMENT_DIRECTION_X;
	#movementDirectionY = GAME_BALL_INITIAL_MOVEMENT_DIRECTION_Y;
	#movementSpeed = GAME_BALL_MOVEMENT_SPEED;
	
	constructor(radius, gameWidth, gameHeight)
	{
		this.#x = gameWidth >> 1;
		this.#y = gameHeight - GAME_PADDLE_HEIGHT - GAME_PADDLE_OFFSET_FROM_BOTTOM - 16;
		this.#radius = radius;
		this.#gameWidth = gameWidth;
		this.#gameHeight = gameHeight;
	}

	update()
	{
		this.#x += this.#movementSpeed*this.#movementDirectionX;
		this.#y += this.#movementSpeed*this.#movementDirectionY;

		if(this.#x < this.#radius || this.#x > this.#gameWidth - this.#radius)
		{
			this.#movementDirectionX = -this.#movementDirectionX;
		}

		if(this.#y < this.#radius || this.#y > this.#gameHeight - this.#radius)
		{
			this.#movementDirectionY = -this.#movementDirectionY;
		}
	}

	draw(context)
	{
		const doubledPI = Math.PI << 1;
		
		context.fillStyle = GAME_BALL_FILL_STYLE;

		context.beginPath();
		context.arc(this.#x, this.#y, this.#radius, 0, doubledPI);
		context.closePath();
		context.fill();

		context.fillStyle = GAME_BALL_STROKE_FILL_STYLE;

		context.beginPath();
		context.arc(this.#x, this.#y, this.#radius, 0, doubledPI);
		context.closePath();
		context.stroke();
	}
}