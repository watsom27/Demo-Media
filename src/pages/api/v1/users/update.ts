import type { NextApiRequest, NextApiResponse } from "next";
import { USER_COOKIE_HANDLE } from "~/config/Constants";
import { userService } from "~/service/UserService";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { method, body } = req;

    switch (method) {
        case "PATCH":
            const { name, password, confirmPassword } = JSON.parse(body);
            const username = req.cookies?.[USER_COOKIE_HANDLE];

            if (username?.length) {
                const updateResult = await userService.updateUser(username, name, password, confirmPassword);

                if (updateResult.ok) {
                    res.status(200);
                    res.end(JSON.stringify(updateResult.value));
                } else {
                    res.status(400);
                    res.end(updateResult.error.toString());
                }
            } else {
                res.status(401);
                res.end("You need to be logged in to use this endpoint");
            }

            break;

        default:
            res.setHeader("Allow", ["PATCH"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
