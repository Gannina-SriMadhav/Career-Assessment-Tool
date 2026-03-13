import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await API.get('/admin/students');
      setStudents(data);
    } catch (err) {
      if (err.response?.status === 401) navigate('/admin');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student and all their results?')) return;
    try {
      await API.delete(`/admin/students/${id}`);
      setStudents(students.filter(s => s._id !== id));
    } catch (err) {
      alert('Error deleting student');
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8 bg-[#161821] p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[60px] -z-10 mix-blend-screen" />
        <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight relative z-10">Manage Students</h1>
        <button onClick={() => navigate('/admin/dashboard')} className="text-gray-400 font-bold hover:text-indigo-400 transition-colors bg-[#0f1015] hover:border-indigo-500/50 px-6 py-3 rounded-xl border border-gray-800 relative z-10">
          &larr; Back to Dashboard
        </button>
      </div>

      <div className="mb-6 relative z-10 hover:shadow-[0_0_30px_rgba(79,70,229,0.1)] transition-shadow rounded-2xl">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-indigo-400 z-10">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search students by name or email..."
          className="w-full bg-[#161821] border border-gray-800 text-white rounded-3xl pl-14 pr-6 py-4 outline-none focus:border-indigo-500 focus:bg-[#12141c] transition-all font-bold placeholder-gray-600 shadow-2xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-[#161821] rounded-3xl shadow-2xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0f1015] border-b border-gray-800 uppercase tracking-wider text-xs">
                <th className="p-6 font-bold text-gray-400 whitespace-nowrap">Name</th>
                <th className="p-6 font-bold text-gray-400 whitespace-nowrap">Email</th>
                <th className="p-6 font-bold text-gray-400 whitespace-nowrap">Age/Edu</th>
                <th className="p-6 font-bold text-gray-400 whitespace-nowrap">Tests Taken</th>
                <th className="p-6 font-bold text-gray-400 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student._id} className="border-b border-gray-800 hover:bg-[#12141c] transition-colors">
                  <td className="p-6 font-bold text-white text-lg">{student.name}</td>
                  <td className="p-6 font-medium text-gray-400">{student.email}</td>
                  <td className="p-6 text-gray-400"><span className="font-semibold text-gray-300">{student.age}</span> y/o • <span className="font-semibold text-gray-300">{student.education}</span></td>
                  <td className="p-6 text-gray-500">
                    <span className="bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-full font-black text-sm border border-indigo-500/20 cursor-help" title={`Latest result viewable by clicking view on some row if functionality attached.`}>
                      {student.tests?.length || 0}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button 
                      onClick={() => handleDelete(student._id)}
                      className="text-red-400 hover:text-white font-bold hover:bg-red-500 border border-red-500/30 px-5 py-2.5 rounded-xl transition-all text-sm shadow-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-gray-400 border-dashed border border-gray-800 m-4 rounded-xl">
                    {searchTerm ? "No students match your search." : "No students found. Enroll some to see them here!"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;
