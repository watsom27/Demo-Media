import type { NextApiRequest, NextApiResponse } from "next";

import { USER_COOKIE_HANDLE } from "~/config/Constants";
import { userService } from "~/service/UserService";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { method, body } = req;
    const { name, username, password, confirmPassword } = JSON.parse(body);

    console.log(body);

    switch (method) {
        case "POST":
            const loginResult = userService.register(name, username, password, confirmPassword);

            if (loginResult.ok) {
                const expiresDate = new Date();
                expiresDate.setDate(expiresDate.getDate() + 1);

                res.setHeader("set-cookie", `${USER_COOKIE_HANDLE}=${username}; path=/; samesite=lax; httponly;`);
                res.redirect("/");
            } else {
                res.status(400);
                res.send(loginResult.error);
            }

            break;

        default:
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
