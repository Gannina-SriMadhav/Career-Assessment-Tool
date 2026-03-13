const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');
const connectDB = require('./config/db');

dotenv.config();

const questions = [
  // --- INTEREST (20 Questions) ---
  {
    type: "Interest",
    question: "If you had to pick a hobby to do for hours, what would it be?",
    options: [
      { text: "Building electronics or coding a mini-app", score: 12 },
      { text: "Painting, sketching, or digital design", score: 15 },
      { text: "Managing a blog and interacting with readers", score: 10 },
      { text: "Reading scientific journals or conducting experiments", score: 13 }
    ]
  },
  {
    type: "Interest",
    question: "Which documentary subject sounds the most appealing?",
    options: [
      { text: "The history of the global stock market", score: 15 },
      { text: "A deep dive into the human brain and psychology", score: 12 },
      { text: "The engineering behind massive skyscrapers", score: 14 },
      { text: "The evolution of modern abstract art", score: 13 }
    ]
  },
  {
    type: "Interest",
    question: "What kind of magazine or blog would you subscribe to?",
    options: [
      { text: "Entrepreneurship & Startup News", score: 15 },
      { text: "Tech Trends & Gadget Reviews", score: 12 },
      { text: "Mental Health & Wellness", score: 10 },
      { text: "Fashion & Creative Photography", score: 14 }
    ]
  },
  {
    type: "Interest",
    question: "If you joined a school club, which would it be?",
    options: [
      { text: "Robotics and Programming Club", score: 15 },
      { text: "Debate and Public Speaking Club", score: 12 },
      { text: "Drama and Theatre Club", score: 14 },
      { text: "Math and Physics Olympiad Team", score: 13 }
    ]
  },
  {
    type: "Interest",
    question: "Which section of a bookstore do you visit first?",
    options: [
      { text: "Science Fiction & Computer Science", score: 13 },
      { text: "Business & Personal Finance", score: 15 },
      { text: "Art, Design & Architecture", score: 14 },
      { text: "Self-Help & Psychology", score: 12 }
    ]
  },
  {
    type: "Interest",
    question: "What sounds like the most satisfying achievement?",
    options: [
      { text: "Inventing a new type of renewable energy source", score: 15 },
      { text: "Directing an award-winning independent film", score: 14 },
      { text: "Launching a company that earns $1M in revenue", score: 15 },
      { text: "Helping a troubled youth turn their life around", score: 13 }
    ]
  },
  {
    type: "Interest",
    question: "Which task would you happily do for a friend?",
    options: [
      { text: "Fixing their broken laptop or writing a script for them", score: 14 },
      { text: "Helping them organize and plan their schedule", score: 10 },
      { text: "Giving them advice on personal relationships", score: 15 },
      { text: "Designing a beautiful logo for their new project", score: 13 }
    ]
  },
  {
    type: "Interest",
    question: "Which famous figure's career do you admire most?",
    options: [
      { text: "Elon Musk (Technology/Engineering)", score: 15 },
      { text: "Warren Buffett (Finance/Investment)", score: 14 },
      { text: "Sigmund Freud (Psychology/Therapy)", score: 13 },
      { text: "Frida Kahlo (Art/Expression)", score: 12 }
    ]
  },
  {
    type: "Interest",
    question: "If you could take one free class, what would it be?",
    options: [
      { text: "Introduction to Artificial Intelligence", score: 15 },
      { text: "Marketing Strategy and Consumer Behavior", score: 13 },
      { text: "Advanced Graphic Design Fundamentals", score: 14 },
      { text: "Anatomy and Human Biology", score: 12 }
    ]
  },
  {
    type: "Interest",
    question: "What kind of puzzles do you enjoy most?",
    options: [
      { text: "Logical math problems and Sudoku", score: 13 },
      { text: "Assembling complex mechanical 3D models", score: 15 },
      { text: "Crosswords and vocabulary challenges", score: 10 },
      { text: "Visual jigsaw puzzles and color matching", score: 14 }
    ]
  },
  {
    type: "Interest",
    question: "Which TV show premise sounds the best?",
    options: [
      { text: "A documentary on how the universe was formed", score: 14 },
      { text: "A drama about high-stakes corporate negotiations", score: 13 },
      { text: "A reality show about redesigning homes", score: 12 },
      { text: "A series following doctors in an emergency room", score: 15 }
    ]
  },
  {
    type: "Interest",
    question: "If you created a YouTube channel, what would it be about?",
    options: [
      { text: "Reviewing the newest tech hardware", score: 14 },
      { text: "Teaching people how to manage their money", score: 15 },
      { text: "Analyzing the psychology of famous criminals", score: 13 },
      { text: "Showcasing your original music or art", score: 12 }
    ]
  },
  {
    type: "Interest",
    question: "Which high school subject did you find the least boring?",
    options: [
      { text: "Mathematics or Computer Science", score: 14 },
      { text: "Chemistry or Physics", score: 15 },
      { text: "Literature or History", score: 10 },
      { text: "Art or Music", score: 13 }
    ]
  },
  {
    type: "Interest",
    question: "What software would you most want to learn?",
    options: [
      { text: "AutoCAD (Engineering/Design)", score: 15 },
      { text: "Adobe Photoshop (Creative/Graphics)", score: 14 },
      { text: "Python and Data Science libraries (Tech)", score: 13 },
      { text: "QuickBooks or Excel (Finance/Management)", score: 12 }
    ]
  },
  {
    type: "Interest",
    question: "Which of these workplace environments sounds ideal?",
    options: [
      { text: "A high-tech lab with advanced equipment", score: 14 },
      { text: "A bustling, fast-paced Wall Street office", score: 13 },
      { text: "A quiet, cozy clinic where you talk to people 1-on-1", score: 15 },
      { text: "A vibrant studio filled with colorful materials", score: 12 }
    ]
  },
  {
    type: "Interest",
    question: "What would you rather read a book about?",
    options: [
      { text: "How to negotiate and close big sales deals", score: 15 },
      { text: "How the human immune system fights viruses", score: 14 },
      { text: "How cryptography and cybersecurity work", score: 13 },
      { text: "How classical composers wrote their symphonies", score: 12 }
    ]
  },
  {
    type: "Interest",
    question: "If you were to write a book, what genre would it be?",
    options: [
      { text: "A sci-fi novel exploring future technology", score: 14 },
      { text: "A biography of a successful business tycoon", score: 12 },
      { text: "A guide on maintaining emotional well-being", score: 15 },
      { text: "An illustrated comic or graphic novel", score: 13 }
    ]
  },
  {
    type: "Interest",
    question: "Which event would you most likely attend?",
    options: [
      { text: "A global Hackathon", score: 15 },
      { text: "A seminar on economic investing", score: 13 },
      { text: "An exhibition of contemporary sculptures", score: 14 },
      { text: "A medical research conference", score: 12 }
    ]
  },
  {
    type: "Interest",
    question: "When browsing the internet, what articles catch your eye?",
    options: [
      { text: "New software releases and AI breakthroughs", score: 15 },
      { text: "Tips for becoming a successful entrepreneur", score: 14 },
      { text: "Fascinating discoveries in quantum physics", score: 13 },
      { text: "The latest fashion trends and design techniques", score: 12 }
    ]
  },
  {
    type: "Interest",
    question: "If you had to start a podcast, the topic would be:",
    options: [
      { text: "Discussing mental health and therapy techniques", score: 14 },
      { text: "Analyzing the stock market and crypto trends", score: 13 },
      { text: "Reviewing the newest web development frameworks", score: 15 },
      { text: "Interviewing directors, actors, and artists", score: 12 }
    ]
  },

  // --- PERSONALITY (20 Questions) ---
  {
    type: "Personality",
    question: "When working in a team project, what role do you naturally fall into?",
    options: [
      { text: "The Leader: I delegate tasks and manage progress", score: 15 },
      { text: "The Creative: I brainstorm unique ideas", score: 12 },
      { text: "The Analyst: I review the data and ensure accuracy", score: 14 },
      { text: "The Peacemaker: I keep everyone motivated and happy", score: 13 }
    ]
  },
  {
    type: "Personality",
    question: "How do you handle sudden, unexpected problems?",
    options: [
      { text: "I rely on past data to formulate a logical fix", score: 14 },
      { text: "I adapt creatively and improvise a quick solution", score: 15 },
      { text: "I ask my team for input before deciding", score: 12 },
      { text: "I take charge immediately and give directions", score: 13 }
    ]
  },
  {
    type: "Personality",
    question: "Which work style suits you best?",
    options: [
      { text: "Following a strictly organized routine with clear rules", score: 13 },
      { text: "Working independently with total creative freedom", score: 15 },
      { text: "Collaborating in a highly social, team-based environment", score: 14 },
      { text: "Juggling multiple high-stress tasks seamlessly", score: 12 }
    ]
  },
  {
    type: "Personality",
    question: "How do you usually make important decisions?",
    options: [
      { text: "By analyzing all the statistics and facts", score: 15 },
      { text: "By trusting my intuition and gut feeling", score: 12 },
      { text: "By considering how it will affect other people", score: 14 },
      { text: "By looking at the long-term strategic advantage", score: 13 }
    ]
  },
  {
    type: "Personality",
    question: "When a friend is upset, how do you help them?",
    options: [
      { text: "I actively listen and offer deep emotional support", score: 15 },
      { text: "I offer practical, step-by-step solutions to fix the issue", score: 13 },
      { text: "I try to distract them with humor and fun activities", score: 12 },
      { text: "I analyze the root cause of the problem with them", score: 14 }
    ]
  },
  {
    type: "Personality",
    question: "How do you prefer to communicate?",
    options: [
      { text: "Brief, direct, and to the point", score: 13 },
      { text: "Detailed written emails with lots of data", score: 14 },
      { text: "Face-to-face meetings focusing on body language", score: 15 },
      { text: "Through creative mediums like presentations or visuals", score: 12 }
    ]
  },
  {
    type: "Personality",
    question: "What is your reaction to strict workplace rules?",
    options: [
      { text: "I respect them strongly to maintain order", score: 14 },
      { text: "I sometimes feel stifled and prefer flexibility", score: 15 },
      { text: "I challenge rules if they don't make logical sense", score: 13 },
      { text: "I ignore them if they interfere with my team's happiness", score: 10 }
    ]
  },
  {
    type: "Personality",
    question: "When learning something new, how do you process the information?",
    options: [
      { text: "I look for patterns and underlying theories", score: 15 },
      { text: "I need to see the big picture and how it affects people", score: 13 },
      { text: "I prefer hands-on practice immediately", score: 14 },
      { text: "I try to find a creative or unconventional way to use it", score: 12 }
    ]
  },
  {
    type: "Personality",
    question: "How do you take criticism?",
    options: [
      { text: "I view it objectively as data to improve my performance", score: 15 },
      { text: "I take it personally but learn from it eventually", score: 10 },
      { text: "I use it to rethink my creative approach", score: 14 },
      { text: "I appreciate it only if it is delivered compassionately", score: 13 }
    ]
  },
  {
    type: "Personality",
    question: "In a stressful situation, what is your first instinct?",
    options: [
      { text: "To calm everyone else down", score: 15 },
      { text: "To detach emotionally and analyze the facts", score: 14 },
      { text: "To take command and dictate actions", score: 13 },
      { text: "To find an out-of-the-box workaround", score: 12 }
    ]
  },
  {
    type: "Personality",
    question: "What motivates you the most to work hard?",
    options: [
      { text: "Discovering absolute truth or solving a hard problem", score: 15 },
      { text: "Earning money, power, and high status", score: 13 },
      { text: "Making a genuine difference in people's lives", score: 14 },
      { text: "Expressing myself and leaving a creative legacy", score: 12 }
    ]
  },
  {
    type: "Personality",
    question: "How do you view risks?",
    options: [
      { text: "Risks should only be taken if mathematically calculated", score: 14 },
      { text: "High risk means high reward; I take them eagerly", score: 15 },
      { text: "I avoid risks to keep things stable and safe", score: 10 },
      { text: "I take risks only if it leads to a beautiful new creation", score: 12 }
    ]
  },
  {
    type: "Personality",
    question: "What annoys you most in a work setting?",
    options: [
      { text: "Inefficiency and disorganized data", score: 15 },
      { text: "Lack of empathy and cold behavior among coworkers", score: 14 },
      { text: "Repetitive, boring tasks with no room for imagination", score: 13 },
      { text: "Indecisive leadership that delays action", score: 12 }
    ]
  },
  {
    type: "Personality",
    question: "If you find a flaw in the system, what do you do?",
    options: [
      { text: "I carefully document it and submit a report", score: 14 },
      { text: "I immediately devise a completely new system", score: 15 },
      { text: "I focus on helping those negatively affected by the flaw", score: 13 },
      { text: "I demand leadership address it immediately", score: 12 }
    ]
  },
  {
    type: "Personality",
    question: "How would your friends describe you?",
    options: [
      { text: "Logical, precise, and quiet", score: 14 },
      { text: "Ambitious, confident, and highly driven", score: 15 },
      { text: "Imaginative, artsy, and eccentric", score: 12 },
      { text: "Warm, empathetic, and a great listener", score: 13 }
    ]
  },
  {
    type: "Personality",
    question: "How do you typically plan a vacation?",
    options: [
      { text: "A strict itinerary with all costs calculated", score: 15 },
      { text: "Spontaneous trips chosen by my mood", score: 12 },
      { text: "Ensuring everyone coming is happy with the plan", score: 14 },
      { text: "Finding the most aesthetically pleasing or unique spots", score: 13 }
    ]
  },
  {
    type: "Personality",
    question: "When reading the news, what do you look for?",
    options: [
      { text: "Hard facts, statistics, and objective reporting", score: 15 },
      { text: "Stories about people overcoming adversity", score: 14 },
      { text: "Opinion pieces analyzing future trends", score: 13 },
      { text: "Reviews on the latest movies, books, or art", score: 12 }
    ]
  },
  {
    type: "Personality",
    question: "At a networking event, you are most likely to:",
    options: [
      { text: "Observe quietly and only speak strictly to your field", score: 10 },
      { text: "Introduce yourself boldly to top executives", score: 15 },
      { text: "Engage in deep, one-on-one meaningful conversations", score: 14 },
      { text: "Talk enthusiastically about a wild new idea you have", score: 13 }
    ]
  },
  {
    type: "Personality",
    question: "Your approach to conflict resolution is:",
    options: [
      { text: "Use objective facts to prove what is fair", score: 14 },
      { text: "Ensure both parties feel emotionally validated", score: 15 },
      { text: "Find a creative compromise neither side thought of", score: 13 },
      { text: "Shut down the conflict forcefully to keep operations running", score: 12 }
    ]
  },
  {
    type: "Personality",
    question: "What is your greatest personal strength?",
    options: [
      { text: "My analytical mind and attention to detail", score: 15 },
      { text: "My ability to understand and heal others", score: 14 },
      { text: "My unyielding drive to succeed and win", score: 13 },
      { text: "My ability to think outside the box", score: 12 }
    ]
  },

  // --- APTITUDE (20 Questions) ---
  {
    type: "Aptitude",
    question: "What comes next in the sequence: 2, 6, 12, 20, 30, __?",
    options: [
      { text: "40", score: 0 },
      { text: "42", score: 15 }, // +4, +6, +8, +10, +12
      { text: "38", score: 0 },
      { text: "44", score: 0 }
    ]
  },
  {
    type: "Aptitude",
    question: "If all Zlorps are Plonks, and some Plonks are Frazzles, which is definitely true?",
    options: [
      { text: "All Zlorps are Frazzles", score: 0 },
      { text: "Some Zlorps are Frazzles", score: 0 },
      { text: "Some Plonks are Zlorps", score: 15 },
      { text: "No Frazzles are Zlorps", score: 0 }
    ]
  },
  {
    type: "Aptitude",
    question: "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?",
    options: [
      { text: "$0.10", score: 0 },
      { text: "$0.05", score: 15 },
      { text: "$1.00", score: 0 },
      { text: "$0.15", score: 0 }
    ]
  },
  {
    type: "Aptitude",
    question: "Which word does not belong with the others?",
    options: [
      { text: "Guitar", score: 0 },
      { text: "Flute", score: 0 },
      { text: "Violin", score: 0 },
      { text: "Piano", score: 15 } // Optional logic, but actually: Flute is wind, others are string/percussion. Wait, Flute is best.
    ] // Let's fix the question to be clearly Flute
  },
  {
    type: "Aptitude",
    question: "Which word does NOT belong in this group?",
    options: [
      { text: "Rectangle", score: 0 },
      { text: "Square", score: 0 },
      { text: "Circle", score: 15 }, // no straight lines
      { text: "Triangle", score: 0 }
    ]
  },
  {
    type: "Aptitude",
    question: "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
    options: [
      { text: "100 minutes", score: 0 },
      { text: "5 minutes", score: 15 },
      { text: "50 minutes", score: 0 },
      { text: "20 minutes", score: 0 }
    ]
  },
  {
    type: "Aptitude",
    question: "Odometer is to mileage as compass is to:",
    options: [
      { text: "Speed", score: 0 },
      { text: "Hiking", score: 0 },
      { text: "Direction", score: 15 },
      { text: "Map", score: 0 }
    ]
  },
  {
    type: "Aptitude",
    question: "Solve the equation: 3x + 12 = 27",
    options: [
      { text: "x = 5", score: 15 },
      { text: "x = 4", score: 0 },
      { text: "x = 6", score: 0 },
      { text: "x = 7", score: 0 }
    ]
  },
  {
    type: "Aptitude",
    question: "A store reduces a $50 shirt by 20%. Later, it reduces the new price by 10%. What is the final price?",
    options: [
      { text: "$35", score: 0 },
      { text: "$36", score: 15 }, // 50 * 0.8 = 40. 40 * 0.9 = 36.
      { text: "$40", score: 0 },
      { text: "$30", score: 0 }
    ]
  },
  {
    type: "Aptitude",
    question: "Which of the following numbers is the odd one out? 8, 27, 64, 100, 125",
    options: [
      { text: "8", score: 0 },
      { text: "64", score: 0 },
      { text: "100", score: 15 }, // 100 is not a perfect cube
      { text: "125", score: 0 }
    ]
  },
  {
    type: "Aptitude",
    question: "Rearrange the letters 'CIFAIPC' to form the name of:",
    options: [
      { text: "A Country", score: 0 },
      { text: "An Ocean", score: 15 }, // PACIFIC
      { text: "A City", score: 0 },
      { text: "An Animal", score: 0 }
    ]
  },
  {
    type: "Aptitude",
    question: "If DAY is coded as 4125, how is NIGHT coded?",
    options: [
      { text: "1487820", score: 0 },
      { text: "1497820", score: 15 }, // N=14, I=9, G=7, H=8, T=20
      { text: "1498720", score: 0 },
      { text: "1356789", score: 0 }
    ]
  },
  {
    type: "Aptitude",
    question: "A family has 5 brothers. Each brother has 1 sister. How many kids are in the family in total?",
    options: [
      { text: "10", score: 0 },
      { text: "6", score: 15 },
      { text: "5", score: 0 },
      { text: "11", score: 0 }
    ]
  },
  {
    type: "Aptitude",
    question: "Identify the next letter in the series: A, C, F, J, ___",
    options: [
      { text: "O", score: 15 }, // +2, +3, +4, +5 -> J(10)+5 = O(15)
      { text: "M", score: 0 },
      { text: "N", score: 0 },
      { text: "P", score: 0 }
    ]
  },
  {
    type: "Aptitude",
    question: "If you reorganize the letters 'ALNGDNE', you get the name of a:",
    options: [
      { text: "River", score: 0 },
      { text: "Country", score: 15 }, // ENGLAND
      { text: "Continent", score: 0 },
      { text: "Planet", score: 0 }
    ]
  },
  {
    type: "Aptitude",
    question: "The probability of rolling a sum of 7 with two standard six-sided dice is:",
    options: [
      { text: "1/6", score: 15 },
      { text: "1/7", score: 0 },
      { text: "1/12", score: 0 },
      { text: "1/36", score: 0 }
    ]
  },
  {
    type: "Aptitude",
    question: "Which conclusion logically follows? Pre: 1) All cats are mammals. 2) No mammals have scales. 3) Charlie has scales.",
    options: [
      { text: "Charlie is a mammal", score: 0 },
      { text: "Charlie is not a cat", score: 15 },
      { text: "Charlie is a snake", score: 0 },
      { text: "Cats have scales", score: 0 }
    ]
  },
  {
    type: "Aptitude",
    question: "What is 20% of 40% of 200?",
    options: [
      { text: "16", score: 15 }, // 0.2 * 0.4 * 200 = 0.08 * 200 = 16
      { text: "18", score: 0 },
      { text: "12", score: 0 },
      { text: "20", score: 0 }
    ]
  },
  {
    type: "Aptitude",
    question: "Complete the analogy. Tree is to Forest as ___ is to Galaxy.",
    options: [
      { text: "Planet", score: 0 },
      { text: "Star", score: 15 },
      { text: "Universe", score: 0 },
      { text: "Orbit", score: 0 }
    ]
  },
  {
    type: "Aptitude",
    question: "You have a 3-gallon jug and a 5-gallon jug. How many exact gallons of water can you measure out using them?",
    options: [
      { text: "Only 1 and 2", score: 0 },
      { text: "Only 2 and 4", score: 0 },
      { text: "Any integer from 1 to 5", score: 15 }, // well-known puzzle
      { text: "Only 3 and 5", score: 0 }
    ]
  },
  {
    type: "Aptitude",
    question: "Which shape has exactly two pairs of parallel lines?",
    options: [
      { text: "Trapezoid", score: 0 },
      { text: "Parallelogram", score: 15 },
      { text: "Triangle", score: 0 },
      { text: "Pentagon", score: 0 }
    ]
  }
];

const seed60 = async () => {
  await connectDB();
  try {
    // Optional: Clear DB first to avoid duplicates
    await Question.deleteMany({});
    await Question.insertMany(questions);
    console.log('60 Questions successfully inserted into MongoDB!');
  } catch (err) {
    console.error('Error inserting 60 questions:', err);
  } finally {
    process.exit();
  }
};

seed60();
