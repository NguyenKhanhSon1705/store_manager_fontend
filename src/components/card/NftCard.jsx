import { Badge, Tag } from "antd";

const NftCard = ({ title, quantity, price, image, extra = "" }) => {
  return (
    <div className={`bg-white dark:bg-navy-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-navy-700 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full ${extra}`}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          alt={title}
        />
        <div className="absolute top-3 right-3">
          <Badge count={`Top Sale`} style={{ backgroundColor: '#F97316' }} />
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1 group-hover:text-orange-500 transition-colors">
            {title}
          </h4>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Tag color="orange" className="rounded-full border-none px-3">
            Đã bán: <span className="font-bold">{quantity}</span>
          </Tag>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 dark:border-navy-700 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">Giá hiện tại</span>
            <span className="text-lg font-black text-orange-600 dark:text-orange-400">
              {price}
            </span>
          </div>

          <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NftCard;

