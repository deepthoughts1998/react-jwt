import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { SignIn } from "./pages/SignIn";
import {SignUp} from "./pages/SignUp"
import { Header } from "./components/Header";
import Protected from "./pages/Protected";

function LayoutStructure() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutStructure />,
    children: [
      {
        path: "/",
        element:<Protected><HomePage /></Protected> ,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

function App() {
  return (
    
      <div className="App">
        <RouterProvider router={router} />
      </div>
    
  );
}

export default App;
