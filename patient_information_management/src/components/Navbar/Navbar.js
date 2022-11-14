import logo from '../images/PIMS_emblem.png';

export default function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg" data-testid='navBar'>
        <a className="navbar-brand" href="/" data-testid='logo'><img src={logo} alt="logo" width="32" height="32"></img></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link"  data-testid = 'patientList' href="/patient-list">Patient List</a>
            </li>
            <li className="nav-item" data-testid = 'aboutUs'>
              <a className="nav-link"  href="/about-us">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link"  data-testid = 'helpPage' href="/help-page">Help</a>
            </li>
          </ul>
        </div>
     </nav>
    );
}
