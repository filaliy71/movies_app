import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/AuthSlice";
import { fetchSearch } from "../store/HomeSlice";
import { useEffect } from "react";

function Header() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleout = () => {
    dispatch(logout());
    navigate("/login");
  };
  useEffect(() => {
    dispatch(fetchSearch());
  }, [dispatch]);
  const handleSub = (e) => {
    e.preventDefault();
    const searchVal = e.target.searchVal.value;
    dispatch(fetchSearch(searchVal));
    navigate('/search')
  };
  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-black">
          <Link to="/home">Aflix</Link>
        </div>
        <form onSubmit={handleSub}>
          <input type="text" name="searchVal" className="text-black" />
          <button type="submit">🔎</button>
        </form>
        <div className="flex space-x-4 items-center">
          {user.length === 0 ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          ) : (
            <>
              <p className="mr-2">{user.username}</p>
              <button
                onClick={handleout}
                type="button"
                className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
