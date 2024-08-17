import { useSelector } from "react-redux";
import TvCard from "./TvCard";
import Card from "./Card";

function Search() {
  const searchList = useSelector((state) => state.home.search_list);
  console.log(searchList);
  return (
    <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {searchList.results.map((item, index) => (
        <div key={index}>
          {item.media_type == "tv" ? (
            <TvCard item={item} />
          ) : (
            <Card item={item} />
          )}
        </div>
      ))}
    </div>
  );
}
export default Search;
