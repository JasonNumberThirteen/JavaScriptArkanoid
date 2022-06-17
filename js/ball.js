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
		const doubledPI = Math.PI << 1;
		
		context.fillStyle = "#42f2f2";

		context.beginPath();
		context.arc(this.#x, this.#y, this.#radius, 0, doubledPI);
		context.closePath();
		context.fill();

		context.fillStyle = "#000";

		context.beginPath();
		context.arc(this.#x, this.#y, this.#radius, 0, doubledPI);
		context.closePath();
		context.stroke();
	}
}