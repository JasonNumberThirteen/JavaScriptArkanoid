class UI
{
	#game;
	#context;

	constructor(game, context)
	{
		this.#game = game;
		this.#context = context;
	}
	
	draw()
	{
		if(!this.#game.isStillRunning())
		{
			this.#drawGameEndText();
			this.#drawRefreshTipText();
		}

		this.#drawHUD();
	}

	#drawHUD()
	{
		this.#drawScoreCounter();
		this.#drawLivesCounter();
	}

	#drawScoreCounter()
	{
		const scoreTextPosition = new Point(GAME_HUD_TEXTS_OFFSET_X, GAME_HUD_TEXTS_Y);
		const scoreCounterPosition = new Point(scoreTextPosition.x + GAME_HUD_COUNTERS_OFFSET, scoreTextPosition.y + GAME_HUD_COUNTERS_OFFSET);
		
		this.#drawText(GAME_SCORE_TEXT, scoreTextPosition, GAME_HUD_TEXTS_FILL_STYLE, "left");
		this.#drawText(this.#game.getScore(), scoreCounterPosition, GAME_HUD_COUNTERS_FILL_STYLE, "left");
	}

	#drawLivesCounter()
	{
		const livesTextPosition = new Point(this.#game.getSize().x - GAME_HUD_TEXTS_OFFSET_X, GAME_HUD_TEXTS_Y);
		const livesCounterPosition = new Point(livesTextPosition.x - GAME_HUD_COUNTERS_OFFSET, livesTextPosition.y + GAME_HUD_COUNTERS_OFFSET);
		
		this.#drawText(GAME_LIVES_TEXT, livesTextPosition, GAME_HUD_TEXTS_FILL_STYLE, "right");
		this.#drawText(this.#game.getPaddleLives(), livesCounterPosition, GAME_HUD_COUNTERS_FILL_STYLE, "right");
	}

	#drawGameEndText()
	{
		const wonTheGame = this.#game.wonTheGame();
		const endText = (wonTheGame) ? GAME_YOU_WIN_TEXT : GAME_GAME_OVER_TEXT;
		const endTextY = (this.#game.getSize().y + GAME_HUD_HEIGHT) >> 1;
		const endTextFillStyle = (wonTheGame) ? GAME_YOU_WIN_TEXT_FILL_STYLE : GAME_GAME_OVER_FILL_STYLE;
		
		this.#drawCenteredText(endText, endTextY, endTextFillStyle);
	}

	#drawRefreshTipText()
	{
		this.#drawCenteredText(GAME_REFRESH_TIP_TEXT, this.#game.getSize().y - 16, GAME_REFRESH_TIP_FILL_STYLE);
	}

	#drawCenteredText(text, y, fillStyle)
	{
		const position = new Point(this.#game.getSize().x >> 1, y);
		
		this.#drawText(text, position, fillStyle, "center");
	}

	#drawText(text, position, fillStyle, textAlign)
	{
		this.#context.fillStyle = fillStyle;
		this.#context.textAlign = textAlign;

		this.#context.fillText(text, position.x, position.y);
	}
}