function createCard(name, secondTitle, description, pictureUrl, date, updated) {
	return `
    <div class="col">
      <div class="card shadow ">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <div class="card-subtitle text-secondary"> ${secondTitle} </div>
          <p class="card-text">${description === true ? placeholder : description}</p>
        </div>
      </div>
      <div class="card-footer">
        ${date.toLocaleString('en-GB', {month:"numeric", day:"numeric",  year: "numeric" })}
         -
         ${updated.toLocaleString('en-GB', {month:"numeric", day:"numeric",  year: "numeric" })}
      </div>
    </div>
    `;
}

function placeHolderCard() {
	return `
                <div id='place' class="card shadow" aria-hidden="true">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title placeholder-glow">
                    <span class="placeholder col-6"></span>
                    </h5>
                    <p class="card-text placeholder-glow">
                    <span class="placeholder col-7"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-6"></span>
                    <span class="placeholder col-8"></span>
                    </p>
                    <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
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

      let placeHolderHTML = ''
      const numOfCons = data.conferences.length
      // const placeContain = document.getElementById('placeHolderContainer')
      const placeContain = document.querySelector('.row')



      for(let i = 0; i < numOfCons; i++){
        placeHolderHTML += `
                <div class="card placeholderz" aria-hidden="true">
                <img src="..." class="card-img-top placeholder" alt="...">
                <div class="card-body">
                    <h5 class="card-title placeholder-glow">
                    <span class="placeholder col-6"></span>
                    </h5>
                    <p class="card-text placeholder-glow">
                    <span class="placeholder col-7"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-6"></span>
                    <span class="placeholder col-8"></span>
                    </p>
                    <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
                </div>
            </div>
    `
      }
      placeContain.innerHTML = placeHolderHTML

			for (let conference of data.conferences) {


        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);


        if (detailResponse.ok) {

          const deletePlaceHolder = document.querySelector('.placeholderz')

          const column = document.querySelector('.row')
          const details = await detailResponse.json();
          const title = details.conference.name;
					const description = details.conference.description;
					const pictureUrl = details.conference.location.picture_url;
					const secondTitle = details.conference.location.name;
					let dated = details.conference.starts;
					let updated = details.conference.updated;
					let date = new Date(dated);
					let update = new Date(updated);


					const html = createCard(
            title,
						secondTitle,
						description,
						pictureUrl,
						date,
						update
            );

            column.innerHTML.replace(deletePlaceHolder, html)

          }

        }
      }
    } catch (e) {
      console.log(e)
      // Figure out what to do if an error is raised
    }
  // const placeHoldOne = document.getElementById('place')
  // placeHoldOne.remove()
});
