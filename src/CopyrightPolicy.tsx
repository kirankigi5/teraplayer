import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';

const CopyrightPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200 pt-20">
        
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
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Copyright & Takedown Policy</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">Our commitment to respecting intellectual property rights</p>
            </div>

            {/* Main content */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="prose prose-lg max-w-none">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-500 p-4 mb-6">
                  <p className="text-blue-800 dark:text-blue-300">
                    <strong>Important:</strong> TeraDownloaderPlayer is a link parsing service only. We do not host, store, upload, or cache any files or content on our servers. All content remains on the original third-party platforms.
                  </p>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Our Policy</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  TeraDownloaderPlayer respects the intellectual property rights of others and expects users to do the same. 
                  We respond promptly to valid copyright infringement notices and comply with applicable copyright laws.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Copyright Infringement Notice</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you are a copyright holder and believe that TeraDownloaderPlayer is facilitating access to content that infringes your rights, 
                  please contact us with the following information:
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Required Information:</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      A detailed description of the copyrighted work you believe is being infringed
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      The exact Terabox link or URL in question that was processed through our service
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Proof of your ownership or authorization to act on behalf of the copyright owner
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Your full name, title, and contact information
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      A statement of good faith belief that the use is not authorized by the copyright owner
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      A statement that the information provided is accurate and you are authorized to act
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Contact Information</h3>
                  <p className="text-green-700 dark:text-green-300">
                    Email: <a href="mailto:copyright@teraplayer.dev" className="underline">copyright@teraplayer.dev</a>
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                    Please use "Copyright Infringement Notice" in the subject line
                  </p>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Our Response Process</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Review</h3>
                      <p className="text-gray-600 dark:text-gray-400">We review all valid copyright infringement notices within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Action</h3>
                      <p className="text-gray-600 dark:text-gray-400">If valid, we promptly remove or disable access to the reported content</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Response</h3>
                      <p className="text-gray-600 dark:text-gray-400">We respond to the reporter within 5 business days with our decision</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">User Responsibilities</h2>
                <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-400 dark:border-red-500 p-4 mb-6">
                  <ul className="space-y-2 text-red-800 dark:text-red-300">
                    <li>• Users are solely responsible for the links they submit to TeraDownloaderPlayer</li>
                    <li>• Users must not submit links to infringing, illegal, or unauthorized content</li>
                    <li>• Users agree to respect intellectual property rights of content creators</li>
                    <li>• Violation of these terms may result in service access restrictions</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">False Claims</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Please note that submitting false or misleading copyright infringement notices may result in legal consequences. 
                  We reserve the right to seek damages from parties who submit bad faith or fraudulent takedown requests.
                </p>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-6 text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    This policy is subject to change. Last updated: January 2025
                  </p>
                  <p className="mt-2">
                    TeraDownloaderPlayer operates under applicable copyright laws and regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CopyrightPolicy;
