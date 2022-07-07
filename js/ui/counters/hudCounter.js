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
		this.#text.draw(ui);
		ui.drawText(this.getValue(), this.counterPosition(), GAME_HUD_COUNTERS_FILL_STYLE, this.#align);
	}

	setTextPosition(position)
	{
		this.#text.setPosition(position);
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
		return this.#textMetrics(this.#slicedText(start, end)).width;
	}

	getValue()
	{
		return 0;
	}

	#slicedText(start, end)
	{
		return this.#text.getText().slice(start, end);
	}

	#textMetrics(text)
	{
		return this.#context.measureText(text);
	}
}