class PaddleCollider
{
	#paddle;
	#size;

	constructor(paddle)
	{
		this.#paddle = paddle;
		this.#size = new Point(GAME_PADDLE_WIDTH, GAME_PADDLE_HEIGHT);
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

	getSize()
	{
		return this.#size;
	}

	#isTouchingLeftEdge()
	{
		return this.#paddle.getPosition().x < 0;
	}

	#isTouchingRightEdge()
	{
		return this.#paddle.getPosition().x > this.#rightEdgeX();
	}

	#onLeftEdgeTouch()
	{
		this.#paddle.getPosition().x = 0;
	}

	#onRightEdgeTouch()
	{
		this.#paddle.getPosition().x = this.#rightEdgeX();
	}

	#rightEdgeX()
	{
		return GAME_WIDTH - GAME_PADDLE_WIDTH;
	}
}