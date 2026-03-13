import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    question: '',
    type: 'Aptitude',
    options: [
      { text: '', score: 0 },
      { text: '', score: 0 },
      { text: '', score: 0 },
      { text: '', score: 0 }
    ]
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data } = await API.get('/admin/questions');
      setQuestions(data);
    } catch (err) {
      if (err.response?.status === 401) navigate('/admin');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    try {
      await API.delete(`/admin/questions/${id}`);
      setQuestions(questions.filter(q => q._id !== id));
    } catch (err) {
      alert('Error deleting question');
    }
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...formData.options];
    newOptions[index][field] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/admin/questions', formData);
      setQuestions([...questions, data]);
      setShowAdd(false);
      setFormData({
        question: '',
        type: 'Aptitude',
        options: [
          { text: '', score: 0 }, { text: '', score: 0 }, { text: '', score: 0 }, { text: '', score: 0 }
        ]
      });
    } catch (err) {
      alert('Error adding question');
    }
  };

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    q.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 bg-[#161821] p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-800 gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px] -z-10 mix-blend-screen" />
        <div className="flex items-center space-x-4 relative z-10">
          <button onClick={() => navigate('/admin/dashboard')} className="text-gray-400 hover:text-indigo-400 border border-gray-800 hover:border-indigo-500/50 transition-colors p-3 bg-[#0f1015] rounded-xl font-bold">
            &larr; Back
          </button>
          <h1 className="text-3xl font-black text-white tracking-tight">Manage Questions</h1>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className={`px-8 py-3.5 rounded-xl font-bold transition-all shadow-md relative z-10 ${showAdd ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:-translate-y-0.5'}`}
        >
          {showAdd ? 'Cancel' : '+ Add New Question'}
        </button>
      </div>

      <div className="mb-8 relative z-10 hover:shadow-[0_0_30px_rgba(79,70,229,0.1)] transition-shadow rounded-2xl">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-indigo-400 z-10">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search knowledge protocols by prompt or category..."
          className="w-full bg-[#161821] border border-gray-800 text-white rounded-3xl pl-14 pr-6 py-4 outline-none focus:border-indigo-500 focus:bg-[#12141c] transition-all font-bold placeholder-gray-600 shadow-2xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showAdd && (
        <form onSubmit={handleAddSubmit} className="bg-[#161821] p-8 md:p-10 rounded-3xl shadow-2xl border border-indigo-500/20 mb-10 animate-in slide-in-from-top-4 duration-500">
          <h3 className="text-2xl font-black text-white mb-8 tracking-tight">Create Knowledge Protocol</h3>
          <div className="space-y-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-3">
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Question Prompt</label>
                <input 
                  type="text" required className="w-full border border-gray-700 bg-[#0f1015] text-white rounded-xl p-4 outline-none focus:border-indigo-500 focus:bg-[#12141c] transition-colors text-lg font-medium placeholder-gray-600"
                  value={formData.question} onChange={(e) => setFormData({...formData, question: e.target.value})}
                  placeholder="E.g., Which environment do you prefer to work in?"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Category</label>
                <select 
                  className="w-full border border-gray-700 bg-[#0f1015] text-white rounded-xl p-4 outline-none focus:border-indigo-500 focus:bg-[#12141c] transition-colors text-lg font-medium cursor-pointer"
                  value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="Aptitude" className="bg-[#161821]">Aptitude</option>
                  <option value="Personality" className="bg-[#161821]">Personality</option>
                  <option value="Interest" className="bg-[#161821]">Interest</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-400 mb-4 uppercase tracking-wide border-t border-gray-800 pt-8">Response Options & Impact Scores</label>
              <div className="grid md:grid-cols-2 gap-6">
                {formData.options.map((opt, i) => (
                  <div key={i} className="flex space-x-3 bg-[#0f1015] p-4 rounded-2xl border border-gray-800 focus-within:border-indigo-500/50 transition-colors">
                    <span className="bg-[#161821] text-gray-400 font-bold px-3 py-2 rounded-lg border border-gray-700">{String.fromCharCode(65 + i)}</span>
                    <input 
                      type="text" placeholder={`Option descriptive text`} required 
                      className="flex-grow bg-transparent border-none p-2 outline-none text-white font-medium placeholder-gray-600"
                      value={opt.text} onChange={(e) => handleOptionChange(i, 'text', e.target.value)}
                    />
                    <div className="bg-[#161821] border border-gray-700 rounded-lg flex items-center px-1">
                      <input 
                        type="number" placeholder="Score" required 
                        className="w-16 bg-transparent border-none text-center font-bold text-indigo-400 outline-none"
                        value={opt.score} onChange={(e) => handleOptionChange(i, 'score', Number(e.target.value))}
                        title="Points added to category if user selects this"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all shadow-md text-lg">
                Publish Question To Database
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredQuestions.map(q => (
          <div key={q._id} className="bg-[#161821] p-8 rounded-3xl shadow-2xl border border-gray-800 flex flex-col justify-between hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(79,70,229,0.1)] transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0f1015] rounded-bl-[100px] -z-10 group-hover:bg-indigo-500/10 transition-colors"></div>
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className={`px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest border ${
                  q.type === 'Aptitude' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                  q.type === 'Personality' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {q.type}
                </span>
                <button 
                  onClick={() => handleDelete(q._id)}
                  className="text-gray-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-all"
                  title="Delete Question"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
              <h4 className="font-bold text-white text-lg mb-6 leading-relaxed relative z-10">{q.question}</h4>
              <div className="space-y-3 mb-2 relative z-10">
                {q.options.map((opt, i) => (
                  <div key={i} className="text-sm font-medium text-gray-300 flex justify-between items-center p-3 bg-[#0f1015] rounded-lg border border-gray-800 group-hover:bg-[#12141c] hover:border-gray-700 transition-colors">
                    <span><span className="text-gray-500 font-bold mr-2">{String.fromCharCode(65 + i)}.</span>{opt.text}</span>
                    <span className="font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">+{opt.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        {filteredQuestions.length === 0 && !showAdd && (
          <div className="col-span-full text-center py-20 bg-[#161821] rounded-3xl border border-dashed border-gray-800 shadow-2xl">
            <div className="w-20 h-20 bg-[#0f1015] border border-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <p className="text-xl font-bold text-white">
              {searchTerm ? "No questions match your search." : "No Assessment Questions Yet"}
            </p>
            <p className="text-gray-400 mt-2 mb-6">
              {searchTerm ? "Try adjusting your search terms." : "Build your protocol to let students take tests."}
            </p>
            {!searchTerm && <button onClick={() => setShowAdd(true)} className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 font-bold px-6 py-3 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors shadow-md">Create First Question</button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageQuestions;
