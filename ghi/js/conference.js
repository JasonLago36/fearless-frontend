window.addEventListener('DOMContentLoaded', async () => {
	const url = 'http://localhost:8000/api/locations/';

	const response = await fetch(url);

	if (response.ok) {
		const data = await response.json();

		const selectTag = document.getElementById('locations');
		for (let location of data.locations) {
			const optionMaker = document.createElement('option');
			optionMaker.value = location.id;
			optionMaker.innerHTML = location.name;
			selectTag.appendChild(optionMaker);
		}
	}
	const formListen = document.getElementById('create-location-form');
	formListen.addEventListener('submit', async (e) => {
		e.preventDefault();
		const formData = new FormData(formListen);
		const json = JSON.stringify(Object.fromEntries(formData));
		console.log(json);
		const conferenceUrl = 'http://localhost:8000/api/conferences/';
		const fetchConfig = {
			method: 'post',
			body: json,
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const response = await fetch(conferenceUrl, fetchConfig);
		if (response.ok) {
			formListen.reset();
			const newConference = await response.json();
			console.log(newConference);
		}
	});
});
