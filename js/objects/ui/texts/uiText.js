class UIText
{
	#text;
	#fillStyle;
	#align;
	#position;

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
			ui.drawText(this.#text, this.#position, this.#fillStyle, this.#align);
		}
	}

	setPosition(position)
	{
		this.#position = position;
	}

	isVisible()
	{
		return true;
	}
}