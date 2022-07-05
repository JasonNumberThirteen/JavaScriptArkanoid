class RefreshTipText extends UIText
{
	#context;
	
	constructor(context)
	{
		super(GAME_REFRESH_TIP_TEXT, GAME_REFRESH_TIP_FILL_STYLE, "center");

		this.#context = context;
	}

	isVisible()
	{
		return !GameInstance.isRunning();
	}

	textPosition()
	{
		return new Point(GAME_WIDTH >> 1, GAME_HEIGHT - (this.#context.measureText(GAME_REFRESH_TIP_TEXT).actualBoundingBoxAscent >> 1));
	}
}