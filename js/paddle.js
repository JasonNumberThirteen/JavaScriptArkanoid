class Paddle
{
	#position;
	#size;
	#gameWidth;
	#input;
	#movementSpeed = GAME_PADDLE_MOVEMENT_SPEED;
	#movementDirection = new Point(0, 0);
	#lives = GAME_PADDLE_LIVES;

	constructor(gameSize)
	{
		const size = new Point(GAME_PADDLE_WIDTH, GAME_PADDLE_HEIGHT);
		const x = (gameSize.x - size.x) >> 1;
		const y = gameSize.y - size.y - GAME_PADDLE_OFFSET_FROM_BOTTOM;

		this.#position = new Point(x, y);
		this.#size = size;
		this.#gameWidth = gameSize.x;
		this.#input = new PlayerInput(this);

		this.#addEventListeners();
	}
	
	update()
	{
		if(this.#position.x >= 0 && this.#position.x <= this.#gameWidth - this.#size.x)
		{
			this.#position.x += this.#movementSpeed*this.#movementDirection.x;

			if(this.#position.x < 0)
			{
				this.#position.x = 0;
			}
			else if(this.#position.x >= this.#gameWidth - this.#size.x)
			{
				this.#position.x = this.#gameWidth - this.#size.x;
			}
		}
	}

	draw(context)
	{
		context.fillStyle = GAME_PADDLE_FILL_STYLE;

		context.fillRect(this.#position.x, this.#position.y, this.#size.x, this.#size.y);
	}

	setMovingLeftState(value)
	{
		this.#movementDirection.x = (value) ? -1 : 0;
	}

	setMovingRightState(value)
	{
		this.#movementDirection.x = (value) ? 1 : 0;
	}

	getPosition()
	{
		return this.#position;
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

	#addEventListeners()
	{
		document.addEventListener("keydown", this.#input.onKeyDown.bind(this.#input), false);
		document.addEventListener("keyup", this.#input.onKeyUp.bind(this.#input), false);
	}
}