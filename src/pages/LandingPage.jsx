import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Dynamic Student Dashboard",
    desc: "Real-time updates on academics, attendance, and activities.",
    icon: "📊"
  },
  {
    title: "Activity Tracker",
    desc: "Upload and validate seminars, courses, internships, and more.",
    icon: "🎓"
  },
  {
    title: "Faculty Approval Panel",
    desc: "Faculty/admin can verify and approve student records.",
    icon: "✅"
  },
  {
    title: "Digital Portfolio",
    desc: "Download/share verified student portfolio in PDF or web format.",
    icon: "🗂️"
  },
  {
    title: "Analytics & Reporting",
    desc: "Generate reports for NAAC, AICTE, NIRF, and internal use.",
    icon: "📈"
  },
  {
    title: "Integration Support",
    desc: "Connect with LMS, ERP, and digital university platforms.",
    icon: "🔗"
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-gray-50 dark:bg-gray-950">
      <Card className="w-full max-w-2xl shadow-lg border border-gray-200 dark:border-gray-800 mb-8 bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gray-900 dark:text-white">Smart Student Hub</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-base text-gray-700 dark:text-gray-300 mb-6">
            Empowering students and faculty with a centralized platform to document, track, and showcase achievements, activities, and academic progress. Build your verified digital portfolio, simplify institutional reporting, and unlock new opportunities.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-2">
            <Button className="w-full md:w-auto px-6 py-2 text-base font-medium" asChild>
              <a href="/login">Login</a>
            </Button>
            <Button variant="secondary" className="w-full md:w-auto px-6 py-2 text-base font-medium" asChild>
              <a href="/register">Register</a>
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mt-4">
        {features.map((feature) => (
          <Card key={feature.title} className="border border-gray-200 dark:border-gray-800 shadow-sm rounded-lg bg-white dark:bg-gray-900">
            <CardHeader className="flex flex-row items-center gap-3">
              <span className="text-2xl">{feature.icon}</span>
              <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{feature.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;



