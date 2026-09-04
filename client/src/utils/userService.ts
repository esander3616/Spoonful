import axios from "axios";
import type { User } from "../shared.types";

const API_URL = `${import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"}/api/users`;

type Credentials = {
    email: string;
    password: string;
};

function getToken() {
    return localStorage.getItem("token");
}

function getUserFromToken(token: string): User {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(atob(base64).split("").map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0")).join(""),);
    return JSON.parse(json).user as User;
}

async function login(credentials: Credentials): Promise<User> {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const { token } = response.data;
    localStorage.setItem("token", token);
    return getUserFromToken(token);
}

async function signup(credentials: Credentials): Promise<User> {
    const response = await axios.post(`${API_URL}/signup`, credentials);
    const { token } = response.data;
    localStorage.setItem("token", token);
    return getUserFromToken(token);
}

function logout() {
    localStorage.removeItem("token");
}

function getUser(): User | null {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }
    try {
        return getUserFromToken(token);
    } catch (error) {
        console.error("Failed to parse user from token:", error);
        return null;
    }
}

export default { signup, login, getUser, logout, getToken };
