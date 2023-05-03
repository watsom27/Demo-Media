import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { userService } from "~/service/UserService";

export async function getServerSidePropsForProtectedPage(
    context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{}>> {
    return userService.checkLogin(context.req.cookies?.user ?? "")
        ? { props: {} }
        : { redirect: { statusCode: 303, destination: "/login" } };
}
