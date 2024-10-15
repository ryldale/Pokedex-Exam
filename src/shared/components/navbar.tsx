"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string): boolean => {
    return (
      pathname === path ||
      (path === "/pokemons" &&
        (pathname === "/" || pathname.startsWith("/pokemons")))
    );
  };

  const handleNavigate = (path: string) => () => {
    router.push(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex p-4 mb-6 items-center justify-between relative bg-white rounded-2xl">
      <div className="flex justify-center">
        <Image src="/img/Logo.png" alt="pokemon-logo" width={122} height={46} />
      </div>

      <div className="flex md:hidden">
        {/* Hamburger Menu for Mobile */}
        <button
          onClick={toggleMenu}
          className="text-[#2B2F67] focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <div
        className={`md:flex md:justify-end bg-white left-0 absolute w-full md:static p-2 rounded-2xl ${
          isMenuOpen ? "block" : "hidden"
        } md:block`}
      >
        <ul className="flex list-none p-0 m-0 flex-col md:flex-row md:items-center">
          <li>
            <button
              className={`${
                isActive("/pokemons")
                  ? "bg-[#FBD743] border-2 border-[#2B2F67]"
                  : "bg-transparent"
              } cursor-pointer py-2 px-4 rounded-xl font-galindo text-[#2B2F67] w-full`}
              onClick={handleNavigate("/pokemons")}
            >
              All Pokémons
            </button>
          </li>
          <li>
            <button
              className={`${
                isActive("/captured-pokemon")
                  ? "bg-[#FBD743] border-2 border-[#2B2F67] "
                  : "bg-transparent"
              } cursor-pointer py-2 px-4 rounded-xl font-galindo text-[#2B2F67] w-full`}
              onClick={handleNavigate("/captured-pokemon")}
            >
              Captured Pokémons
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
