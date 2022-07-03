class BrickCollider
{
	#brick;

	constructor(brick)
	{
		this.#brick = brick;
	}

	onBallHit(ball)
	{
		ball.deflectInYAxis();
		this.#brick.takeDamage();
	}
}