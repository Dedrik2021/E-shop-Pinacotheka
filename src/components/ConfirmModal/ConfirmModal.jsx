import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';

import Logo from '../../UI/logo/Logo';
import img from '../../assets/images/logo.svg'


import './confirmModal.scss'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmModal = (props) => {
  const {openModal, handleClose, clickOnBtn, image, imgStyles, message} = props

  return (
    <div className='confirm'>
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Logo styles={{paddingTop: '10px', margin: '0 auto'}} img={img} height={'50'} width={'150'} />
        <DialogContent>

          <img className='image' src={image} alt="exit" style={imgStyles} />

          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className='confirm__btn btn btn--red' onClick={clickOnBtn}>Confirm</button>
          <button className='confirm__btn btn btn--red' onClick={handleClose}>Close</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmModal