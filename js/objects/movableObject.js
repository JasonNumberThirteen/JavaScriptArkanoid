class MovableObject extends GameObject
{
	#speed;
	#direction;

	constructor(speed, direction)
	{
		this.setSpeed(speed);
		this.setDirection(direction);
	}

	move()
	{
		const oldPosition = this.getPosition();
		const x = oldPosition.x + this.#speed*this.#direction.x;
		const y = oldPosition.y + this.#speed*this.#direction.y;
		const newPosition = new Point(x, y);
		
		this.setPosition(newPosition);
	}

	setSpeed(speed)
	{
		this.#speed = speed;
	}

	setDirection(direction)
	{
		this.#direction = direction;
	}
}