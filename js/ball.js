class Ball
{
	#x;
	#y;
	#radius;
	
	constructor(radius, gameWidth, gameHeight)
	{
		this.#x = gameWidth >> 1;
		this.#y = gameHeight >> 1;
		this.#radius = radius;
	}

	draw(context)
	{
		context.fillStyle = "#42f2f2";

		context.beginPath();
		context.arc(this.#x, this.#y, this.#radius, 0, Math.PI*2);
		context.closePath();
		context.fill();

		context.fillStyle = "#000";

		context.beginPath();
		context.arc(this.#x, this.#y, this.#radius, 0, Math.PI*2);
		context.closePath();
		context.stroke();
	}
}