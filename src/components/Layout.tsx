import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/ContextHooks';
import {useEffect, useState} from 'react';

const Layout = () => {
  // jos käyttäjää ei ole, kutsu handleAutoLogin()
  const {user, handleAutoLogin} = useUserContext();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (!user) {
      handleAutoLogin();
    }
  }, []);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <h1 className="mb-15 text-3xl font-bold text-center text-gray-300">Media App</h1>
      <button
        onClick={toggleMode}
        className="mb-5 p-2 bg-blue-500 text-white rounded "
      >
        Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
      <div className="flex flex-col">
        <nav
          className={`p-4 shadow-lg w-full ${
            isDarkMode ? 'bg-gray-100' : 'bg-gray-500'
          }`}
        >
          <ul className="m-0 flex flex-row list-none space-x-4">
            {user ? (
              <>
                <li>
                  <Link
                    className="rounded-xl block p-4 text-center transition-all duration-500 ease-in-out hover:bg-slate-900 text-black hover:text-white shadow-md"
                    to="/Home"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="rounded-xl block p-4 text-center transition-all duration-500 ease-in-out hover:bg-slate-900 text-black hover:text-white shadow-md"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="rounded-xl block p-4 text-center transition-all duration-500 ease-in-out hover:bg-slate-900 text-black hover:text-white shadow-md"
                    to="/upload"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <Link
                    className="rounded-xl block p-4 text-center transition-all duration-500 ease-in-out hover:bg-slate-900 text-black hover:text-white shadow-md"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  className="rounded-xl block p-4 text-center transition-all duration-500 ease-in-out hover:bg-slate-900 text-black hover:text-white shadow-md"
                  to="/"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <main className="flex-grow p-8 bg-gray-100 mt-4 dark:bg-gray-900 dark:text-white">
          <Outlet />
        </main>
      </div>
      <footer className="bg-gray-800 text-white text-center p-4 mt-8 dark:bg-black">
        &copy; 2025 Azzni
      </footer>
    </div>
  );
};

export default Layout;
