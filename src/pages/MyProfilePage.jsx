import { useState, useEffect } from "react";
import axios from "axios";

export default function MyProfilePage() {
    const [profile, setProfile] = useState(null);
    const [achievements, setAchievements] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProfileAndAchievements() {
            setLoading(true);
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/dashboard?user_id=a31e083b-a933-4f60-b28b-3162e71ef3b1`
                );
                setProfile(res.data.dashboard.student);

                // Group achievements by their type
                const groupedAchievements = res.data.dashboard.achievements.reduce(
                    (acc, achievement) => {
                        const type = achievement.type || "Other";
                        if (!acc[type]) {
                            acc[type] = [];
                        }
                        acc[type].push(achievement);
                        return acc;
                    },
                    {}
                );
                setAchievements(groupedAchievements);
            } catch (err) {
                setError("Failed to load profile and achievements");
            }
            setLoading(false);
        }
        fetchProfileAndAchievements();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        My Profile
                    </h1>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Add New Achievement
                    </button>
                </div>
                {loading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : (
                    <>
                        {/* Profile Section */}
                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
                            <div className="flex items-center gap-4">
                                {profile?.profile_image_url ? (
                                    <img
                                        src={profile.profile_image_url}
                                        alt="Profile"
                                        className="w-20 h-20 rounded-full object-cover border"
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                        No Image
                                    </div>
                                )}
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {profile?.name || "N/A"}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Email: {profile?.email || "N/A"}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Enrollment Number:{" "}
                                        {profile?.enrollment_number || "N/A"}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        College:{" "}
                                        {profile?.college?.name || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Achievements Section */}
                        {Object.keys(achievements).map((type) => (
                            <div
                                key={type}
                                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    {type}
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-700">
                                                <th className="px-4 py-2 text-gray-900 dark:text-white">
                                                    Title
                                                </th>
                                                <th className="px-4 py-2 text-gray-900 dark:text-white">
                                                    Description
                                                </th>
                                                <th className="px-4 py-2 text-gray-900 dark:text-white">
                                                    Date
                                                </th>
                                                <th className="px-4 py-2 text-gray-900 dark:text-white">
                                                    Venue
                                                </th>
                                                <th className="px-4 py-2 text-gray-900 dark:text-white">
                                                    Organization
                                                </th>
                                                <th className="px-4 py-2 text-gray-900 dark:text-white">
                                                    Status
                                                </th>
                                                <th className="px-4 py-2 text-gray-900 dark:text-white">
                                                    Certificate
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {achievements[type]?.length > 0 ? (
                                                achievements[type].map(
                                                    (achievement) => (
                                                        <tr
                                                            key={
                                                                achievement.id
                                                            }
                                                            className="border-b dark:border-gray-700"
                                                        >
                                                            <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                                                                {
                                                                    achievement.title
                                                                }
                                                            </td>
                                                            <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                                                                {
                                                                    achievement.description
                                                                }
                                                            </td>
                                                            <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                                                                {new Date(
                                                                    achievement.date
                                                                ).toLocaleDateString()}
                                                                {achievement.end_date &&
                                                                    ` - ${new Date(
                                                                        achievement.end_date
                                                                    ).toLocaleDateString()}`}
                                                            </td>
                                                            <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                                                                {
                                                                    achievement.venue
                                                                }
                                                            </td>
                                                            <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                                                                {
                                                                    achievement.organization
                                                                }
                                                            </td>
                                                            <td className="px-4 py-2">
                                                                <span
                                                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                                        achievement.status ===
                                                                        "Verified"
                                                                            ? "bg-green-500 text-white"
                                                                            : achievement.status ===
                                                                              "Rejected"
                                                                            ? "bg-red-500 text-white"
                                                                            : "bg-yellow-500 text-white"
                                                                    }`}
                                                                >
                                                                    {
                                                                        achievement.status
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-2">
                                                                {achievement.certification_url ? (
                                                                    <a
                                                                        href={
                                                                            achievement.certification_url
                                                                        }
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-blue-600 dark:text-blue-400 underline"
                                                                    >
                                                                        View
                                                                    </a>
                                                                ) : (
                                                                    "N/A"
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan="7"
                                                        className="px-4 py-2 text-center text-gray-500 dark:text-gray-400"
                                                    >
                                                        No achievements found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
