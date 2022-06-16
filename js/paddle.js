class Paddle
{
	#x;
	#y;
	#width;
	#height;

	constructor(width, height, gameWidth, gameHeight)
	{
		const offsetFromBottom = 8;
		
		this.#x = (gameWidth - width) >> 1;
		this.#y = gameHeight - height - offsetFromBottom;
		this.#width = width;
		this.#height = height;
	}
	
	draw(context)
	{
		context.fillStyle = "#222222";

		context.fillRect(this.#x, this.#y, this.#width, this.#height);
	}
}