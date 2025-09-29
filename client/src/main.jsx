import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import PostPage from "./pages/PostPage.jsx";
import SinglePostPage from "./pages/SinglePostPage.jsx";
import WritePage from "./pages/WritePage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";

import { Provider } from "./components/ui/provider"



// Create a client

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/posts", element: <PostPage /> },
      { path: "/:slug", element: <SinglePostPage /> },
      { path: "/write", element: <WritePage /> },
      { path: "/signup", element: <SignUpPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
<StrictMode>
        <Provider>
      <RouterProvider router={router} />
        </Provider>

  </StrictMode>
);
