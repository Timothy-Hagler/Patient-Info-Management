import logo from '../images/PIMS_emblem.png';

export default function Navbar(){
  /*
  This function renders a Navbar with links to the Patient List, About Us Page and Help Page.
  */
  return(
    <nav class="navbar navbar-expand-lg">
      {/* Renders the logo onto the Navbar */}
      <img src={logo} alt="logo" width="32" height="32"></img>

      {/* Renders hyperlinks onto the Navbar */}
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

      {/* Renders the Logout hyperlink onto the Navbar */}
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar navbar-nav ml-auto">
          <li class="nav-item" id="logOutButton">

            {/* The line below sets the value of isLoggedIn in local storage to false, which protects the other routes again. */}
            <a class="nav-link" href="/" onClick={() => {sessionStorage.setItem("isLoggedIn", JSON.stringify(false)); sessionStorage.setItem("accountType", "")}} >Log Out</a>
          </li>
        </ul>
      </div>

  </nav>
  );
}
