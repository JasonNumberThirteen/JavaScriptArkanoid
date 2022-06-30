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
		this.#direction = direction || new Point(0, 0);
	}

	getMovementSpeed()
	{
		return this.#speed;
	}

	getMovementDirection()
	{
		return this.#direction;
	}
}