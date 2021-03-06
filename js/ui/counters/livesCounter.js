class LivesCounter extends HUDCounter
{
	constructor(context)
	{
		super(context, new UIText(GAME_LIVES_TEXT, GAME_HUD_TEXTS_FILL_STYLE, "right"));
		this.setTextPosition(this.#textPosition());
	}

	counterPosition()
	{
		const textPosition = this.#textPosition();
		const counterOffsetYFromText = this.counterOffsetYFromText(GAME_LIVES_TEXT);
		const textLength = GAME_LIVES_TEXT.length;
		const slicedTextWidth = this.slicedTextWidth(textLength - GAME_HUD_COUNTERS_OFFSET_IN_LETTERS - 1, textLength - 1);
		
		return new Point(textPosition.x - slicedTextWidth, textPosition.y + counterOffsetYFromText);
	}

	getValue()
	{
		return GameInstance.getGameManager().getPaddleHealth();
	}

	#textPosition()
	{
		return new Point(GAME_WIDTH - GAME_HUD_TEXTS_OFFSET_X, GAME_HUD_TEXTS_Y);
	}
}