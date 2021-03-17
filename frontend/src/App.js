import "./App.css";
import MainScreen from "./Screens/MainScreen";
import AuthScreen from "./Screens/AuthScreen";
// import config from "./config.js";

const App = () => {
  return <>{true ? <AuthScreen /> : <MainScreen />}</>;
};

export default App;
