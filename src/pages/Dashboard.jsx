import { useState } from "react";
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
} from "react-icons/fa";

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
          <span className="font-semibold">Attendance</span>
          <span className="text-xl text-indigo-700">{studentData.analytics.attendance}%</span>
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

      {/* Integration & Support */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 hover:shadow-xl transition-shadow">
        <h2 className="text-xl font-bold text-indigo-700 mb-2 flex items-center gap-2">
          <FaCogs /> Integration Support
        </h2>
        <p className="text-gray-600 mb-4">
          Easily link with LMS, ERP, or digital university platforms for seamless data flow and verification.
        </p>
        <Button
          variant="outline"
          className="hover:bg-indigo-50 flex items-center gap-2 transition-colors"
        >
          <FaCogs /> Connect Platform
        </Button>
      </div>

      {/* Faculty Approval Panel */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 hover:shadow-xl transition-shadow">
        <h2 className="text-xl font-bold text-indigo-700 mb-2 flex items-center gap-2">
          <FaUsers /> Faculty Approval Panel
        </h2>
        <p className="text-gray-600 mb-4">
          Faculty/admin can review and approve student records to maintain credibility.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-indigo-50">
                <th className="py-3 px-4 font-semibold text-indigo-900">Student</th>
                <th className="py-3 px-4 font-semibold text-indigo-900">Achievement</th>
                <th className="py-3 px-4 font-semibold text-indigo-900">Status</th>
                <th className="py-3 px-4 font-semibold text-indigo-900">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-indigo-50 transition-colors">
                <td className="py-3 px-4">Ruchir Sharma</td>
                <td className="py-3 px-4">Hackathon Winner</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-700">
                    Pending
                  </span>
                </td>
                <td className="py-3 px-4">
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white transition-colors"
                  >
                    Approve
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 mt-8">
        &copy; 2025 Smart Student Hub | Empowering Students & Institutions
      </footer>
    </div>
  );
}