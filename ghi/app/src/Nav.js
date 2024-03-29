function Nav() {
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <a className="navbar-brand" href="/">Conference GO!</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a className="nav-link" aria-current="page" href="index"
									>Home</a
								>
							</li>
							<li className="nav-item">
								<a className="nav-link" aria-current="page" href="http://localhost:3001/locations/new "
									>New Location</a
								>
							</li>
							<li className="nav-item">
								<a className="nav-link active" aria-current="page" href="http://localhost:3001/conferences/new "
									>New Conference</a
								>
							</li>
							<li className="nav-item">
								<a className="nav-link active" aria-current="page" href="http://localhost:3001/attendees "
									>Attending!</a
								>
							</li>
							<li className="nav-item">
								<a className="nav-link active" aria-current="page" href="http://localhost:3001/attendees/new "
									>New Attendees!</a
								>
							</li>
							<li className="nav-item">
								<a className="nav-link active" aria-current="page" href="http://localhost:3001/presentations/new"
									>New Presentation</a
								>
							</li>
                            </ul>
            </div>
            </div>
            </nav>
        </>
    );
  }

  export default Nav;
