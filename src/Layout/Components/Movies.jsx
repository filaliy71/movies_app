import { useSelector } from "react-redux";
import Card from "./Card";

function Movies() {
  const select = useSelector((state) => state.home.movies_List);

  const movieResults = select || [];
  return (
    <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {movieResults.map((item, index) => (
        <Card item={item} key={index} />
      ))}
    </div>
  );
}

export default Movies;
