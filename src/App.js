import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Palettes from "./pages/Palettes";
import Palette from "./pages/Palette";
import CreateNewPalette from "./pages/CreateNewPalette";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Palettes />,
    },
    {
      path: "/:id",
      element: <Palette />,
    },
    {
      path: "/create-palette",
      element: <CreateNewPalette />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
