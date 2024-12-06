import { Fragment, memo, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import images from '~/assets/images';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import PropTypes from 'prop-types';
function DialogMenuGroup({
    title = "Tạo nhóm sản phẩm",
    open,
    onClose,
    onSubmit,
    items = []
}) {
    const [valueInput, setValueInput] = useState(() => ({
        name: items?.name || '',
        order: items?.order || '',
        image: items?.image || '',
        description: items?.description || '',
        status: items?.status ?? true
    }));
    
    const [selectedImage, setSelectedImage] = useState(items?.image || images.img_default);

    useEffect(() => {
        if (open) {
            setValueInput({
                name: items?.name || '',
                order: items?.order || '',
                image: items?.image || '',
                description: items?.description || '',
                status: items?.status ?? true
            });
            setSelectedImage(items?.image || images.img_default);
        }
    }, [open , items]);
    

    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setValueInput(prev => ({ ...prev, image: file }));
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleChooseImage = () => {
        fileInputRef.current.click();
    };

    const handleClearImage = () => {
        setSelectedImage(images.avt_user_default);
        setValueInput(prev => ({ ...prev, image: null }));
        fileInputRef.current.value = null;
    };

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        valueInput.id = items.id
                        onSubmit(valueInput);
                        onClose();
                    },
                }}
                fullWidth
            >
                <DialogTitle
                    borderBottom={"1px solid #bcbcbc"}
                    fontWeight={"bold"}
                    textAlign={"center"}
                >
                    {title}
                </DialogTitle>
                <DialogContent content='center'>
                    <div className="grid grid-cols-3 grid-rows-3 gap-4">
                        <div className="row-span-3 flex flex-col items-center justify-center relative">
                            <img
                                className="object-cover w-32 h-32 rounded-full"
                                src={selectedImage}
                                alt="User Avatar"
                            />
                            <button
                                type="button"
                                onClick={handleChooseImage}
                                className="mt-2 p-1 bg-[var(--primary)] text-white rounded text-[15px]"
                            >
                                Chọn ảnh
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                            {selectedImage !== images.img_default && (
                                <button
                                    type="button"
                                    onClick={handleClearImage}
                                    className="absolute top-5 right-10 bg-[var(--primary)] text-white rounded-full w-6 h-6 flex items-center justify-center"
                                    aria-label="Clear Image"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        <div className="col-span-2">
                            <TextField
                                label={"Tên nhóm sản phẩm"}
                                type={'text'}
                                value={valueInput.name}
                                onChange={e => setValueInput(prev => ({ ...prev, name: e.target.value }))}
                                fullWidth
                                variant="standard"
                                margin="dense"
                                required
                            />
                        </div>
                        <div className="col-start-2 row-start-2">
                            <TextField
                                label={"Thứ tự hiển thị"}
                                type={'number'}
                                value={valueInput.order}
                                onChange={e => setValueInput(prev => ({ ...prev, order: e.target.value }))}
                                fullWidth
                                variant="standard"
                                margin="dense"
                            />
                        </div>
                        <div className="col-start-3 row-start-2 flex items-end">
                            <FormControlLabel
                                variant={"standard"}
                                control={
                                    <Checkbox
                                        checked={valueInput.status}
                                        onChange={e => setValueInput(prev => ({ ...prev, status: e.target.checked }))}
                                    />
                                }
                                label="Hiển thị"
                            />
                        </div>
                        <div className="col-span-2 col-start-2 row-start-3">
                            <TextField
                                label={"Mô tả"}
                                type={'text'}
                                value={valueInput.description}
                                onChange={e => setValueInput(prev => ({ ...prev, description: e.target.value }))}
                                fullWidth
                                variant="standard"
                                margin="dense"
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Hủy</Button>
                    <Button
                        className='!bg-[var(--primary)] !text-white'
                        type="submit"
                    >
                        Gửi
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
DialogMenuGroup.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
    items: PropTypes.object,
};
export default memo(DialogMenuGroup);
