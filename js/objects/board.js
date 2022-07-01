class Board
{
	#game;
	#paddle;
	#ball;
	#bricks;
	#destroyedAnyBrick = false;

	constructor(game)
	{
		this.#game = game;

		this.#createObjects();
	}

	update(timeStamp)
	{
		this.#paddle.update();
		this.#ball.update(timeStamp);
		this.#checkCollisions();
		this.#filterAliveBricks();
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

	destroyedAllBricks()
	{
		return this.#bricks.length === 0;
	}

	#createObjects()
	{
		this.#paddle = new Paddle();
		this.#ball = new Ball();

		this.#createBricks();
	}

	#createBricks()
	{
		this.#bricks = [];
		
		for (let y = 0; y <= GAME_BRICKS.length - 1; ++y)
		{
			for (let x = 1; x <= GAME_BRICKS_IN_ROW; ++x)
			{
				const values = GAME_BRICKS[y];
				const baseX = GAME_BRICK_WIDTH + GAME_BRICK_GAP_X;
				const baseY = GAME_BRICK_HEIGHT + GAME_BRICK_GAP_Y;
				const offsetX = 15*GAME_WINDOW_SCALE;
				const offsetY = GAME_HUD_HEIGHT + GAME_BRICK_GAP_Y;
				const brickX = baseX*x - offsetX;
				const brickY = baseY*y + offsetY;
				const position = new Point(brickX, brickY);
				const brick = new Brick(position, values);
				
				this.#bricks.push(brick);
			}
		}
	}

	#checkCollisions()
	{
		this.#checkCollisionBetweenPaddleAndBall();
		this.#bricks.forEach(e => this.#checkCollisionBetweenBrickAndBall(e));
	}

	#checkCollisionBetweenBrickAndBall(brick)
	{
		if(this.#rectangularObjectCollidesWithBall(brick, new Point(GAME_BRICK_WIDTH, GAME_BRICK_HEIGHT)))
		{
			this.#ball.deflectInYAxis();
			brick.takeDamage();

			if(!brick.isAlive())
			{
				this.#game.getGameManager().addScore(brick.getPoints());

				this.#destroyedAnyBrick = true;
			}
		}
	}

	#checkCollisionBetweenPaddleAndBall()
	{
		if(this.#rectangularObjectCollidesWithBall(this.#paddle, new Point(GAME_PADDLE_WIDTH, GAME_PADDLE_HEIGHT)))
		{
			this.#ball.deflectFromPaddle();
		}
	}

	#rectangularObjectCollidesWithBall(ro, size)
	{
		const rectangularObjectPosition = ro.getPosition();
		const ballPosition = this.#ball.getPosition();
		const rectangularObjectCollisionBox = new Point(rectangularObjectPosition.x + size.x, rectangularObjectPosition.y + size.y);
		const xn = Math.max(rectangularObjectPosition.x, Math.min(ballPosition.x, rectangularObjectCollisionBox.x));
		const yn = Math.max(rectangularObjectPosition.y, Math.min(ballPosition.y, rectangularObjectCollisionBox.y));
		const dx = xn - ballPosition.x;
		const dy = yn - ballPosition.y;

		return dx*dx + dy*dy <= GAME_BALL_RADIUS*GAME_BALL_RADIUS;
	}

	#filterAliveBricks()
	{
		if(this.#destroyedAnyBrick)
		{
			this.#bricks = this.#bricks.filter(e => e.isAlive());

			this.#destroyedAnyBrick = false;
		}
	}
}