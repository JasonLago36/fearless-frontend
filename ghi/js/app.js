function createCard(name, secondTitle, description, pictureUrl, date, updated) {
    return `
    <div class="col">
      <div class="card shadow">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <div class="card-subtitle text-secondary"> ${secondTitle} </div>
          <p class="card-text">${description}</p>
        </div>
      </div>
      <div class="card-footer">
        ${date.toLocaleString('en-GB', { timeZone: 'UTC' })} - ${updated.toLocaleString('en-GB', { timeZone: 'UTC' })}
      </div>
    </div>
    `;
  }

  window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        // Figure out what to do when the response is bad
      } else {
        const data = await response.json();

        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const title = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const secondTitle = details.conference.location.name
            let dated = details.conference.starts
            let updated = details.conference.updated
            let date = new Date(dated)
            let update = new Date(updated)
            const html = createCard(title, secondTitle, description, pictureUrl ,date ,update);
            const column = document.querySelector('.row');
            column.innerHTML += html;
            console.log(details)

          }
        }

      }
    } catch (e) {
      // Figure out what to do if an error is raised
    }

  });
