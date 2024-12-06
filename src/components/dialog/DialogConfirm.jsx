import {forwardRef, Fragment, } from 'react'

import Button from '../buttons/Button'
import { Dialog, DialogActions, DialogTitle, Slide } from '@mui/material';
import PropTypes from 'prop-types';
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function DialogConfirm({ title = '', open = false, items = [], onClose, onSubmit }) {
  return (
    <Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose }
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          textAlign={"center"}
        >{title}</DialogTitle>
        <DialogActions
          className='!justify-around '
        >
          <Button onClick={onClose}>Hủy</Button>
          <Button
            className='!bg-[var(--primary)] !text-[var(--textlight)]'
            onClick={()=> onSubmit(items)}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
DialogConfirm.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  items: PropTypes.array, // items là một mảng chứa các object (nếu items có cấu trúc cụ thể, có thể thay thế bằng shape)
  onClose: PropTypes.func,        // onClose là một hàm và bắt buộc phải có
  onSubmit: PropTypes.func        // onSubmit là một hàm và bắt buộc phải có
};
export default DialogConfirm