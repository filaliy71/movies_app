import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies, fetchTvShow } from "../../store/HomeSlice";
import Movies from "../Components/Movies";
import TvShows from "../Components/TvShows";

function Home() {
  const dispatch = useDispatch();

  const [currentPageMovies, setCurrentPageMovies] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  const [currentPageTv, setCurrentPageTv] = useState(() => {
    const savedPage = localStorage.getItem("currentPageTv");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  const [activeSection, setActiveSection] = useState(() => {
    const savedSection = localStorage.getItem("activeSection");
    return savedSection || "movies";
  });

  const [movies, setMovies] = useState(activeSection === "movies");
  const [tvShow, setTvShow] = useState(activeSection === "tvShow");

  const pagesPerGroup = 10;
  const totalGroupsMovies = Math.ceil(500 / pagesPerGroup);
  const currentGroupMovies = Math.ceil(currentPageMovies / pagesPerGroup);
  const startPageMovies = (currentGroupMovies - 1) * pagesPerGroup + 1;
  const endPageMovies = Math.min(currentGroupMovies * pagesPerGroup, 500);
  const pageNumbersMovies = Array.from(
    { length: endPageMovies - startPageMovies + 1 },
    (_, i) => startPageMovies + i
  );

  const totalGroupsTv = Math.ceil(500 / pagesPerGroup);
  const currentGroupTv = Math.ceil(currentPageTv / pagesPerGroup);
  const startPageTv = (currentGroupTv - 1) * pagesPerGroup + 1;
  const endPageTv = Math.min(currentGroupTv * pagesPerGroup, 500);
  const pageNumbersTv = Array.from(
    { length: endPageTv - startPageTv + 1 },
    (_, i) => startPageTv + i
  );

  useEffect(() => {
    localStorage.setItem("currentPage", currentPageMovies.toString());
    dispatch(fetchMovies(currentPageMovies));
    dispatch(fetchTvShow(currentPageTv));
  }, [dispatch, currentPageMovies, currentPageTv]);

  const handlePage = (pageNum, isMovies) => {
    if (isMovies) {
      setCurrentPageMovies(Math.max(1, Math.min(pageNum, 500)));
    } else {
      setCurrentPageTv(Math.max(1, Math.min(pageNum, 500)));
    }
  };

  const handleShowMovie = () => {
    setMovies(true);
    setTvShow(false);
    setActiveSection("movies");
    localStorage.setItem("activeSection", "movies");
  };

  const handleShowTv = () => {
    setMovies(false);
    setTvShow(true);
    setActiveSection("tvShow");
    localStorage.setItem("activeSection", "tvShow");
  };

  setTimeout(() => {
    localStorage.removeItem("currentPage");
    localStorage.removeItem("currentPageTv");
  }, 15000);
  return (
    <div className="container mx-auto p-4">
      <span
        onClick={handleShowMovie}
        className={`font-bold text-2xl cursor-pointer hover:text-blue-400 ${
          movies && "text-blue-500"
        }`}
      >
        Movies
      </span>
      &nbsp; &nbsp;
      <span
        onClick={handleShowTv}
        className={`font-bold text-2xl cursor-pointer hover:text-blue-400 ${
          tvShow && "text-blue-500"
        }`}
      >
        TV Show
      </span>
      {movies && (
        <div>
          <Movies />
          <div className="flex items-center justify-center space-x-2 my-4">
            <span
              className={`cursor-pointer hover:text-blue-500 ${
                currentPageMovies === 1 ? "text-gray-500" : ""
              } ${currentPageMovies === 1 ? "disabled" : ""}`}
              onClick={() => handlePage(currentPageMovies - 1, true)}
            >
              ⬅️
            </span>

            {pageNumbersMovies.map((pageNum) => (
              <span
                key={pageNum}
                onClick={() => handlePage(pageNum, true)}
                className={`cursor-pointer hover:text-blue-500 ${
                  pageNum === currentPageMovies ? "text-blue-500 font-bold" : ""
                }`}
              >
                {pageNum}
              </span>
            ))}

            {currentGroupMovies < totalGroupsMovies && (
              <>
                <span
                  className="cursor-pointer hover:text-blue-500"
                  onClick={() => handlePage(endPageMovies + 2, true)}
                >
                  {endPageMovies + 1}
                </span>
                <span
                  className="cursor-pointer hover:text-blue-500"
                  onClick={() => handlePage(endPageMovies + 1, true)}
                >
                  ➡️
                </span>
              </>
            )}
          </div>
        </div>
      )}
      {tvShow && (
        <div>
          <TvShows />
          <div className="flex items-center justify-center space-x-2 my-4">
            <span
              className={`cursor-pointer hover:text-blue-500 ${
                currentPageTv === 1 ? "text-gray-500" : ""
              } ${currentPageTv === 1 ? "disabled" : ""}`}
              onClick={() => handlePage(currentPageTv - 1, false)}
            >
              ⬅️
            </span>

            {pageNumbersTv.map((pageNum) => (
              <span
                key={pageNum}
                onClick={() => handlePage(pageNum, false)}
                className={`cursor-pointer hover:text-blue-500 ${
                  pageNum === currentPageTv ? "text-blue-500 font-bold" : ""
                }`}
              >
                {pageNum}
              </span>
            ))}

            {currentGroupTv < totalGroupsTv && (
              <>
                <span
                  className="cursor-pointer hover:text-blue-500"
                  onClick={() => handlePage(endPageTv + 2, false)}
                >
                  {endPageTv + 1}
                </span>
                <span
                  className="cursor-pointer hover:text-blue-500"
                  onClick={() => handlePage(endPageTv + 1, false)}
                >
                  ➡️
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
