import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { toast } from "../hooks/use-toast";
import {
  FaUserGraduate,
  FaChartBar,
  FaMedal,
  FaClipboardList,
  FaCheckCircle,
  FaCogs,
  FaFilePdf,
  FaLink,
  FaUsers,
  FaCalendarAlt,
  FaBook,
} from "react-icons/fa";

const mockAttendanceData = {
  overall_percentage: 92.5,
  subject_wise: [
    { subject: "Data Structures", total: 45, present: 42, percentage: 93.33 },
    { subject: "Computer Networks", total: 40, present: 37, percentage: 92.5 },
    { subject: "Database Systems", total: 38, present: 35, percentage: 92.11 }
  ],
  monthly_trend: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29-i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    present: Math.floor(Math.random() * 5) + 3,
    total: 5,
    percentage: ((Math.floor(Math.random() * 5) + 3) / 5) * 100
  })),
  recent_records: Array.from({ length: 10 }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    subject: ["Data Structures", "Computer Networks", "Database Systems"][Math.floor(Math.random() * 3)],
    status: Math.random() > 0.1 ? "Present" : "Absent",
    remarks: null
  }))
};

const studentData = {
  name: "Ruchir Sharma",
  rollNo: "CS2025001",
  achievements: [
    { type: "Certification", title: "AWS Cloud Practitioner", date: "Aug 2025", status: "Verified" },
    { type: "Competition", title: "Hackathon Winner", date: "May 2025", status: "Pending" },
    { type: "Workshop", title: "AI Bootcamp", date: "Jan 2025", status: "Verified" },
    { type: "Club", title: "Coding Club Lead", date: "2024-2025", status: "Verified" },
    { type: "Volunteering", title: "Blood Donation Camp", date: "Mar 2025", status: "Verified" },
    { type: "Internship", title: "Web Dev Intern @TechCorp", date: "Jun-Aug 2025", status: "Verified" }
  ],
  analytics: {
    attendance: 92,
    credits: 85,
    activities: 12,
    verified: 8,
    pending: 4
  }
};

