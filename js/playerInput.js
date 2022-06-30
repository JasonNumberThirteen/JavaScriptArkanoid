class PlayerInput
{
	#paddle;

	constructor(paddle)
	{
		this.#paddle = paddle;

		this.#addEventListeners();
	}

	#addEventListeners()
	{
		document.addEventListener("keydown", this.#onKeyDown.bind(this), false);
		document.addEventListener("keyup", this.#onKeyUp.bind(this), false);
	}

	#onKeyDown(e)
	{
		this.#setPaddleMovingStates(e.key, true);
		this.#restartGame(e.key);
	}

	#onKeyUp(e)
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

	#restartGame(key)
	{
		if(!GameInstance.isRunning() && key.toLowerCase() === GAME_REFRESH_KEY)
		{
			document.location.reload();
		}
	}
}