const Categories = [
  {
    name: "women",
  },
  {
    name: "men",
  },
  {
    name: "kids",
  },
];

const CategoriesHeadre = () => {
  return (
    <ul className="flex items-center justify-center gap-8 bg-gray-100 p-4 ">
      {Categories.map(({ name }, idx) => (
        <li
          key={idx}
          className="relative text-xl font-semibold capitalize text-slate-800 duration-200 after:absolute after:-bottom-1 after:-left-1 after:h-0 after:w-[calc(100%+8px)] after:bg-emerald-400 after:duration-300 hover:text-emerald-400 hover:after:h-[calc(100%+8px)] hover:after:bg-white"
        >
          <span className="relative z-10 cursor-pointer">{name}</span>
        </li>
      ))}
    </ul>
  );
};

export default CategoriesHeadre;
