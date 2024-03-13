import { useState, useEffect } from 'react';
import { Outlet, createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Header from './components/Layouts/DefaultLayout/Header/Header';
import Footer from './components/Layouts/DefaultLayout/Footer/Footer';
import HeaderOnly from './components/Layouts/OnlyLayout/HeaderOnly/HeaderOnly';
import LayoutAdmin from './components/Layouts/LayoutAdmin/LayoutAdmin';
// import { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from './resources/Both/Home/Home';
import Service from './resources/Both/Service/Service';
import About from './resources/Both/About/About';
import Contact from './resources/Both/Contact/Contact';
import Login from './resources/Both/Login/Login';
import Register from './resources/Both/Register/Register';
import FormRepair from './resources/User/FormRepair/FormRepair';
import DetailRepair from './resources/Both/DetailRepair/DetailRepair';
import Forbidden from './resources/Both/Forbidden/Forbidden';
import PageNotFound from './resources/Both/PageNotFound/PageNotFound';


import AdminHomePage from './resources/Admin/AdminHomePage/AdminHomePage';
import Products from './resources/Admin/Products/Products';
import AdminServices from './resources/Admin/AdminServices/AdminServices';
import AddService from './resources/Admin/AddService/AddService';
import EditService from './resources/Admin/EditService/EditService';
import ServiceOperation from './resources/Admin/ServiceOperation/ServiceOperation';


import Loading from './components/Loading/Loading';
import OnTopButton from './components/OnTopButton/OnTopButton';

import { useDispatch, useSelector } from 'react-redux';
import { doLoginAction } from './redux/reducer/userSlice';
import AuthService from './service/AuthService';


const Layout = () => {
  return (
    <div>
      {/* <Toaster position='top-right' /> */}
      <Header />
      <Outlet />
      <OnTopButton />
      <Footer />

    </div>
  )
}

const LayoutOnly = () => {
  return (
    <div>
      <HeaderOnly />
      <Outlet />
    </div>
  )
}

// const checkAdminAccess = () => {
//   const userRole = useSelector((state) => state.user.user.role);
//   console.log("CHECK ROLE", userRole === 'AD')
//   return userRole === 'AD';
// }


function App() {


  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const getAccount = async () => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    ) {
      return;
    }

    const res = await AuthService.fetchProfile();
    if (res.status === 200 && res.data.id) {
      dispatch(doLoginAction(res.data));
      // console.log("Du lieu luu vao redux", res)
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  const router = createBrowserRouter([

    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: < HomePage />
        },
        {
          path: "service",
          element: <Service />,

        },
        {
          path: "about",
          element: <About />
        },
        {
          path: "contact",
          element: <Contact />
        },
        {
          path: "detail",
          element: <DetailRepair />
        },


      ]
    }
    ,
    {
      path: "/admin",
      // element: checkAdminAccess() ? <LayoutAdmin /> : <Navigate to="/403" />,
      element: <LayoutAdmin />,

      children: [
        {
          index: true,
          element: <AdminHomePage />,
        },
        {
          path: "product",
          element: <Products />,


        },
        {
          path: "service",
          element: <AdminServices />

        },
        {
          path: "addservice",
          element: <AddService />

        },
        ,
        {
          path: "editService/:id",
          element: <EditService />

        },
        {
          path: "operation",
          element: <ServiceOperation />

        },
      ]
    },
    {
      path: "/",
      element: <LayoutOnly />,
      children: [
        {
          path: "login",
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        }
      ]
    },
    {
      path: "repair",
      element: <FormRepair />
    },
    {
      path: "403",
      element: <Forbidden />
    },
    {
      path: "/:slug",
      element: <PageNotFound />
    }
  ])

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  // return (
  //   <>
  //     {!isLoading && (
  //       <RouterProvider router={router} />
  //     )}

  //     {isLoading && <Loading />}
  //   </>
  // )

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
