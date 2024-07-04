import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddNewNotes from "./pages/NewNotes/AddNewNotes";

const routes = (
    <Router>
        <Routes>
            <Route path="/notes-app/" exact element={<Home />} />
            <Route path="/notes-app/newnotes" exact element={<AddNewNotes />} />
        </Routes>
    </Router>
);
const App = () => {
    return <div>{routes}</div>;
};

export default App;
