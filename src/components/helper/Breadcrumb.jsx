import PropTypes from "prop-types";
import Button from "../buttons/Button";
import { IoHome } from "react-icons/io5";
const Breadcrumb = ({ items, home = "Home", root = '/' }) => {
    return (
        <nav className="flex pb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {/* Home Breadcrumb */}
                <li className="inline-flex items-center">
                    <Button
                        to={root}
                        classDiff={' text-gray-700 hover:text-[var(--primary)]'}
                        leftIcon={<IoHome />}
                    >
                        {home}
                    </Button>
                    {/* <a href={root} className="">
              
            </a> */}
                </li>

                {/* Dynamic Breadcrumb Items */}
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>

                        {/* Kiểm tra nếu item là trang hiện tại */}
                        {index === items.length - 1 ? (
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{item.name}</span>
                        ) : (
                            <Button
                                to={item?.href}
                                classDiff={' text-gray-700 hover:text-[var(--primary)]'}
                                leftIcon={item.icon && <item.icon/>}
                            >
                                {item?.name}
                            </Button>
                            // <a href={item.href} className="ms-1 text-sm font-medium text-gray-700 hover:text-[var(--primary)] md:ms-2">
                            //   {item.name}
                            // </a>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};
Breadcrumb.propTypes = {
    items: PropTypes.array,
    home: PropTypes.string,
    root: PropTypes.string
}
export default Breadcrumb;
