import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./Home";
import { DogDetails } from "./DogDetails.jsx";
import { Walkers } from "./Walkers.jsx";
import { CityList } from "./CitiesList.jsx";
import { WalkerDetails } from "./WalkerDetails.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path=":dogId" element={<DogDetails/>}/>
        <Route path="walkers" element={<Walkers/>}/>
        <Route path="citieslist" element={<CityList/>}/>
        <Route path="walkers">
        <Route index element={<Walkers/>}/>
        <Route path=":walkerId" element={<WalkerDetails/>}/>

        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
