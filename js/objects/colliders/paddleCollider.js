class PaddleCollider extends BoxCollider
{
	constructor(paddle)
	{
		super(paddle, new Point(GAME_PADDLE_WIDTH, GAME_PADDLE_HEIGHT));
	}

	checkCollision()
	{
		if(this.#isTouchingLeftEdge())
		{
			this.#onLeftEdgeTouch();
		}
		else if(this.#isTouchingRightEdge())
		{
			this.#onRightEdgeTouch();
		}
	}

	onBallHit(ball)
	{
		ball.deflectFromPaddle();
	}

	#isTouchingLeftEdge()
	{
		return this.getObject().getPosition().x < 0;
	}

	#isTouchingRightEdge()
	{
		return this.getObject().getPosition().x > this.#rightEdgeX();
	}

	#onLeftEdgeTouch()
	{
		this.getObject().getPosition().x = 0;
	}

	#onRightEdgeTouch()
	{
		this.getObject().getPosition().x = this.#rightEdgeX();
	}

	#rightEdgeX()
	{
		return GAME_WIDTH - GAME_PADDLE_WIDTH;
	}
}