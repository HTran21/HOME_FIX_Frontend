import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

export function checkUserRole(role) {
    // const navigate = useNavigate();

    return () => {
        // const userRole = useSelector((state) => state.user.user?.role);
        // console.log("Di vao useCheck")
        // if (userRole === role) {
        //     return true;
        // } else {
        //     // navigate("/403");
        //     return console.log("Di vao useCheck");
        // }
    };
}