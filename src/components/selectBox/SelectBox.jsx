import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

export default function SelectBox({
    label = 'Label',
    data,
    keyName,
    valueName,
    onChange,
    defaultValue,
    disabled = false
 } = {
}) {
    
    const [value, setValue] = React.useState(defaultValue || '')
    
    const handleOnChangeSetValue = (e)=>{
        const currvalue = e.target.value
        setValue(currvalue);
        if(onChange) onChange(currvalue);
    }

    return (
        <div>
            <FormControl
            className='!m-0'
            fullWidth 
            variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
                <Select
                    required
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={defaultValue || value}
                    onChange={handleOnChangeSetValue}
                    label={label}
                    disabled={disabled}
                >
                    {data && data.map((item, index) => (
                        <MenuItem key={index} value={item[keyName]}>
                            {item[valueName]}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            
        </div>
    );
}

SelectBox.propTypes = {
    label: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object), // Giả sử data là mảng đối tượng
    keyName: PropTypes.string,
    valueName: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    disabled: PropTypes.bool,
};