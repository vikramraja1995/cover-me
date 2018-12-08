import React from 'react';

const Navigation = () => (
  <nav className="navbar sticky-top bg-primary rounded-0">
    {/* Page Name */}
    <a className="navbar-brand ml-3" href="#">
      Cover Me
    </a>

    {/* Navigation */}
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#">
          Home
          <span className="sr-only">(current)</span>
        </a>
      </li>
    </ul>

    {/* Profile Photo */}
    <ul className="navbar-nav ml-auto mr-3 ">
      <li className="nav-item">
        <a href="" className="profile-photo nav-link">
          <div className="profile-photo-small">
            <img
              src="https://avatars1.githubusercontent.com/u/40804831?s=400&v=4"
              alt=""
              className="rounded-circle img-fluid"
            />
          </div>
        </a>
      </li>
    </ul>
  </nav>
);
export default Navigation;
