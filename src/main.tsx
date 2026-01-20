import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Personaje } from "./components/pages/personaje.tsx";
import { Favoritos } from "./components/pages/favoritos.tsx";
import App from "./App.tsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/characters" />,
  },
  {
    path: "/characters",
    Component: App,
  },
  {
    path: "/character/:id",
    element: <Personaje />,
  },
  {
    path: "/favorites",
    Component: Favoritos,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
