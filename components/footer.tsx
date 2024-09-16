import Image from "next/image";

import logo from "@/public/logo.png";
import { siteConfig } from "@/config/site";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 rounded-lg">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image
              alt="Picture of the author"
              height={500}
              src={logo}
              width={150}
            />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a
                className="hover:underline me-4 md:me-6"
                href={siteConfig.links.github}
              >
                About
              </a>
            </li>
            <li>
              <a
                className="hover:underline me-4 md:me-6"
                href="/privacy-policy"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="hover:underline me-4 md:me-6" href="/licensing">
                Licensing
              </a>
            </li>
            <li>
              <a className="hover:underline" href={siteConfig.links.contact}>
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a className="hover:underline" href="/">
            VoiceVibeAI™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
