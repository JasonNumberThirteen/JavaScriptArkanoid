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
		this.#drawHUD();
		
		if(!this.#game.isRunning())
		{
			this.#drawGameEndText();
			this.#drawRefreshTipText();
		}
	}

	#drawHUD()
	{
		this.#drawScoreCounter();
		this.#drawLivesCounter();
	}

	#drawScoreCounter()
	{
		const textPosition = new Point(GAME_HUD_TEXTS_OFFSET_X, GAME_HUD_TEXTS_Y);
		const counterPosition = new Point(textPosition.x + GAME_HUD_COUNTERS_OFFSET, textPosition.y + GAME_HUD_COUNTERS_OFFSET);
		const align = "left";
		
		this.#drawText(GAME_SCORE_TEXT, textPosition, GAME_HUD_TEXTS_FILL_STYLE, align);
		this.#drawText(this.#game.getScore(), counterPosition, GAME_HUD_COUNTERS_FILL_STYLE, align);
	}

	#drawLivesCounter()
	{
		const textPosition = new Point(this.#game.getSize().x - GAME_HUD_TEXTS_OFFSET_X, GAME_HUD_TEXTS_Y);
		const counterPosition = new Point(textPosition.x - GAME_HUD_COUNTERS_OFFSET, textPosition.y + GAME_HUD_COUNTERS_OFFSET);
		const align = "right";
		
		this.#drawText(GAME_LIVES_TEXT, textPosition, GAME_HUD_TEXTS_FILL_STYLE, align);
		this.#drawText(this.#game.getPaddleLives(), counterPosition, GAME_HUD_COUNTERS_FILL_STYLE, align);
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