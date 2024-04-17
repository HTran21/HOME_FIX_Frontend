import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Forbidden from '../../resources/Both/Forbidden/Forbidden';
import { useEffect } from 'react';
import AuthService from '../../service/AuthService';



const RoleBaseRoute = (props) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    const user = useSelector((state) => state.user.user);
    const userRole = user?.role;
    // console.log("Role", userRole)

    if (isAdminRoute && userRole === "AD") {
        return <>{props.children}</>;
    } else {
        return <Forbidden />;
    }
};

function ProtectedRoute(props) {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    console.log("isAuthenticated protect", isAuthenticated)
    // console.log("Protect route")
    return (
        <>
            {isAuthenticated === true ? (
                <>
                    <RoleBaseRoute>{props.children}</RoleBaseRoute>
                </>
            ) : (
                <Navigate to={"/login"} replace />
            )}


        </>
        // <> <RoleBaseRoute>{props.children}</RoleBaseRoute></>
    );
}


export default ProtectedRoute;