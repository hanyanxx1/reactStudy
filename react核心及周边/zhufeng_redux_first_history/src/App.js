import { HistoryRouter } from "./redux-first-history/rr6";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Counter from "./components/Counter";
import { Provider } from "react-redux";
import { store, history } from "./store";

function App() {
  return (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <ul>
          <li>
            <Link to="/" />
            Home
          </li>
          <li>
            <Link to="/counter" />
            Counter
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
        </Routes>
      </HistoryRouter>
    </Provider>
  );
}

export default App;
