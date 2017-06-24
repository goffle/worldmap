var Card = function (id, title, description, imageBackground, imageButton, latitude, longitude) {
	this.title = title;
	this.imageBackground = imageBackground;
	this.description = description;
	this.imageButton = imageButton;
	this.id = id;

	this._generateHTMLElement = function () {

		var containerElement = document.createElement('div');
		containerElement.className = 'container';
		containerElement.id = this.id;

		var cardElement = document.createElement('div');
		cardElement.className = 'card';
		containerElement.appendChild(cardElement);

		//image
		var imgBackground = document.createElement('img');
		imgBackground.src = this.imageBackground;
		cardElement.appendChild(imgBackground);

		//H2
		var titleElement = document.createElement('h2');
		titleElement.textContent = this.title;
		cardElement.appendChild(titleElement);

		var PElement = document.createElement('p');
		PElement.textContent = this.description;
		cardElement.appendChild(PElement);


		var buttonElement = document.createElement('div');
		buttonElement.className = 'expand';
		containerElement.appendChild(buttonElement);

		var imgButton = document.createElement('img');
		imgButton.src = this.imageButton;
		imgButton.className = 'extandImg';
		buttonElement.appendChild(imgButton);

		buttonElement.onclick = function () {
			var newCard = mapCard.get(this.parentElement.id);
			if (newCard === selectedCard) {
				map.home();
				newCard.toggle();
				selectedCard = null;
			} else {
				if (selectedCard)
					selectedCard.toggle();

				newCard.toggle();
				selectedCard = newCard;

				map.centerOnElement(this.parentElement.id);
			}
		};

		return containerElement;
	};

	this.toggle = function () {
		console.log(this.id)
		$(this.HTMLElement.children[0]).toggleClass('show');
		$(this.HTMLElement).toggleClass('visible');
	}

	this.HTMLElement = this._generateHTMLElement();
};


