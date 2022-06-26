let GameInstance;

function initGame()
{
	GameInstance = new Game();
}

class Game
{
	#context;
	#size;
	#paddle;
	#ball;
	#bricks = [];
	#score = 0;
	#ui;

	constructor()
	{
		const canvas = document.getElementById("gameWindow");
		const width = GAME_WIDTH;
		const height = GAME_HEIGHT;

		this.#context = canvas.getContext("2d");
		this.#context.canvas.width = width;
		this.#context.canvas.height = height;
		this.#context.font = GAME_FONT_SIZE + GAME_FONT_UNIT + " " + GAME_FONT;
		this.#context.lineWidth = GAME_WINDOW_SCALE;
		this.#size = new Point(width, height);
		this.#ui = new UI(this, this.#context);
		
		this.#createObjects();
		this.#requestAnimationFrame();
		document.addEventListener("keydown", this.#onKeyDown.bind(this), false);
	}

	onBallFall()
	{
		this.#paddle.loseLife();
	}

	#createObjects()
	{
		this.#paddle = new Paddle(this.#size);
		this.#ball = new Ball(GAME_BALL_RADIUS, this.#size);

		this.#createBricks();
	}

	#createBricks()
	{
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

	#loop(timeStamp)
	{
		this.#update(timeStamp);
		this.#draw();

		if(this.isStillRunning())
		{
			this.#requestAnimationFrame();
		}
	}

	#requestAnimationFrame()
	{
		window.requestAnimationFrame(this.#loop.bind(this));
	}

	#update(timeStamp)
	{
		this.#paddle.update();
		this.#ball.update(timeStamp);
		this.#checkCollisions();
	}

	#checkCollisions()
	{
		this.#checkCollisionBetweenPaddleAndBall();
		this.#bricks.forEach(e => this.#checkCollisionBetweenBrickAndBall(e));

		this.#bricks = this.#bricks.filter(e => e.isAlive());
	}

	#checkCollisionBetweenBrickAndBall(brick)
	{
		if(this.#rectangularObjectCollidesWithBall(brick, new Point(GAME_BRICK_WIDTH, GAME_BRICK_HEIGHT)))
		{
			this.#ball.deflect();
			brick.takeDamage();

			if(!brick.isAlive())
			{
				this.#score += brick.getPoints();
			}
		}
	}

	isStillRunning()
	{
		return !(this.wonTheGame() || this.#lostTheGame());
	}

	getScore()
	{
		return this.#score;
	}

	getSize()
	{
		return this.#size;
	}

	getPaddleLives()
	{
		return this.#paddle.getLives();
	}

	wonTheGame()
	{
		return this.#destroyedAllBricks();
	}

	#lostTheGame()
	{
		return this.#paddle.lostAllLives();
	}

	#destroyedAllBricks()
	{
		return this.#bricks.length === 0;
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

	#draw()
	{
		this.#context.clearRect(0, 0, this.#size.x, this.#size.y);
		this.#drawBG(0, GAME_HUD_HEIGHT, GAME_HUD_FILL_STYLE);
		this.#drawBG(GAME_HUD_HEIGHT, this.#size.y - GAME_HUD_HEIGHT, GAME_BG_FILL_STYLE);
		this.#bricks.forEach(e => e.draw(this.#context));

		if(this.isStillRunning())
		{
			this.#paddle.draw(this.#context);
			this.#ball.draw(this.#context);
		}

		this.#ui.draw(this.#context);
	}

	#drawBG(y, height, fillStyle)
	{
		this.#context.fillStyle = fillStyle;

		this.#context.fillRect(0, y, this.#size.x, height);
	}

	#onKeyDown(e)
	{
		if(!this.isStillRunning() && e.key === GAME_REFRESH_KEY)
		{
			document.location.reload();
		}
	}
}