
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const initialForm = {
    name: "",
    college: "",
    roll: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const RegisterPage = () => {
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const validateForm = () => {
        if (!form.name) return "Please enter Full Name.";
        if (!form.college) return "Please enter College.";
        if (!form.roll) return "Please enter Roll Number.";
        if (!form.email) return "Please enter Email.";
        if (!form.password || form.password.length < 6) return "Password must be at least 6 characters.";
        if (form.password !== form.confirmPassword) return "Passwords do not match.";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validateForm();
        if (err) {
            setError(err);
            return;
        }
        setLoading(true);
        setError("");
        const payload = {
            name: form.name,
            email: form.email,
            password: form.password,
            enrollment_number: form.roll,
            college_name: form.college,
        };
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
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h2 className="text-lg font-semibold mb-2 text-center text-gray-900 dark:text-white">Personal Information (Required)</h2>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={form.name}
                                onChange={handleChange}
                                className={cn("block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900 dark:text-white", error && !form.name && "border-red-500")}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="college" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">College<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="college"
                                id="college"
                                value={form.college}
                                onChange={handleChange}
                                className={cn("block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900 dark:text-white", error && !form.college && "border-red-500")}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="roll" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Roll Number<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="roll"
                                id="roll"
                                value={form.roll}
                                onChange={handleChange}
                                className={cn("block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900 dark:text-white", error && !form.roll && "border-red-500")}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email<span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={form.email}
                                onChange={handleChange}
                                className={cn("block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900 dark:text-white", error && !form.email && "border-red-500")}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password<span className="text-red-500">*</span></label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={form.password}
                                onChange={handleChange}
                                className={cn("block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900 dark:text-white", error && (!form.password || form.password.length < 6) && "border-red-500")}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password<span className="text-red-500">*</span></label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className={cn("block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900 dark:text-white", error && form.password !== form.confirmPassword && "border-red-500")}
                                required
                            />
                        </div>
                        {error && <div className="text-red-600 dark:text-red-400 text-sm text-center">{error}</div>}
                        <div className="flex justify-end mt-4">
                            <Button type="submit" className="px-6 py-2 text-base font-medium" disabled={loading}>
                                {loading ? "Registering..." : "Register"}
                            </Button>
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
