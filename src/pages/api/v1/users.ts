import type { NextApiRequest, NextApiResponse } from "next";
import { userService } from "~/service/UserService";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { method } = req;

    switch (method) {
        case "GET":
            res.status(200);
            res.send(userService.getAll());
            res.end();

            break;

        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
