import React, { useState, useEffect } from 'react';
import {
  Globe, LogIn, User, MessageSquare, Briefcase, Coffee, Trophy, ShoppingBag,
  Lock, GraduationCap, Mail, Heart, Share2, MessageCircle, MapPin, CheckCircle,
  Eye, Sparkles, Zap, TrendingUp, Calendar, Search, Bell, Menu, BookOpen,
  Lightbulb, ChevronDown, Check, Hash, ArrowLeft, Filter, Plus, X, Users,
  Activity, Send, ShieldCheck, Phone, FileText, Edit3, Image as ImageIcon
} from 'lucide-react';
import { supabase } from './supabaseClient';

// --- CONSTANTS ---
const INTEREST_OPTIONS = [
  { id: 'tech', label: 'Tech & Coding', tag: '#Tech', desc: 'Hackathons, AI, and Code', color: 'bg-violet-500/20 text-violet-300', gradient: 'from-violet-600 to-purple-600' },
  { id: 'sports', label: 'Sports & Fitness', tag: '#Sports', desc: 'Turf bookings and gym partners.', color: 'bg-orange-500/20 text-orange-300', gradient: 'from-orange-500 to-amber-500' },
  { id: 'food', label: 'Food Cravings', tag: '#Foodie', desc: 'Best mess food and cafes.', color: 'bg-amber-500/20 text-amber-300', gradient: 'from-amber-500 to-orange-600' },
  { id: 'gaming', label: 'Gaming', tag: '#Gaming', desc: 'Valorant, FIFA, BGMI.', color: 'bg-purple-500/20 text-purple-300', gradient: 'from-purple-600 to-fuchsia-600' },
  { id: 'music', label: 'Music', tag: '#Music', desc: 'Jamming and concerts.', color: 'bg-pink-500/20 text-pink-300', gradient: 'from-pink-500 to-rose-500' },
  { id: 'startup', label: 'Startups', tag: '#Startup', desc: 'Pitch ideas and funding.', color: 'bg-fuchsia-500/20 text-fuchsia-300', gradient: 'from-fuchsia-600 to-purple-800' },
  { id: 'books', label: 'Literature', tag: '#Books', desc: 'Poetry and reading clubs.', color: 'bg-orange-500/20 text-orange-300', gradient: 'from-orange-400 to-red-500' },
  { id: 'art', label: 'Art & Design', tag: '#Creative', desc: 'Sketching and UI/UX.', color: 'bg-rose-500/20 text-rose-300', gradient: 'from-rose-500 to-pink-600' },
];

const DEGREE_OPTIONS = ['B.Tech', 'B.E', 'B.Sc', 'B.Com', 'BBA', 'MBA', 'M.Tech', 'PhD', 'MBBS', 'B.Arch', 'Other'];
const YEAR_OPTIONS   = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th+ Year'];

// --- DYNAMIC BACKGROUND ---
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

// --- NAVBAR ---
const Navbar = ({ currentPage, setCurrentPage, isLoggedIn, user, onLogout }) => (
  <nav className="fixed top-0 w-full bg-black/60 backdrop-blur-xl border-b border-white/10 z-50 px-6 py-4 flex justify-between items-center shadow-2xl">
    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentPage('home')}>
      <div className="bg-gradient-to-tr from-violet-600 to-orange-500 p-2 rounded-xl shadow-lg border border-white/20">
        <Globe className="text-white w-6 h-6" />
      </div>
      <span className="text-xl font-black text-white tracking-wider">Campus Sync</span>
    </div>
    <div className="hidden md:flex gap-2 bg-white/5 p-1.5 rounded-full border border-white/10">
      {['Home', 'Feed', 'Events', 'Explore'].map((item) =>
        !isLoggedIn && item !== 'Home' ? null : (
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
        )
      )}
      {!isLoggedIn && (
        <button
          onClick={() => setCurrentPage('login')}
          className="px-6 py-2 rounded-full text-sm font-bold text-slate-400 hover:text-white"
        >
          Log In
        </button>
      )}
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
        <button onClick={onLogout} className="text-xs font-bold text-slate-400 hover:text-red-400">
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

// --- LANDING PAGE ---
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

