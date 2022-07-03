class UI
{
	#game;
	#hud;

	constructor(game)
	{
		this.#game = game;
		this.#hud = new HUD(game);
	}
	
	draw(context)
	{
		this.#hud.draw(this, context);
		this.#drawTextsWhenGameIsOver(context);
	}

	drawText(context, text, position, fillStyle, textAlign)
	{
		context.fillStyle = fillStyle;
		context.textAlign = textAlign;

		context.fillText(text, position.x, position.y);
	}

	#drawTextsWhenGameIsOver(context)
	{
		if(!this.#game.isRunning())
		{
			this.#drawGameEndText(context);
			this.#drawRefreshTipText(context);
		}
	}

	#drawGameEndText(context)
	{
		const wonTheGame = this.#game.getGameManager().wonTheGame();
		const endText = (wonTheGame) ? GAME_YOU_WIN_TEXT : GAME_GAME_OVER_TEXT;
		const endTextY = (GAME_HEIGHT + GAME_HUD_HEIGHT) >> 1;
		const endTextFillStyle = (wonTheGame) ? GAME_YOU_WIN_TEXT_FILL_STYLE : GAME_GAME_OVER_FILL_STYLE;
		
		this.#drawCenteredText(context, endText, endTextY, endTextFillStyle);
	}

	#drawRefreshTipText(context)
	{
		const metrics = context.measureText(GAME_REFRESH_TIP_TEXT);
		const offsetFromBottom = metrics.actualBoundingBoxAscent >> 1;
		
		this.#drawCenteredText(context, GAME_REFRESH_TIP_TEXT, GAME_HEIGHT - offsetFromBottom, GAME_REFRESH_TIP_FILL_STYLE);
	}

	#drawCenteredText(context, text, y, fillStyle)
	{
		const position = new Point(GAME_WIDTH >> 1, y);
		
		this.drawText(context, text, position, fillStyle, "center");
	}
}