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
		if(ball.getMovementDirectionY() > 0)
		{
			ball.deflectFromPaddle(this.getObject());
		}
	}

	#isTouchingLeftEdge()
	{
		return this.getObject().getPosition().x < 0;
	}

	#isTouchingRightEdge()
	{
		return this.getObject().getPosition().x > GAME_PADDLE_RIGHT_EDGE_X;
	}

	#onLeftEdgeTouch()
	{
		this.getObject().getPosition().x = 0;
	}

	#onRightEdgeTouch()
	{
		this.getObject().getPosition().x = GAME_PADDLE_RIGHT_EDGE_X;
	}
}