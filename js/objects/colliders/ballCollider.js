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

	checkCollisionWith(object, event)
	{
		if(this.#isCollidingWith(object))
		{
			event();
		}
	}

	#isCollidingWith(object)
	{
		return this.#rectangularObjectIsCollidingWithBall(object);
	}

	#rectangularObjectIsCollidingWithBall(object)
	{
		const rectangularObjectPosition = object.getPosition();
		const rectangularObjectSize = object.getSize();
		const ballPosition = this.#ball.getPosition();
		const rectangularObjectCollisionBox = new Point(rectangularObjectPosition.x + rectangularObjectSize.x, rectangularObjectPosition.y + rectangularObjectSize.y);
		const xn = Math.max(rectangularObjectPosition.x, Math.min(ballPosition.x, rectangularObjectCollisionBox.x));
		const yn = Math.max(rectangularObjectPosition.y, Math.min(ballPosition.y, rectangularObjectCollisionBox.y));
		const dx = xn - ballPosition.x;
		const dy = yn - ballPosition.y;

		return dx*dx + dy*dy <= GAME_BALL_RADIUS*GAME_BALL_RADIUS;
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