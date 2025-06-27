import React from 'react';
import { Link } from "react-router-dom";
import Navbar from './components/Navbar';

const PrivacyPolicy: React.FC = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow mt-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="mb-2 text-gray-700 dark:text-gray-300">Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our TeraBox Video Player & Downloader app.</p>
          <h2 className="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-white">Information We Collect</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
            <li>We do not require you to create an account or provide personal information to use this site.</li>
            <li>We may collect anonymous analytics data to improve the service.</li>
            <li>Third-party services (such as Google AdSense) may collect usage data for advertising and analytics.</li>
          </ul>
          <h2 className="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-white">How We Use Information</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
            <li>To provide and improve our service.</li>
            <li>To display relevant ads (if enabled).</li>
            <li>To analyze site usage and performance.</li>
          </ul>
          <h2 className="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-white">Third-Party Services</h2>
          <p className="mb-2 text-gray-700 dark:text-gray-300">We may use third-party services such as Google AdSense and analytics providers. These services may use cookies and similar technologies to collect information about your use of the site.</p>
          <h2 className="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-white">Your Choices</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
            <li>You can disable cookies in your browser settings.</li>
            <li>You may opt out of personalized ads via Google’s ad settings.</li>
          </ul>
          <h2 className="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-white">Contact</h2>
          <p className="text-gray-700 dark:text-gray-300">If you have any questions about this Privacy Policy, please contact us via the About page.</p>
          <p className="text-xs text-gray-500 mt-6">Last updated: June 27, 2025</p>
        </div>
      </div>
    </div>
  </>
);

export default PrivacyPolicy;
