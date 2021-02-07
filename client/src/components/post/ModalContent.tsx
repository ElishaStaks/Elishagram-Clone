import { ModalContentWrapper } from '../../styles/Post';
import DeletePost from './DeletePost';

interface ModalProps {
    postId: string;
    closeModal: () => void;
}

/**
 * Pop up modal when the user decides to press the more icon button which allows the user to delete their post 
 */
const ModalContent: React.FC<ModalProps> = ({ postId, closeModal }) => {

    return (
        <ModalContentWrapper>
            <DeletePost postId={postId} closeModal={closeModal} goToHome={true} />
            <span onClick={closeModal}>
                Cancel
            </span>
        </ModalContentWrapper>
    );
};

export default ModalContent;