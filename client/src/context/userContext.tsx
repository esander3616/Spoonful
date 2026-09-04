import { createContext, useContext, type ReactNode } from "react";
import type { User } from "../shared.types";

type UserContextType = {
    user: User | null;
    logout: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

type UserProviderProps = {
    children: ReactNode;
    user: User | null;
    logout: () => void;
};

export function UserProvider({ children, user, logout }: UserProviderProps) {
    return (
        <UserContext.Provider value={{ user, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}