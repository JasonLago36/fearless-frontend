console.log('working')
window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');

    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      for (let conference of data.conferences) {
        const option = document.createElement('option');
        option.value = conference.href;
        option.innerHTML = conference.name;
        selectTag.appendChild(option);
      }
      const loadingBar = document.getElementById('loading-conference-spinner')
      const conferenceDropDown = document.getElementById('conference')
      loadingBar.classList.add('d-none')
      conferenceDropDown.classList.remove('d-none')
    }
    //gets event listener for creating a new attendee
    const formListen = document.getElementById('create-attendee-form');
	  formListen.addEventListener('submit', async (e) => {
		e.preventDefault();
		const formData = new FormData(formListen);
		const json = JSON.stringify(Object.fromEntries(formData));
		console.log(json);
		const attendeeUrl = 'http://localhost:8001/api/attendees/';
		const fetchConfig = {
			method: 'post',
			body: json,
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const response = await fetch(attendeeUrl, fetchConfig);
		if (response.ok) {
      const alertSuccess = document.getElementById('success-message')
      alertSuccess.classList.remove('d-none')
			formListen.reset();
			const newAttendee = await response.json();
			console.log(newAttendee);
		}
	});
  });
