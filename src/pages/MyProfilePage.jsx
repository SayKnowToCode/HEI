import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MultiEntryInput from "./components/MultiEntryInput";

const achievementSections = [
    {
        key: "conferences",
        label: "Conferences and Workshops Attended",
        type: "Workshop",
    },
    {
        key: "certifications",
        label: "Certifications Earned",
        type: "Certification",
    },
    {
        key: "clubs",
        label: "Club Activities and Volunteering Efforts",
        type: "Club",
    },
    {
        key: "competitions",
        label: "Competitions and Academic Contests",
        type: "Competition",
    },
    {
        key: "leadership",
        label: "Leadership Roles and Internships",
        type: "Internship",
    },
    {
        key: "community",
        label: "Community Services Done",
        type: "Volunteering",
    },
];

const initialAchievements = achievementSections.reduce((acc, section) => {
    acc[section.key] = [];
    return acc;
}, {});

export default function MyProfilePage() {
    const [student, setStudent] = useState(null);
    const [achievements, setAchievements] = useState(initialAchievements);
    // Track new entries for each section before confirming
    const [newEntries, setNewEntries] = useState(initialAchievements);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        // Fetch student profile and achievements from dashboard route
        async function fetchProfile() {
            setLoading(true);
            try {
                const studentId = localStorage.getItem("user_id");
                const res = await axios.get(`http://localhost:5000/api/dashboard?user_id=${studentId}`);
                setStudent(res.data.dashboard.student);
                // Group achievements by type
                const grouped = { ...initialAchievements };
                (res.data.dashboard.achievements || []).forEach(a => {
                    const section = achievementSections.find(s => s.type === a.type);
                    if (section) grouped[section.key].push(a);
                });
                setAchievements(grouped);
            } catch (err) {
                setError("Failed to load profile");
            }
            setLoading(false);
        }
        fetchProfile();
    }, []);

    // Add blank entry for a section
    const handleAddBlankEntry = (sectionKey) => {
        setNewEntries(prev => ({
            ...prev,
            [sectionKey]: [...(prev[sectionKey] || []), {
                name: "",
                description: "",
                date: "",
                end_date: "",
                venue: "",
                organization: "",
                certification_url: "",
                media_base64: ""
            }]
        }));
    };

    // Update entry fields for a section
    const handleEntryChange = (sectionKey, idx, field, value) => {
        setNewEntries(prev => {
            const updated = [...prev[sectionKey]];
            updated[idx] = { ...updated[idx], [field]: value };
            return { ...prev, [sectionKey]: updated };
        });
    };

    // Remove entry for a section
    const handleRemoveEntry = (sectionKey, idx) => {
        setNewEntries(prev => {
            const updated = prev[sectionKey].filter((_, i) => i !== idx);
            return { ...prev, [sectionKey]: updated };
        });
    };

    // Confirm and send new entries to backend
    const handleConfirmEntries = async (sectionKey) => {
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const studentId = localStorage.getItem("student_id");
            for (const entry of newEntries[sectionKey]) {
                await axios.post(`http://localhost:5000/achievements`, {
                    student_id: studentId,
                    type: achievementSections.find(s => s.key === sectionKey).type,
                    title: entry.name,
                    description: entry.description || "",
                    date: entry.date,
                    end_date: entry.end_date || null,
                    venue: entry.venue,
                    organization: entry.organization || "",
                    certification_url: entry.certification_url || "",
                    media_url: entry.media_base64 || "",
                });
            }
            setSuccess("Achievement(s) added and pending verification.");
            setNewEntries(prev => ({ ...prev, [sectionKey]: [] }));
        } catch (err) {
            setError("Failed to add achievement");
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
            <Card className="w-full max-w-3xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mb-8">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold text-gray-900 dark:text-white">My Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    {student ? (
                        <div className="mb-6">
                            <div className="flex items-center gap-4">
                                {student.profile_image_url && (
                                    <img src={student.profile_image_url} alt="Profile" className="w-20 h-20 rounded-full object-cover border" />
                                )}
                                <div>
                                    <div className="text-xl font-semibold">{student.name}</div>
                                    <div className="text-gray-600 dark:text-gray-300">{student.email}</div>
                                    <div className="text-gray-600 dark:text-gray-300">{student.enrollment_number}</div>
                                    <div className="text-gray-600 dark:text-gray-300">{student.college?.name}</div>
                                    <div className="text-gray-600 dark:text-gray-300">Year: {student.year} | Branch: {student.branch}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500">Loading profile...</div>
                    )}
                    {achievementSections.map(section => (
                        <div key={section.key} className="mb-8">
                            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{section.label}</h3>
                            {/* List existing achievements */}
                            <ul className="mb-2">
                                {(achievements[section.key] || []).map((a, idx) => (
                                    <li key={a.id || idx} className="border-b py-2 flex flex-col md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <span className="font-semibold">{a.title}</span> <span className="text-xs text-gray-500">({a.date?.slice(0, 10)})</span>
                                            <span className="ml-2 text-gray-600 dark:text-gray-400">{a.venue}</span>
                                            <span className="ml-2 text-gray-600 dark:text-gray-400">{a.organization}</span>
                                            {a.certification_url && (
                                                <a href={a.certification_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 dark:text-blue-400 underline">Certificate</a>
                                            )}
                                        </div>
                                        <div className="text-xs mt-1 md:mt-0">
                                            Status: <span className={a.status === "Verified" ? "text-green-600" : a.status === "Rejected" ? "text-red-600" : "text-yellow-600"}>{a.status}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {/* Add new achievements UI */}
                            <div className="mb-2">
                                {(newEntries[section.key] || []).map((entry, idx) => (
                                    <div key={idx} className="border p-3 rounded mb-2 flex flex-col gap-2">
                                        <input type="text" placeholder="Title" value={entry.name} onChange={e => handleEntryChange(section.key, idx, "name", e.target.value)} className="input input-bordered" />
                                        <input type="text" placeholder="Description" value={entry.description} onChange={e => handleEntryChange(section.key, idx, "description", e.target.value)} className="input input-bordered" />
                                        <input type="date" placeholder="Date" value={entry.date} onChange={e => handleEntryChange(section.key, idx, "date", e.target.value)} className="input input-bordered" />
                                        <input type="date" placeholder="End Date (optional)" value={entry.end_date} onChange={e => handleEntryChange(section.key, idx, "end_date", e.target.value)} className="input input-bordered" />
                                        <input type="text" placeholder="Venue" value={entry.venue} onChange={e => handleEntryChange(section.key, idx, "venue", e.target.value)} className="input input-bordered" />
                                        <input type="text" placeholder="Organization" value={entry.organization} onChange={e => handleEntryChange(section.key, idx, "organization", e.target.value)} className="input input-bordered" />
                                        <input type="text" placeholder="Certificate URL" value={entry.certification_url} onChange={e => handleEntryChange(section.key, idx, "certification_url", e.target.value)} className="input input-bordered" />
                                        <input type="file" accept="image/*,application/pdf" onChange={e => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    handleEntryChange(section.key, idx, "media_base64", reader.result);
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }} />
                                        <Button type="button" variant="outline" onClick={() => handleRemoveEntry(section.key, idx)}>Remove</Button>
                                    </div>
                                ))}
                                <Button type="button" onClick={() => handleAddBlankEntry(section.key)} className="mb-2">Add Another</Button>
                                {(newEntries[section.key] || []).length > 0 && (
                                    <Button type="button" onClick={() => handleConfirmEntries(section.key)} disabled={loading}>Confirm & Add</Button>
                                )}
                            </div>
                            {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
                            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
