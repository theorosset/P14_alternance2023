import { createBrowserRouter } from "react-router-dom";
import CreateEmployePage from "../pages/createEmployePage/CreateEmployePage";
import EmployeListingPage from "../pages/employeListingPage/EmployeListingPage";

const router = createBrowserRouter([
    {
      path: '/',
      element: <CreateEmployePage />,
    },
    {
      path: '/employe-listing',
      element: <EmployeListingPage />,
    }
  ])
  
  export default router