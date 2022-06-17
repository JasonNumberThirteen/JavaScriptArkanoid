class Paddle
{
	#position;
	#size;
	#gameWidth;
	#movementSpeed = GAME_PADDLE_MOVEMENT_SPEED;
	#movingLeft = false;
	#movingRight = false;

	constructor(width, height, gameSize)
	{
		const x = (gameSize.x - width) >> 1;
		const y = gameSize.y - height - GAME_PADDLE_OFFSET_FROM_BOTTOM;

		this.#position = new Point(x, y);
		this.#size = new Point(width, height);
		this.#gameWidth = gameSize.x;

		document.addEventListener("keydown", this.#onKeyDown.bind(this), false);
		document.addEventListener("keyup", this.#onKeyUp.bind(this), false);
	}
	
	update()
	{
		if(this.#movingLeft && this.#position.x > 0)
		{
			this.#position.x -= this.#movementSpeed;
		}
		else if(this.#movingRight && this.#position.x < this.#gameWidth - this.#size.x)
		{
			this.#position.x += this.#movementSpeed;
		}
	}

	draw(context)
	{
		context.fillStyle = GAME_PADDLE_FILL_STYLE;

		context.fillRect(this.#position.x, this.#position.y, this.#size.x, this.#size.y);
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