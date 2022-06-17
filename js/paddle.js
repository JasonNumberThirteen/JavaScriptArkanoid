class Paddle
{
	#x;
	#y;
	#width;
	#height;
	#gameWidth;
	#movementSpeed = GAME_PADDLE_MOVEMENT_SPEED;
	#movingLeft = false;
	#movingRight = false;

	constructor(width, height, gameWidth, gameHeight)
	{
		const offsetFromBottom = 8;
		
		this.#x = (gameWidth - width) >> 1;
		this.#y = gameHeight - height - offsetFromBottom;
		this.#width = width;
		this.#height = height;
		this.#gameWidth = gameWidth;

		document.addEventListener("keydown", this.#onKeyDown.bind(this), false);
		document.addEventListener("keyup", this.#onKeyUp.bind(this), false);
	}
	
	update()
	{
		if(this.#movingLeft && this.#x > 0)
		{
			this.#x -= this.#movementSpeed;
		}
		else if(this.#movingRight && this.#x < this.#gameWidth - this.#width)
		{
			this.#x += this.#movementSpeed;
		}
	}

	draw(context)
	{
		context.fillStyle = GAME_PADDLE_FILL_STYLE;

		context.fillRect(this.#x, this.#y, this.#width, this.#height);
	}

	#onKeyDown(e)
	{
		const key = e.key;

		if(key === "a" || key === "ArrowLeft")
		{
			this.#movingLeft = true;
		}
		else if(key === "d" || key === "ArrowRight")
		{
			this.#movingRight = true;
		}
	}

	#onKeyUp(e)
	{
		const key = e.key;

		if(key === "a" || key === "ArrowLeft")
		{
			this.#movingLeft = false;
		}
		else if(key === "d" || key === "ArrowRight")
		{
			this.#movingRight = false;
		}
	}
}