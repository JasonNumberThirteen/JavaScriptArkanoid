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

	constructor()
	{
		const canvas = document.getElementById("gameWindow");
		const cbcr = canvas.getBoundingClientRect();

		this.#context = canvas.getContext("2d");
		this.#size = new Point(cbcr.width, cbcr.height);
		this.#paddle = new Paddle(new Point(GAME_PADDLE_WIDTH, GAME_PADDLE_HEIGHT), this.#size);
		this.#ball = new Ball(GAME_BALL_RADIUS, this.#size);

		window.requestAnimationFrame(this.#loop.bind(this));
	}

	onBallFall()
	{
		this.#paddle.loseLife();
	}

	#loop(timeStamp)
	{
		this.#update();
		this.#draw();
		window.requestAnimationFrame(this.#loop.bind(this));
	}

	#update()
	{
		this.#paddle.update();
		this.#ball.update();
	}

	#draw()
	{
		this.#context.clearRect(0, 0, this.#size.x, this.#size.y);
		this.#drawBG();
		this.#paddle.draw(this.#context);
		this.#ball.draw(this.#context);
	}

	#drawBG()
	{
		this.#context.fillStyle = GAME_BG_FILL_STYLE;

		this.#context.fillRect(0, 0, this.#size.x, this.#size.y);
	}
}