export default function Footer() {
  return (
    <footer className="bg-[#212f45] font-Raleway text-white py-4 px-4 sm:px-8 lg:px-16 xl:px-20 min-h-full max-h-auto">
      <div className="grid grid-rows-1 sm:grid-cols-3 text-center items-center  max-w-[1700px] mx-auto ">
        <div>
          <div className="text-base font-semibold mb-2">Contact</div>
          <p className="hover:underline w-fit mx-auto">misaxanli@gmail.com</p>
        </div>
        <div className="text-center">
          <div className="text-base font-semibold mb-2">About Us</div>
          <p className="text-sm italic">
            In code, we build bridges between dreams and reality, shaping a
            future where possibilities thrive and innovation leads the way.
          </p>
        </div>
        <div>
          <div className="text-base font-semibold mb-2">Follow</div>
          <a
            href="https://www.linkedin.com/in/metin-isakhanli-217374266/"
            target="_blank"
            className="hover:underline italic">
            LinkedIn
          </a>
        </div>
      </div>
      <a
        href="https://metinvn.github.io/ReactJS-TailwindCSS-Portfolio/"
        target="_blank"
        className="text-center mt-4 w-fit hover:underline block mx-auto">
        Check out my other projects
      </a>
      <div className="w-full text-center mt-4">
        &copy; 2024 Matin Isakhanli. All rights reserved.
      </div>
    </footer>
  );
}
