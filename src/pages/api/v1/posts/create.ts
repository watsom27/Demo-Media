import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";
import { USER_COOKIE_HANDLE } from "~/config/Constants";

import { postService } from "~/service/PostService";
import { userService } from "~/service/UserService";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { method, body, cookies } = req;

    switch (method) {
        case "POST":
            const username = cookies[USER_COOKIE_HANDLE];

            if (username) {
                const user = userService.getByUsername(username);

                if (user) {
                    const { postContent } = JSON.parse(body);

                    if (postContent) {
                        postService.addPost({ postId: v4(), user, content: postContent, likes: 0 });

                        res.status(200);
                        res.send("Success");
                    } else {
                        res.status(400);
                        res.send("Missing or malformed request body");
                    }
                } else {
                    res.status(401);
                    res.send("You are not authorised to perform this action");
                }
            } else {
                res.status(401);
                res.send("You are not authorised to perform this action");
            }

            break;

        default:
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
