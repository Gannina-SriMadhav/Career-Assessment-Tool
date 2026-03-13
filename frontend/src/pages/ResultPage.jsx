import { useLocation, useNavigate } from 'react-router-dom';
import ResultChart from '../components/ResultChart';
import jsPDF from 'jspdf';

const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;
  const user = JSON.parse(localStorage.getItem('user'));

  if (!result) {
    return (
      <div className="text-center mt-20 bg-[#161821] p-12 rounded-3xl shadow-2xl border border-gray-800 max-w-lg mx-auto">
        <div className="w-20 h-20 bg-[#0f1015] border border-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">⚠️</div>
        <h2 className="text-2xl font-bold text-white mb-2">No result data found.</h2>
        <p className="text-gray-400 mb-8">Please complete a test to see your results.</p>
        <button onClick={() => navigate('/dashboard')} className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-colors">Return to Dashboard</button>
      </div>
    );
  }

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(26);
    doc.setTextColor(79, 70, 229); // Indigo 600
    doc.text('Career Assessment Report', 20, 25);
    
    doc.setDrawColor(226, 232, 240);
    doc.line(20, 35, 190, 35);

    doc.setFontSize(14);
    doc.setTextColor(51, 65, 85); // Slate 700
    doc.text(`Student Name: ${user.name}`, 20, 50);
    doc.text(`Date completed: ${new Date(result.date).toLocaleDateString()}`, 20, 60);
    
    doc.setDrawColor(226, 232, 240);
    doc.line(20, 70, 190, 70);

    doc.setFontSize(16);
    doc.setTextColor(30, 41, 59); // Slate 800
    doc.text(`Aptitude Score:     ${result.aptitudeScore} pts`, 20, 90);
    doc.text(`Personality Score:  ${result.personalityScore} pts`, 20, 100);
    doc.text(`Interest Score:      ${result.interestScore} pts`, 20, 110);
    
    doc.setDrawColor(226, 232, 240);
    doc.line(20, 130, 190, 130);

    doc.setFontSize(18);
    doc.setTextColor(100, 116, 139); // Slate 500
    doc.text(`Recommended Career Path`, 20, 150);
    
    doc.setFontSize(28);
    doc.setTextColor(79, 70, 229);
    doc.setFont("helvetica", "bold");
    doc.text(`${result.suggestedCareer}`, 20, 165);

    doc.save(`Career_Report_${user.name.replace(/ /g, '_')}.pdf`);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 mix-blend-screen" />
        <p className="text-indigo-400 font-black uppercase tracking-[0.2em] text-sm mb-4">Assessment Complete</p>
        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-6 tracking-tight">Your Result</h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">Based on your detailed profile and answers, our system strongly recommends the following career path:</p>
        
        <div className="inline-flex items-center justify-center bg-[#161821]/80 backdrop-blur-xl border border-gray-700 px-12 md:px-24 py-10 rounded-3xl shadow-[0_0_50px_rgba(79,70,229,0.15)] transform hover:scale-105 transition-all duration-500 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 relative z-10">
            {result.suggestedCareer}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-stretch mb-12">
        <div className="h-full bg-[#161821] rounded-3xl p-8 border border-gray-800 shadow-2xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-[60px]" />
          <ResultChart result={result} />
        </div>
        
        <div className="bg-[#161821] p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-800 flex flex-col justify-between h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-bl-[150px] -z-10 blur-xl"></div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Detailed Breakdown</h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center text-lg p-5 bg-[#0f1015] rounded-2xl border border-gray-800 group hover:border-indigo-500/30 transition-colors">
                <span className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">Aptitude Score</span>
                <span className="font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-xl">{result.aptitudeScore} pts</span>
              </div>
              <div className="flex justify-between items-center text-lg p-5 bg-[#0f1015] rounded-2xl border border-gray-800 group hover:border-indigo-500/30 transition-colors">
                <span className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">Personality Score</span>
                <span className="font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-xl">{result.personalityScore} pts</span>
              </div>
              <div className="flex justify-between items-center text-lg p-5 bg-[#0f1015] rounded-2xl border border-gray-800 group hover:border-indigo-500/30 transition-colors">
                <span className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">Interest Score</span>
                <span className="font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-xl">{result.interestScore} pts</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={downloadReport}
            className="w-full mt-10 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white font-bold py-5 rounded-2xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] flex items-center justify-center space-x-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-lg">Download PDF Report</span>
          </button>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="inline-flex items-center text-gray-400 font-bold hover:text-white transition-colors bg-[#161821] px-8 py-4 rounded-full shadow-lg border border-gray-800 hover:border-gray-600"
        >
          <span className="mr-3 text-xl">&larr;</span> Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
