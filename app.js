const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) => {
	if (event.code == 'KeyR') {
		setRandomHexColors();
	}
});

document.addEventListener('click', (event) => {
	event.preventDefault();

	switch (event.target.dataset.type) {
		case 'lock':
			const node =
				event.target.tagName == 'I' ? event.target : event.target.children[0];

			node.classList.toggle('fa-lock-open');
			node.classList.toggle('fa-lock');
			break;
		case 'copy':
			navigator.clipboard.writeText(event.target.textContent);
			break;
	}
});

function setRandomHexColors() {
	cols.forEach((col) => {
		const isLocked = col.querySelector('i').classList.contains('fa-lock');

		if (isLocked) {
			return;
		}

		const text = col.querySelector('h2');
		const button = col.querySelector('button');
		const color = chroma.random();

		text.textContent = color;
		col.style.background = color;

		setElementColor(text, color);
		setElementColor(button, color);
	});
}

function setElementColor(element, color) {
	const luminance = chroma(color).luminance();
	element.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorHash(colors = []) {
	document.location.hash = colors.toString();
}

setRandomHexColors();
