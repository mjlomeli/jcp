import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from "./frontend/store/store";
import Root from "./frontend/components/root";

document.addEventListener("DOMContentLoaded", () => {
    const store = configureStore();
    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store}/>, root);
});