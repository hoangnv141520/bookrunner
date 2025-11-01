import { useState } from "react";

const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});

export const validateForm = (username: string, email: string, password: string) => {
    let newErrors: { username?: string; email?: string; password?: string } = {};

    if (username.length < 3) newErrors.username = 'Username must be at least 3 characters long.';
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email format.';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long.';

    setErrors(newErrors);
    console.log(errors);

    return Object.keys(newErrors).length === 0;
};