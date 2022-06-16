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

	#squareX = 0;
	#squareSize = 16;

	constructor()
	{
		const canvas = document.getElementById("gameWindow");
		const cbcr = canvas.getBoundingClientRect();

		this.#context = canvas.getContext("2d");
		this.#width = cbcr.width;
		this.#height = cbcr.height;

		window.requestAnimationFrame(this.loop.bind(this));
	}

	loop(timeStamp)
	{
		this.#draw();
		
		if(this.#squareX < this.#width - this.#squareSize)
		{
			window.requestAnimationFrame(this.loop.bind(this));
		}
	}

	#draw()
	{
		this.#context.clearRect(0, 0, this.#width, this.#height);

		this.#context.fillStyle = "#cccccc";

		this.#context.fillRect(0, 0, this.#width, this.#height);

		this.#context.fillStyle = "red";

		this.#context.fillRect(this.#squareX++, 0, this.#squareSize, this.#squareSize);
	}
}