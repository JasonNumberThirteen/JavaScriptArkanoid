class PaddleCollider
{
	#paddle;

	constructor(paddle)
	{
		this.#paddle = paddle;
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

	#isTouchingLeftEdge()
	{
		return this.#paddle.getPosition().x < 0;
	}

	#isTouchingRightEdge()
	{
		return this.#paddle.getPosition().x > this.#paddle.rightEdgeX();
	}

	#onLeftEdgeTouch()
	{
		this.#paddle.getPosition().x = 0;
	}

	#onRightEdgeTouch()
	{
		this.#paddle.getPosition().x = this.#paddle.rightEdgeX();
	}
}