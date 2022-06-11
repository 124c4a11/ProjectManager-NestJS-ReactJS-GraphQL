import logo from './logo.png';

export function Header(): JSX.Element {
  return (
    <nav className="navbar bg-light mb-4">
      <div className="container">
        <a href="/" className="navbar-brand">
          <span className="d-flex">
            <img src={logo} alt="logo" className="mr-2" />
            <span>ProjectMgmt</span>
          </span>
        </a>
      </div>
    </nav>
  );
}
