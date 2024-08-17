import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

function Details() {
  const [detail, setDetail] = useState({});
  const [cast, setCast] = useState([]);
  const [showvid1, setShowVid1] = useState(false);
  const [showvid2, setShowVid2] = useState(false);
  const { id } = useParams();

  const sorted = useMemo(() => {
    return cast.sort((a, b) => b.popularity - a.popularity).slice(0, 5);
  }, [cast]);
  const isLoading = Object.keys(detail).length === 0;

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODczZGI3NWIyMTBmNThjZmQ4NGFmNjUyNDYxZmRjNiIsInN1YiI6IjY1YTY0MTE5OWJjZDBmMDEzMmJhNzBkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Z7xJd6bfTVRc8FTUDKQaom6c_p7ovSfBH_rXMTqDUKA",
        },
      };

      try {
        const [detailsResponse, creditsResponse] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            options
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
            options
          ),
        ]);

        const [detailsData, creditsData] = await Promise.all([
          detailsResponse.json(),
          creditsResponse.json(),
        ]);

        setDetail(detailsData);
        setCast(creditsData.cast);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);
  const handleMoviewatch1 = () => {
    setShowVid1(true);
    setShowVid2(false);
  };
  const handleMoviewatch2 = () => {
    setShowVid2(true);
    setShowVid1(false);
  };
  return (
    <div className="bg-gray-100 font-sans">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      ) : (
        <section className="container mx-auto p-5 bg-white rounded shadow-lg flex">
          <img
            src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
            alt="Movie Poster"
            className="w-80 h-fit rounded mb-8"
          />
          <div className="mx-14">
            <h1 className="text-4xl mb-4 font-bold">{detail.title}</h1>

            <div className="mb-8">
              <p className="text-gray-700">
                <strong>Genres:</strong>{" "}
                {detail && detail.genres ? (
                  detail.genres.map((item, index) => (
                    <span key={index}>
                      {item.name}
                      {index < detail.genres.length - 1 && ", "}
                    </span>
                  ))
                ) : (
                  <span>No genres available</span>
                )}
              </p>
            </div>

            <p className="text-gray-700 mb-8">
              <strong>Overview :</strong> {detail.overview}
            </p>

            <p className="text-gray-700 mb-8">
              <strong>Released :</strong> {detail.release_date}
            </p>
            <p className="text-gray-700 mb-8">
              <strong>Duration :</strong> {detail.runtime} minutes
            </p>
            <p className="text-gray-700 mb-8">
              <strong>Ratings :</strong>{" "}
              {parseFloat(detail.vote_average).toFixed(1)} ({detail.vote_count}{" "}
              votes)
            </p>

            <div className="mb-8">
              <p className="text-gray-700">
                <strong>Production by :</strong>{" "}
                {detail.production_companies ? (
                  detail.production_companies.map((item, index) => (
                    <span key={index}>
                      {item.name}{" "}
                      {index < detail.production_companies.length - 1 && ", "}
                    </span>
                  ))
                ) : (
                  <span>No production companies available</span>
                )}
              </p>
            </div>
            <div className="mb-8">
              <p className="text-gray-700 mb-8">
                <strong>Cast :</strong>
                {sorted.map((item, index) => (
                  <span key={index}>
                    {" "}
                    {item.name} {index < sorted.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </div>
            <button
              onClick={handleMoviewatch1}
              className="relative inline-flex items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group mr-3"
            >
              <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
              <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
                <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
              </span>
              <span className="relative text-white">watch with 1</span>
            </button>
            <button
              onClick={handleMoviewatch2}
              className="relative inline-flex items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
            >
              <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
              <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
                <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
              </span>
              <span className="relative text-white">watch with 2</span>
            </button>
          </div>
        </section>
      )}

      {showvid1 && (
        <div className="video-container flex items-center justify-center h-screen">
          <iframe
            width="1000"
            height="600"
            src={`https://vidsrc.to/embed/movie/${id}`}
            title="Video Player"
            allowFullScreen
            className="rounded-lg overflow-hidden"
          ></iframe>
        </div>
      )}
      {showvid2 && (
        <div className="video-container flex items-center justify-center h-screen">
          <iframe
            width="1000"
            height="600"
            src={`https://vidsrc.me/embed/movie/${id}`}
            title="Video Player"
            allowFullScreen
            className="rounded-lg overflow-hidden"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default Details;
