class UI
{
	#context;
	#hud;

	constructor(context)
	{
		this.#init(context);
	}
	
	draw()
	{
		this.#hud.draw(this);
		this.#drawTextsWhenGameIsOver();
	}

	drawText(text, position, fillStyle, textAlign)
	{
		this.#context.fillStyle = fillStyle;
		this.#context.textAlign = textAlign;

		this.#context.fillText(text, position.x, position.y);
	}

	#init(context)
	{
		this.#context = context;
		this.#hud = new HUD(this.#context);
	}

	#drawTextsWhenGameIsOver()
	{
		if(!GameInstance.isRunning())
		{
			this.#drawGameEndText();
			this.#drawRefreshTipText();
		}
	}

	#drawGameEndText()
	{
		const wonTheGame = GameInstance.getGameManager().wonTheGame();
		const endText = (wonTheGame) ? GAME_YOU_WIN_TEXT : GAME_GAME_OVER_TEXT;
		const endTextY = (GAME_HEIGHT + GAME_HUD_HEIGHT) >> 1;
		const endTextFillStyle = (wonTheGame) ? GAME_YOU_WIN_TEXT_FILL_STYLE : GAME_GAME_OVER_FILL_STYLE;
		
		this.#drawCenteredText(endText, endTextY, endTextFillStyle);
	}

	#drawRefreshTipText()
	{
		const metrics = this.#context.measureText(GAME_REFRESH_TIP_TEXT);
		const offsetFromBottom = metrics.actualBoundingBoxAscent >> 1;
		
		this.#drawCenteredText(GAME_REFRESH_TIP_TEXT, GAME_HEIGHT - offsetFromBottom, GAME_REFRESH_TIP_FILL_STYLE);
	}

	#drawCenteredText(text, y, fillStyle)
	{
		const position = new Point(GAME_WIDTH >> 1, y);
		
		this.drawText(text, position, fillStyle, "center");
	}
}