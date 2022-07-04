class LivesCounter extends HUDCounter
{
	constructor(context)
	{
		super(context, GAME_LIVES_TEXT);
	}

	draw(ui)
	{
		const align = "right";
		
		ui.drawText(this.getText(), this.#textPosition(), GAME_HUD_TEXTS_FILL_STYLE, align);
		ui.drawText(GameInstance.getGameManager().getPaddleHealth(), this.#counterPosition(), GAME_HUD_COUNTERS_FILL_STYLE, align);
	}

	#counterPosition()
	{
		const textPosition = this.#textPosition();
		const counterOffsetYFromText = this.counterOffsetYFromText(GAME_LIVES_TEXT);
		const textLength = GAME_LIVES_TEXT.length;
		
		return new Point(textPosition.x - this.slicedTextWidth(textLength - GAME_HUD_COUNTERS_OFFSET_IN_LETTERS - 1, textLength - 1), textPosition.y + counterOffsetYFromText);
	}

	#textPosition()
	{
		return new Point(GAME_WIDTH - GAME_HUD_TEXTS_OFFSET_X, GAME_HUD_TEXTS_Y);
	}
}