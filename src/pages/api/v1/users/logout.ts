import type { NextApiRequest, NextApiResponse } from "next";

import { USER_COOKIE_HANDLE } from "~/config/Constants";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { method, cookies } = req;

    switch (method) {
        case "GET":
            res.setHeader("set-cookie",
                `${USER_COOKIE_HANDLE}=${cookies[USER_COOKIE_HANDLE]}; path=/; samesite=lax; httponly; Max-Age=-1`);
            res.redirect("/");

            break;

        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
