import { Alert, Snackbar } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
function BoxNotication({ message, type = 'error', handleClose , open  = false, timeout = 5000 }) {
    return (
      <div>
        <Snackbar open={open} autoHideDuration={timeout} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={type}
            variant="filled"
            sx={{ position: 'fixed' , top: '80px' , right: '30px' , maxWidth: '400px' , minWidth: '200px' }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    );
}
BoxNotication.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'success', 'info', 'warning']), // Có thể thêm các loại khác nếu cần
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  timeout: PropTypes.number
};

export default memo(BoxNotication);