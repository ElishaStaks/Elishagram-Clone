import { toast } from 'react-toastify';

const customToast = (message: string) => {
        toast(message, {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    });
}

export default customToast;