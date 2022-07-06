class BrickCollider
{
	#brick;
	#size;

	constructor(brick)
	{
		this.#brick = brick;
		this.#size = new Point(GAME_BRICK_WIDTH, GAME_BRICK_HEIGHT);
	}

	onBallHit(ball)
	{
		ball.deflectInYAxis();
		this.#brick.takeDamage();
	}

	getSize()
	{
		return this.#size;
	}
}