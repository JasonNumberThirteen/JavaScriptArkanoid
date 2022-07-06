class ScoreCounter extends HUDCounter
{
	constructor(context)
	{
		super(context, new UIText(GAME_SCORE_TEXT, GAME_HUD_TEXTS_FILL_STYLE, "left"), "left");
		this.getText().setPosition(this.#textPosition());
	}

	counterPosition()
	{
		const textPosition = this.#textPosition();
		const counterOffsetYFromText = this.counterOffsetYFromText(GAME_SCORE_TEXT);
		const slicedTextWidth = this.slicedTextWidth(0, GAME_HUD_COUNTERS_OFFSET_IN_LETTERS);
		
		return new Point(textPosition.x + slicedTextWidth, textPosition.y + counterOffsetYFromText);
	}

	getValue()
	{
		return GameInstance.getGameManager().getScore();
	}

	#textPosition()
	{
		return new Point(GAME_HUD_TEXTS_OFFSET_X, GAME_HUD_TEXTS_Y);
	}
}