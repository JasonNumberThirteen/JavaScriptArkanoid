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

	constructor()
	{
		const canvas = document.getElementById("gameWindow");
		const cbcr = canvas.getBoundingClientRect();

		this.#context = canvas.getContext("2d");
		this.#context.fillStyle = "#cccccc";
		this.#width = cbcr.width;
		this.#height = cbcr.height;

		this.#context.fillRect(0, 0, this.#width, this.#height);
	}
}