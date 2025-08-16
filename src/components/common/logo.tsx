import { Clock } from 'lucide-react';
import Link from 'next/link';

export const Logo = () => {
  return (
    <div className="flex items-center space-x-4">
      <Link href="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
          <Clock className="h-5 w-5 text-white" />
        </div>

        <span className="text-xl font-bold text-gray-900 dark:text-white">FormyGlow</span>
      </Link>
    </div>
  );
};
