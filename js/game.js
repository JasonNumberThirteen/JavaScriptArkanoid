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

	constructor()
	{
		const canvas = document.getElementById("gameWindow");
		const cbcr = canvas.getBoundingClientRect();

		this.#context = canvas.getContext("2d");
		this.#width = cbcr.width;
		this.#height = cbcr.height;
		this.#paddle = new Paddle(32, 4, this.#width, this.#height);

		window.requestAnimationFrame(this.loop.bind(this));
	}

	loop(timeStamp)
	{
		this.#draw();
		window.requestAnimationFrame(this.loop.bind(this));
	}

	#draw()
	{
		this.#context.clearRect(0, 0, this.#width, this.#height);
		this.#drawBG();
		this.#paddle.draw(this.#context);
	}

	#drawBG()
	{
		this.#context.fillStyle = "#cccccc";

		this.#context.fillRect(0, 0, this.#width, this.#height);
	}
}