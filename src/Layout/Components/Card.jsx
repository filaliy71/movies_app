import { Link } from "react-router-dom";

function Card({ item }) {
  const base_img = "https://image.tmdb.org/t/p/w500";

  return (
    <Link to={`/details/${item.id}`}>
      <div className="max-w-60 h-full rounded overflow-hidden shadow-lg card transform hover:scale-105 transition-transform duration-200">
        <img
          className="w-full"
          src={`${base_img}${item.poster_path}`}
          alt="movie poster"
        />
        <div className="px-3 pt-2">
          <div className="font-bold text-lg flex justify-between">
            {item.title}
            <span className="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-yellow-700 h-7">
              ⭐{item.vote_average}
            </span>
          </div>
        </div>
        <div className="px-3 my-2 ">
          <span className="inline-block bg-green-200 rounded-full px-2 py-1  text-sm font-semibold text-green-700 mr-1">
            {new Date(item.release_date).getFullYear()}
          </span>
          <span className="inline-block bg-blue-200 rounded-full px-2 py-1 text-sm font-semibold text-blue-700 h-7">
            {item.original_language}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default Card;
