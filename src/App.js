import { Switch, Route } from "react-router-dom";
import "./App.css";
import AppBar from "./components/AppBar";
import HomePage from "./components/HomePage";
import MoviesPage from "./components/MoviesPage";
import NotFound from "./components/NotFound";
import MovieDetailsPage from "./components/MovieDetailsPage";
function App() {
  return (
    <div className="App">
      <AppBar />

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
    </div>
  );
}

export default App;
