import type { NextApiRequest, NextApiResponse } from "next";
import { userService } from "~/service/UserService";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { cookies, method } = req;
    const { username } = cookies;

    switch (method) {
        case "GET":
            if (
                username
                && !Array.isArray(username)
            ) {
                if (userService.checkLogin(username)) {
                    res.status(200).end();
                } else {
                    res.status(403).end();
                }
            } else {
                res.status(401).end();
            }
            break;

        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
