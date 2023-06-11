import { BrowserRouter, Routes, Route } from "react-router-dom";
import BiblePage from "./pages/bible";
import HomePage from "./pages/home";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/bible" Component={BiblePage} />
                <Route path="*" Component={HomePage} />
            </Routes>
        </BrowserRouter>
    );
}
