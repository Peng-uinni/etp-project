import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, Library, Video, Sparkles, CheckCircle, Menu, X, Mail, Lock, ArrowRight, Star, Users, Award, TrendingUp, Zap, Shield, Clock } from 'lucide-react';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10
    }));
    setParticles(newParticles);
  }, []);

  const handleLogin = () => {
    if (email && password) {
      setLoggedIn(true);
      setUser(email.split("@")[0]);
      setShowLogin(false);
      setEmail("");
      setPassword("");
    } else {
      alert("Please enter email and password");
    }
  };

  const handleSignup = () => {
    if (name && email && password) {
      setLoggedIn(true);
      setUser(name);
      setShowSignup(false);
      setName("");
      setEmail("");
      setPassword("");
    } else {
      alert("Please fill all fields");
    }
  };

  const handleGoogleLogin = () => {
    setLoggedIn(true);
    setUser("Google User");
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser("");
  };

  const switchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const features = [
    {
      id: 1,
      icon: <Video className="w-12 h-12 text-blue-600" />,
      title: "AI-Powered Lectures",
      description: "Access and watch your video lectures with AI-enhanced playback controls and smart recommendations.",
      action: "Watch Lectures",
      color: "bg-blue-50"
    },
    {
      id: 2,
      icon: <FileText className="w-12 h-12 text-purple-600" />,
      title: "Smart Transcription",
      description: "Automatically transcribe lectures with AI. Search, highlight, and jump to any moment instantly.",
      action: "Start Transcribing",
      color: "bg-purple-50"
    },
    {
      id: 3,
      icon: <Library className="w-12 h-12 text-green-600" />,
      title: "Personal Study Library",
      description: "Organize all your notes, transcripts, and materials in one intelligent, searchable library.",
      action: "View Library",
      color: "bg-green-50"
    },
    {
      id: 4,
      icon: <Sparkles className="w-12 h-12 text-orange-600" />,
      title: "AI Study Assistant",
      description: "Get instant answers, summaries, and explanations from your course materials using AI.",
      action: "Try AI Assistant",
      color: "bg-orange-50"
    },
    {
      id: 5,
      icon: <CheckCircle className="w-12 h-12 text-pink-600" />,
      title: "Custom Practice Tests",
      description: "Generate personalized quizzes and tests based on your lectures and study materials.",
      action: "Create Test",
      color: "bg-pink-50"
    },
    {
      id: 6,
      icon: <BookOpen className="w-12 h-12 text-indigo-600" />,
      title: "Smart Study Plans",
      description: "AI creates optimized study schedules tailored to your learning pace and goals.",
      action: "Get Study Plan",
      color: "bg-indigo-50"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "5 hours of lecture transcription",
        "Basic AI assistance",
        "1GB storage",
        "Community support",
        "Mobile app access"
      ],
      popular: false,
      color: "border-gray-200"
    },
    {
      name: "Student",
      price: "$9.99",
      period: "per month",
      features: [
        "Unlimited transcription",
        "Advanced AI study assistant",
        "50GB storage",
        "Priority support",
        "Custom study plans",
        "Practice test generator",
        "Collaboration tools"
      ],
      popular: true,
      color: "border-blue-500"
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "per month",
      features: [
        "Everything in Student",
        "Unlimited storage",
        "AI tutor sessions",
        "Advanced analytics",
        "Export to all formats",
        "Team collaboration",
        "API access",
        "White-label option"
      ],
      popular: false,
      color: "border-purple-500"
    }
  ];

  const stats = [
    { icon: <Users className="w-8 h-8" />, value: "50,000+", label: "Active Students" },
    { icon: <Video className="w-8 h-8" />, value: "1M+", label: "Lectures Transcribed" },
    { icon: <Award className="w-8 h-8" />, value: "95%", label: "Student Satisfaction" },
    { icon: <TrendingUp className="w-8 h-8" />, value: "40%", label: "Grade Improvement" }
  ];

  const AnimatedBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-blue-400 opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent"></div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(-15px); }
        }
      `}</style>
    </div>
  );

  const renderNavbar = () => (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => navigateTo('home')} className="flex items-center space-x-2 cursor-pointer">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StudyHub
            </span>
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => navigateTo('home')} className="text-gray-700 hover:text-blue-600 transition font-medium">Home</button>
            <button onClick={() => navigateTo('features')} className="text-gray-700 hover:text-blue-600 transition font-medium">Features</button>
            <button onClick={() => navigateTo('pricing')} className="text-gray-700 hover:text-blue-600 transition font-medium">Pricing</button>
            <button onClick={() => navigateTo('about')} className="text-gray-700 hover:text-blue-600 transition font-medium">About</button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {loggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Welcome, {user}!</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 transition font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowSignup(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                  Sign Up Free
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <button onClick={() => navigateTo('home')} className="block w-full text-left text-gray-700 hover:text-blue-600 transition">Home</button>
            <button onClick={() => navigateTo('features')} className="block w-full text-left text-gray-700 hover:text-blue-600 transition">Features</button>
            <button onClick={() => navigateTo('pricing')} className="block w-full text-left text-gray-700 hover:text-blue-600 transition">Pricing</button>
            <button onClick={() => navigateTo('about')} className="block w-full text-left text-gray-700 hover:text-blue-600 transition">About</button>
            {loggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout ({user})
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowSignup(true)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Sign Up Free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );

  const renderHomePage = () => (
    <>
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                🚀 AI-Powered Learning Platform
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Your Classes,{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Way.
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Listen to lectures, get instant transcripts, and study smarter with AI-powered tools — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => loggedIn ? null : setShowSignup(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium text-lg flex items-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium text-lg">
                Watch Demo
              </button>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-600 pt-8">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Free forever plan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 text-blue-600">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Study Smarter
            </h2>
            <p className="text-xl text-gray-600">
              Powerful AI tools designed to transform your learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.slice(0, 3).map((feature) => (
              <div
                key={feature.id}
                onMouseEnter={() => setActiveFeature(feature.id)}
                onMouseLeave={() => setActiveFeature(null)}
                className={`${feature.color} rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${
                  activeFeature === feature.id ? 'shadow-2xl scale-105' : 'shadow-md'
                }`}
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <button
                  onClick={() => loggedIn ? alert(`Opening ${feature.title}...`) : setShowLogin(true)}
                  className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition shadow-md font-medium w-full"
                >
                  {feature.action}
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => navigateTo('features')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md font-medium inline-flex items-center space-x-2"
            >
              <span>View All Features</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </>
  );

  const renderFeaturesPage = () => (
    <section className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Learning
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover all the tools that make StudyHub the ultimate platform for students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              onMouseEnter={() => setActiveFeature(feature.id)}
              onMouseLeave={() => setActiveFeature(null)}
              className={`${feature.color} rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${
                activeFeature === feature.id ? 'shadow-2xl scale-105' : 'shadow-md'
              }`}
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>
              <button
                onClick={() => loggedIn ? alert(`Opening ${feature.title}...`) : setShowLogin(true)}
                className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition shadow-md font-medium w-full"
              >
                {feature.action}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of students already studying smarter with StudyHub</p>
          <button
            onClick={() => loggedIn ? null : setShowSignup(true)}
            className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition shadow-lg font-medium text-lg inline-flex items-center space-x-2"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );

  const renderPricingPage = () => (
    <section className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your learning journey. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular ? 'border-4 border-blue-500 relative' : 'border-2 ' + plan.color
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => loggedIn ? alert(`Subscribing to ${plan.name} plan...`) : setShowSignup(true)}
                className={`w-full py-3 rounded-lg font-medium transition ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.price === '$0' ? 'Start Free' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-12 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="flex justify-center">
                <Zap className="w-12 h-12 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Lightning Fast</h3>
              <p className="text-gray-600">Transcribe hours of lectures in minutes with our AI engine</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-center">
                <Shield className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Secure & Private</h3>
              <p className="text-gray-600">Your data is encrypted and never shared with third parties</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-center">
                <Clock className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">24/7 Support</h3>
              <p className="text-gray-600">Our team is always here to help you succeed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderAboutPage = () => (
    <section className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About StudyHub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering students worldwide with AI-driven learning tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At StudyHub, we believe that every student deserves access to powerful learning tools that make education more accessible, efficient, and enjoyable. Our mission is to revolutionize the way students learn by harnessing the power of artificial intelligence.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded in 2023, we have helped over 50,000 students transform their learning experience through smart transcription, AI-powered study assistants, and personalized learning paths.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 flex items-center justify-center">
            <div className="text-center space-y-6">
              <BookOpen className="w-32 h-32 text-blue-600 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-900">Innovation in Education</h3>
              <p className="text-gray-600">Using cutting-edge AI to transform learning</p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="flex justify-center mb-6">
                <Users className="w-16 h-16 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Student-Centered</h3>
              <p className="text-gray-600 text-center">Everything we build is designed with students needs and success in mind</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="flex justify-center mb-6">
                <Sparkles className="w-16 h-16 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Innovation</h3>
              <p className="text-gray-600 text-center">We constantly push boundaries to create better learning experiences</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="flex justify-center mb-6">
                <Award className="w-16 h-16 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Excellence</h3>
              <p className="text-gray-600 text-center">We strive for the highest quality in everything we deliver</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Growing Community</h2>
          <p className="text-xl mb-8 opacity-90">Be part of the future of education</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => loggedIn ? null : setShowSignup(true)}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition shadow-lg font-medium text-lg inline-flex items-center space-x-2"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition font-medium text-lg">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  const renderFooter = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-6 h-6" />
              <span className="text-xl font-bold">StudyHub</span>
            </div>
            <p className="text-gray-400">Empowering students with AI-driven learning tools.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => navigateTo('features')} className="hover:text-white transition">Features</button></li>
              <li><button onClick={() => navigateTo('pricing')} className="hover:text-white transition">Pricing</button></li>
              <li><a href="#" className="hover:text-white transition">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => navigateTo('about')} className="hover:text-white transition">About</button></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© 2025 StudyHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      {renderNavbar()}
      
      {currentPage === 'home' && renderHomePage()}
      {currentPage === 'features' && renderFeaturesPage()}
      {currentPage === 'pricing' && renderPricingPage()}
      {currentPage === 'about' && renderAboutPage()}
      
      {renderFooter()}

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome Back!</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <button
                onClick={handleLogin}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md font-medium"
              >
                Login
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center space-x-2"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="font-medium">Continue with Google</span>
            </button>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={switchToSignup}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      )}

      {showSignup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowSignup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Create Account</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <button
                onClick={handleSignup}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md font-medium"
              >
                Create Account
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center space-x-2"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="font-medium">Continue with Google</span>
            </button>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={switchToLogin}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}