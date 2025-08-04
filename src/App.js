import "./App.css";
import { Provider } from "react-redux";
import { store } from "./Actions/store";
import Dcandidate from "./Components/Dcandidate";
import { Container } from "@material-ui/core";

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="lg">
        <Dcandidate />
      </Container>
    </Provider>
  );
}

export default App;
