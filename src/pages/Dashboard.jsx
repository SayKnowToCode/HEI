
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const student = {
  name: "Aarav Sharma",
  email: "aarav.sharma@hei.edu",
  program: "B.Tech Computer Science",
  year: "3rd Year",
  roll: "CS2023001",
  achievements: [
    { type: "Certification", title: "AWS Cloud Practitioner", date: "Aug 2025", status: "Verified" },
    { type: "Workshop", title: "AI in Education", date: "Jul 2025", status: "Pending" },
    { type: "Competition", title: "Hackathon Winner", date: "May 2025", status: "Verified" },
    { type: "Volunteering", title: "Blood Donation Camp", date: "Apr 2025", status: "Verified" },
    { type: "Internship", title: "Web Dev Intern @TechCorp", date: "Jan-Jun 2025", status: "Verified" },
  ],
  stats: {
    totalAchievements: 12,
    verified: 9,
    pending: 3,
    events: 7,
    certifications: 3,
    internships: 2,
  }
};

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-4xl">
        <Card className="mb-8 shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Welcome, {student.name}</CardTitle>
            <CardDescription className="text-gray-700 dark:text-gray-300">{student.program} &bull; {student.year} &bull; Roll: {student.roll}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div>
                <p className="text-lg font-semibold">Email: <span className="text-purple-700 dark:text-purple-300">{student.email}</span></p>
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
                {student.achievements.map((ach, idx) => (
                  <li key={idx} className="flex flex-col md:flex-row md:items-center justify-between bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-800">
                    <div>
                      <span className="font-semibold text-purple-700 dark:text-purple-200">{ach.type}:</span> <span className="text-gray-900 dark:text-gray-100">{ach.title}</span>
                      <span className="ml-2 text-xs text-gray-700 dark:text-gray-300">({ach.date})</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${ach.status === "Verified" ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 border-green-200 dark:border-green-800" : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800"}`}>
                      {ach.status}
                    </span>
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
                  <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">{student.stats.totalAchievements}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Total Achievements</span>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800 flex flex-col items-center">
                  <span className="text-2xl font-bold text-green-700 dark:text-green-300">{student.stats.verified}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Verified</span>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800 flex flex-col items-center">
                  <span className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{student.stats.pending}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Pending</span>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800 flex flex-col items-center">
                  <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">{student.stats.events}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Events</span>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800 flex flex-col items-center">
                  <span className="text-2xl font-bold text-pink-700 dark:text-pink-300">{student.stats.certifications}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Certifications</span>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800 flex flex-col items-center">
                  <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{student.stats.internships}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Internships</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">Activity Tracker</CardTitle>
            <CardDescription className="text-gray-700 dark:text-gray-300">Upload new achievement or activity</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col md:flex-row gap-4 items-center">
              <input type="text" placeholder="Activity Title" className="w-full md:w-1/3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 text-gray-900 dark:text-white" />
              <select className="w-full md:w-1/4 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 text-gray-900 dark:text-white">
                <option>Certification</option>
                <option>Workshop</option>
                <option>Competition</option>
                <option>Volunteering</option>
                <option>Internship</option>
              </select>
              <input type="date" className="w-full md:w-1/4 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 text-gray-900 dark:text-white" />
              <Button type="submit" className="w-full md:w-auto">Upload</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;






