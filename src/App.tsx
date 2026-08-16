import {  createBrowserRouter,  RouterProvider,} from "react-router";
import { Provider } from 'react-redux'
import LandingPage from "./pages/LandingPage";
import DashBoard from "./pages/DashBoard";
import Register from "./component/Register";
import Login from "./component/Login";
import Investment from "./component/Investment";
import RoiHistory from "./component/RoiHistory";
import ReferrelIncome from "./component/ReferrelIncome";
import {store} from "./redux/store";
import {Toaster } from "react-hot-toast"
import PrivateRoute from "./utils/protectedRoute";


const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
    children:[
      {path:"register", Component:Register},
      {path:"login", Component:Login}
    ]
  },
  {
    path:"/Dashboard/:id",
    element:(
      <PrivateRoute>
        <DashBoard/>
      </PrivateRoute>
      ),
    children:[
      {path:"investments", element:(
      <PrivateRoute>
        <Investment/>
      </PrivateRoute>
      )},
      {path:"roiHistory", element:(
      <PrivateRoute>
        <RoiHistory/>
      </PrivateRoute>
      )},
      {path:"referrelIncome", element:(
      <PrivateRoute>
        <ReferrelIncome/>
      </PrivateRoute>
      )}
    ]
  }
]);


const App = () => {
  return (
    <>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position='bottom-left' 
      />
    </Provider>
    </>
  )
}

export default App;