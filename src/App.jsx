import { useState, useEffect } from 'react';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Layouts/DefaultLayout/Header/Header';
import Footer from './components/Layouts/DefaultLayout/Footer/Footer';
import HeaderOnly from './components/Layouts/OnlyLayout/HeaderOnly/HeaderOnly';

import HomePage from './resources/Both/Home/Home';
import Service from './resources/Both/Service/Service';
import About from './resources/Both/About/About';
import Contact from './resources/Both/Contact/Contact';
import Login from './resources/Both/Login/Login';
import Register from './resources/Both/Register/Register';
import FormRepair from './resources/User/FormRepair/FormRepair';
import DetailRepair from './resources/Both/DetailRepair/DetailRepair';
import PageNotFound from './resources/Both/PageNotFound/PageNotFound';


import Loading from './components/Loading/Loading';
import OnTopButton from './components/OnTopButton/OnTopButton';

import { useDispatch, useSelector } from 'react-redux';
import { doLoginAction } from './redux/reducer/userSlice';
import AuthService from './service/AuthService';


const Layout = () => {
  return (
    <div>
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
    if (res && res.data !== null) {
      dispatch(doLoginAction(res.data));
      console.log("Du lieu luu vao redux", res)
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
          element: <Service />
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
    },
    ,
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
      path: "/:slug",
      element: <PageNotFound />
    },
    {
      path: "repair",
      element: <FormRepair />
    }
  ])

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

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
    </>
  )
}

export default App
