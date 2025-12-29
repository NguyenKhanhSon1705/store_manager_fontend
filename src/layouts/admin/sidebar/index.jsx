/* eslint-disable */
import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import images from "~/assets/images";

const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full w-[280px] flex-col bg-white pb-10 shadow-[0_0_20px_rgba(0,0,0,0.05)] transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${open ? "translate-x-0" : "-translate-x-96"
        }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
        onClick={onClose}
      >
        <HiX className="h-6 w-6 text-gray-500" />
      </span>

      <div className="px-8 mt-10 flex items-center justify-center">
        <div className="h-12 flex items-center">
          <img
            className="hidden dark:block h-full w-auto object-contain"
            alt="logo"
            src={images.logolight}
          />
          <img
            className="dark:hidden h-full w-auto object-contain"
            alt="logo"
            src={images.logodark}
          />
        </div>
      </div>

      <div className="mt-8 mb-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-white/20" />

      <div className="flex-1 overflow-y-auto px-4 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
        <ul className="mb-auto">
          <Links />
        </ul>
      </div>

      {/* Optional: User profile or help section at the bottom */}
      <div className="px-4 mt-auto">
        <div className="p-4 bg-orange-50 dark:bg-navy-700 rounded-2xl border border-orange-100 dark:border-navy-600">
          <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">Hỗ trợ kỹ thuật</p>
          <p className="text-xs text-orange-500/80 dark:text-orange-400/60 mt-1">Liên hệ ngay nếu có sự cố</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

