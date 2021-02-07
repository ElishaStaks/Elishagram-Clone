import { Link } from "react-router-dom";
import { NavModalContentWrapper } from "../../styles/Navigation";

interface ModalProps {
    closeModal: () => void;
    username: string;
    logout: () => void;
}

const ModalContent: React.FC<ModalProps> = ({ closeModal, username, logout }) => {

    return (
        <NavModalContentWrapper>
            <span onClick={closeModal}><Link to={`/${username}`}>Profile</Link></span>
            <span onClick={logout}> Log Out </span>
            <span onClick={closeModal}> Cancel </span>
        </NavModalContentWrapper>
    );
}

export default ModalContent;