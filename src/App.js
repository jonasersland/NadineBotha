import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import frontpage from "./pages/frontpage.page.jsx";
import scroller from "./pages/scroller.page.jsx";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route component={scroller} path="/" />
      </div>
    </BrowserRouter>
  );
}
export default App;
