import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';

import Logo from '../../UI/logo/Logo';
import img from '../../assets/images/logo.svg'
import image from '../../assets/images/exit.gif'

import './logoutModal.scss'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LogoutModal = ({openLogout, handleClose, clickLogout}) => {
  const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

  return (
    <div>
      <Dialog
        open={openLogout}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Logo styles={{paddingTop: '10px', margin: '0 auto'}} img={img} height={'50'} width={'150'} />
        <DialogContent>

          <img className='image' src={image} alt="exit" />

          <DialogContentText id="alert-dialog-slide-description">
          {switchBtn ? 
          'Sind Sie sicher, dass Sie sich von Ihrem Konto abmelden möchten' : 
          'Are you sure, you want to log out of your account?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className='logout__btn btn btn--red' onClick={clickLogout}>Confirm</button>
          <button className='logout__btn btn btn--red' onClick={handleClose}>Close</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LogoutModal