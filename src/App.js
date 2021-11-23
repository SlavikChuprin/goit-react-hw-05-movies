import { Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import AppBar from "./components/AppBar";
import NotFound from "./components/NotFound";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const HomePage = lazy(() =>
  import("./components/HomePage" /* webpackChunkName: "HomePage" */)
);
const MoviesPage = lazy(() =>
  import("./components/MoviesPage" /* webpackChunkName: "MoviesPage" */)
);
const MovieDetailsPage = lazy(() =>
  import(
    "./components/MovieDetailsPage" /* webpackChunkName: "MovieDetailsPage" */
  )
);

function App() {
  return (
    <div className="App">
      <AppBar />
      <Suspense
        fallback={
          <Loader
            type="Grid"
            color="#00BFFF"
            height={500}
            width={500}
            timeout={3000}
          />
        }
      >
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies/" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:filmId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
