import React, { useState, useEffect } from 'react';
import {
  Globe, MessageSquare, Briefcase, Coffee, Trophy, ShoppingBag,
  Heart, MessageCircle, MapPin, CheckCircle,
  Sparkles, Zap, TrendingUp, Calendar, BookOpen,
  Lightbulb, ChevronDown, Check, Hash, ArrowLeft, Plus, X, Users,
  Send, ShieldCheck, Phone, FileText, Edit3
} from 'lucide-react';
import { supabase } from './supabaseClient';

// ---------- CONSTANTS ----------
const INTEREST_OPTIONS = [
  { id: 'tech',      label: 'Tech & Coding',        tag: '#Tech',        desc: 'Hackathons, AI, and code sprints.',        color: 'bg-violet-500/20 text-violet-300',   gradient: 'from-violet-600 to-purple-600' },
  { id: 'cp',        label: 'DSA & CP',             tag: '#DSA',         desc: 'LeetCode, Codeforces, and contests.',      color: 'bg-indigo-500/20 text-indigo-300',   gradient: 'from-indigo-500 to-blue-600' },
  { id: 'webdev',    label: 'Web Dev',              tag: '#WebDev',      desc: 'Frontend, backend, and full‑stack.',       color: 'bg-sky-500/20 text-sky-300',         gradient: 'from-sky-500 to-cyan-500' },

  { id: 'startup',   label: 'Startups',             tag: '#Startup',     desc: 'Ideas, pitches, and side projects.',       color: 'bg-fuchsia-500/20 text-fuchsia-300', gradient: 'from-fuchsia-600 to-purple-800' },
  { id: 'product',   label: 'Product & UX',         tag: '#Product',     desc: 'Design, roadmaps, and PM thinking.',       color: 'bg-rose-500/20 text-rose-300',       gradient: 'from-rose-500 to-pink-600' },

  { id: 'study',     label: 'Study Hacks',          tag: '#Study',       desc: 'Notes, exam tips, and schedules.',        color: 'bg-emerald-500/20 text-emerald-300', gradient: 'from-emerald-500 to-teal-500' },
  { id: 'notes',     label: 'Notes Exchange',       tag: '#Notes',       desc: 'PDFs, summaries, and past papers.',        color: 'bg-green-500/20 text-green-300',     gradient: 'from-green-500 to-lime-500' },

  { id: 'sports',    label: 'Sports & Turf',        tag: '#Sports',      desc: 'Football turf and tournaments.',          color: 'bg-orange-500/20 text-orange-300',   gradient: 'from-orange-500 to-amber-500' },
  { id: 'fitness',   label: 'Gym & Fitness',        tag: '#Fitness',     desc: 'Lifting, running, and health.',           color: 'bg-lime-500/20 text-lime-300',       gradient: 'from-lime-500 to-emerald-500' },

  { id: 'food',      label: 'Food & Mess',          tag: '#Foodie',      desc: 'Mess hacks and café plans.',              color: 'bg-amber-500/20 text-amber-300',     gradient: 'from-amber-500 to-orange-600' },
  { id: 'nightowls', label: 'Night Owls',           tag: '#NightOwls',   desc: '2 AM coding and Maggi runs.',             color: 'bg-purple-500/20 text-purple-300',   gradient: 'from-purple-600 to-fuchsia-600' },

  { id: 'music',     label: 'Music & Jams',         tag: '#Music',       desc: 'Jams, playlists, and concerts.',          color: 'bg-pink-500/20 text-pink-300',       gradient: 'from-pink-500 to-rose-500' },
  { id: 'gaming',    label: 'Gaming & Esports',     tag: '#Gaming',      desc: 'LAN parties and online squads.',          color: 'bg-slate-500/20 text-slate-300',     gradient: 'from-slate-600 to-slate-800' },

  { id: 'clubs',     label: 'Clubs & Societies',    tag: '#Clubs',       desc: 'Find your cultural and tech clubs.',      color: 'bg-cyan-500/20 text-cyan-300',       gradient: 'from-cyan-500 to-sky-500' },
  { id: 'events',    label: 'Fests & Events',       tag: '#CampusFest',  desc: 'College fest and flagship events.',       color: 'bg-red-500/20 text-red-300',         gradient: 'from-red-500 to-orange-500' },

  { id: 'thrift',    label: 'Thrift & Marketplace', tag: '#Thrift',      desc: 'Buy/sell books, drafters, and more.',     color: 'bg-zinc-500/20 text-zinc-300',       gradient: 'from-zinc-500 to-neutral-700' },
  { id: 'career',    label: 'Career & Internships', tag: '#Career',      desc: 'Internships, resumes, and referrals.',     color: 'bg-blue-500/20 text-blue-300',       gradient: 'from-blue-500 to-indigo-600' },

  { id: 'art',       label: 'Art & Design',         tag: '#Creative',    desc: 'Sketching, UI/UX, and reels.',            color: 'bg-rose-500/20 text-rose-300',       gradient: 'from-rose-500 to-pink-600' },
  { id: 'books',     label: 'Books & Writing',      tag: '#Books',       desc: 'Reading clubs and poetry.',               color: 'bg-orange-500/20 text-orange-300',   gradient: 'from-orange-400 to-red-500' },

  { id: 'confess',   label: 'Confessions',          tag: '#Confessions', desc: 'Anon campus stories & hot takes.',        color: 'bg-slate-600/20 text-slate-200',     gradient: 'from-slate-700 to-slate-900' },
  { id: 'hostel',    label: 'Hostel Life',          tag: '#Hostel',      desc: 'Roommate stories and hostel hacks.',      color: 'bg-yellow-500/20 text-yellow-200',   gradient: 'from-yellow-500 to-amber-500' }
];

