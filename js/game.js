let GameInstance;

function initGame()
{
	GameInstance = new Game();
}

class Game
{
	#context;
	#width;
	#height;
	#paddle;
	#ball;

	constructor()
	{
		const canvas = document.getElementById("gameWindow");
		const cbcr = canvas.getBoundingClientRect();

		this.#context = canvas.getContext("2d");
		this.#width = cbcr.width;
		this.#height = cbcr.height;
		this.#paddle = new Paddle(GAME_PADDLE_WIDTH, GAME_PADDLE_HEIGHT, this.#width, this.#height);
		this.#ball = new Ball(GAME_BALL_RADIUS, this.#width, this.#height);

		window.requestAnimationFrame(this.#loop.bind(this));
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
		this.#context.clearRect(0, 0, this.#width, this.#height);
		this.#drawBG();
		this.#paddle.draw(this.#context);
		this.#ball.draw(this.#context);
	}

	#drawBG()
	{
		this.#context.fillStyle = GAME_BG_FILL_STYLE;

		this.#context.fillRect(0, 0, this.#width, this.#height);
	}
}