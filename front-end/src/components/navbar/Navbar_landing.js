import image from '../../assets/mavericks_logo_small.png';
import './Navbar.css';
import { Link } from 'react-router-dom';

// Navbar to use when user not signed in
function SignedOutNav() {
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
  <a class="navbar-brand" href="#">
      <img src={image} alt="Logo" width="30" height="24" class="d-inline-block align-text-top" />
      FlowerCatalogue
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
      </ul>
    </div>
    <div class="loginButtons">
    <li class="nav-item">
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
        <li class="nav-item">
        <Link className="nav-link" to="/signin">Sign In</Link>
        </li>
    </div>
  </div>
</nav>
    )
}
export default SignedOutNav;