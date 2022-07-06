class RefreshTipText extends UIText
{
	constructor(context)
	{
		super(GAME_REFRESH_TIP_TEXT, GAME_REFRESH_TIP_FILL_STYLE, "center");
		this.setPosition(this.#textPosition(context));
	}

	isVisible()
	{
		return !GameInstance.isRunning();
	}

	#textPosition(context)
	{
		return new Point(GAME_WIDTH >> 1, GAME_HEIGHT - (context.measureText(GAME_REFRESH_TIP_TEXT).actualBoundingBoxAscent >> 1));
	}
}