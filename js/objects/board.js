class Board
{
	#paddle;
	#ball;
	#bricks;

	constructor()
	{
		this.#init();
		this.#createBricks();
	}

	update()
	{
		this.#paddle.update();
		this.#ball.update();
		this.#checkCollisions();
	}

	getPaddle()
	{
		return this.#paddle;
	}

	getBall()
	{
		return this.#ball;
	}

	getBricks()
	{
		return this.#bricks;
	}

	filterAliveBricks()
	{
		this.#bricks = this.#bricks.filter(e => e.isAlive());
	}

	#init()
	{
		this.#paddle = new Paddle();
		this.#ball = new Ball();
		this.#bricks = [];
	}

	#createBricks()
	{
		for (let y = 0; y <= GAME_BRICKS.length - 1; ++y)
		{
			for (let x = 1; x <= GAME_BRICKS_IN_ROW; ++x)
			{
				this.#createBrick(x, y);
			}
		}
	}

	#createBrick(column, row)
	{
		const brick = new Brick(this.#brickPosition(column, row), GAME_BRICKS[row]);
		
		this.#bricks.push(brick);
	}

	#brickPosition(column, row)
	{
		const basePosition = new Point(GAME_BRICK_WIDTH + GAME_BRICK_GAP_X, GAME_BRICK_HEIGHT + GAME_BRICK_GAP_Y);
		const offset = new Point(15*GAME_WINDOW_SCALE, GAME_HUD_HEIGHT + GAME_BRICK_GAP_Y);
		
		return new Point(basePosition.x*column - offset.x, basePosition.y*row + offset.y);
	}

	#checkCollisions()
	{
		this.#ball.checkCollisionWith(this.#paddle, this.#paddle.onBallHit.bind(this.#paddle, this.#ball));
		this.#bricks.forEach(e => this.#ball.checkCollisionWith(e, e.onBallHit.bind(e, this.#ball)));
	}
}