import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import Conference from './Conference';
import Attend from './attend-conference'
import PresentationForm from './PresentationForm';
import MainPage from './MainPage';
import {BrowserRouter, Routes, Route} from "react-router-dom";


function App(props) {
  if(props.attendees === undefined){
    return null
  }
  return (
    <>
    <BrowserRouter>
    <Nav />
    <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
            <Route path="/conferences/new" element={<Conference />} />
            <Route path="/attendees/new" element={<Attend />} />
            <Route path='/locations/new' element={<LocationForm />} />
            <Route path='/attendees' render={() => {<AttendeesList attendees={props.attendees} />}} />
            <Route path='/presentations/new' element={<PresentationForm />} />
        </Routes>
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;
