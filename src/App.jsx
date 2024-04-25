import { useState, useEffect, useMemo } from 'react';
import { Outlet, createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Header from './components/Layouts/DefaultLayout/Header/Header';
import Footer from './components/Layouts/DefaultLayout/Footer/Footer';
import HeaderOnly from './components/Layouts/OnlyLayout/HeaderOnly/HeaderOnly';
import LayoutAdmin from './components/Layouts/LayoutAdmin/LayoutAdmin';
import LayoutRepairer from './components/Layouts/LayoutRepairer/LayoutRepairer';
import LayoutUser from './components/Layouts/LayoutUser/LayoutUser';
// import { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from './components/ProtectedRoute/ProtectRoute';

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
import Result from './resources/Both/Result/Result';
import Product from './resources/Both/Product/Product';


import AdminHomePage from './resources/Admin/AdminHomePage/AdminHomePage';
import Products from './resources/Admin/Products/Products';
import AdminServices from './resources/Admin/AdminServices/AdminServices';
import AddService from './resources/Admin/AddService/AddService';
import EditService from './resources/Admin/EditService/EditService';
import ServiceOperation from './resources/Admin/ServiceOperation/ServiceOperation';
import CreatServiceOperation from './resources/Admin/CreatServiceOperation/CreatServiceOperation';
import Brand from './resources/Admin/Brand/Brand';
import Categories from './resources/Admin/Categories/Categories';
import AddProduct from './resources/Admin/AddProduct/AddProduct';
import EditProduct from './resources/Admin/EditProduct/EditProduct';
import Specialization from './resources/Admin/Specialization/Specialization';
import Staff from './resources/Admin/Staff/Staff';
import CalendarStaff from './resources/Admin/Calendar/CalendarStaff';
import ListAllOrder from './resources/Admin/ListAllOrder/ListAllOrder';
import AcceptForm from './resources/Admin/AcceptForm/AcceptForm';
import ChatAdmin from './resources/Admin/ChatAdmin/ChatAdmin';
import Statistical from './resources/Admin/Statistical/Statistical';
import StatisticalOrder from './resources/Admin/StatisticalOrder/StatisticalOrder';
import DetailOrderAdmin from './resources/Admin/DetailOrderAdmin/DetailOrderAdmin';
import ListCustomer from './resources/Admin/Customer/ListCustomer';

import ProfileUser from './resources/User/ProfileUser/ProfileUser';
import Chat from './resources/User/Chat/Chat';
import DetailOrder from './resources/User/DetailOrder/DetailOrder';
import EditProfile from './resources/User/EditProfile/EditProfile';
import FormRepairEdit from './resources/User/FormRepairEdit/FormRepairEdit';
import ListOrder from './resources/User/ListOrder/ListOrder';
import FormRepairRepairer from './resources/Repairer/FormRepairRepairer/FormRepairRepairer';
import TaskDetail from './resources/Repairer/TaskDetail/TaskDetail';

import RepairerHomePage from './resources/Repairer/RepairerHomePage/RepairerHomePage';
import ListWork from './resources/Repairer/ListWork/ListWork';
import CalanderRepairer from './resources/Repairer/Calender/Calender';
import CreateCalenderRepair from './resources/Repairer/CreateCalender/CreateCalender';
import ProfileRepairer from './resources/Repairer/ProfileRepairer/ProfileRepairer';
import ConfirmOrder from './resources/Repairer/ConfirmOrder/ConfirmOrder';
import Statistic from './resources/Repairer/Statistic/Statistic';
import AcceptOrderRepairer from './resources/Repairer/AcceptOrderRepairer/AcceptOrderRepairer';
import SelectPayment from './resources/Repairer/SelectPayment/SelectPayment';
import NotificationRepairer from './resources/Repairer/NotificationRepairer/NotificationRepairer';

import Loading from './components/Loading/Loading';
import OnTopButton from './components/OnTopButton/OnTopButton';

import { useDispatch, useSelector } from 'react-redux';
import { doLoginAction } from './redux/reducer/userSlice';
import AuthService from './service/AuthService';
import NotFound from './components/NotFound/NotFound';
import EditProfileRepairer from './resources/Repairer/EditProfileRepairer/EditProfileRepairer';

import Test from './resources/Both/Test/Test';
import FeedbackOrder from './resources/Admin/FeedbackOrder/FeedbackOrder';
import EditAcceptForm from './resources/Admin/EditAcceptForm/EditAcceptForm';
import FeedbackRepairer from './resources/Repairer/FeedbackRepairer/FeedbackRepairer';


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

  const isLoading = useSelector((state) => state.user.isLoading);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const getAccount = async () => {
    // if (
    //   window.location.pathname === "/login" ||
    //   window.location.pathname === "/register"
    // ) {
    //   return;
    // }
    // console.log("get Account")

    const res = await AuthService.fetchProfile();
    // console.log("fetchProfile", res);
    if (res.status === 200 && res.data.id) {
      dispatch(doLoginAction(res.data));
      // console.log("Du lieu luu vao redux", res)
    }
  };

  useEffect(() => {
    getAccount();
  }, []);


  // const [isLoading, setIsLoading] = useState(true);

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
          path: "product",
          element: <Product />
        },
        {
          path: "contact",
          element: <Contact />
        },
        {
          path: "/service/detail/:id",
          element: <DetailRepair />
        },


      ]
    }
    ,
    {
      path: "/admin",
      // element: checkAdminAccess() ? <LayoutAdmin /> : <Navigate to="/403" />,
      element: (
        <ProtectedRoute>
          <LayoutAdmin />
        </ProtectedRoute>
      ),
      // element: <LayoutAdmin />,

      children: [
        {
          index: true,
          element: <AdminHomePage />
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
        {
          path: "creatoperation",
          element: <CreatServiceOperation />

        },
        {
          path: "brand",
          element: <Brand />

        },
        {
          path: "categories",
          element: <Categories />

        },
        ,
        {
          path: "addproduct",
          element: <AddProduct />

        },
        {
          path: "specialize",
          element: <Specialization />

        },
        {
          path: "staff",
          element: <Staff />

        },
        {
          path: "customer",
          // element: <Customer />
          element: <ListCustomer />

        },
        {
          path: "order",
          element: <ListAllOrder />

        },
        {
          path: "order/:id",
          element: <DetailOrderAdmin />,
        },
        {
          path: "order/feedback",
          element: <FeedbackOrder />

        },
        {
          path: "calendar",
          element: <CalendarStaff />

        },
        {
          path: "statistic/earn",
          element: <Statistical />

        },
        {
          path: "statistic/order",
          element: <StatisticalOrder />

        },
        {
          path: "chat",
          element: <ChatAdmin />

        },
        {
          path: "editproduct/:id",
          element: <EditProduct />

        },

      ]
    },
    {
      path: "/user",
      // element: checkAdminAccess() ? <LayoutAdmin /> : <Navigate to="/403" />,
      element: (
        <LayoutUser />
      ),
      // element: <LayoutAdmin />,

      children: [
        {
          index: true,
          element: <ProfileUser />
        },
        {
          path: "edit",
          element: <EditProfile />,
        },
        {
          path: "order",
          element: <ListOrder />,
        },
        {
          path: "order/:id",
          element: <DetailOrder />,
        },
        {
          path: "chat",
          element: <Chat />,
        },


      ]
    },
    {
      path: "/repairer",
      element: <LayoutRepairer />,
      children: [
        {
          index: true,
          element: <RepairerHomePage />
        },
        {
          path: "work",
          element: <ListWork />
        },
        {
          path: "work/:id",
          element: <FormRepairRepairer />
        },
        {
          path: "task/:id",
          element: <TaskDetail />
        },
        {
          path: "confirm/:id",
          element: <ConfirmOrder />
        },
        {
          path: "select/:id",
          element: <SelectPayment />
        },
        {
          path: "accept/:id",
          element: <AcceptOrderRepairer />
        },

        {
          path: "calendar",
          element: <CalanderRepairer />
        },
        {
          path: "calendar/create",
          element: <CreateCalenderRepair />
        },
        {
          path: "statistic",
          element: <Statistic />
        },
        {
          path: "profile",
          element: <ProfileRepairer />
        },
        {
          path: "profile/edit",
          element: <EditProfileRepairer />
        },
        {
          path: "notification",
          element: <NotificationRepairer />
        },
        {
          path: "feedback",
          element: <FeedbackRepairer />
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
      path: "repair/edit/:id",
      element: <FormRepairEdit />,
    },
    {
      path: "repair/accept/:id",
      element: <AcceptForm />

    },
    {
      path: "repair/editAccept/:id",
      element: <EditAcceptForm />
    },
    {
      path: "test",
      element: <Test />

    },
    {
      path: "result",
      element: <Result />

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

  // useEffect(() => {
  //   const loadingTimeout = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);

  //   return () => clearTimeout(loadingTimeout);
  // }, []);

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

      {isLoading === false ||
        window.location.pathname === "/login" ||
        window.location.pathname === "/register" ||
        // window.location.pathname.startsWith("/") ||
        window.location.pathname === "/" ||
        window.location.pathname.startsWith("/service") ||
        window.location.pathname === "/product" ||
        window.location.pathname === "/about" ||
        window.location.pathname === "/contact"
        ? (
          <RouterProvider router={router} />
        ) : (

          <Loading />
        )}
      {/* <RouterProvider router={router} /> */}
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
