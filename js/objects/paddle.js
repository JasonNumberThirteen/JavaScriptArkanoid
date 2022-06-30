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

		this.#addEventListeners();
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
		const oldDirection = this.getMovementDirection();
		const newDirection = new Point((value) ? -1 : 0, oldDirection.y);
		
		this.setMovementDirection(newDirection);
	}

	setMovingRightState(value)
	{
		const oldDirection = this.getMovementDirection();
		const newDirection = new Point((value) ? 1 : 0, oldDirection.y);
		
		this.setMovementDirection(newDirection);
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