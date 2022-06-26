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
		for (let y = 1; y <= GAME_BRICKS.length; ++y)
		{
			for (let x = 1; x <= GAME_BRICKS_IN_ROW; ++x)
			{
				const values = GAME_BRICKS[y - 1];
				const brickX = GAME_BRICK_WIDTH + GAME_BRICK_GAP_X;
				const brickY = GAME_BRICK_HEIGHT + GAME_BRICK_GAP_Y;
				const position = new Point(brickX*x, GAME_HUD_HEIGHT + brickY*y);
				const brick = new Brick(position, values);
				
				this.#bricks.push(brick);
			}
		}
	}

	#loop(timeStamp)
	{
		this.#update(timeStamp);
		this.#draw();

		if(this.#isStillRunning())
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

	#isStillRunning()
	{
		return !(this.#wonTheGame() || this.#lostTheGame());
	}

	#wonTheGame()
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
		this.#drawBG();
		this.#bricks.forEach(e => e.draw(this.#context));

		if(this.#isStillRunning())
		{
			this.#paddle.draw(this.#context);
			this.#ball.draw(this.#context);
		}
		else
		{
			this.#drawGameEndText();
			this.#drawRefreshTipText();
		}

		this.#drawCounters();
	}

	#drawBG()
	{
		this.#context.fillStyle = GAME_HUD_FILL_STYLE;

		this.#context.fillRect(0, 0, this.#size.x, GAME_HUD_HEIGHT);
		
		this.#context.fillStyle = GAME_BG_FILL_STYLE;

		this.#context.fillRect(0, GAME_HUD_HEIGHT, this.#size.x, this.#size.y - GAME_HUD_HEIGHT);
	}

	#drawCounters()
	{
		const scoreTextPosition = new Point(GAME_HUD_TEXTS_OFFSET_X, GAME_HUD_TEXTS_Y);
		const scoreCounterPosition = new Point(scoreTextPosition.x + GAME_HUD_COUNTERS_OFFSET, scoreTextPosition.y + GAME_HUD_COUNTERS_OFFSET);
		const livesTextPosition = new Point(this.#size.x - GAME_HUD_TEXTS_OFFSET_X, GAME_HUD_TEXTS_Y);
		const livesCounterPosition = new Point(livesTextPosition.x - GAME_HUD_COUNTERS_OFFSET, livesTextPosition.y + GAME_HUD_COUNTERS_OFFSET);

		this.#context.fillStyle = GAME_HUD_TEXTS_FILL_STYLE;
		this.#context.textAlign = "left";

		this.#context.fillText(GAME_SCORE_TEXT, scoreTextPosition.x, scoreTextPosition.y);

		this.#context.fillStyle = GAME_HUD_COUNTERS_FILL_STYLE;

		this.#context.fillText(this.#score, scoreCounterPosition.x, scoreCounterPosition.y);

		this.#context.fillStyle = GAME_HUD_TEXTS_FILL_STYLE;
		this.#context.textAlign = "right";

		this.#context.fillText(GAME_LIVES_TEXT, livesTextPosition.x, livesTextPosition.y);

		this.#context.fillStyle = GAME_HUD_COUNTERS_FILL_STYLE;

		this.#context.fillText(this.#paddle.getLives(), livesCounterPosition.x, livesCounterPosition.y);
	}

	#drawGameEndText()
	{
		const wonTheGame = this.#wonTheGame();
		const endText = (wonTheGame) ? GAME_YOU_WIN_TEXT : GAME_GAME_OVER_TEXT;
		const endTextFillStyle = (wonTheGame) ? GAME_YOU_WIN_TEXT_FILL_STYLE : GAME_GAME_OVER_FILL_STYLE;
		
		this.#context.fillStyle = endTextFillStyle;
		this.#context.textAlign = "center";

		this.#context.fillText(endText, this.#size.x >> 1, (this.#size.y + GAME_HUD_HEIGHT) >> 1);
	}

	#drawRefreshTipText()
	{
		this.#context.fillStyle = GAME_REFRESH_TIP_FILL_STYLE;
		this.#context.textAlign = "center";

		this.#context.fillText(GAME_REFRESH_TIP_TEXT, this.#size.x >> 1, this.#size.y - 16);
	}

	#onKeyDown(e)
	{
		const key = e.key;

		if(!this.#isStillRunning() && key === GAME_REFRESH_KEY)
		{
			document.location.reload();
		}
	}
}