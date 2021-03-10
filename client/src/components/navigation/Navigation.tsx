import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import { Link, useHistory } from 'react-router-dom';
import navlogo from '../../assets/navlogo.png';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import { useUserContext } from '../../contexts/User/UserContext';
import NavigationModal from './NavigationModal';
import ModalContent from './ModalContent';
import customToast from '../../util/customToast';

// material ui app bar styles
const useStyles = makeStyles((theme: Theme) => createStyles({
    grow: {
        flexGrow: 1,
    },
    wrapper: {
        position: 'fixed',
        top: 0,
        borderBottom: '1px solid',
        padding: '1rem 0',
        zIndex: 10,
    },
    menuButton: {
        marginRight: theme.spacing(1.3),
    },
    logo: {
        position: 'relative',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0 auto',
        width: 980,
        
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
}));

const Navigation: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const { user, setUser } = useUserContext();

    const [showModal, setShowModal] = useState(false); // state which allows the modal to be visible or hidden
    const closeModal = () => setShowModal(false); // function which hides the modal

    // Removes the users token that is stored in local storage and redirects the user to front page
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        history.push("/");
        customToast("Signed out successfull")
    }

    return (
        <div className={classes.wrapper}>
            <AppBar position="fixed" style={{background: '#262626'}}>
                <Toolbar className={classes.toolbar}>
                    <Link to="/">
                        <img className={classes.logo} src={navlogo} alt="logo" />
                    </Link>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Link to="/" ><HomeOutlinedIcon className={classes.menuButton} style={{fontSize: 25}} /></Link>
                        <Link to="/usersuggestions" ><PersonAddOutlinedIcon className={classes.menuButton} style={{fontSize: 25}} /></Link>
                        <Link to="/createpost" ><PhotoCameraOutlinedIcon className={classes.menuButton} style={{fontSize: 25}} /></Link>
                         {showModal && (
                            <NavigationModal>
                                <ModalContent closeModal={closeModal} username={user.username} logout={logout} />
                            </NavigationModal>
                        )}
                        <img onClick={() => setShowModal(true)}
                        src={user.avatar} 
                        style={{
                        width: "25px",
                        height: "25px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        cursor: "pointer",
                        border: "1px solid white"
                        }} 
                        alt="avatar" />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navigation;