import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const LoginPage = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        if (!form.email || !form.password) {
            setError("Please enter both email and password.");
            setLoading(false);
            return;
        }
        try {
            await axios.post("http://localhost:5000/api/auth/login", form, { withCredentials: true });
            setLoading(false);
            navigate("/dashboard");
        } catch (err) {
            setLoading(false);
            setError(err?.response?.data?.error || "Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
            <Card className="w-full max-w-md shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold text-gray-900 dark:text-white">Smart Student Hub Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                value={form.email}
                                onChange={handleChange}
                                className={cn("block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900 dark:text-white", error && !form.email && "border-red-500")}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="current-password"
                                value={form.password}
                                onChange={handleChange}
                                className={cn("block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900 dark:text-white", error && !form.password && "border-red-500")}
                                required
                            />
                        </div>
                        {error && <div className="text-red-600 dark:text-red-400 text-sm text-center">{error}</div>}
                        <Button type="submit" className="w-full px-6 py-2 text-base font-medium" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account? <a href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">Register</a>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;