const DEGREE_OPTIONS = ['B.Tech', 'B.E', 'B.Sc', 'B.Com', 'BBA', 'MBA', 'M.Tech', 'PhD', 'MBBS', 'B.Arch', 'Other'];
const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th+ Year'];

// ---------- BACKGROUND ----------
const CrazyDynamicBackground = () => (
  <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#0a0a0a]">
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage:
          'linear-gradient(#4c1d95 1px, transparent 1px), linear-gradient(to right, #4c1d95 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        transform: 'perspective(500px) rotateX(60deg) scale(2)',
      }}
    ></div>
    <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-violet-600 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse"></div>
    <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-orange-600 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse"></div>
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
  </div>
);

// ---------- NAVBAR ----------
const Navbar = ({ currentPage, setCurrentPage, isLoggedIn, user, onLogout }) => (
  <nav className="fixed top-0 w-full bg-black/60 backdrop-blur-xl border-b border-white/10 z-50 px-6 py-4 flex justify-between items-center shadow-2xl">
    <div
      className="flex items-center gap-3 cursor-pointer group"
      onClick={() => setCurrentPage(isLoggedIn ? 'feed' : 'home')}
    >
      <div className="bg-gradient-to-tr from-violet-600 to-orange-500 p-2 rounded-xl shadow-lg border border-white/20">
        <Globe className="text-white w-6 h-6" />
      </div>
      <span className="text-xl font-black text-white tracking-wider">Campus Sync</span>
    </div>

    <div className="hidden md:flex gap-2 bg-white/5 p-1.5 rounded-full border border-white/10">
      {!isLoggedIn && (
        <>
          {['Home', 'About'].map((item) => (
            <button
              key={item}
              onClick={() => setCurrentPage(item.toLowerCase())}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                currentPage === item.toLowerCase()
                  ? 'bg-violet-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage('login')}
            className="px-6 py-2 rounded-full text-sm font-bold text-slate-400 hover:text-white"
          >
            Log In
          </button>
        </>
      )}

      {isLoggedIn &&
        ['Feed', 'Events', 'Explore'].map((item) => (
          <button
            key={item}
            onClick={() => setCurrentPage(item.toLowerCase())}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              currentPage === item.toLowerCase()
                ? 'bg-violet-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {item}
          </button>
        ))}
    </div>

    {isLoggedIn ? (
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/30">
          <Sparkles size={14} className="text-orange-400" />
          <span className="text-xs font-bold text-orange-200">{user?.karma || 0} Karma</span>
        </div>
        <button
          onClick={() => setCurrentPage('profile')}
          className="w-10 h-10 bg-gradient-to-br from-violet-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg border border-white/20 hover:scale-105 transition"
        >
          {user?.name ? user.name[0].toUpperCase() : 'U'}
        </button>
        <button
          onClick={onLogout}
          className="text-xs font-bold text-slate-400 hover:text-red-400"
        >
          Log Out
        </button>
      </div>
    ) : (
      <button
        onClick={() => setCurrentPage('login')}
        className="bg-white text-black px-6 py-2.5 rounded-full font-bold shadow-lg"
      >
        Log In
      </button>
    )}
  </nav>
);

// ---------- LANDING ----------
const LandingPage = ({ onGetStarted }) => (
  <div className="pt-32 min-h-screen flex flex-col items-center justify-center text-center px-6">
    <div className="inline-block px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-bold mb-8">
      🚀 The #1 Community for Students
    </div>
    <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none drop-shadow-[0_0_30px_rgba(139,92,246,0.4)]">
      CAMPUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400">SYNC</span>
    </h1>
    <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl font-medium">
      Stop scrolling. Start connecting.
      <br />
      <span className="text-orange-400 font-bold">Events. Startups. Sports. Food.</span>
    </p>
    <button
      onClick={onGetStarted}
      className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xl px-10 py-5 rounded-2xl font-black shadow-2xl hover:scale-105 transition border border-white/20"
    >
      Join the Hub 🚀
    </button>
  </div>
);

// ---------- ABOUT ----------
const AboutPage = () => (
  <div className="pt-32 min-h-screen px-6 max-w-6xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-14">
      <div>
        <p className="text-sm font-bold tracking-[0.2em] text-violet-300 uppercase mb-3">
          About Campus Sync
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
          Turn your <span className="text-violet-400">campus</span> into a real‑time community.
        </h1>
        <p className="text-lg text-slate-300 mb-4">
          Campus Sync is a student-only hub that connects you to events, clubs, and opportunities
          on your campus in real time.
        </p>
        <p className="text-lg text-slate-300">
          Instead of lost WhatsApp chats and spammy groups, everything lives in one clean feed
          built for college life.
        </p>
      </div>

      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/40 to-orange-500/40 blur-3xl opacity-60" />
        <div className="relative bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-orange-400" />
            Why it feels different
          </h2>
          <ul className="space-y-3 text-sm text-slate-300">
            <li>• One feed for insider tips, study help, launchpads, and late‑night plans.</li>
            <li>• Event cards with one‑tap registration and live status.</li>
            <li>• Karma score that rewards helpful and active students.</li>
            <li>• Topic tags so you only see what actually matters to you.</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <MessageSquare size={18} className="text-violet-400" />
          Smart feeds
        </h3>
        <p className="text-sm text-slate-300">
          Post doubts, share hacks, or ask for recommendations in themed spaces like Insider
          Intel, Study Circle, Confessions and more.
        </p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <Calendar size={18} className="text-orange-400" />
          Live events
        </h3>
        <p className="text-sm text-slate-300">
          Discover tournaments, hackathons, fests, and club meets with visuals, details, and
          one‑tap registration.
        </p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
        <h3 className="text-lg font-bold text-white mb-2 flex itemscenter gap-2">
          <TrendingUp size={18} className="text-emerald-400" />
          Karma & reputation
        </h3>
        <p className="text-sm text-slate-300">
          Helpful posts, event hosting, and community engagement earn karma so active students
          stand out on campus.
        </p>
      </div>
    </div>
  </div>
);

// ---------- AUTH (uses profiles) ----------
const AuthPage = ({ onLogin, onSignup }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    degree: '',
    year: '',
    university: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', formData.email)
          .eq('password', formData.password)
          .single();

        console.log('LOGIN result:', { data, error });

        if (error || !data) throw error || new Error('No user found');
        onLogin(data);
      } else {
        const newProfile = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          university: formData.university,
          degree: `${formData.degree} (${formData.year})`,
          karma: 50,
          bio: 'Student at Campus Sync',
          interested_tags: [],
        };

        const { data, error } = await supabase
          .from('profiles')
          .insert([newProfile])
          .select()
          .single();

        console.log('SIGNUP result:', { data, error });

        if (error || !data) throw error || new Error('Insert failed');

        if (onSignup) {
          onSignup(data); // go to interests step
        } else {
          onLogin(data);
        }
      }
    } catch (err) {
      console.error('Auth error >>>', err);
      alert('Login/Signup Failed. Please check your details.');
    }
  };

  const inputStyle =
    'w-full px-5 py-4 bg-black/40 border border-white/20 rounded-2xl focus:border-violet-500 outline-none text-white placeholder:text-slate-500 transition';

  return (
    <div className="min-h-screen flex pt-24 justify-center items-center px-4">
      <div className="w-full max-w-lg bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl">
        <div className="flex justify-center gap-8 mb-8 border-b border-white/10 pb-4">
          <button
            onClick={() => setIsLoginMode(true)}
            className={`text-2xl font-black ${isLoginMode ? 'text-white' : 'text-slate-600'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLoginMode(false)}
            className={`text-2xl font-black ${!isLoginMode ? 'text-white' : 'text-slate-600'}`}
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <>
              <input
                className={inputStyle}
                placeholder="Full Name"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                className={inputStyle}
                placeholder="University"
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  className={inputStyle}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  required
                >
                  <option className="bg-black" value="">
                    Degree
                  </option>
                  {DEGREE_OPTIONS.map((o) => (
                    <option key={o} className="bg-black">
                      {o}
                    </option>
                  ))}
                </select>
                <select
                  className={inputStyle}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  required
                >
                  <option className="bg-black" value="">
                    Year
                  </option>
                  {YEAR_OPTIONS.map((o) => (
                    <option key={o} className="bg-black">
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          <input
            type="email"
            className={inputStyle}
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            className={inputStyle}
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button className="w-full bg-violet-600 text-white py-4 rounded-2xl font-bold text-xl mt-4 hover:bg-violet-500 transition shadow-lg">
            {isLoginMode ? 'Enter Hub' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

// ---------- INTEREST SELECT (restyled dark) ----------
const InterestSelectPage = ({ profile, onDone }) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(profile.interested_tags || []);

  const toggle = (tag) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filtered = INTEREST_OPTIONS.filter(
    (opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase()) ||
      opt.tag.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = async () => {
    if (selected.length < 3) {
      alert('Please select at least 3 categories to continue.');
      return;
    }
    const { error } = await supabase
      .from('profiles')
      .update({ interested_tags: selected })
      .eq('id', profile.id);

    if (error) {
      console.error(error);
      alert('Could not save interests. Please try again.');
      return;
    }

    onDone({ ...profile, interested_tags: selected });
  };

  return (
    <div className="pt-28 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 rounded-[2.5rem] shadow-[0_0_60px_rgba(15,23,42,0.9)] border border-white/10 p-8 md:p-10">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
          Select Your Interests
        </h1>
        <p className="text-slate-300 mb-5 text-sm md:text-base">
          Choose at least <span className="font-semibold text-sky-400">3 categories</span> to personalise your experience.
        </p>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/5">
            <Hash size={16} className="text-slate-400" />
            <input
              className="flex-1 bg-transparent text-sm text-slate-100 outline-none"
              placeholder="Search categories (e.g. Tech, Sports, Startups)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <span className="text-xs text-slate-400">
            {selected.length} selected (minimum 3)
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto mb-6">
          {filtered.map((opt) => {
            const active = selected.includes(opt.tag);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggle(opt.tag)}
                className={`w-full px-4 py-3 rounded-full text-sm font-semibold border transition flex items-center justify-center ${
                  active
                    ? 'bg-sky-500 text-white border-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.6)]'
                    : 'bg-slate-800/70 text-slate-200 border-slate-600 hover:bg-slate-700'
                }`}
              >
                {active && <Check size={16} className="mr-1" />}
                {opt.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleContinue}
          className="w-full mt-2 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm shadow-[0_0_25px_rgba(56,189,248,0.7)]"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

// ---------- POST CARD ----------
const PostCard = ({ post, user, onLike }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  const loadComments = async () => {
    setShowComments(!showComments);
    if (!showComments) {
      const { data } = await supabase.from('comments').select('*').eq('post_id', post.id);
      setComments(data || []);
    }
  };

  const handleSendComment = async () => {
    if (!commentText.trim()) return;
    const newComment = {
      post_id: post.id,
      user_name: user?.name || 'User',
      text: commentText,
    };
    setComments([...comments, newComment]);
    setCommentText('');
    await supabase.from('comments').insert([newComment]);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] shadow-lg border border-white/10 mb-6 hover:bg-white/10 transition">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-bold text-slate-300 text-lg border border-white/10">
          {post.author ? post.author[0] : 'U'}
        </div>
        <div>
          <h4 className="font-bold text-white text-lg">{post.author}</h4>
          <p className="text-xs text-slate-400">Just now</p>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{post.title}</h3>
      <p className="text-slate-300 mb-6">{post.content}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags &&
          post.tags.map((t, i) => (
            <span
              key={i}
              className="bg-black/30 border border-white/10 text-orange-300 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-orange-500/20 cursor-pointer"
            >
              {t}
            </span>
          ))}
      </div>
      <div className="flex items-center gap-8 border-t border-white/10 pt-6">
        <button
          onClick={() => onLike(post.id, post.upvotes)}
          className="flex items-center gap-2 text-slate-400 font-bold hover:text-orange-400 transition"
        >
          <Heart size={20} /> {post.upvotes}
        </button>
        <button
          onClick={loadComments}
          className="flex items-center gap-2 text-slate-400 font-bold hover:text-violet-400 transition"
        >
          <MessageCircle size={20} /> {comments.length > 0 ? comments.length : 'Comment'}
        </button>
      </div>
      {showComments && (
        <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in">
          <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
            {comments.length > 0 ? (
              comments.map((c, i) => (
                <div key={i} className="bg-black/20 p-3 rounded-xl border border-white/5">
                  <span className="font-bold text-violet-300 text-xs">{c.user_name}</span>
                  <p className="text-slate-300 text-sm">{c.text}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-500 italic text-sm">No comments yet.</p>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-violet-500"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              onClick={handleSendComment}
              className="p-2 bg-violet-600 rounded-xl text-white hover:bg-violet-500"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ---------- FEED ----------
const FeedPage = ({ user, posts, onCreatePost, onLike }) => {
  const [activeTab, setActiveTab] = useState('Insider Intel');
  const [isModalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedTags, setSelectedTags] = useState(['#Tech']); // multi-tags

  const togglePostTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePost = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const tagsToSave = selectedTags.length ? selectedTags : ['#New'];
    onCreatePost({
      title: newTitle,
      content: newContent,
      author: user.name,
      category: activeTab,
      tags: tagsToSave,
    });
    setModalOpen(false);
    setNewTitle('');
    setNewContent('');
    setSelectedTags(['#Tech']);
  };

  const categories = [
    { name: 'Insider Intel', icon: Lightbulb },
    { name: 'Study Circle', icon: BookOpen },
    { name: 'Launchpad', icon: Briefcase },
    { name: 'Night Owls', icon: Coffee },
    { name: 'Turf Wars', icon: Trophy },
    { name: 'Thrift Swap', icon: ShoppingBag },
    { name: 'Confessions', icon: MessageSquare },
  ];
  const filteredPosts = posts.filter((p) => p.category === activeTab);

  return (
    <div className="pt-28 px-4 pb-20 relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="hidden lg:block lg:col-span-1 space-y-4">
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/10 sticky top-28">
          <h3 className="text-xs font-black text-violet-300 uppercase tracking-widest mb-6 px-2">
            Explore Feeds
          </h3>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(cat.name)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 mb-2 border ${
                activeTab === cat.name
                  ? 'bg-violet-600 text-white shadow-lg border-violet-400'
                  : 'hover:bg-white/10 text-slate-300 border-transparent'
              }`}
            >
              <div
                className={`p-2 rounded-xl ${
                  activeTab === cat.name ? 'bg-white/20' : 'bg-black/20 text-slate-500'
                }`}
              >
                <cat.icon size={20} />
              </div>
              <span className="font-bold">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="lg:col-span-2 space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} user={user} onLike={onLike} />
          ))
        ) : (
          <div className="text-center py-20 bg-white/5 backdrop-blur-xl rounded-[2rem] text-slate-400 border border-dashed border-white/10">
            No posts in {activeTab} yet.
          </div>
        )}
      </div>
      <div className="hidden lg:block lg:col-span-1">
        <div className="bg-gradient-to-b from-violet-900/50 to-purple-900/50 rounded-3xl p-6 text-white shadow-[0_0_30px_rgba(139,92,246,0.1)] border border-white/10 mb-6">
          <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
            <Sparkles size={18} className="text-orange-400" /> Campus Pro Tip
          </h3>
          <p className="text-violet-200 text-sm">Library late entry till 2 AM!</p>
        </div>
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-8 right-8 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg z-50 border border-white/20 transition hover:scale-110 hover:-translate-y-2"
      >
        <Plus size={28} />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setModalOpen(false)}
          ></div>
          <div className="bg-slate-900 border border-white/20 p-8 rounded-[2.5rem] w-full max-w-2xl relative z-10 shadow-2xl animate-fade-in-up">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-tr from-blue-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md">
                {user.name ? user.name[0] : 'U'}
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-100">Create Post</h3>
                <p className="text-slate-400 font-medium">
                  Sharing to <span className="text-blue-300">{activeTab}</span>
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <input
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 textwhite font-bold text-lg mb-4 outline-none focus:border-violet-500"
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 textwhite text-lg mb-4 outline-none focus:border-violet-500 resize-none"
                rows="5"
                placeholder="What's on your mind?"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />

              {/* multi-tag selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    Tags (pick multiple)
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                  {INTEREST_OPTIONS.map((opt) => {
                    const active = selectedTags.includes(opt.tag);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => togglePostTag(opt.tag)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                          active
                            ? 'bg-violet-500 text-white border-violet-300'
                            : 'bg-slate-800 text-slate-200 border-slate-600 hover:bg-slate-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-xs text-slate-500">
                  Selected: {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''}
                </div>
                <button
                  onClick={handlePost}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-blue-500/30 transition active:scale-95"
                >
                  Post It <Zap size={20} fill="currentColor" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ---------- EVENTS ----------
const EventsPage = ({ events, onRegister, registeredIds, onAddEvent, user }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const openModal = (ev) => setSelectedEvent(ev);
  return (
    <div className="pt-28 px-6 pb-20 relative z-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-5xl font-black text-white tracking-tight drop-shadow-lg">
          Upcoming{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-orange-400">
            Events
          </span>
        </h1>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold border border-white/20 flex itemscenter gap-2 transition"
        >
          Host Event <Plus size={20} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden group hover:-translate-y-3 transition duration-500 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:border-orange-500/50"
          >
            <img
              src={ev.img}
              className="h-48 w-full object-cover opacity-60 group-hover:opacity-100 transition duration-500"
            />
            <div className="p-6">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                  {ev.category}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {ev.organizer ? ev.organizer : 'Student'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-300 transition truncate">
                {ev.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                {ev.date} • {ev.loc}
              </p>
              <button
                onClick={() => openModal(ev)}
                className="w-full py-3 rounded-xl font-bold transition bg-white/10 text-white hover:bg-white/20 border border-white/20"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRegister={onRegister}
          isRegistered={registeredIds.includes(selectedEvent.id)}
          user={user}
        />
      )}
      <CreateEventModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={onAddEvent}
      />
    </div>
  );
};
// ---------- EVENT DETAILS MODAL (compact with visible image) ----------
const EventDetailsModal = ({ event, onClose, onRegister, isRegistered, user }) => {
  const [regForm, setRegForm] = useState({
    phone: '',
    team: '',
    batch: '',
    fullName: user?.name || '',
  });

  const handleConfirm = () => {
    if (!regForm.phone) {
      alert('Phone required');
      return;
    }
    onRegister(event.id, regForm);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        onClick={onClose}
      ></div>

      {/* centered card with image */}
      <div className="bg-[#0F0F13] border border-white/20 rounded-2xl w-full max-w-2xl max-h-[70vh] relative z-10 shadow-2xl flex overflow-hidden flex-col md:flex-row">
        {/* left: image & basic info */}
        <div className="w-full md:w-5/12 h-44 md:h-full relative">
          <img
            src={event.img}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F13] via-black/20 to-transparent"></div>
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-violet-500/25 backdrop-blur-md border border-violet-500/40 px-2.5 py-1 rounded-lg text-violet-100 text-[11px] font-bold w-fit mb-2 flex itemscenter gap-1.5">
              <ShieldCheck size={12} /> {event.category} Event
            </div>
            <h2 className="text-lg font-black textwhite mb-1 leading-tight line-clamp-2">
              {event.title}
            </h2>
            <p className="text-slate-200 text-[11px] flex itemscenter gap-1.5">
              <Users size={12} /> {event.organizer || 'Student Council'}
            </p>
          </div>
        </div>

        {/* right: details + registration */}
        <div className="flex-1 p-5 overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/10 p-1.5 rounded-full text-slate-300 hover:textwhite hover:bg-white/20"
          >
            <X size={18} />
          </button>

          {/* date + location */}
          <div className="flex gap-3 text-violet-300 font-medium bg-white/5 p-3 rounded-2xl border border-white/10 mb-4">
            <div className="flex itemscenter gap-2">
              <Calendar size={16} className="text-orange-400" />
              <div>
                <p className="text-[9px] text-slate-500 uppercase font-bold">
                  Date
                </p>
                <p className="text-[11px]">{event.date}</p>
              </div>
            </div>
            <div className="w-px bg-white/10"></div>
            <div className="flex itemscenter gap-2">
              <MapPin size={16} className="text-orange-400" />
              <div>
                <p className="text-[9px] text-slate-500 uppercase font-bold">
                  Location
                </p>
                <p className="text-[11px]">{event.loc}</p>
              </div>
            </div>
          </div>

          {/* about */}
          <div className="mb-4">
            <h3 className="text-xs font-bold textwhite mb-1 border-b border-white/10 pb-1 inline-block">
              About Event
            </h3>
            <p className="text-slate-400 text-sm leading-snug">
              {event.description || 'Join us for an amazing session.'}
            </p>
          </div>

          {/* registration card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <h3 className="text-sm font-bold textwhite mb-3 flex itemscenter gap-2">
              <FileText size={15} className="text-orange-400" /> Registration Details
            </h3>

            {!isRegistered ? (
              <div className="space-y-3">
                <div>
                  <label className="text-slate-500 text-[10px] font-bold ml-1 mb-1 block uppercase">
                    Full Name
                  </label>
                  <input
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 textwhite text-sm outline-none"
                    value={regForm.fullName}
                    onChange={(e) =>
                      setRegForm({ ...regForm, fullName: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-slate-500 text-[10px] font-bold ml-1 mb-1 block uppercase">
                    Phone Number
                  </label>
                  <div className="flex itemscenter gap-2 bg-black/30 border border-white/10 rounded-xl px-3 py-2">
                    <Phone size={15} className="text-slate-500" />
                    <input
                      type="text"
                      className="bg-transparent w-full textwhite text-sm outline-none"
                      placeholder="+91..."
                      value={regForm.phone}
                      onChange={(e) =>
                        setRegForm({ ...regForm, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-500 text-[10px] font-bold ml-1 mb-1 block uppercase">
                      Team (Opt)
                    </label>
                    <input
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 textwhite text-sm outline-none"
                      value={regForm.team}
                      onChange={(e) =>
                        setRegForm({ ...regForm, team: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 text-[10px] font-bold ml-1 mb-1 block uppercase">
                      Batch
                    </label>
                    <input
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 textwhite text-sm outline-none"
                      value={regForm.batch}
                      onChange={(e) =>
                        setRegForm({ ...regForm, batch: e.target.value })
                      }
                    />
                  </div>
                </div>

                <button
                  onClick={handleConfirm}
                  className="w-full bg-gradient-to-r from-violet-600 to-purple-600 textwhite py-2.5 rounded-xl font-bold text-sm hover:shadow-lg mt-1.5"
                >
                  Confirm Registration
                </button>
              </div>
            ) : (
              <div className="text-center py-5 border-2 border-green-500/30 rounded-2xl bg-green-500/10">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex itemscenter justify-center mx-auto mb-3">
                  <CheckCircle size={22} className="text-green-400" />
                </div>
                <h3 className="text-sm font-bold textwhite">You're Registered!</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};



// ---------- CREATE EVENT MODAL ----------
const CreateEventModal = ({ isOpen, onClose, onSubmit }) => {
  const [evt, setEvt] = useState({
    title: '',
    date: '',
    loc: '',
    category: 'Tech',
    img: '',
    description: '',
    organizer: '',
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!evt.title.trim()) return;
    onSubmit({
      ...evt,
      img: evt.img || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18',
    });
    setEvt({
      title: '',
      date: '',
      loc: '',
      category: 'Tech',
      img: '',
      description: '',
      organizer: '',
    });
    onClose();
  };

  const inputStyle =
    'w-full bg-[#020617] border border-white/12 rounded-xl px-4 py-3 textwhite outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/60 transition';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* compact card */}
      <div className="relative z-10 w-full max-w-md bg-[#020617] border borderwhite/15 rounded-3xl px-6 py-6 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:textwhite"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-black textwhite mb-1">Create Event</h3>
        <p className="text-[11px] text-slate-400 mb-4">
          Quickly share a turf match, hackathon, meetup or jam.
        </p>

        <div className="space-y-3">
          <input
            className={inputStyle}
            placeholder="Event Title"
            value={evt.title}
            onChange={(e) => setEvt({ ...evt, title: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              className={inputStyle}
              placeholder="Date"
              value={evt.date}
              onChange={(e) => setEvt({ ...evt, date: e.target.value })}
            />
            <input
              className={inputStyle}
              placeholder="Location"
              value={evt.loc}
              onChange={(e) => setEvt({ ...evt, loc: e.target.value })}
            />
          </div>

          <input
            className={inputStyle}
            placeholder="Organizer Name"
            value={evt.organizer}
            onChange={(e) => setEvt({ ...evt, organizer: e.target.value })}
          />

          <select
            className={inputStyle}
            value={evt.category}
            onChange={(e) => setEvt({ ...evt, category: e.target.value })}
          >
            {INTEREST_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-slate-900">
                {opt.label}
              </option>
            ))}
          </select>

          <textarea
            className={inputStyle}
            rows={3}
            placeholder="Description"
            value={evt.description}
            onChange={(e) => setEvt({ ...evt, description: e.target.value })}
          />

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full mt-2 bg-orange-500 hover:bg-orange-400 textwhite py-3 rounded-xl font-bold text-sm shadow-[0_0_18px_rgba(249,115,22,0.7)]"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
// ---------- EXPLORE ----------
const ExplorePage = ({ followedTags, toggleFollow, posts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const filteredTags = INTEREST_OPTIONS.filter((o) =>
    o.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const tagPosts = posts.filter((p) => p.tags && p.tags.includes(selectedTag));
  const currentTagData = INTEREST_OPTIONS.find((t) => t.tag === selectedTag);
  const headerGradient = currentTagData ? `bg-gradient-to-r ${currentTagData.gradient}` : 'bg-slate-800';

  return (
    <div className="pt-28 px-4 pb-20 relative z-10 max-w-6xl mx-auto">
      {!selectedTag ? (
        <div className="animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black textwhite mb-4 drop-shadow-lg">
              Discover <span className="text-violet-400">Community</span>
            </h1>
            <input
              type="text"
              placeholder="Search interests, clubs, or tags..."
              className="w-full max-w-xl bg-white/10 border borderwhite/20 rounded-2xl px-6 py-4 textwhite outline-none focus:border-violet-500 focus:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredTags.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedTag(cat.tag)}
                className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border borderwhite/10 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:-translate-y-2 transition cursor-pointer group"
              >
                <div className="flex justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${cat.color} border borderwhite/10`}>
                    <Hash size={24} />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFollow(cat.tag);
                    }}
                    className={`p-2 rounded-full border borderwhite/10 transition ${
                      followedTags.includes(cat.tag)
                        ? 'bg-green-500/20 textgreen-400'
                        : 'bg-white/5 text-slate-400 hover:textwhite'
                    }`}
                  >
                    {followedTags.includes(cat.tag) ? <Check size={18} /> : <Plus size={18} />}
                  </button>
                </div>
                <h3 className="text-2xl font-bold textwhite group-hover:text-orange-400 transition">
                  {cat.label}
                </h3>
                <p className="text-sm text-slate-400 mt-2">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div
            className={`w-full ${headerGradient} rounded-[3rem] p-10 md:p-14 textwhite shadow-[0_0_50px_rgba(0,0,0,0.5)] border borderwhite/20 relative overflow-hidden mb-8`}
          >
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_60%)]" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <button
                  onClick={() => setSelectedTag(null)}
                  className="bg-white/10 px-4 py-2 rounded-full mb-6 flex itemscenter gap-2 text-sm hover:bg-white/20 backdrop-blur-md"
                >
                  <ArrowLeft size={18} /> Back
                </button>
                <h2 className="text-5xl md:text-6xl font-black mb-2 tracking-tight">
                  {selectedTag}
                </h2>
                <p className="text-white/90 text-xl max-w-xl">
                  {currentTagData?.desc || 'Join students who vibe with the same interests.'}
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-3">
                <button
                  onClick={() => toggleFollow(selectedTag)}
                  className="px-8 py-3 bg-white text-slate-900 font-bold rounded-2xl hover:scale-105 transition shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                >
                  {followedTags.includes(selectedTag) ? 'Following' : 'Join Community'}
                </button>
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                  Topic hub • Campus Sync
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-3xl mx-auto grid gap-6">
            {tagPosts.length > 0 ? (
              tagPosts.map((post) => (
                <PostCard key={post.id} post={post} user={{ name: 'Guest' }} onLike={() => {}} />
              ))
            ) : (
              <div className="text-center text-slate-500 py-10">
                No posts yet for this tag. Be the first to start the conversation.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ---------- PROFILE ----------
const ProfilePage = ({ user, posts, registeredEventIds, events = [] }) => {
  const myPosts = posts.filter((p) => p.author === user.name);
  const myEvents = events.filter((ev) => registeredEventIds.includes(ev.id));
  const myComments = []; // wire this later from comments table
  const topInterests = (user.interestedTags || []).slice(0, 6);

  return (
    <div className="pt-28 px-4 pb-20 relative z-10 max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-violet-900/70 via-slate-900/80 to-orange-900/70 backdrop-blur-xl rounded-[3rem] border borderwhite/20 overflow-hidden p-8 md:p-10 shadow-[0_0_60px_rgba(15,23,42,0.9)]">
        {/* Top: avatar + info + edit */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          <div className="flex items-center gap-6">
            {/* circular avatar */}
            <div className="relative">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-violet-500 via-pink-500 to-orange-500 p-[3px] shadow-2xl">
                <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center text-3xl md:text-4xl font-black textwhite">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-black/80 border borderwhite/30 flex items-center justify-center text-[10px] text-slate-200">
                <Edit3 size={12} />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-black textwhite mb-1">
                {user.name}
              </h1>
              <p className="text-sm md:text-base text-slate-200 font-medium">
                {user.degree} • {user.university}
              </p>
              <p className="text-xs md:text-sm text-slate-400 mt-1 italic">
                "{user.bio || 'Student at Campus Sync'}"
              </p>
              {topInterests.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                  {topInterests.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[11px] font-semibold rounded-full bg-white/10 border borderwhite/20 text-violet-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="md:ml-auto flex flex-col items-center md:items-end gap-3">
            <button className="px-5 py-2 bg-white/10 hover:bg-white/20 textwhite font-semibold rounded-full border borderwhite/30 flex itemscenter gap-2 text-xs">
              <Edit3 size={14} /> Edit Profile
            </button>
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-300 flex itemscenter gap-2">
              <Sparkles size={14} className="text-orange-300" />
              Campus Sync Member
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <ProfileStatCard label="Posts" value={myPosts.length} />
          <ProfileStatCard label="Events" value={registeredEventIds.length} />
          <ProfileStatCard label="Karma" value={user.karma} accent />
        </div>

        {/* Activity tabs */}
        <ProfileActivityTabs posts={myPosts} events={myEvents} comments={myComments} />
      </div>
    </div>
  );
};

const ProfileStatCard = ({ label, value, accent = false }) => (
  <div className="bg-black/30 p-4 rounded-2xl border borderwhite/15 text-center">
    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.18em] mb-1">
      {label}
    </div>
    <div
      className={`text-2xl md:text-3xl font-black ${
        accent ? 'text-orange-400' : 'textwhite'
      }`}
    >
      {value}
    </div>
  </div>
);

const ProfileActivityTabs = ({ posts, events, comments }) => {
  const [tab, setTab] = useState('posts');

  const tabs = [
    { id: 'posts', label: 'Posts' },
    { id: 'events', label: 'Events' },
    { id: 'comments', label: 'Comments' },
  ];

  const emptyText = {
    posts: 'No posts yet. Share something in Insider Intel.',
    events: 'You are not part of any events yet.',
    comments: 'Comments you make on posts will show up here.',
  }[tab];

  const items =
    tab === 'posts'
      ? posts
      : tab === 'events'
      ? events
      : comments;

  return (
    <div>
      {/* tab bar */}
      <div className="flex justify-center mb-4 border-t borderwhite/10 pt-4">
        <div className="inline-flex bg-black/40 rounded-full border borderwhite/15 overflow-hidden">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                tab === t.id
                  ? 'bg-white text-slate-900'
                  : 'text-slate-400 hover:textwhite'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* tiles */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.slice(0, 9).map((item) => {
            if (tab === 'posts') {
              return (
                <div
                  key={item.id}
                  className="bg-black/40 border borderwhite/15 rounded-2xl p-3 text-xs text-slate-200 hover:bg-white/10 transition flex flex-col justify-between"
                >
                  <div className="font-semibold text-sm line-clamp-2 mb-2">
                    {item.title}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>{item.category}</span>
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            }
            if (tab === 'events') {
              return (
                <div
                  key={item.id}
                  className="bg-black/40 border borderwhite/15 rounded-2xl p-3 text-xs text-slate-200 hover:bg-white/10 transition flex flex-col justify-between"
                >
                  <div className="font-semibold text-sm line-clamp-2 mb-2">
                    {item.title}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>{item.date}</span>
                    <span>{item.loc}</span>
                  </div>
                </div>
              );
            }
            return (
              <div
                key={item.id}
                className="bg-black/40 border borderwhite/15 rounded-2xl p-3 text-xs text-slate-200 hover:bg-white/10 transition flex flex-col justify-between"
              >
                <div className="line-clamp-2 mb-1">{item.text}</div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>{item.postTitle || 'On a post'}</span>
                  {item.created_at && (
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-black/30 border border-dashed borderwhite/20 rounded-2xl p-6 text-slate-300 text-sm text-center">
          {emptyText}
        </div>
      )}
    </div>
  );
};



// ---------- APP ----------
function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [pendingProfile, setPendingProfile] = useState(null); // for interests step
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [registeredEventIds, setRegisteredEventIds] = useState([]);
  

  useEffect(() => {
    const savedUser = localStorage.getItem('campus_profile');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      const fullUser = {
        ...parsed,
        interestedTags: parsed.interested_tags || parsed.interestedTags || [],
      };
      setUser(fullUser);
      setPage('feed');
    }
    const fetchData = async () => {
      try {
        const { data: postData } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });
        if (postData) setPosts(postData);
        const { data: eventData } = await supabase.from('events').select('*');
        if (eventData) setEvents(eventData);
      } catch (e) {
        console.log('DB Error', e);
      }
    };
    fetchData();
  }, []);

  const handleLogin = (profile) => {
    const fullUser = {
      ...profile,
      interestedTags: profile.interested_tags || profile.interestedTags || [],
    };
    setUser(fullUser);
    localStorage.setItem('campus_profile', JSON.stringify(fullUser));
    setPage('feed');
  };

  const handleLogout = () => {
    setUser(null);
    setPendingProfile(null);
    localStorage.removeItem('campus_profile');
    setPage('home');
  };

  const handleCreatePost = async (postData) => {
    const newPost = {
      ...postData,
      id: Date.now(),
      created_at: new Date().toISOString(),
      upvotes: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    await supabase.from('posts').insert([
      {
        title: postData.title,
        content: postData.content,
        author: postData.author,
        category: postData.category,
        tags: postData.tags,
      },
    ]);
  };

  const handleLike = async (postId, currentLikes) => {
    setPosts(posts.map((p) => (p.id === postId ? { ...p, upvotes: currentLikes + 1 } : p)));
    await supabase.from('posts').update({ upvotes: currentLikes + 1 }).eq('id', postId);
  };

  const handleAddEvent = async (eventData) => {
    const newEvent = { ...eventData, id: Date.now() };
    setEvents([newEvent, ...events]);
    await supabase.from('events').insert([eventData]);
  };

  const handleRegister = async (eventId, formData) => {
    if (registeredEventIds.includes(eventId)) return;
    setRegisteredEventIds([...registeredEventIds, eventId]);
    if (user) {
      await supabase.from('registrations').insert([
        {
          user_email: user.email,
          event_id: eventId,
          full_name: formData.fullName,
          phone: formData.phone,
          roll_no: formData.batch,
          team_name: formData.team,
        },
      ]);
    }
  };

  const toggleFollowTag = async (tag) => {
    if (!user) return;
    const current = user.interestedTags || [];
    const next = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];

    const updatedUser = { ...user, interestedTags: next };
    setUser(updatedUser);
    localStorage.setItem('campus_profile', JSON.stringify(updatedUser));

    await supabase.from('profiles').update({ interested_tags: next }).eq('id', user.id);
  };

  return (
    <div className="font-sans text-slate-100 bg-transparent min-h-screen selection:bg-violet-500/50 selection:text-white relative">
      <CrazyDynamicBackground />
      <Navbar
        currentPage={page}
        setCurrentPage={setPage}
        isLoggedIn={!!user}
        user={user || {}}
        onLogout={handleLogout}
      />

      {/* PUBLIC pages */}
      {!user && page === 'home' && <LandingPage onGetStarted={() => setPage('login')} />}
      {!user && page === 'about' && <AboutPage />}

      {!user && page === 'login' && (
        <AuthPage
          onLogin={handleLogin}
          onSignup={(profile) => {
            setPendingProfile(profile);
            setPage('interests');
          }}
        />
      )}

      {!user && page === 'interests' && pendingProfile && (
        <InterestSelectPage
          profile={pendingProfile}
          onDone={(updated) => {
            setPendingProfile(null);
            handleLogin(updated);
          }}
        />
      )}

      {/* PRIVATE pages */}
      {user && page === 'feed' && (
        <FeedPage user={user} posts={posts} onCreatePost={handleCreatePost} onLike={handleLike} />
      )}
      {user && page === 'events' && (
        <EventsPage
          events={events}
          onRegister={handleRegister}
          registeredIds={registeredEventIds}
          onAddEvent={handleAddEvent}
          user={user}
        />
      )}
      {user && page === 'explore' && (
        <ExplorePage
          followedTags={user.interestedTags || []}
          toggleFollow={toggleFollowTag}
          posts={posts}
        />
      )}
      {user && page === 'profile' && (
        <ProfilePage
          user={user}
          posts={posts}
          registeredEventIds={registeredEventIds}
        />
      )}
    </div>
  );
}

export default App;
