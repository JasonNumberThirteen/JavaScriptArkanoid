class BrickCollider extends BoxCollider
{
	constructor(brick)
	{
		super(brick, new Point(GAME_BRICK_WIDTH, GAME_BRICK_HEIGHT));
	}

	onBallHit(ball)
	{
		ball.deflectInYAxis();
		this.getObject().takeDamage();
	}
}