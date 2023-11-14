import PageLayout from "./PageLayout"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import NotFound from "./NotFound";
import Home from "./Home.JSX";


export default function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
    
    </>
  )
}
