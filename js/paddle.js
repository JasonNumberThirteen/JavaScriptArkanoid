class Paddle
{
	#position;
	#size;
	#gameWidth;
	#movementSpeed = GAME_PADDLE_MOVEMENT_SPEED;
	#movingLeft = false;
	#movingRight = false;
	#lives = GAME_PADDLE_LIVES;

	constructor(size, gameSize)
	{
		const x = (gameSize.x - size.x) >> 1;
		const y = gameSize.y - size.y - GAME_PADDLE_OFFSET_FROM_BOTTOM;

		this.#position = new Point(x, y);
		this.#size = size;
		this.#gameWidth = gameSize.x;

		document.addEventListener("keydown", this.#onKeyDown.bind(this), false);
		document.addEventListener("keyup", this.#onKeyUp.bind(this), false);
	}
	
	update()
	{
		if(this.#movingLeft && this.#position.x > 0)
		{
			this.#position.x -= this.#movementSpeed;
		}
		else if(this.#movingRight && this.#position.x < this.#gameWidth - this.#size.x)
		{
			this.#position.x += this.#movementSpeed;
		}
	}

	draw(context)
	{
		context.fillStyle = GAME_PADDLE_FILL_STYLE;

		context.fillRect(this.#position.x, this.#position.y, this.#size.x, this.#size.y);
	}

	loseLife()
	{
		--this.#lives;
	}

	lostAllLives()
	{
		return this.#lives <= 0;
	}

	#onKeyDown(e)
	{
		this.#setMovingStates(e.key, true);
	}

	#onKeyUp(e)
	{
		this.#setMovingStates(e.key, false);
	}

	#setMovingStates(key, value)
	{
		if(key === GAME_PADDLE_LEFT_MOVEMENT_A || key === GAME_PADDLE_LEFT_MOVEMENT_B)
		{
			this.#movingLeft = value;
		}
		else if(key === GAME_PADDLE_RIGHT_MOVEMENT_A || key === GAME_PADDLE_RIGHT_MOVEMENT_B)
		{
			this.#movingRight = value;
		}
	}
}