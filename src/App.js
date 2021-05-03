import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import scroller from "./pages/scroller.page.jsx";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route component={scroller} path="/NadineBotha/" />
      </div>
    </BrowserRouter>
  );
}
export default App;
