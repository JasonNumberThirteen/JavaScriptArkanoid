class UIText
{
	#text;
	#fillStyle;
	#align;

	constructor(text, fillStyle, align)
	{
		this.#init(text, fillStyle, align);
	}

	#init(text, fillStyle, align)
	{
		this.#text = text;
		this.#fillStyle = fillStyle;
		this.#align = align;
	}

	draw(ui)
	{
		if(this.isVisible())
		{
			ui.drawText(this.#text, this.textPosition(), this.#fillStyle, this.#align);
		}
	}

	isVisible()
	{
		return true;
	}

	textPosition()
	{
		return new Point(0, 0);
	}
}