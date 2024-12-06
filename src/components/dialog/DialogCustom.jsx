import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

function DialogCustom({
    title = "Thông báo",
    open = false,
    onClose,
    onSubmit,
    item = [],
    fields = []
}) {
    const [formData, setFormData] = React.useState({});
    React.useEffect(() => {
        if (open && item) { // Chỉ reset khi Dialog mở
            const initialFormData = {};
            fields.forEach(field => {
                initialFormData[field.name] = item?.[field.name] || ''; // Set giá trị ban đầu từ item hoặc ''
            });
            setFormData(initialFormData);
        }
    }, [item, fields, open]); // Thêm open để reset khi Dialog mở lại

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <React.Fragment >
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                      event.preventDefault();
                      formData.id = item.id
                      onSubmit(formData)
                      onClose();
                    },
                  }}
                fullWidth
            >
                <DialogTitle textAlign={"center"}>{title}</DialogTitle>
                <DialogContent>
                    {fields.map((field) => (
                        <TextField
                            key={field.name}
                            autoFocus={field.autoFocus}
                            required={field.required}
                            name={field.name}
                            label={field.label}
                            type={field.type}
                            value={formData[field.name] || item[field.name]}
                            onChange={handleInputChange}
                            fullWidth
                            variant="standard"
                            margin="dense"
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        className='!bg-[var(--primary)] !text-white'
                        type="submit">Gửi</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

DialogCustom.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    item: PropTypes.object,
    fields: PropTypes.arrayOf(PropTypes.object), // Hoặc PropTypes.array nếu không muốn chi tiết hơn
};

export default DialogCustom;
