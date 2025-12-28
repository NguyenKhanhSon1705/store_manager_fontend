import { Fragment, memo, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { getListRolesShop } from '../../store/actions/rolesAction';
import SelectBox from '../../components/selectBox/SelectBox'
import PropTypes from 'prop-types';


function DiglogCreateUser({
    title = "Thêm mới nhân viên",
    open,
    onClose,
    onSubmit
}) {
    
    const [valueInput, setValueInput] = useState({
        email: '',
        fullName: '',
        phoneNumber: '',
        address: '',
        birthDay: '',
        gender: '',
        roleId: ''
    })

    const {data} = useSelector(state => state.role)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getListRolesShop())
    } , [dispatch])
    console.log(data);
    
    return (
        <Fragment >
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        onClose();
                        onSubmit(valueInput)
                    },
                }}
                fullWidth
            >
                <DialogTitle
                    borderBottom={"1px solid #bcbcbc"}
                    fontWeight={"bold"}
                    textAlign={"center"}>{title}</DialogTitle>
                <DialogContent content='center'>
                    <div className="grid grid-cols-2 grid-rows-4 gap-2">
                        <div >
                            <TextField
                                autoFocus={true}
                                required={true}
                                label={"Email"}
                                type={'email'}
                                value={valueInput.email}
                                onChange={e => setValueInput(prev => ({ ...prev, email: e.target.value }))}
                                fullWidth
                                variant="standard"
                                margin="dense"
                            />
                        </div>
                        <div >
                            <TextField
                                required={true}
                                label={"Họ & Tên"}
                                type={'text'}
                                value={valueInput.fullName}
                                onChange={e => setValueInput(prev => ({ ...prev, fullName: e.target.value }))}
                                fullWidth
                                variant="standard"
                                margin="dense"
                            />
                        </div>
                        <div >
                            <TextField
                                required={true}
                                label={"Số điện thoại"}
                                type={'number'}
                                value={valueInput.phoneNumber}
                                onChange={e => setValueInput(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                fullWidth
                                variant="standard"
                                margin="dense"
                            />
                        </div>
                        <div >
                            <TextField
                                label={"Địa chỉ"}
                                type={'text'}
                                value={valueInput.address}
                                onChange={e => setValueInput(prev => ({ ...prev, address: e.target.value }))}
                                fullWidth
                                variant="standard"
                                margin="dense"
                            />
                        </div>
                        <div >
                            <TextField
                                label={" "}
                                type={'date'}
                                value={valueInput.birthDay}
                                onChange={e => setValueInput(prev => ({ ...prev, birthDay: e.target.value }))}
                                fullWidth
                                variant="standard"
                                margin="dense"
                            />
                        </div>

                        <div className='text-center' >
                            <FormControl
                            >
                                <FormLabel id="demo-row-radio-buttons-group-label">Giới tính</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    onChange={e => setValueInput(prev => ({...prev, gender: +e.target.value}))}
                                    value={valueInput.gender}
                                >
                                    <FormControlLabel value="0" control={<Radio />} label="Nữ" />
                                    <FormControlLabel value="1" control={<Radio />} label="Nam" />
                                    <FormControlLabel value="2" control={<Radio />} label="Khác" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="col-span-2">
                            <SelectBox
                                fullWidth={true}
                                data={data}
                                valueName='name'
                                keyName='id'
                                label='Vai trò'
                            onChange={value => setValueInput(prev => ({...prev, roleId: value}) )}
                            // defaultValue = {areaId}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        className='!bg-[var(--primary)] !text-white'
                        type="submit">Gửi</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

DiglogCreateUser.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };
export default memo(DiglogCreateUser);
