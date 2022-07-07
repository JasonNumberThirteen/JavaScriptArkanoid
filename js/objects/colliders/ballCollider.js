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
		const ballPosition = this.#ball.getPosition();
		const nearestPointOnObjectToTheCenterOfTheBall = nearestPointOnRectangleToTheCenterOfCircle(object.getPosition(), object.collisionBox(), ballPosition);
		
		return distanceBetweenPoints(ballPosition, nearestPointOnObjectToTheCenterOfTheBall) <= GAME_BALL_RADIUS*GAME_BALL_RADIUS;
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
		this.#ball.getPosition().y = GAME_BALL_RADIUS + GAME_HUD_HEIGHT;
	}

	#onLeftEdgeTouch()
	{
		this.#ball.deflectInXAxis();
		this.#ball.getPosition().x = GAME_BALL_RADIUS;
	}

	#onRightEdgeTouch()
	{
		this.#ball.deflectInXAxis();
		this.#ball.getPosition().x = GAME_WIDTH - GAME_BALL_RADIUS;
	}
}