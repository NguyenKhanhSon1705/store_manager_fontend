/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import images from "~/assets/images";
const Sidebar = ({ open, onClose }) => {
  
  return (
    <div
      className={` sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-lg transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>
      <div className={`ml-[35px] mt-[30px] flex items-center`}>
        <div className="h-5 text-navy-700 dark:text-white">
        <img  className="hidden dark:block" width={235} height={130} alt="logo" src={images.logolight} />
        <img className="dark:hidden" width={235} height={130} alt="logo" src={images.logodark} />
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      <ul className="mb-auto pt-1 flex justify-center max-h-[500px] overflow-y-auto scrollbar-none">
        <Links />
      </ul>
    </div>
  );
};

export default Sidebar;
