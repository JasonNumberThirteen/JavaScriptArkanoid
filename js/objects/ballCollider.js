class BallCollider
{
	#ball;

	constructor(ball)
	{
		this.#ball = ball;
	}

	checkCollision()
	{
		if(this.#isTouchingTopEdge())
		{
			this.#onTopEdgeTouch();
		}
		else if(this.#isTouchingLeftEdge())
		{
			this.#onLeftEdgeTouch();
		}
		else if(this.#isTouchingRightEdge())
		{
			this.#onRightEdgeTouch();
		}
	}

	#isTouchingTopEdge()
	{
		return this.#ball.getPosition().y < GAME_BALL_RADIUS + GAME_HUD_HEIGHT;
	}

	#isTouchingLeftEdge()
	{
		return this.#ball.getPosition().x < GAME_BALL_RADIUS;
	}

	#isTouchingRightEdge()
	{
		return this.#ball.getPosition().x > GAME_WIDTH - GAME_BALL_RADIUS;
	}

	#onTopEdgeTouch()
	{
		this.#ball.deflectInYAxis();
	}

	#onLeftEdgeTouch()
	{
		this.#ball.deflectInXAxis();
	}

	#onRightEdgeTouch()
	{
		this.#ball.deflectInXAxis();
	}
}