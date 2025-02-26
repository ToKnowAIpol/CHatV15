import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { NoiseDemo } from "@/components/NoiseDemo";
import { 
  BadgeCheck, 
  Zap, 
  Shield, 
  MessageSquare, 
  BarChart, 
  Brain, 
  Users, 
  Bot,
  Star,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <NoiseDemo />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Agents for Magical Support
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Create powerful AI agents that transform your customer support experience and drive more revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/auth')}
                className="text-lg h-12 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/auth?signup=true')}
                className="text-lg h-12 px-8"
              >
                Book a Demo
              </Button>
            </div>
            <p className="text-sm text-gray-500">No credit card required</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
            Unlock the Power of AI Agents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <Zap className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Automated Support
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Resolve customer issues instantly with AI-powered responses.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <Shield className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Enhanced Security
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Protect sensitive data with advanced encryption and compliance.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <MessageSquare className="w-6 h-6 text-purple-500" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Personalized Interactions
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Tailor conversations to individual customer needs for better engagement.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
            Transform Your Business with AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <BarChart className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Increase Efficiency
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Automate repetitive tasks and free up your team to focus on strategic initiatives.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Brain className="w-6 h-6 text-green-500" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Improve Decision-Making
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Gain insights from data and make informed decisions with AI-driven analytics.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Users className="w-6 h-6 text-purple-500" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Enhance Customer Satisfaction
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Provide personalized support and resolve issues quickly for happier customers.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Bot className="w-6 h-6 text-yellow-500" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Scale Your Operations
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Handle increasing volumes of customer interactions without adding headcount.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Star className="w-6 h-6 text-red-500" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Drive Revenue Growth
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Identify new opportunities and optimize sales processes with AI-powered agents.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Ensure Compliance
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Automate compliance tasks and reduce the risk of errors with AI-driven monitoring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-white tracking-tight mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
            Join the future of customer support and experience the magic of AI agents.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/auth')}
            className="text-lg h-14 px-12 bg-white text-blue-600 hover:bg-blue-50"
          >
            Get Started Free <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} AI Magical Support. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
