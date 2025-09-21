import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import axios from "axios";

const CollegeDashboard = () => {
    const [college, setCollege] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchCollege() {
            setLoading(true);
            try {
                // Get college info from session (backend should return on login)
                const res = await axios.get("http://localhost:5000/api/college/dashboard", { withCredentials: true });
                setCollege(res.data.college);
                setLoading(false);
            } catch (err) {
                setError("Failed to load college info");
                setLoading(false);
            }
        }
        fetchCollege();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

    return (
        <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gray-50 dark:bg-gray-950">
            <div className="w-full max-w-4xl">
                <Card className="mb-8 shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{college?.name || "College Dashboard"}</CardTitle>
                        <CardDescription className="text-gray-700 dark:text-gray-300">{college?.address}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-8">
                            <div className="flex items-center gap-4 mb-4">
                                {college?.logo_url && (
                                    <img src={college.logo_url} alt="College Logo" className="h-16 w-16 rounded-full border" />
                                )}
                                <div>
                                    <p className="text-lg font-semibold text-black">Welcome, {college?.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">ID: {college?.id}</p>
                                </div>
                            </div>
                            <div className="border-t pt-6">
                                <h2 className="text-lg font-semibold mb-2">Faculty Approval Panel</h2>
                                <p className="text-gray-700 dark:text-gray-300">Faculty or admin can approve uploaded records to maintain credibility.</p>
                                <div className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded">
                                    <h3 className="text-base font-semibold mb-2">Pending Approvals</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-center justify-between p-2 bg-white dark:bg-gray-900 rounded shadow">
                                            <span className="text-black dark:text-white">Student: <b className="text-black dark:text-white">Atharva Khabale</b> &mdash; Activity: <b className="text-black dark:text-white">Workshop: AI Bootcamp</b></span>
                                            <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Approve</button>
                                        </li>
                                        <li className="flex items-center justify-between p-2 bg-white dark:bg-gray-900 rounded shadow">
                                            <span className="text-black dark:text-white">Student: <b className="text-black dark:text-white">Ninad Maadhavi</b> &mdash; Activity: <b className="text-black dark:text-white">Certification: Python</b></span>
                                            <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Approve</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="border-t pt-6">
                                <h2 className="text-lg font-semibold mb-2">Analytics & Reporting</h2>
                                <p className="text-gray-700 dark:text-gray-300">Generate reports for NAAC, AICTE, NIRF, or internal evaluations.</p>
                                <div className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded">
                                    <h3 className="text-base font-semibold mb-2">Quick Analytics</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-white dark:bg-gray-900 rounded shadow text-center">
                                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">120</div>
                                            <div className="text-sm text-gray-700 dark:text-gray-300">Total Students</div>
                                        </div>
                                        <div className="p-4 bg-white dark:bg-gray-900 rounded shadow text-center">
                                            <div className="text-3xl font-bold text-green-600 dark:text-green-400">45</div>
                                            <div className="text-sm text-gray-700 dark:text-gray-300">Activities Approved</div>
                                        </div>
                                        <div className="p-4 bg-white dark:bg-gray-900 rounded shadow text-center">
                                            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">8</div>
                                            <div className="text-sm text-gray-700 dark:text-gray-300">Faculty Members</div>
                                        </div>
                                        <div className="p-4 bg-white dark:bg-gray-900 rounded shadow text-center">
                                            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">3</div>
                                            <div className="text-sm text-gray-700 dark:text-gray-300">Reports Generated</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CollegeDashboard;
