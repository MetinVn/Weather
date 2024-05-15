export default function Header() {
  return (
    <div className="py-2 px-2 flex flex-wrap justify-evenly text-center items-center max-h-[60px] bg-[#212f45] text-white">
      <div className="text-white text-xs sm:text-sm font-semibold font-serif mb-2 sm:mb-0">
        Developed by{" "}
        <a
          className="hover:text-sky-300 duration-200 hover:underline"
          href="https://metinvn.github.io/ReactJS-TailwindCSS-Portfolio/"
          target="_blank"
          rel="noopener noreferrer">
          MetinVn
        </a>
      </div>
    </div>
  );
}
