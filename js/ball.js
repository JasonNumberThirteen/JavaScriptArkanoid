class Ball
{
	#x;
	#y;
	#radius;
	#gameWidth;
	#gameHeight;
	#movementDirectionX = 1;
	#movementDirectionY = -1;
	#movementSpeed = 1;
	
	constructor(radius, gameWidth, gameHeight)
	{
		this.#x = gameWidth >> 1;
		this.#y = gameHeight >> 1;
		this.#radius = radius;
		this.#gameWidth = gameWidth;
		this.#gameHeight = gameHeight;
	}

	update()
	{
		this.#x += this.#movementSpeed*this.#movementDirectionX;
		this.#y += this.#movementSpeed*this.#movementDirectionY;

		if(this.#x < this.#radius || this.#x > this.#gameWidth - this.#radius)
		{
			this.#movementDirectionX = -this.#movementDirectionX;
		}

		if(this.#y < this.#radius || this.#y > this.#gameHeight - this.#radius)
		{
			this.#movementDirectionY = -this.#movementDirectionY;
		}
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