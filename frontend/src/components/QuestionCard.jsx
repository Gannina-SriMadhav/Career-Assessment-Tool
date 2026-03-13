const QuestionCard = ({ question, selectedOption, onOptionSelect }) => {
  return (
    <div className="bg-[#161821] p-6 md:p-8 rounded-3xl shadow-xl mb-6 border border-gray-800 hover:border-indigo-500/30 transition-all group">
      <h3 className="text-xl font-bold text-white mb-6 leading-relaxed group-hover:text-indigo-50 transition-colors">{question.question}</h3>
      <div className="space-y-4">
        {question.options.map((option) => (
          <label 
            key={option._id} 
            className={`flex items-center space-x-4 p-5 rounded-xl cursor-pointer transition-all border ${selectedOption === option._id ? 'bg-indigo-500/20 border-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.2)]' : 'hover:bg-[#12141c] hover:border-indigo-500/30 border-gray-800 bg-[#0f1015]'}`}
          >
            <input
              type="radio"
              name={`question-${question._id}`}
              value={option._id}
              checked={selectedOption === option._id}
              onChange={() => onOptionSelect(question._id, option._id)}
              className="text-indigo-500 focus:ring-indigo-500/50 w-5 h-5 bg-[#0f1015] border-gray-700"
            />
            <span className={`font-medium transition-colors ${selectedOption === option._id ? 'text-indigo-200' : 'text-gray-400 group-hover:text-gray-300'}`}>{option.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
