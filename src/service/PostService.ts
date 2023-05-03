import fs from "fs";
import fsPromises from "fs/promises";
import { Uuid } from "~/types/Uuid";

import { UserView } from "~/service/UserService";

export interface Post {
    postId: Uuid;
    user: UserView;
    content: string;
    likes: number;
}

/**
 * Service for handling the storage of posts.
 */
class PostService {
    private posts: Post[] = [];

    constructor() {
        try {
            const fileContents = fs.readFileSync("./posts.txt", "utf8");
            const parsedContents = JSON.parse(fileContents);

            if (Array.isArray(parsedContents)) {
                this.posts = parsedContents;
            }
        } catch {
            console.info("Error opening posts file, does it exist?");
        }
    }

    /** Store a new [Post] */
    public addPost(post: Post): void {
        this.posts.unshift(post);
        this.persist();
    }

    /** Get all the current posts */
    public getPosts(): Post[] {
        return this.posts;
    }

    private async persist(): Promise<void> {
        fsPromises.writeFile("./posts.txt", JSON.stringify(this.posts));
    }
}

export const postService = new PostService();
