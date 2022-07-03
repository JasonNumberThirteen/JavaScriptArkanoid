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
		if(this.#pressedAnyKeyFromInputArray(GAME_PADDLE_LEFT_MOVEMENT_INPUT, key))
		{
			this.#paddle.setMovingLeftState(value);
		}
		else if(this.#pressedAnyKeyFromInputArray(GAME_PADDLE_RIGHT_MOVEMENT_INPUT, key))
		{
			this.#paddle.setMovingRightState(value);
		}
	}

	#pressedAnyKeyFromInputArray(input, key)
	{
		let pressed = false;
		
		input.forEach(e =>
		{
			if(key === e)
			{
				pressed = true;

				return;
			}
		});

		return pressed;
	}

	#restartGame(key)
	{
		if(!GameInstance.isRunning() && key.toLowerCase() === GAME_REFRESH_KEY)
		{
			document.location.reload();
		}
	}
}