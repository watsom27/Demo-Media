import type { NextApiRequest, NextApiResponse } from "next";
import { postService } from "~/service/PostService";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { method, body } = req;

    switch (method) {
        case "GET":
            res.send(postService.getPosts());

            break;

        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
