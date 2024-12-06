import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

export default function DialogInput({open = false , handleClose ,onSubmit }) {
    const [password, setPassword] = React.useState('');
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            onSubmit(password)
            handleClose();
          },
        }}
      >
        <DialogTitle>Yêu cầu nhập mật khẩu</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Bạn có chắc chắn muốn xóa cửa hàng này không ?
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name = "password"
            label="password"
            type="password"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Xóa</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
DialogInput.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};