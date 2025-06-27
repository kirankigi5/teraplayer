import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';

const TermsOfService: React.FC = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Terms of Service</h1>
            <p className="text-gray-600 dark:text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 dark:text-gray-300">
                By accessing and using TeraDownloaderPlayer, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">2. Service Description</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                TeraDownloaderPlayer is a URL parsing service that:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>Extracts metadata from TeraBox and similar URLs</li>
                <li>Provides links to external download services</li>
                <li>Does NOT host, store, or cache any files</li>
                <li>Does NOT provide direct downloads</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">3. User Responsibilities</h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Important:</h3>
                <p className="text-yellow-700 dark:text-yellow-300">
                  Users are solely responsible for ensuring they have the right to access and download any content they parse through our service.
                </p>
              </div>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>You must own or have permission to access the content you're parsing</li>
                <li>You agree not to use this service for copyrighted content without authorization</li>
                <li>You will not use this service to violate any third-party terms of service</li>
                <li>You will not attempt to circumvent any security measures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">4. Prohibited Uses</h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>Parsing URLs to content you don't have rights to access</li>
                <li>Commercial use without explicit permission</li>
                <li>Automated or bulk parsing that could overload our servers</li>
                <li>Any illegal activities under applicable laws</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">5. Disclaimer of Warranties</h2>
              <p className="text-gray-700 dark:text-gray-300">
                This service is provided "as is" without any warranties. We do not guarantee the accuracy, 
                completeness, or reliability of any information provided through our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300">
                TeraDownloaderPlayer shall not be liable for any direct, indirect, incidental, special, 
                consequential, or punitive damages resulting from your use of this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">7. Termination</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We reserve the right to terminate or suspend access to our service immediately, 
                without prior notice, for any reason whatsoever.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">8. Contact Information</h2>
              <p className="text-gray-700 dark:text-gray-300">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-blue-600 dark:text-blue-400 mt-2">
                Email: legal@teradownloaderplayer.dev
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default TermsOfService;
