import fs from "fs";
import fsPromises from "fs/promises";
import sha1 from "sha1";
import { v4 } from "uuid";

import { Err, Ok, Result } from "~/types/Result";
import { Uuid } from "~/types/Uuid";

/**
 * Internal representation of a user, containing password hash.
 */
interface User {
    userId: Uuid;
    username: string;
    passwordHash: string;
}

/**
 * Public 'view' over a user, with secret information excluded
 */
export interface UserView {
    userId: Uuid;
    username: string;
}

class UserService {
    private users: User[] = [];

    constructor() {
        try {
            const fileContents = fs.readFileSync("./users.txt", "utf8");
            const parsedContents = JSON.parse(fileContents);

            if (Array.isArray(parsedContents)) {
                this.users = parsedContents;
            }
        } catch {
            console.info("Error opening users file, does it exist?");
        }
    }

    /**
     * Register for an account
     */
    public register(username: string, password: string, confirmPassword: string): Result<UserView, string> {
        const nameValidationResult = this.validateUsername(username);
        const passwordValidationResult = this.validatePassword(password, confirmPassword);

        if (!nameValidationResult.ok) {
            return Err(nameValidationResult.error);
        } else if (!passwordValidationResult.ok) {
            return Err(passwordValidationResult.error);
        } else {
            const user = {
                userId: v4(),
                username,
                passwordHash: sha1(password),
            };

            this.users.push(user);

            this.persist();

            return Ok({
                userId: user.userId,
                username: user.username,
            });
        }
    }

    /** Attempt to login to a user account */
    public login(username: string, password: string): Result<UserView, string> {
        const user = this.users.find((user) => user.username === username);
        const hash = sha1(password);

        return user
                && user.passwordHash === hash
            ? Ok({ userId: user.userId, username: user.username })
            : Err("Username or password is incorrect");
    }

    /** Check if a user is logged in, normally this would be more robust - but ive left it simple */
    public checkLogin(username: string): boolean {
        return this.users.some((user) => user.username === username);
    }

    /**
     * Load a list of all the users we currently have, mostly used for debugging currently
     */
    public getAll(): UserView[] {
        return this.users.map(({ userId, username }) => ({
            userId,
            username,
        }));
    }

    /** Get a specific user by username */
    public getByUsername(username: string): UserView | undefined {
        return this.users.find((user) => user.username === username);
    }

    private async persist(): Promise<void> {
        fsPromises.writeFile("./users.txt", JSON.stringify(this.users));
    }

    /** Validate that a username is over 6 characters, and is not in use already */
    private validateUsername(name: string): Result<true, string> {
        if (name.length <= 6) {
            return Err("Display name is too short");
        } else if (this.users.some(({ username }) => username === name)) {
            return Err("Name already in use");
        } else {
            return Ok(true);
        }
    }

    /** Validate that the password and confirm password match, and are over 6 characters. */
    private validatePassword(password: string, confirmPassword: string): Result<true, string> {
        if (password !== confirmPassword) {
            return Err("Passwords do not match");
        } else if (password.length <= 6) {
            return Err("Password must be longer than 6 chars");
        } else {
            return Ok(true);
        }
    }
}

export const userService = new UserService();
