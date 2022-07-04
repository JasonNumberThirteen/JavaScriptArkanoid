class ScoreCounter extends HUDCounter
{
	constructor(context)
	{
		super(context, GAME_SCORE_TEXT);
	}

	draw(ui)
	{
		const align = "left";
		
		ui.drawText(this.getText(), this.#textPosition(), GAME_HUD_TEXTS_FILL_STYLE, align);
		ui.drawText(GameInstance.getGameManager().getScore(), this.#counterPosition(), GAME_HUD_COUNTERS_FILL_STYLE, align);
	}

	#counterPosition()
	{
		const textPosition = this.#textPosition();
		const counterOffsetYFromText = this.counterOffsetYFromText(GAME_SCORE_TEXT);
		
		return new Point(textPosition.x + this.slicedTextWidth(0, GAME_HUD_COUNTERS_OFFSET_IN_LETTERS), textPosition.y + counterOffsetYFromText);
	}

	#textPosition()
	{
		return new Point(GAME_HUD_TEXTS_OFFSET_X, GAME_HUD_TEXTS_Y);
	}
}