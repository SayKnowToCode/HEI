
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import MultiEntryInput from "./components/MultiEntryInput";

const steps = [
    {
        title: "Personal Information (Required)",
        required: true,
        fields: [
            { name: "name", label: "Full Name", type: "text", required: true },
            { name: "college", label: "College", type: "text", required: true },
            { name: "roll", label: "Roll Number", type: "text", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "password", label: "Password", type: "password", required: true },
            { name: "confirmPassword", label: "Confirm Password", type: "password", required: true },
        ],
    },
    { title: "Conferences and Workshops Attended", required: false, key: "conferences" },
    { title: "Certifications Earned", required: false, key: "certifications" },
    { title: "Club Activities and Volunteering Efforts", required: false, key: "clubs" },
    { title: "Competitions and Academic Contests", required: false, key: "competitions" },
    { title: "Leadership Roles and Internships", required: false, key: "leadership" },
    { title: "Community Services Done", required: false, key: "community" },
];

const initialForm = {
    name: "",
    college: "",
    roll: "",
    email: "",
    password: "",
    confirmPassword: "",
    conferences: [],
    certifications: [],
    clubs: [],
    competitions: [],
    leadership: [],
    community: [],
};

const RegisterPage = () => {
    const [form, setForm] = useState(initialForm);
    const [step, setStep] = useState(0);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    // For multi-entry steps
    const handleMultiEntryChange = (key, entries) => {
        setForm({ ...form, [key]: entries });
    };

    const validateStep = () => {
        if (steps[step].required) {
            for (const field of steps[step].fields) {
                if (field.required && !form[field.name]) {
                    return `Please enter ${field.label}.`;
                }
            }
            if (form.password && form.password.length < 6) {
                return "Password must be at least 6 characters.";
            }
            if (form.password !== form.confirmPassword) {
                return "Passwords do not match.";
            }
        }
        return "";
    };

    const handleNext = (e) => {
        e.preventDefault();
        const err = validateStep();
        if (err) {
            setError(err);
            return;
        }
        setError("");
        // If moving to an activity step, reset its entries to a single empty entry
        const nextStep = step + 1;
        if (nextStep > 0 && nextStep < steps.length) {
            const key = steps[nextStep].key;
            if (key && Array.isArray(form[key]) && form[key].length === 0) {
                setForm({ ...form, [key]: [{ name: "", date: "", venue: "", media: null, media_base64: "" }] });
            }
        }
        setStep(nextStep);
    };

    const handlePrev = () => {
        setError("");
        setStep((prev) => prev - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        // Prepare activities with base64 images
        const activityKeys = ['conferences', 'certifications', 'clubs', 'competitions', 'leadership', 'community'];
        const payload = {
            name: form.name,
            email: form.email,
            password: form.password,
            enrollment_number: form.roll,
            college_name: form.college,
            year: form.year,
            branch: form.branch,
        };
        activityKeys.forEach(key => {
            payload[key] = (form[key] || []).map(entry => ({
                name: entry.name,
                date: entry.date,
                venue: entry.venue,
                media_url: entry.media_base64 || null
            }));
        });
        try {
            await axios.post("http://localhost:5000/api/auth/register", payload, { withCredentials: true });
            setLoading(false);
            navigate("/login");
        } catch (err) {
            setLoading(false);
            setError(err?.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
            <Card className="w-full max-w-lg shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold text-gray-900 dark:text-white">Register for Smart Student Hub</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={step === steps.length - 1 ? handleSubmit : handleNext}>
                        <h2 className="text-lg font-semibold mb-2 text-center text-gray-900 dark:text-white">{steps[step].title}</h2>
                        {/* Personal Info Step */}
                        {step === 0 && steps[0].fields.map((field) => (
                            <div key={field.name}>
                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{field.label}{field.required && <span className="text-red-500">*</span>}</label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    id={field.name}
                                    value={form[field.name]}
                                    onChange={handleChange}
                                    className={cn("block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900 dark:text-white", error && !form[field.name] && field.required && "border-red-500")}
                                    required={field.required}
                                />
                            </div>
                        ))}
                        {/* Multi-entry steps */}
                        {step > 0 && step < steps.length && (
                            <MultiEntryInput
                                label={steps[step].title}
                                entries={form[steps[step].key]}
                                onChange={entries => handleMultiEntryChange(steps[step].key, entries)}
                                mediaLabel="Upload Media (Certificate, etc.)"
                            />
                        )}
                        {error && <div className="text-red-600 dark:text-red-400 text-sm text-center">{error}</div>}
                        <div className="flex justify-between mt-4">
                            {step > 0 && (
                                <Button type="button" variant="outline" onClick={handlePrev}>
                                    Previous
                                </Button>
                            )}
                            {step < steps.length - 1 ? (
                                <Button type="submit" className="ml-auto px-6 py-2 text-base font-medium" disabled={loading}>
                                    Next
                                </Button>
                            ) : (
                                <Button type="submit" className="ml-auto px-6 py-2 text-base font-medium" disabled={loading}>
                                    {loading ? "Registering..." : "Register"}
                                </Button>
                            )}
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account? <a href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Login</a>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// ...existing code...
export default RegisterPage;
