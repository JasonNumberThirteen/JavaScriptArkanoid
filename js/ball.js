class Ball
{
	#x;
	#y;
	#radius;
	#movementDirectionX = 1;
	#movementDirectionY = -1;
	#movementSpeed = 1;
	
	constructor(radius, gameWidth, gameHeight)
	{
		this.#x = gameWidth >> 1;
		this.#y = gameHeight >> 1;
		this.#radius = radius;
	}

	update()
	{
		this.#x += this.#movementSpeed*this.#movementDirectionX;
		this.#y += this.#movementSpeed*this.#movementDirectionY;
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