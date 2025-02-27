import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useMobileDetect } from "@/hooks/use-mobile-detect";

export default function Pricing() {
  const navigate = useNavigate();
  const isMobile = useMobileDetect();

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      {/* Navigation */}
      <div className="flex items-center justify-start p-4 space-x-4">
        <button 
          className="px-3 py-1 text-sm rounded-md bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => navigate('/')}
        >
          Back
        </button>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black dark:text-white">
          Cennik
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col">
            <h2 className="text-xl font-bold mb-2 text-black dark:text-white">Free</h2>
            <p className="text-3xl font-bold mb-6 text-black dark:text-white">$0</p>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600 dark:text-gray-300">1 chatbot</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600 dark:text-gray-300">100 messages/month</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600 dark:text-gray-300">Basic customization</span>
              </li>
            </ul>
            <button className="w-full py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium">
              Get Started
            </button>
          </div>
          
          {/* Pro Plan */}
          <div className="border-2 border-blue-500 rounded-xl p-6 flex flex-col relative">
            <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs rounded-bl-lg rounded-tr-lg">
              Popular
            </div>
            <h2 className="text-xl font-bold mb-2 text-black dark:text-white">Pro</h2>
            <p className="text-3xl font-bold mb-6 text-black dark:text-white">$29</p>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600 dark:text-gray-300">5 chatbots</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600 dark:text-gray-300">1,000 messages/month</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600 dark:text-gray-300">Advanced customization</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600 dark:text-gray-300">Analytics dashboard</span>
              </li>
            </ul>
            <button className="w-full py-2 rounded-lg bg-blue-500 text-white font-medium">
              Subscribe
            </button>
          </div>
          
          {/* Enterprise Plan */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col">
            <h2 className="text-xl font-bold mb-2 text-black dark:text-white">Enterprise</h2>
            <p className="text-3xl font-bold mb-6 text-black dark:text-white">Custom</p>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600 dark:text-gray-300">Unlimited chatbots</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600 dark:text-gray-300">Unlimited messages</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600 dark:text-gray-300">Custom integrations</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600 dark:text-gray-300">Dedicated support</span>
              </li>
            </ul>
            <button className="w-full py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
