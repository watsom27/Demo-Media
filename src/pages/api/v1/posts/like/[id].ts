import type { NextApiRequest, NextApiResponse } from "next";

import { postService } from "~/service/PostService";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { method, query } = req;
    const { id } = query;

    switch (method) {
        case "PATCH":
            if (id && !Array.isArray(id)) {
                const result = await postService.likeById(id);

                if (result.ok) {
                    res.status(200);
                    res.end(result.value.toString());
                } else {
                    res.status(404);
                    res.end(result.error?.toString() ?? "Something is not found");
                }
            } else {
                res.status(400);
                res.end("Missing or bad post id");
            }

            break;

        default:
            res.setHeader("Allow", ["PATCH"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
