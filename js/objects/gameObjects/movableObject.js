class MovableObject extends GameObject
{
	#speed;
	#direction;

	constructor(position, speed, direction)
	{
		super(position);
		this.setMovementSpeed(speed);
		this.setMovementDirection(direction);
	}

	move()
	{
		const oldPosition = this.getPosition();
		const x = oldPosition.x + this.#speed*this.#direction.x;
		const y = oldPosition.y + this.#speed*this.#direction.y;
		const newPosition = new Point(x, y);
		
		this.setPosition(newPosition);
	}

	setMovementSpeed(speed)
	{
		this.#speed = speed || 0;
	}

	setMovementDirection(direction)
	{
		if(!this.#direction)
		{
			this.#direction = new Point(0, 0);
			direction = this.#direction;
		}
		
		this.setMovementDirectionX(direction.x);
		this.setMovementDirectionY(direction.y);
	}

	setMovementDirectionX(x)
	{
		this.#direction.x = x || 0; 
	}

	setMovementDirectionY(y)
	{
		this.#direction.y = y || 0;
	}

	getMovementSpeed()
	{
		return this.#speed;
	}

	getMovementDirectionX()
	{
		return this.#direction.x;
	}

	getMovementDirectionY()
	{
		return this.#direction.y;
	}
}