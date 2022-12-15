import * as React from "react";
import Cta from "./cta";
import { Image } from "@yext/pages/components";

const navigation = [
  { name: 'Home', href: '/index.html' },
  { name: 'About', href: '/about' },
  { name: 'Menu', href: '/menu' },
  { name: 'Locator', href: '/locator' },
]

export default function Header({_site}) {
  return (
    <header className="bg-orange-500">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-green-800 py-6 lg:border-none">
          <div className="flex items-center">
            <a href="/index.html">
              <span className="sr-only">Turtlehead Tacos</span>
              {/* <img className="w-auto rounded-lg shadow-md" src={Logo} height="30" width="30" /> */}
              <Image className="rounded-lg drop-shadow-md" image={_site.logo.image} layout="fixed" width={100} height={100}/>
            </a>
            <div className="ml-10 hidden space-x-8 lg:block">
              {navigation.map((link) => (
                <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <a
              href="#"
              key="sign-in"
              className="inline-block rounded-md border border-transparent bg-green-800 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
            >
              Sign in
            </a>
            <a
              href="#"
              key="sign-up"
              className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-green-900 hover:bg-indigo-50"
            >
              Sign up
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

