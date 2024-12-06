import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


function Button({
    to,
    href,
    primary = false,
    outline = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    children,
    classDiff,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    // Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }


    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const className = classNames(`text-center text-base py-2 px-2  ${disabled ? 'hover:opacity-30' : 'hover:opacity-80'} flex justify-center items-center` , 
        {
            'bg-[var(--primary)] text-[var(--textwhite)]' : primary,
            'w-full': large,
            'w-1/2': small,
            'rounded-md': rounded,
            'outline': outline,
            'opacity-30 cursor-default ': disabled,
        },classDiff)

    return (
        <Comp
        aria-hidden="false"
         className = {className}  {...props}>
            {leftIcon && <span className='mr-2  cursor-default'>{leftIcon}</span>}
            {children}
            {rightIcon && <span className='ml-2'>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    text: PropTypes.bool,
    rounded: PropTypes.bool,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    classDiff: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
};

export default Button;