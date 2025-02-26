
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { BadgeCheck, Zap, Shield, MessageSquare } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MessageSquare className="w-10 h-10 text-purple-500" />,
      title: "Purpose-built for LLMs",
      description: "Advanced language models with reasoning capabilities for effective customer support."
    },
    {
      icon: <Zap className="w-10 h-10 text-orange-500" />,
      title: "Lightning Fast Setup",
      description: "Get your AI agent up and running in minutes, no technical expertise required."
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-500" />,
      title: "Enterprise Security",
      description: "Bank-grade encryption and privacy controls to keep your data safe."
    }
  ];

  const testimonials = [
    {
      quote: "This platform transformed how we handle customer support. The AI agents are incredibly effective.",
      author: "Sarah Chen",
      role: "CTO at TechCorp"
    },
    {
      quote: "The ease of setup and powerful features make this a game-changer for our business.",
      author: "Michael Rodriguez",
      role: "Head of Support, Innovate Inc"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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

      {/* Social Proof */}
      <div className="bg-white dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-lg text-gray-600 dark:text-gray-400">
            Trusted by 5000+ innovative companies
          </p>
          <div className="mt-8 flex justify-center space-x-8 grayscale opacity-70">
            {/* Add your client logos here */}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-4">
                  <p className="text-lg italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Transform Your Customer Support?
          </h2>
          <Button
            size="lg"
            onClick={() => navigate('/auth?signup=true')}
            className="text-lg h-12 px-8 bg-white text-purple-600 hover:bg-gray-100"
          >
            Start Free Trial
          </Button>
        </div>
      </div>
    </div>
  );
}
