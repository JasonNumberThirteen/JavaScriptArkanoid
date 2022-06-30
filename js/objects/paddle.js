class Paddle extends MovableObject
{
	#size;
	#gameWidth;
	#input;
	#lives = GAME_PADDLE_LIVES;

	constructor(gameSize)
	{
		const size = new Point(GAME_PADDLE_WIDTH, GAME_PADDLE_HEIGHT);
		const x = (gameSize.x - size.x) >> 1;
		const y = gameSize.y - size.y - GAME_PADDLE_OFFSET_FROM_BOTTOM;

		super(new Point(x, y), GAME_PADDLE_MOVEMENT_SPEED);

		this.#size = size;
		this.#gameWidth = gameSize.x;
		this.#input = new PlayerInput(this);
	}
	
	update()
	{
		this.move();
	}

	draw(context)
	{
		const position = this.getPosition();
		
		context.fillStyle = GAME_PADDLE_FILL_STYLE;

		context.fillRect(position.x, position.y, this.#size.x, this.#size.y);
	}

	setMovingLeftState(value)
	{
		this.setMovementDirectionX((value) ? -1 : 0);
	}

	setMovingRightState(value)
	{
		this.setMovementDirectionX((value) ? 1 : 0);
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
}