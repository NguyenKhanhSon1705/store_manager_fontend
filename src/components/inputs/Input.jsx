
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';

import utils from "~/utils/index";

export default function Input({
    onChange,
    onFocus,
    rule,
    value,
    disabled,
    type,
    name,
    label,
    classDiff,
    classDiffLabel,
    ...passProps
}) {
    const [error, setError] = useState('')
    
    const props = {
        onFocus,
        value,
        disabled,
        ...passProps
    }

    return (
        <div className={`relative z-0 w-full `}>
            <input
                onChange={e => {
                    let cur = e.target.value
                    if(rule) setError(utils.validateInput(cur, rule))
                    onChange(cur)
                }}
                {...props}
                disabled={disabled}
                type={type || 'text'}
                className={classNames(`peer block py-2.5 px-1 w-full text-sm text-[var(--textdark)] bg-transparent border-0 border-b-[2px] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--primary)] ${disabled ? "border-gray-200" : "border-gray-400"
                    }`,
                    {
                        'border-[var(--outlineError)]': error
                    },
                    classDiff
                )}
                placeholder=" "
            />
            <label
                htmlFor={name}
                className={`${classDiffLabel} peer-focus:font-medium  absolute text-sm  duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 ${disabled ? "text-gray-500" : "text-[var(--textdark)]"}`}
            >
                {label}
            </label>
            {error && <p className='text-sm text-[--outlineError]'>{error}</p>}
        </div>
    );
}

Input.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    rule: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    classDiff: PropTypes.string,
    classDiffLabel: PropTypes.string,
};
