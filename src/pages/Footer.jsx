import React from 'react'

const Footer = () => {
  return (
   <>
   {/* Footer */}
      <footer className="bg-indigo-700 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} EventManager. All rights reserved.</p>
          <nav className="space-x-6 mt-4 md:mt-0">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:underline">
              GitHub
            </a>
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:underline">
              Terms
            </a>
          </nav>
        </div>
      </footer>
   </>
  )
}

export default Footer
