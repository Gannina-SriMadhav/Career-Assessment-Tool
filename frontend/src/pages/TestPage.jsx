import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import QuestionCard from '../components/QuestionCard';

const TestPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await API.get(`/student/tests/${type}`);
        setQuestions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [type]);

  const handleOptionSelect = (questionId, optionId) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const formattedAnswers = Object.entries(answers).map(([questionId, optionId]) => ({
      questionId, optionId
    }));
    try {
      const { data } = await API.post('/student/submit', { answers: formattedAnswers });
      navigate('/result', { state: { result: data } });
    } catch (err) {
      alert('Error submitting test');
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center mt-20 text-indigo-400 font-bold animate-pulse text-xl">Loading questions...</div>;
  if (!questions.length) return (
    <div className="text-center mt-20 p-8 max-w-lg mx-auto bg-[#161821] rounded-3xl shadow-2xl border border-gray-800">
      <div className="w-16 h-16 bg-[#0f1015] border border-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      </div>
      <h2 className="text-xl font-bold text-white mb-2">No questions available</h2>
      <p className="text-gray-400 mb-6">There are currently no questions found for this test category.</p>
      <button onClick={() => navigate('/dashboard')} className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 font-bold px-6 py-3 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors shadow-md">
        &larr; Return to Dashboard
      </button>
    </div>
  );

  const isComplete = Object.keys(answers).length === questions.length;
  const progress = Math.round((Object.keys(answers).length / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-10 bg-[#161821] p-8 rounded-3xl shadow-2xl border border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px] -z-10 mix-blend-screen" />
        <button 
          onClick={() => navigate('/dashboard')}
          className="text-gray-500 hover:text-indigo-400 transition-colors font-bold text-sm flex items-center mb-6 relative z-10"
        >
          &larr; Back to Dashboard
        </button>
        <h1 className="text-4xl font-black text-white capitalize mb-3 tracking-tight relative z-10">{type} Assessment</h1>
        <p className="text-gray-400 text-lg relative z-10">Answer all questions to the best of your ability to get an accurate recommendation.</p>
        
        <div className="mt-8 relative z-10">
          <div className="flex justify-between text-sm font-semibold text-gray-400 mb-2">
            <span>Progress</span>
            <span className="text-indigo-400">{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      {questions.map((q) => (
        <QuestionCard 
          key={q._id} 
          question={q} 
          selectedOption={answers[q._id]} 
          onOptionSelect={handleOptionSelect} 
        />
      ))}

      <div className="flex justify-between items-center mt-10 bg-[#161821]/90 backdrop-blur-md p-6 rounded-3xl border border-gray-800 shadow-2xl sticky bottom-8 z-20">
        <span className="text-gray-300 font-medium">
          {Object.keys(answers).length} of {questions.length} answered
        </span>
        <button 
          onClick={handleSubmit} 
          disabled={!isComplete || isSubmitting}
          className={`px-10 py-4 rounded-xl font-bold transition-all shadow-sm ${
            !isComplete || isSubmitting 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:-translate-y-0.5'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Test'}
        </button>
      </div>
    </div>
  );
};

export default TestPage;
