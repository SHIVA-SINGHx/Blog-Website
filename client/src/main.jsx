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
import SignInPage from "./pages/SignInPage";

import { Provider as ChakraProvider } from "./components/ui/provider";

// Redux imports
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import Theme from "./components/Theme";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/posts", element: <PostPage /> },
      { path: "/:slug", element: <SinglePostPage /> },
      { path: "/write", element: <WritePage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/signin", element: <SignInPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <Theme>
          <RouterProvider router={router} />

          </Theme>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);