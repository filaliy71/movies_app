import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
function DetailsTv() {
  const [detail, setDetail] = useState({});
  const [cast, setCast] = useState([]);
  const [selectSeason, SetSelectSeson] = useState(1);
  const [showEp, setShowEp] = useState([]);
  const [watchVid, setWatchVid] = useState(1);
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
        const [detailsResponse, creditsResponse, seasonResponse] =
          await Promise.all([
            fetch(`https://api.themoviedb.org/3/tv/${id}`, options),
            fetch(
              `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`,
              options
            ),

            fetch(
              `https://api.themoviedb.org/3/tv/${id}/season/${selectSeason}?language=en-US`,
              options
            ),
          ]);

        const [detailsData, creditsData, seasonData] = await Promise.all([
          detailsResponse.json(),
          creditsResponse.json(),
          seasonResponse.json(),
        ]);

        setDetail(detailsData);
        setCast(creditsData.cast);
        setShowEp(seasonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, selectSeason]);
  const handleSeson = (num) => {
    SetSelectSeson(num);
    setWatchVid(1);
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
            <h1 className="text-4xl mb-4 font-bold">
              {detail.name}{" "}
              <span className="text-gray-500 text-3xl">
                {new Date(detail.first_air_date).getFullYear()}
              </span>
            </h1>

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
              <strong>Ratings :</strong>{" "}
              {parseFloat(detail.vote_average).toFixed(1)} ({detail.vote_count}{" "}
              votes)
            </p>
            <p className="text-gray-700 mb-8">
              <strong>Season :</strong> {detail.number_of_seasons}
            </p>
            <p className="text-gray-700 mb-8">
              <strong>Total Episodse :</strong> {detail.number_of_episodes}
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
          </div>
        </section>
      )}
      <ul className="flex justify-evenly my-4 flex-wrap">
        {Array.from({ length: detail.number_of_seasons }, (_, i) => i + 1).map(
          (item) => (
            <button
              key={item}
              onClick={() => handleSeson(item)}
              className={`relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group my-1 mx-2 ${
                selectSeason == item ? "bg-purple-600 text-white" : ""
              }`}
            >
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0 "></span>
              <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                Season {item}
              </span>
            </button>
          )
        )}
      </ul>

      <div className="bg-gray-100 font-sans p-6">
        <div className="flex justify-between items-start">
          <ul className="w-1/4 border border-b-2 border-black overflow-y-auto mr-6">
            {showEp.episodes &&
              showEp.episodes.map((item) => (
                <li
                  key={item.episode_number}
                  className={`border-b-2 border-black px-4 hover:bg-slate-200 py-2 cursor-pointer transition duration-300 ${
                    watchVid == item.episode_number && "bg-slate-300"
                  }`}
                  onClick={() => setWatchVid(item.episode_number)}
                >
                  <span className="text-lg font-semibold mr-2">
                    {item.episode_number}
                  </span>
                  <span className="text-gray-700">{item.name}</span>
                </li>
              ))}
          </ul>

          <div className="flex-1">
            <iframe
              width="100%"
              height="608"
              src={`https://vidsrc.to/embed/tv/${id}/${selectSeason}/${watchVid}`}
              title="Video Player"
              allowFullScreen
              className="rounded-lg overflow-hidden"
            ></iframe>
          </div>
        </div>
      </div>

      {/* <div className="video-container flex items-center justify-center h-screen">
        
      </div>
      
      <div className="video-container flex items-center justify-center h-screen">
        <iframe
          width="1000"
          height="600"
          src={`https://vidsrc.me/embed/movie/${id}`}
          title="Video Player"
          allowFullScreen
        ></iframe>
      </div>*/}
    </div>
  );
}

export default DetailsTv;
