import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import frontpage from "./pages/frontpage.page.jsx";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route component={frontpage} path="/:slug" />
      </div>
    </BrowserRouter>
  );
}
export default App;
