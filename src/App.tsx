import React, { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

const ProductPage = React.lazy(() => import("./pages/product/[id]"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/product/:id"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <ProductPage />
            </Suspense>
          }
        />
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </>
  );
}

export default App;
