import logo from '../images/PIMS_emblem.png';

export default function Navbar(){
    return(
      <nav class="navbar navbar-expand-lg">
      <img src={logo} alt="logo" width="32" height="32"></img>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="/patient-list">Patient List</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about-us">About Us</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/help-page">Help</a>
          </li>
        </ul>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar navbar-nav ml-auto">
          <li class="nav-item" id="logOutButton">
            <a class="nav-link" href="/" onClick={() => {localStorage.setItem("isLoggedIn", JSON.stringify(false)); localStorage.setItem("accountType", "")}} >Log Out</a>
          </li>
        </ul>
      </div>
    </nav>
    );
}
