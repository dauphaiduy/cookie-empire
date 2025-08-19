import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-lg">🍪</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              Cookie Clicker Idle
            </span>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Built with Next.js, Tailwind CSS, and Ant Design
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-500">
            © 2025 Cookie Clicker Idle. Keep clicking! 🚀
          </div>
        </div>
      </div>
    </footer>
  );
}
