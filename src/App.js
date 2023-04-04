import "./App.css";
import store from "./store/index";
import { Provider } from "react-redux";
import Users from "./components";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Users />
      </div>
    </Provider>
  );
}

export default App;