export default function Dashboard() {
  const [showPending, setShowPending] = useState(false);
  const [attendanceData, setAttendanceData] = useState(mockAttendanceData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch('/api/attendance');
        if (response.ok) {
          const data = await response.json();
          setAttendanceData(data.attendance);
        } else {
          console.error('Failed to fetch attendance data');
        }
      } catch (error) {
        console.error('Error fetching attendance:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAttendance();
  }, []);

  const handleDownloadPortfolio = () => {
    toast({
      title: "Download Started",
      description: "Your portfolio PDF download has started."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <FaUserGraduate className="text-indigo-600 text-4xl" />
          <div>
            <h1 className="text-3xl font-bold text-indigo-800">Smart Student Hub</h1>
            <p className="text-gray-600">Welcome, {studentData.name} ({studentData.rollNo})</p>
          </div>
        </div>
        <Button 
          onClick={handleDownloadPortfolio} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 transition-colors"
        >
          <FaFilePdf /> Download Portfolio
        </Button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card className="flex flex-col items-center p-4 bg-white shadow-md hover:shadow-lg transition-shadow">
          <FaChartBar className="text-indigo-500 text-2xl mb-2" />
          <span className="font-semibold">Overall Attendance</span>
          <span className="text-xl text-indigo-700">{attendanceData.overall_percentage.toFixed(1)}%</span>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full ${attendanceData.overall_percentage >= 75 ? 'bg-green-500' : 'bg-red-500'}`}
              style={{ width: `${attendanceData.overall_percentage}%` }}
            />
          </div>
        </Card>
        <Card className="flex flex-col items-center p-4 bg-white shadow-md hover:shadow-lg transition-shadow">
          <FaMedal className="text-yellow-500 text-2xl mb-2" />
          <span className="font-semibold">Credits</span>
          <span className="text-xl text-indigo-700">{studentData.analytics.credits}</span>
        </Card>
        <Card className="flex flex-col items-center p-4 bg-white shadow-md hover:shadow-lg transition-shadow">
          <FaClipboardList className="text-green-500 text-2xl mb-2" />
          <span className="font-semibold">Activities</span>
          <span className="text-xl text-indigo-700">{studentData.analytics.activities}</span>
        </Card>
        <Card className="flex flex-col items-center p-4 bg-white shadow-md hover:shadow-lg transition-shadow">
          <FaCheckCircle className="text-blue-500 text-2xl mb-2" />
          <span className="font-semibold">Verified</span>
          <span className="text-xl text-indigo-700">{studentData.analytics.verified}</span>
        </Card>
        <Card className="flex flex-col items-center p-4 bg-white shadow-md hover:shadow-lg transition-shadow">
          <FaCogs className="text-red-500 text-2xl mb-2" />
          <span className="font-semibold">Pending</span>
          <span className="text-xl text-indigo-700">{studentData.analytics.pending}</span>
        </Card>
      </div>

      {/* Activity Tracker & Achievements */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
            <FaMedal /> Achievements & Activities
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Show Pending Only</span>
            <Switch
              checked={showPending}
              onCheckedChange={setShowPending}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-indigo-50">
                <th className="py-3 px-4 font-semibold text-indigo-900">Type</th>
                <th className="py-3 px-4 font-semibold text-indigo-900">Title</th>
                <th className="py-3 px-4 font-semibold text-indigo-900">Date</th>
                <th className="py-3 px-4 font-semibold text-indigo-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {studentData.achievements
                .filter(a => !showPending || a.status === "Pending")
                .map((a, idx) => (
                  <tr key={idx} className="border-b hover:bg-indigo-50 transition-colors">
                    <td className="py-3 px-4">{a.type}</td>
                    <td className="py-3 px-4">{a.title}</td>
                    <td className="py-3 px-4">{a.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          a.status === "Verified"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Attendance Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 hover:shadow-xl transition-shadow">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
          <FaCalendarAlt /> Detailed Attendance Report
        </h2>

        {/* Subject-wise Attendance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {attendanceData.subject_wise.map((subject, index) => (
            <Card key={index} className="p-4 bg-white border-2 border-indigo-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-indigo-800 flex items-center gap-2">
                  <FaBook /> {subject.subject}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  subject.percentage >= 75 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {subject.percentage.toFixed(1)}%
                </span>
              </div>
              <div className="text-gray-600 text-sm">
                Present: {subject.present}/{subject.total} classes
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${subject.percentage >= 75 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${subject.percentage}%` }}
                />
              </div>
            </Card>
          ))}
        </div>

        {/* Monthly Trend */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-indigo-700 mb-3">Monthly Attendance Trend</h3>
          <div className="h-40 flex items-end gap-1">
            {attendanceData.monthly_trend.slice(-14).map((day, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center"
                title={`${day.date}: ${day.present}/${day.total} classes`}
              >
                <div className="w-full bg-gray-100 rounded-t" style={{ height: '100%' }}>
                  <div
                    className={`w-full ${day.percentage >= 75 ? 'bg-green-400' : 'bg-red-400'} rounded-t`}
                    style={{ height: `${day.percentage}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-1 transform -rotate-45 origin-top-left">
                  {new Date(day.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Records */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-700 mb-3">Recent Attendance Records</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-indigo-50">
                  <th className="py-2 px-4 font-semibold text-indigo-900">Date</th>
                  <th className="py-2 px-4 font-semibold text-indigo-900">Subject</th>
                  <th className="py-2 px-4 font-semibold text-indigo-900">Status</th>
                  <th className="py-2 px-4 font-semibold text-indigo-900">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.recent_records.map((record, index) => (
                  <tr key={index} className="border-b hover:bg-indigo-50 transition-colors">
                    <td className="py-2 px-4">
                      {new Date(record.date).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-2 px-4">{record.subject}</td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        record.status === 'Present' 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-gray-600">{record.remarks || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Digital Portfolio & Share */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <Card className="flex-1 p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-indigo-700 mb-2 flex items-center gap-2">
            <FaFilePdf /> Digital Portfolio
          </h3>
          <p className="text-gray-600 mb-4">
            Download your verified, auto-generated portfolio as a PDF or share as a web link.
          </p>
          <div className="flex gap-2">
            <Button
              onClick={handleDownloadPortfolio}
              className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 transition-colors"
            >
              <FaFilePdf /> Download PDF
            </Button>
            <Button
              variant="outline"
              className="hover:bg-indigo-50 flex items-center gap-2 transition-colors"
            >
              <FaLink /> Share Link
            </Button>
          </div>
        </Card>
        <Card className="flex-1 p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-indigo-700 mb-2 flex items-center gap-2">
            <FaChartBar /> Analytics & Reporting
          </h3>
          <p className="text-gray-600 mb-4">
            Generate reports for NAAC, AICTE, NIRF, or internal evaluations. View trends and participation stats.
          </p>
          <Button
            variant="outline"
            className="hover:bg-indigo-50 flex items-center gap-2 transition-colors"
          >
            <FaChartBar /> Generate Report
          </Button>
        </Card>
      </div>



      {/* Footer */}
      <footer className="text-center text-gray-500 mt-8">
        &copy; 2025 Smart Student Hub | Empowering Students & Institutions
      </footer>
    </div>
  );
}