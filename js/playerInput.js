class PlayerInput
{
	#paddle;

	constructor(paddle)
	{
		this.#paddle = paddle;
	}

	onKeyDown(e)
	{
		this.#setPaddleMovingStates(e.key, true);
	}

	onKeyUp(e)
	{
		this.#setPaddleMovingStates(e.key, false);
	}

	#setPaddleMovingStates(key, value)
	{
		GAME_PADDLE_LEFT_MOVEMENT_INPUT.forEach(e =>
		{
			if(key === e)
			{
				this.#paddle.setMovingLeftState(value);
			}
		});

		GAME_PADDLE_RIGHT_MOVEMENT_INPUT.forEach(e =>
		{
			if(key === e)
			{
				this.#paddle.setMovingRightState(value);
			}
		});
	}
}