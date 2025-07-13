import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

function ProfileIcon() {
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);

  const avatar = user?.fullName
    ? `https://avatar.iran.liara.run/username?username=${user.fullName.replace(/ /g, "+")}`
    : null;

  const handleLogout = () => {
    navigate("/logout");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      {user ? (
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-circle">
            <div className="w-9 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
              <img
                src={avatar}
                alt="User Avatar"
                loading="lazy"
                className="w-9 h-9 rounded-full object-cover"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 shadow-sm right-1"
          >
            <li className="text-center">
              <p className="font-medium">{user.fullName}</p>
              {user.email && (
                <p className="font-medium text-gray-500">{user.email}</p>
              )}
            </li>
            <li className="mt-1">
              <button
                className="btn btn-error w-full"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <button
          className="btn btn-primary"
          onClick={handleLogin}
        >
          Login
        </button>
      )}
    </div>
  );
}

export default ProfileIcon;
