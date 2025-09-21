

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [student, setStudent] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboard() {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard", { withCredentials: true });
        setStudent(res.data.dashboard.student);
        setActivities(res.data.dashboard.activities);
        setLoading(false);
      } catch (err) {
        setError(err?.response?.data?.error || "Failed to load dashboard");
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-4xl">
        <Card className="mb-8 shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Welcome, {student?.name}</CardTitle>
            <CardDescription className="text-gray-700 dark:text-gray-300">{student?.branch} &bull; {student?.year} &bull; Roll: {student?.enrollment_number}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div>
                <p className="text-lg font-semibold">Email: <span className="text-purple-700 dark:text-purple-300">{student?.email}</span></p>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Build your verified digital portfolio and track all your achievements in one place.</p>
              </div>
              <Button variant="secondary" className="px-6 py-2">Download Portfolio</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">Achievements & Activities</CardTitle>
              <CardDescription className="text-gray-700 dark:text-gray-300">Recent uploads and status</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {activities.map((ach, idx) => (
                  <li key={idx} className="flex flex-col md:flex-row md:items-center justify-between bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-800">
                    <div>
                      <span className="font-semibold text-purple-700 dark:text-purple-200">{ach.type}:</span> <span className="text-gray-900 dark:text-gray-100">{ach.name}</span>
                      <span className="ml-2 text-xs text-gray-700 dark:text-gray-300">({ach.date?.slice(0, 10)})</span>
                    </div>
                    {ach.media_url && <a href={ach.media_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2">View Media</a>}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">Analytics & Summary</CardTitle>
              <CardDescription className="text-gray-700 dark:text-gray-300">Quick stats for your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800 flex flex-col items-center">
                  <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">{activities.length}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Total Achievements</span>
                </div>
                {/* Add more analytics as needed */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity upload form can be integrated here */}
      </div>
    </div>
  );
}

export default Dashboard;






