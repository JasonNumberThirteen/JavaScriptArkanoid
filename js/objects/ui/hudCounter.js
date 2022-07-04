class HUDCounter
{
	#context;
	#text;

	constructor(context, text)
	{
		this.#context = context;
		this.#text = text;
	}

	counterOffsetYFromText()
	{
		return this.#textMetrics(this.#text).actualBoundingBoxAscent + GAME_WINDOW_SCALE;
	}

	slicedTextWidth(start, end)
	{
		return this.#textMetrics(this.slicedText(start, end)).width;
	}

	slicedText(start, end)
	{
		return this.#text.slice(start, end);
	}

	getText()
	{
		return this.#text;
	}

	#textMetrics(text)
	{
		return this.#context.measureText(text);
	}
}