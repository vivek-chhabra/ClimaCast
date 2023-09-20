import { Route, Routes } from "react-router-dom";
import Details from "./pages/details/Details";
import Search from "./pages/search/Search";
import "./App.scss";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/weatherdetails" element={<Details />} />
            </Routes>
        </div>
    );
}

export default App;
