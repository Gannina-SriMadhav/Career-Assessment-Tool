const Question = require('../models/Question');
const Result = require('../models/Result');
const Student = require('../models/Student');

// @desc    Get dashboard metrics (tests, latest result)
// @route   GET /api/student/dashboard
// @access  Private
const getDashboard = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).populate('tests');
    const testsAvailable = ['Aptitude', 'Personality', 'Interest'];
    res.json({
      name: student.name,
      testsAvailable,
      previousResults: student.tests
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get questions by test type
// @route   GET /api/student/tests/:type
// @access  Private
const getQuestions = async (req, res) => {
  const { type } = req.params;
  try {
    const questions = await Question.find({ type: new RegExp(`^${type}$`, 'i') });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Submit answers and get result
// @route   POST /api/student/submit
// @access  Private
const submitAnswers = async (req, res) => {
  const { answers } = req.body;

  try {
    let testType = "";
    let score = 0;

    for (let answer of answers) {
      const question = await Question.findById(answer.questionId);
      if (!question) continue;
      testType = question.type; 
      const selectedOption = question.options.id(answer.optionId);
      if (selectedOption) score += selectedOption.score;
    }

    if (!testType) return res.status(400).json({ message: 'No valid questions submitted' });

    let result = await Result.findOne({ studentId: req.user.id, isComplete: false });
    
    if (!result || result.completedCategories.includes(testType)) {
      result = new Result({ studentId: req.user.id });
      await Student.findByIdAndUpdate(req.user.id, { $push: { tests: result._id } });
    }

    if (testType === 'Aptitude') result.aptitudeScore = score;
    if (testType === 'Personality') result.personalityScore = score;
    if (testType === 'Interest') result.interestScore = score;

    if (!result.completedCategories.includes(testType)) {
      result.completedCategories.push(testType);
    }

    if (result.completedCategories.length >= 3 || (result.completedCategories.includes('Aptitude') && result.completedCategories.includes('Personality') && result.completedCategories.includes('Interest'))) {
      result.isComplete = true;

      const apt = result.aptitudeScore;
      const pers = result.personalityScore;
      const inter = result.interestScore;

      if (apt > 200 && inter > 200) result.suggestedCareer = 'Software Engineer / Data Scientist';
      else if (apt > 200 && pers > 200) result.suggestedCareer = 'Engineering Manager / Director';
      else if (pers > 200 && inter > 200) result.suggestedCareer = 'Human Resources / Therapist';
      else if (apt > 240) result.suggestedCareer = 'Research Scientist / Statistician';
      else if (inter > 240) result.suggestedCareer = 'Graphic Designer / Artist';
      else if (pers > 240) result.suggestedCareer = 'Public Relations / Sales Executive';
      else if (apt > 150 && inter > 150) result.suggestedCareer = 'Financial Analyst / Civil Engineer';
      else if (pers > 150 && inter > 150) result.suggestedCareer = 'Marketing Planner / Entrepreneur';
      else if (apt > 150 && pers > 150) result.suggestedCareer = 'Teacher / Educator';
      else result.suggestedCareer = 'Business Administrator / Consultant';
    } else {
      result.suggestedCareer = 'Incomplete (Finish all 3)';
    }

    await result.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getDashboard, getQuestions, submitAnswers };
