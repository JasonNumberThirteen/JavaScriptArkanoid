class UI
{
	#game;
	#context;
	#hud;

	constructor(game, context)
	{
		this.#game = game;
		this.#context = context;
		this.#hud = new HUD(game, this);
	}
	
	draw()
	{
		this.#hud.draw();
		this.#drawTextsWhenGameIsOver();
	}

	drawText(text, position, fillStyle, textAlign)
	{
		this.#context.fillStyle = fillStyle;
		this.#context.textAlign = textAlign;

		this.#context.fillText(text, position.x, position.y);
	}

	#drawTextsWhenGameIsOver()
	{
		if(!this.#game.isRunning())
		{
			this.#drawGameEndText();
			this.#drawRefreshTipText();
		}
	}

	#drawGameEndText()
	{
		const wonTheGame = this.#game.getGameManager().wonTheGame();
		const endText = (wonTheGame) ? GAME_YOU_WIN_TEXT : GAME_GAME_OVER_TEXT;
		const endTextY = (GAME_HEIGHT + GAME_HUD_HEIGHT) >> 1;
		const endTextFillStyle = (wonTheGame) ? GAME_YOU_WIN_TEXT_FILL_STYLE : GAME_GAME_OVER_FILL_STYLE;
		
		this.#drawCenteredText(endText, endTextY, endTextFillStyle);
	}

	#drawRefreshTipText()
	{
		this.#drawCenteredText(GAME_REFRESH_TIP_TEXT, GAME_HEIGHT - 16, GAME_REFRESH_TIP_FILL_STYLE);
	}

	#drawCenteredText(text, y, fillStyle)
	{
		const position = new Point(GAME_WIDTH >> 1, y);
		
		this.drawText(text, position, fillStyle, "center");
	}
}