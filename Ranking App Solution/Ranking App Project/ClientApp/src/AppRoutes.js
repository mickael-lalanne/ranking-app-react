import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import RankItemsContainer from "./components/RankItemsContainer";
import movieImageArr from "./components/MovieImages";
import AlbumImageArr from "./components/AlbumImages";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
      path: '/rank-movies',
      element: <RankItemsContainer dataType={1} imgArr={movieImageArr} />
  },
  {
      path: '/rank-albums',
      element: <RankItemsContainer dataType={2} imgArr={AlbumImageArr} />
  }
];

export default AppRoutes;
