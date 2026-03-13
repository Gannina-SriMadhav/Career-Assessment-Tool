import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-[#0f1015] min-h-screen text-gray-100 font-sans selection:bg-indigo-500/30">
      
      {/* Navbar overlay for Landing Page */}
      <nav className="absolute top-0 w-full z-50 px-6 lg:px-12 py-6 flex justify-between items-center bg-transparent">
        <div className="flex items-center space-x-3 text-2xl font-black tracking-tighter text-white hover:opacity-90 transition-opacity">
          {/* Hidden Admin Link on the Logo Space */}
          <Link to="/admin" className="absolute w-8 h-8 opacity-0 z-10" title="Admin Login" />
          <img src="/logo.png" alt="CareerTest Logo" className="w-10 h-10 object-contain drop-shadow-lg relative z-0" />
          <span>CareerTest</span>
        </div>
        <div className="flex space-x-4 items-center font-medium">
          <Link to="/register" className="bg-white text-gray-900 px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
        {/* Glowing Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -z-10 mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10 mix-blend-screen" />

        <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full text-indigo-300 text-sm font-semibold tracking-wide mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span>v2.0 Assessment Engine Now Live</span>
        </div>

        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-indigo-100 to-gray-500 mb-6 max-w-4xl flex items-center justify-center gap-6">
          <span>Discover your future with <br className="hidden lg:block" /> Precision Assessments</span>
          <img src="/stairs-icon.png" alt="Career Growth Icon" className="w-24 h-24 lg:w-32 lg:h-32 object-contain drop-shadow-[0_0_30px_rgba(79,70,229,0.5)] animate-bounce" style={{animationDuration: '3s'}} />
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
          Uncover your true potential through advanced 60-point Aptitude, Personality, and Interest mapping. Get specialized career domains tailored exactly for you.
        </p>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:-translate-y-1 transition-all">
            Start Free Assessment &rarr;
          </Link>
          <div className="flex items-center justify-center space-x-[-15px]">
             {/* Mock user avatars */}
             {['bg-blue-400', 'bg-purple-400', 'bg-pink-400', 'bg-indigo-400'].map((color, i) => (
                <div key={i} className={`w-12 h-12 rounded-full border-4 border-[#0f1015] ${color} flex items-center justify-center text-xs font-bold shadow-lg`}>
                  👤
                </div>
             ))}
             <span className="ml-6 text-sm text-gray-400 font-medium">Join thousands of successful students</span>
          </div>
        </div>


      </div>

      {/* Features Grid */}
      <div className="py-24 px-4 bg-[#0a0b0e] relative border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-4">Precision Assessment Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Our sophisticated algorithm processes your unique traits to map you to specialized career domains like Civil Engineering, Data Analysis, and more.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#12141c] border border-gray-800 p-8 rounded-3xl hover:border-indigo-500/50 transition-colors group">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🧠</div>
              <h3 className="text-xl font-bold text-white mb-3">Aptitude Logic Test</h3>
              <p className="text-gray-400 leading-relaxed">Evaluate your numerical ability, logical reasoning, and complex problem-solving skills accurately.</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-[#12141c] border border-gray-800 p-8 rounded-3xl hover:border-purple-500/50 transition-colors group">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🎭</div>
              <h3 className="text-xl font-bold text-white mb-3">Personality Evaluation</h3>
              <p className="text-gray-400 leading-relaxed">Understand your behavioral traits such as leadership, teamwork capabilities, and emotional intelligence.</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-[#12141c] border border-gray-800 p-8 rounded-3xl hover:border-pink-500/50 transition-colors group">
              <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🎨</div>
              <h3 className="text-xl font-bold text-white mb-3">Interest Mapping</h3>
              <p className="text-gray-400 leading-relaxed">Cross-reference your hobbies and activities to find environments where you naturally thrive and focus.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;