// --- AUTH PAGE ---
const AuthPage = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    degree: '',
    year: '',
    university: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLoginMode) {
        // LOGIN
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', formData.email)
          .eq('password', formData.password)
          .single();
        if (error || !data) throw error || new Error('Login failed');
        onLogin(data);
      } else {
        // SIGNUP
        const newUser = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          university: formData.university,
          degree: `${formData.degree} (${formData.year})`,
          karma: 50,
          bio: 'New student',
          interested_tags: [],
        };
        const { error: insertError } = await supabase.from('users').insert(newUser);
        if (insertError) throw insertError;

        const { data: userData, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('email', formData.email)
          .eq('password', formData.password)
          .single();
        if (fetchError || !userData) throw fetchError || new Error('Signup fetch failed');
        onLogin(userData);
      }
    } catch (err) {
      console.error('Auth error:', err);
      alert('Login/Signup Failed. Please check your details.');
    } finally {
      setLoading(false);
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
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-violet-600 text-white py-4 rounded-2xl font-bold text-xl mt-4 hover:bg-violet-500 transition shadow-lg ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Processing...' : isLoginMode ? 'Enter Hub' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- POST CARD ---
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

// --- FEED PAGE ---
const FeedPage = ({ user, posts, onCreatePost, onLike }) => {
  if (!user) return null; // prevent crash

  const [activeTab, setActiveTab] = useState('Insider Intel');
  const [isModalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('#Tech');

  const handlePost = () => {
    onCreatePost({
      title: newTitle,
      content: newContent,
      author: user.name || 'User',
      category: activeTab,
      tags: [selectedTag, '#New'],
    });
    setModalOpen(false);
    setNewTitle('');
    setNewContent('');
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
                <h3 className="text-2xl font-black text-slate-900">Create Post</h3>
                <p className="text-slate-500 font-medium">
                  Sharing to <span className="text-blue-600">{activeTab}</span>
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <input
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold text-lg mb-4 outline-none focus:border-violet-500"
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-lg mb-4 outline-none focus:border-violet-500 resize-none"
                rows="5"
                placeholder="What's on your mind?"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl">
                  <Hash size={20} className="text-slate-400" />
                  <select
                    className="bg-transparent text-slate-700 font-bold outline-none cursor-pointer appearance-none"
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                  >
                    {INTEREST_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.tag}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="text-slate-400" />
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

// --- EVENTS, EXPLORE, PROFILE PAGES ---
// These are identical to your current versions, with only user guards added.

const EventsPage = ({ events, onRegister, registeredIds, onAddEvent, user }) => {
  if (!user) return null;

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
          className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold border border-white/20 flex items-center gap-2 transition"
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
                className="w-full py-3 rounded-xl font-bold transition bg-white/10 text-white hover:bg:white/20 border border-white/20"
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
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose}></div>
      <div className="bg-[#0F0F13] border border-white/20 rounded-[2.5rem] w-full max-w-5xl h-[85vh] relative z-10 shadow-2xl flex overflow-hidden flex-col md:flex-row">
        <div className="w-full md:w-2/5 h-64 md:h-full relative">
          <img
            src={event.img}
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F13] via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8">
            <div className="bg-violet-500/20 backdrop-blur-md border border-violet-500/30 px-4 py-2 rounded-lg text-violet-200 text-sm font-bold w-fit mb-4 flex items-center gap-2">
              <ShieldCheck size={16} /> {event.category} Event
            </div>
            <h2 className="text-4xl font-black text-white mb-2 leading-tight">{event.title}</h2>
            <p className="text-slate-300 font-medium flex items-center gap-2">
              <Users size={18} /> Organized by {event.organizer || 'Student Council'}
            </p>
          </div>
        </div>
        <div className="flex-1 p-10 overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 bg-white/10 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/20"
          >
            <X size={24} />
          </button>
          <div className="md:hidden mb-8">
            <h2 className="text-3xl font-black text-white mb-2">{event.title}</h2>
          </div>
          <div className="space-y-8 mb-10">
            <div className="flex gap-6 text-violet-300 font-medium bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3">
                <Calendar size={24} className="text-orange-400" />
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Date</p>
                  {event.date}
                </div>
              </div>
              <div className="w-px bg-white/10"></div>
              <div className="flex items-center gap-3">
                <MapPin size={24} className="text-orange-400" />
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Location</p>
                  {event.loc}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2 border-b border-white/10 pb-2 inline-block">
                About Event
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                {event.description || 'Join us for an amazing session.'}
              </p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FileText size={20} className="text-orange-400" /> Registration Details
            </h3>
            {!isRegistered ? (
              <div className="space-y-4">
                <div>
                  <label className="text-slate-500 text-xs font-bold ml-1 mb-1 block uppercase">
                    Full Name
                  </label>
                  <input
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                    value={regForm.fullName}
                    onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-slate-500 text-xs font-bold ml-1 mb-1 block uppercase">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-3 bg-black/30 border border-white/10 rounded-xl px-4 py-3">
                    <Phone size={18} className="text-slate-500" />
                    <input
                      type="text"
                      className="bg-transparent w-full text-white outline-none"
                      placeholder="+91..."
                      onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-500 text-xs font-bold ml-1 mb-1 block uppercase">
                      Team (Opt)
                    </label>
                    <input
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                      onChange={(e) => setRegForm({ ...regForm, team: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 text-xs font-bold ml-1 mb-1 block uppercase">
                      Batch
                    </label>
                    <input
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                      onChange={(e) => setRegForm({ ...regForm, batch: e.target.value })}
                    />
                  </div>
                </div>
                <button
                  onClick={handleConfirm}
                  className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg mt-4"
                >
                  Confirm Registration
                </button>
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-green-500/30 rounded-2xl bg-green-500/10">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">You're Registered!</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

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
    if (!evt.title) return;
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
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="bg-slate-900 border border-white/20 p-8 rounded-[2.5rem] w-full max-w-lg relative z-10 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white"
        >
          <X size={24} />
        </button>
        <h3 className="text-2xl font-black text-white mb-6">Host Event</h3>
        <div className="space-y-4">
          <input
            className={inputStyle}
            placeholder="Event Title"
            onChange={(e) => setEvt({ ...evt, title: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              className={inputStyle}
              placeholder="Date"
              onChange={(e) => setEvt({ ...evt, date: e.target.value })}
            />
            <input
              className={inputStyle}
              placeholder="Location"
              onChange={(e) => setEvt({ ...evt, loc: e.target.value })}
            />
          </div>
          <input
            className={inputStyle}
            placeholder="Organizer Name"
            onChange={(e) => setEvt({ ...evt, organizer: e.target.value })}
          />
          <select
            className={inputStyle}
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
            rows="3"
            placeholder="Description"
            onChange={(e) => setEvt({ ...evt, description: e.target.value })}
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

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
            <h1 className="text-5xl font-black text-white mb-4 drop-shadow-lg">
              Discover <span className="text-violet-400">Community</span>
            </h1>
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-xl bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white outline-none focus:border-violet-500 focus:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredTags.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedTag(cat.tag)}
                className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:-translate-y-2 transition cursor-pointer group"
              >
                <div className="flex justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${cat.color} border border-white/10`}>
                    <Hash size={24} />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFollow(cat.tag);
                    }}
                    className={`p-2 rounded-full border border-white/10 transition ${
                      followedTags.includes(cat.tag)
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {followedTags.includes(cat.tag) ? <Check size={18} /> : <Plus size={18} />}
                  </button>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition">
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
            className={`w-full ${headerGradient} rounded-[3rem] p-12 text-white shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/20 relative overflow-hidden mb-8`}
          >
            <button
              onClick={() => setSelectedTag(null)}
              className="bg-black/20 px-4 py-2 rounded-full mb-6 flex items-center gap-2 hover:bg-black/40 backdrop-blur-md"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <h2 className="text-7xl font-black mb-4 tracking-tighter">{selectedTag}</h2>
            <p className="text-white/90 text-2xl max-w-2xl">{currentTagData?.desc}</p>
            <button
              onClick={() => toggleFollow(selectedTag)}
              className="mt-8 px-10 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:scale-105 transition shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            >
              {followedTags.includes(selectedTag) ? 'Following' : 'Join Community'}
            </button>
          </div>
          <div className="max-w-3xl mx-auto grid gap-6">
            {tagPosts.length > 0 ? (
              tagPosts.map((post) => (
                <PostCard key={post.id} post={post} user={{ name: 'Guest' }} onLike={() => {}} />
              ))
            ) : (
              <div className="text-center text-slate-500 py-10">No posts yet</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ProfilePage = ({ user, posts, registeredEventIds, onUpdateUser }) => {
  if (!user) return null;

  const myPosts = posts.filter((p) => p.author === user.name);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="pt-28 px-4 pb-20 relative z-10 max-w-5xl mx-auto">
      <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] border border-white/20 overflow-hidden p-12 shadow-[0_0_60px_rgba(139,92,246,0.2)]">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-32 h-32 bg-gradient-to-br from-violet-500 to-orange-500 rounded-[2.5rem] flex items-center justify-center text-6xl font-bold text-white border-4 border-white/20 shadow-2xl">
            {user.name ? user.name[0].toUpperCase() : 'U'}
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-5xl font-black text-white mb-2">{user.name}</h1>
            <p className="text-xl text-slate-400 font-medium">
              {user.degree} • {user.university}
            </p>
            <p className="text-slate-500 mt-2 italic">
              "{user.bio || 'Just another student at Campus Sync.'}"
            </p>
          </div>
          <button
            onClick={() => setIsEditOpen(true)}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 flex items-center gap-2 transition"
          >
            <Edit3 size={18} /> Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-black/20 p-6 rounded-[2rem] border border-white/10 text-center">
            <div className="text-4xl font-black text-white mb-1">{myPosts.length}</div>
            <div className="text-slate-400 font-bold uppercase text-xs tracking-widest">Posts</div>
          </div>
          <div className="bg-black/20 p-6 rounded-[2rem] border border-white/10 text-center">
            <div className="text-4xl font-black text-white mb-1">{registeredEventIds.length}</div>
            <div className="text-slate-400 font-bold uppercase text-xs tracking-widest">Events</div>
          </div>
          <div className="bg-black/20 p-6 rounded-[2rem] border border-white/10 text-center">
            <div className="text-4xl font-black text-orange-400 mb-1">{user.karma}</div>
            <div className="text-slate-400 font-bold uppercase text-xs tracking-widest">Karma</div>
          </div>
          <div className="bg-black/20 p-6 rounded-[2rem] border border-white/10 text-center">
            <div className="text-4xl font-black text-violet-400 mb-1">405</div>
            <div className="text-slate-400 font-bold uppercase text-xs tracking-widest">Views</div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {myPosts.length > 0 ? (
            myPosts.map((p) => (
              <div
                key={p.id}
                className="bg-white/5 p-6 rounded-2xl border border-white/10 text-slate-300 hover:bg-white/10 transition cursor-pointer flex justify-between"
              >
                <span className="font-bold">{p.title}</span>
                <span className="text-sm text-slate-500">
                  {new Date(p.created_at).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-slate-500 italic">No posts yet.</p>
          )}
        </div>
      </div>
      {/* Your EditProfileModal component can remain as in your original file */}
    </div>
  );
};

// --- APP ---
function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [registeredIds, setRegisteredIds] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('campus_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
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

  const handleLogin = (userData) => {
    if (!userData) {
      console.error('handleLogin called with empty userData');
      return;
    }
    const fullUser = {
      ...userData,
      interestedTags: userData.interested_tags || [],
    };
    setUser(fullUser);
    localStorage.setItem('campus_user', JSON.stringify(fullUser));
    setPage('feed');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('campus_user');
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
    if (registeredIds.includes(eventId)) return;
    setRegisteredIds([...registeredIds, eventId]);
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

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('campus_user', JSON.stringify(updatedUser));
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
      {page === 'home' && <LandingPage onGetStarted={() => setPage('login')} />}
      {page === 'login' && <AuthPage onLogin={handleLogin} />}
      {page === 'feed' && (
        <FeedPage user={user} posts={posts} onCreatePost={handleCreatePost} onLike={handleLike} />
      )}
      {page === 'events' && (
        <EventsPage
          events={events}
          onRegister={handleRegister}
          registeredIds={registeredIds}
          onAddEvent={handleAddEvent}
          user={user}
        />
      )}
      {page === 'explore' && (
        <ExplorePage
          followedTags={user?.interestedTags || []}
          toggleFollow={() => {}}
          posts={posts}
        />
      )}
      {page === 'profile' && (
        <ProfilePage
          user={user}
          posts={posts}
          registeredEventIds={registeredIds}
          onUpdateUser={handleUpdateUser}
        />
      )}
    </div>
  );
}

export default App;
