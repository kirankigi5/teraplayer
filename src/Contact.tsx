import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';

const Contact: React.FC = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Back to Home button - prominent top position */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow mt-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
          <p className="mb-2 text-gray-700 dark:text-gray-300">For questions, feedback, or support regarding TeraBox Video Player & Downloader, please email:</p>
          <p className="mb-4 text-blue-700 dark:text-blue-300 font-mono">your@email.com</p>
          <p className="text-gray-700 dark:text-gray-300">We aim to respond to all inquiries within 2 business days.</p>
          <p className="text-xs text-gray-500 mt-6">Last updated: June 27, 2025</p>
        </div>
      </div>
    </div>
  </>
);

export default Contact;
