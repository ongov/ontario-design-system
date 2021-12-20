import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import OntarioButton from "./stories/ontario-button";


const StoryRouter = () => {
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ontario-button" element={<OntarioButton />}/>
    </Routes>
}

export default StoryRouter;
