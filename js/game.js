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

		this.#requestAnimationFrame();
		document.addEventListener("keydown", this.#onKeyDown.bind(this), false);
	}

	onBallFall()
	{
		this.#paddle.loseLife();

		this.#running = !this.#paddle.lostAllLives();
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
		const paddlePosition = this.#paddle.getPosition();
		const ballPosition = this.#ball.getPosition();
		const paddleCollisionBox = new Point(paddlePosition.x + GAME_PADDLE_WIDTH, paddlePosition.y + GAME_PADDLE_HEIGHT);
		const xn = Math.max(paddlePosition.x, Math.min(ballPosition.x, paddleCollisionBox.x));
		const yn = Math.max(paddlePosition.y, Math.min(ballPosition.y, paddleCollisionBox.y));
		const dx = xn - ballPosition.x;
		const dy = yn - ballPosition.y;

		if(dx*dx + dy*dy <= GAME_BALL_RADIUS*GAME_BALL_RADIUS)
		{
			this.#ball.deflectFromPaddle();
		}
	}

	#draw()
	{
		this.#context.clearRect(0, 0, this.#size.x, this.#size.y);
		this.#drawBG();

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