class HUDCounter
{
	#context;
	#text;
	#align;

	constructor(context, text, align)
	{
		this.#context = context;
		this.#text = text;
		this.#align = align;
	}

	draw(ui)
	{
		ui.drawText(this.getText(), this.textPosition(), GAME_HUD_TEXTS_FILL_STYLE, this.#align);
		ui.drawText(this.getValue(), this.counterPosition(), GAME_HUD_COUNTERS_FILL_STYLE, this.#align);
	}

	textPosition()
	{
		return new Point(0, 0);
	}

	counterPosition()
	{
		return new Point(0, 0);
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

	getValue()
	{
		return 0;
	}

	#textMetrics(text)
	{
		return this.#context.measureText(text);
	}
}