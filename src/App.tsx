import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Search from "./pages/search/Search";
import Details from "./pages/details/Details";

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
