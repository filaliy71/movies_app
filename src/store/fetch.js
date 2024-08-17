fetch(
  "https://api.themoviedb.org/3/discover/movie?api_key=6873db75b210f58cfd84af652461fdc6"
)
  .then((res) => res.json())
  .then((data) => console.log(data.results))
  .catch((error) => console.error("Error fetching data:", error));
