const Widget = ({ icon, title, subtitle, color = "orange" }) => {
  const colorMap = {
    orange: "from-orange-500 to-red-500",
    blue: "from-blue-500 to-indigo-600",
    green: "from-emerald-500 to-teal-600",
    purple: "from-purple-500 to-pink-600",
  };

  const bgGradient = colorMap[color] || colorMap.orange;

  return (
    <div className="bg-white dark:bg-navy-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-navy-700 flex items-center group">
      <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${bgGradient} flex items-center justify-center text-white shadow-lg shadow-gray-200 dark:shadow-none transition-transform group-hover:scale-110`}>
        {icon}
      </div>

      <div className="ml-5">
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 capitalize mb-0.5">
          {title}
        </p>
        <h4 className="text-xl font-bold text-gray-800 dark:text-white leading-none">
          {subtitle}
        </h4>
      </div>
    </div>
  );
};

export default Widget;

