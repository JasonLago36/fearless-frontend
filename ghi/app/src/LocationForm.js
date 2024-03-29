import React, { useEffect, useState} from 'react';

function LocationForm(props) {
	const [states, setStates] = useState([]);
    const [state, setState] = useState('')
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [city, setCity] = useState('')
    const fetchData = async () => {
		const url = 'http://localhost:8000/api/presentations/';

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setStates(data.states);
		}
	};

    const handleNameChange = (e) => {
        const value = e.target.value
        setName(value)
    }
    const handleRoomChange = (e) => {
        const value = e.target.value
        setRoom(value)
    }

    const handleCityChange = (e) => {
        const value = e.target.value
        setCity(value)
    }
    const handleStateChange = (e) => {
        const value = e.target.value
        setState(value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = name;
        data.city = city;
        data.room_count = room;
        data.state = state;
        console.log(data);

        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
          const newLocation = await response.json();
          setName('');
          setRoom('');
          setCity('');
          setState('');
          console.log(newLocation);
        }
      }

	useEffect(() => {
		fetchData();
	}, []);





	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a new location</h1>
					<form onSubmit={handleSubmit} id="create-location-form">
						<div className="form-floating mb-3">
							<input
                                onChange={handleNameChange}
								placeholder="Name"
								required
								type="text"
								name="name"
								id="name"
								className="form-control"
                                value={name}
							/>
							<label htmlFor="name">Name</label>
						</div>
						<div className="form-floating mb-3">
							<input
                                onChange={handleRoomChange}
								placeholder="Room count"
								required
								type="number"
								name="room_count"
								id="room_count"
								className="form-control"
                                value={room}
							/>
							<label htmlFor="room_count">Room count</label>
						</div>
						<div className="form-floating mb-3">
							<input
                                onChange={handleCityChange}
								placeholder="City"
								required
								type="text"
								name="city"
								id="city"
								className="form-control"
                                value={city}
							/>
							<label htmlFor="city">City</label>
						</div>
						<div className="mb-3">
							<select onChange={handleStateChange} value={state} required name="state" id="state" className="form-select">
								<option value=''>Choose a state</option>
								{states.map((state) => {
									return (
										<option key={state.abbreviation} value={state.abbreviation}>
											{state.name}
										</option>
									);
								})}
							</select>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default LocationForm;
