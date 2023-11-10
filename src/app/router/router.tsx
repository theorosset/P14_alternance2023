import { createBrowserRouter } from "react-router-dom";
import CreateEmployePage from "../pages/createEmployePage/CreateEmployePage";

const router = createBrowserRouter([
    {
      path: '/',
      element: <CreateEmployePage />,
    }
  ])
  
  export default router