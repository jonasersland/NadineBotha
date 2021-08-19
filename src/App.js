import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Frontpage from "./pages/scroller.page.jsx";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route component={Frontpage} path="/NadineBotha/" />
      </div>
    </BrowserRouter>
  );
}
export default App;
