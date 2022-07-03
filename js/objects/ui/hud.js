class HUD
{
	draw(ui, context)
	{
		this.#drawScoreCounter(ui, context);
		this.#drawLivesCounter(ui, context);
	}

	#drawScoreCounter(ui, context)
	{
		const textMetrics = context.measureText(GAME_SCORE_TEXT);
		const textFirstLetterMetrics = context.measureText(GAME_SCORE_TEXT.slice(0, 1));
		const counterOffsetFromText = textMetrics.actualBoundingBoxAscent + GAME_WINDOW_SCALE;
		const textPosition = new Point(GAME_HUD_TEXTS_OFFSET_X, GAME_HUD_TEXTS_Y);
		const counterPosition = new Point(textPosition.x + textFirstLetterMetrics.width, textPosition.y + counterOffsetFromText);
		const align = "left";
		
		ui.drawText(context, GAME_SCORE_TEXT, textPosition, GAME_HUD_TEXTS_FILL_STYLE, align);
		ui.drawText(context, GameInstance.getGameManager().getScore(), counterPosition, GAME_HUD_COUNTERS_FILL_STYLE, align);
	}

	#drawLivesCounter(ui, context)
	{
		const textMetrics = context.measureText(GAME_LIVES_TEXT);
		const textLastLetterMetrics = context.measureText(GAME_LIVES_TEXT.slice(GAME_LIVES_TEXT.length - 2, GAME_LIVES_TEXT.length - 1));
		const counterOffsetFromText = textMetrics.actualBoundingBoxAscent + GAME_WINDOW_SCALE;
		const textPosition = new Point(GAME_WIDTH - GAME_HUD_TEXTS_OFFSET_X, GAME_HUD_TEXTS_Y);
		const counterPosition = new Point(textPosition.x - textLastLetterMetrics.width, textPosition.y + counterOffsetFromText);
		const align = "right";
		
		ui.drawText(context, GAME_LIVES_TEXT, textPosition, GAME_HUD_TEXTS_FILL_STYLE, align);
		ui.drawText(context, GameInstance.getGameManager().getPaddleHealth(), counterPosition, GAME_HUD_COUNTERS_FILL_STYLE, align);
	}
}