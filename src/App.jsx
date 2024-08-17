import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Login from "./Layout/views/Login";
import Register from "./Layout/views/Register";
import { useEffect } from "react";
import { fetchData } from "./store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Layout/views/Home";
import Details from "./Layout/views/Details";
import DetailsTv from "./Layout/views/DetailsTv";
import Search from "./Layout/Components/Search";

function App() {
  const dispatch = useDispatch();
  const showHome = useSelector((state) => state.auth.showHome);
  const isexist = useSelector((state) => state.auth.isexist);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          {alert("login : user1, password : user1")}
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              showHome || isexist ? (
                <Home />
              ) : (
                <>
                  You need to{" "}
                  <Link className="text-blue-400 hover:underline" to="/login">
                    login
                  </Link>{" "}
                  or{" "}
                  <Link
                    className="text-blue-400 hover:underline"
                    to="/register"
                  >
                    sign up
                  </Link>
                  .
                </>
              )
            }
          />

          <Route path="/details/:id" element={<Details />} />
          <Route path="/detailsTv/:id" element={<DetailsTv />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
