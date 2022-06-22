let GameInstance;

function initGame()
{
	GameInstance = new Game();
}

class Game
{
	#context;
	#running = true;
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
		
		this.#size = new Point(width, height);
		this.#paddle = new Paddle(new Point(GAME_PADDLE_WIDTH, GAME_PADDLE_HEIGHT), this.#size);
		this.#ball = new Ball(GAME_BALL_RADIUS, this.#size);

		this.#createBricks();
		this.#requestAnimationFrame();
		document.addEventListener("keydown", this.#onKeyDown.bind(this), false);
	}

	onBallFall()
	{
		this.#paddle.loseLife();

		this.#running = !this.#paddle.lostAllLives();
	}

	#createBricks()
	{
		for (let y = 1; y <= GAME_BRICKS.length; ++y)
		{
			for (let x = 1; x <= 14; ++x)
			{
				const values = GAME_BRICKS[y - 1];
				const position = new Point(16*x, 6*y);
				const brick = new Brick(position, values.fillStyle, values.health, values.points);
				
				this.#bricks.push(brick);
			}
		}
	}

	#loop(timeStamp)
	{
		this.#update(timeStamp);
		this.#draw();

		if(this.#running)
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
		this.#bricks.forEach(e => {
			if(this.#rectangularObjectCollidesWithBall(e, new Point(GAME_BRICK_WIDTH, GAME_BRICK_HEIGHT)))
			{
				this.#ball.deflect();
				e.takeDamage();

				if(!e.isAlive())
				{
					this.#score += e.getPoints();
				}
			}
		});

		this.#bricks = this.#bricks.filter(e => e.isAlive());
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

		if(this.#running)
		{
			this.#paddle.draw(this.#context);
			this.#ball.draw(this.#context);
		}
		else
		{
			this.#drawGameOverText();
			this.#drawRefreshTipText();
		}
	}

	#drawBG()
	{
		this.#context.fillStyle = GAME_BG_FILL_STYLE;

		this.#context.fillRect(0, 0, this.#size.x, this.#size.y);
	}

	#drawGameOverText()
	{
		this.#context.fillStyle = GAME_GAME_OVER_FILL_STYLE;
		this.#context.textAlign = "center";

		this.#context.fillText(GAME_GAME_OVER_TEXT, this.#size.x >> 1, this.#size.y >> 1);
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

		if(!this.#running && key === GAME_REFRESH_KEY)
		{
			document.location.reload();
		}
	}
}