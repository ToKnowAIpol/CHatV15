import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { HeroIllustration } from "@/components/HeroIllustration";
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

  const benefits = [
    {
      icon: <BarChart className="w-6 h-6 text-green-500" />,
      title: "Increased Efficiency",
      description: "Reduce response times by up to 80% with AI-powered automation"
    },
    {
      icon: <Brain className="w-6 h-6 text-blue-500" />,
      title: "Intelligent Responses",
      description: "AI learns from every interaction to provide more accurate answers"
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: "24/7 Availability",
      description: "Never miss a customer inquiry with round-the-clock support"
    },
    {
      icon: <Bot className="w-6 h-6 text-pink-500" />,
      title: "Custom AI Training",
      description: "Train your AI with your specific business knowledge"
    }
  ];

  const testimonials = [
    {
      quote: "This platform transformed how we handle customer support. The AI agents are incredibly effective.",
      author: "Sarah Chen",
      role: "CTO at TechCorp",
      rating: 5
    },
    {
      quote: "The ease of setup and powerful features make this a game-changer for our business.",
      author: "Michael Rodriguez",
      role: "Head of Support, Innovate Inc",
      rating: 5
    }
  ];

  const pricingFeatures = [
    "Unlimited AI conversations",
    "Custom knowledge base",
    "Multi-language support",
    "Analytics dashboard",
    "API access",
    "Priority support"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <HeroIllustration />
        </div>
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

      {/* Key Benefits Section */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Transform Your Customer Support</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Deliver exceptional support experiences with AI-powered automation
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="p-2 bg-gray-50 rounded-lg w-fit">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to deliver exceptional customer support
            </p>
          </div>
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

      {/* How It Works */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Get started in minutes, not months
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-semibold">Sign Up</h3>
              <p className="text-gray-600">Create your account in seconds</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold">Train Your AI</h3>
              <p className="text-gray-600">Upload your knowledge base</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold">Go Live</h3>
              <p className="text-gray-600">Start handling customer queries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Start free, upgrade when you're ready
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Pro Plan</h3>
                <div className="text-4xl font-bold">$49<span className="text-xl text-gray-500">/month</span></div>
                <p className="text-gray-600">Everything you need to get started</p>
                <ul className="space-y-3 mt-6">
                  {pricingFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  onClick={() => navigate('/auth?signup=true')}
                  className="w-full mt-8"
                >
                  Start Free Trial
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
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

      {/* FAQ Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about our platform
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "How does the AI training work?",
                a: "Our platform uses advanced machine learning to understand your business context and customer interactions. Simply upload your documentation and past conversations, and our AI will learn to provide accurate responses."
              },
              {
                q: "Can I customize the AI's responses?",
                a: "Yes! You have full control over your AI agent's personality, tone, and knowledge base. You can also set up custom workflows and response templates."
              },
              {
                q: "What languages are supported?",
                a: "Our platform supports over 100 languages out of the box, with the ability to add custom language models as needed."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
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
            Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-white mt-4 opacity-90">No credit card required</p>
        </div>
      </div>
    </div>
  );
}
