let GameInstance;

function initGame()
{
	GameInstance = new Game();
}

class Game
{
	#context;

	constructor()
	{
		const canvas = document.getElementById("gameWindow");

		this.#context = canvas.getContext("2d");
		this.#context.fillStyle = "#cccccc";

		this.#context.fillRect(0, 0, 256, 144);
	}
}