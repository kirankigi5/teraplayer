import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200 pt-20">
        {/* Removed duplicate ThemeToggle */}
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">About TeraDownloaderPlayer</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">Universal TeraBox link parser supporting all domains and mirrors</p>
            </div>

            {/* Main content */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What is TeraDownloaderPlayer?</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  TeraDownloaderPlayer is a comprehensive, user-friendly web application that supports ALL TeraBox domains and mirrors. 
                  Our universal parser works with terabox.com, mirrobox.com, nephobox.com, 4funbox.co, freeterabox.com, 1024tera.com, 
                  tibibox.com, momerybox.com, and many more TeraBox variants. We extract metadata from any TeraBox URL and provide 
                  convenient access to external download services.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">How it Works</h2>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Paste Link</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Enter any TeraBox domain link into our universal parser</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <div className="w-12 h-12 bg-green-600 dark:bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Parse & Extract</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">We extract file information and metadata</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <div className="w-12 h-12 bg-purple-600 dark:bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Access Content</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get redirected to external download services</p>
                  </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Key Features</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li>Universal support for ALL TeraBox domains and mirrors</li>
                  <li>Fast and reliable parsing for terabox.com, mirrobox.com, nephobox.com</li>
                  <li>Support for 4funbox.co, freeterabox.com, 1024tera.com variants</li>
                  <li>Compatible with tibibox.com, momerybox.com, and regional domains</li>
                  <li>Clean, modern user interface with dark mode</li>
                  <li>Mobile-responsive design</li>
                  <li>No file storage or caching</li>
                  <li>Free to use with no limitations</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Important Disclaimers</h2>
                <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-500 p-4 mb-6">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>TeraDownloaderPlayer</strong> is a link parsing service only. We do not:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Host, upload, store, or cache any files or content</li>
                    <li>Own or control the content accessed through our service</li>
                    <li>Have any affiliation with Terabox or third-party download services</li>
                    <li>Guarantee the availability or functionality of external services</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Technology Stack</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Frontend</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• React 18 with TypeScript</li>
                      <li>• Vite for development and building</li>
                      <li>• Tailwind CSS for styling</li>
                      <li>• React Router for navigation</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Backend</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Node.js with Express.js</li>
                      <li>• TypeScript for type safety</li>
                      <li>• Helmet for security headers</li>
                      <li>• CORS for cross-origin requests</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
