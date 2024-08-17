import { useSelector } from "react-redux";
import TvCard from "./tvCard";

function TvShows() {
  const tv = useSelector((state) => state.home.tv_List);
  const TvResults = tv || [];
  console.log(TvResults);

  return (
    <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      {TvResults.map((item, index) => (
        <TvCard key={index} item={item} />
      ))}
    </div>
  );
}

export default TvShows;
