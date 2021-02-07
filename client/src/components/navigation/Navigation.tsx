import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useUserContext } from "../../contexts/User/UserContext";
import HomeIcon from "../iconComponents/home";
import NewPost from "../NewPost";
import navlogo from '../../assets/navlogo.png';
import NavigationModal from "./NavigationModal";
import ModalContent from "./ModalContent";
import { NavWrapper } from "../../styles/Navigation";
import PostIcon from "../iconComponents/post";

/**
 * Navigation component which allows the user to access their profile, logout and navigate to the newsfeed
 */
const Navigation: React.FC = () => {
    const history = useHistory(); // allows for redirecting to different routes
    const { user, setUser } = useUserContext(); // user context 
    const [showModal, setShowModal] = useState(false); // state which allows the modal to be visible or hidden
    const closeModal = () => setShowModal(false); // function which hides the modal

    // Removes the users token that is stored in local storage and redirects the user to front page
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        history.push("/");
    }

    return (
        <NavWrapper>
            <nav>
                <Link to="/">
                    <img className="nav-logo" src={navlogo} alt="logo" />
                </Link>
                <ul>
                    <li>
                        <Link to="/">
                            <HomeIcon fill="white" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/createpost"><PostIcon fill="white" /></Link>
                    </li>
                    <li>
                        {showModal && (
                            <NavigationModal>
                                <ModalContent closeModal={closeModal} username={user.username} logout={logout} />
                            </NavigationModal>
                        )}
                        <img onClick={() => setShowModal(true)}
                        style={{
                        width: "24px",
                        height: "24px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        cursor: "pointer",
                        border: "1px solid white"
                        }}
                        src={user.avatar}
                        alt="avatar"
                        />
                    </li>
                </ul>
            </nav>
        </NavWrapper>
    );
}

export default Navigation;