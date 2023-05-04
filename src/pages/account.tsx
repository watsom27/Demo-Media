import classNames from "classnames";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import { Error } from "~/components/common/Error";
import { Info } from "~/components/common/Info";
import { TAB_TITLE_SUFFIX } from "~/config/Constants";
import { getServerSidePropsForProtectedPage } from "~/hooks/ProtectedPage";
import { userService, UserView } from "~/service/UserService";

import account from "~/pages/account.module.css";
import form from "~/styles/form.module.css";

interface AccountProps {
    user: UserView;
}

export async function getServerSideProps(
    context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<AccountProps>> {
    // Safety: This non-null is safe because if we do not have a user,
    // then `getServerSidePropsForProtectedPage` will redirect us away and the page wont render
    const user = userService.getByUsername(context.req.cookies?.user ?? "")!;

    return {
        ...await getServerSidePropsForProtectedPage(context),
        props: { user },
    };
}

export default function Account({ user }: AccountProps): JSX.Element {
    const [name, setName] = useState(user.name);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dirty, setDirty] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string>();
    const [info, setInfo] = useState<string>();

    useEffect(() => {
        const onBeforeUnload = () => dirty ? "dirty" : undefined;
        window.addEventListener("beforeunload", onBeforeUnload);

        return () => window.removeEventListener("beforeunload", onBeforeUnload);
    }, [dirty]);

    const doUpdate = async () => {
        const init: RequestInit = {
            method: "PATCH",
            body: JSON.stringify({
                name,
                password,
                confirmPassword,
            }),
        };

        const response = await fetch("/api/v1/users/update", init);

        if (response.ok) {
            const { name } = await response.json();

            setName(name);
            setPassword("");
            setConfirmPassword("");
            setDirty(false);
            setShowConfirmPassword(false);
            setError(undefined);
            setInfo("Details updated successfully");
        } else {
            setError(await response.text());
        }
    };

    return (
        <>
            <Head>
                <title>{ `My Account${TAB_TITLE_SUFFIX}` }</title>
            </Head>
            <>
                <h2>My Account</h2>
                <i>Welcome, { user.name }</i>
                <h3>Update Details</h3>
                <Error error={ error } />
                <Info info={ info } />
                <form
                    className={ form.formWrapper }
                    onSubmit={ (e) => e.preventDefault() }
                >
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        className={ form.input }
                        type="text"
                        value={ name }
                        onChange={ (e) => {
                            setDirty(true);
                            setName(e.target.value);
                        } }
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        className={ form.input }
                        type="password"
                        value={ password }
                        onChange={ (e) => {
                            setDirty(true);
                            setShowConfirmPassword(true);
                            setPassword(e.target.value);
                        } }
                    />

                    <div
                        className={ classNames(account.confirmPasswordWrapper, {
                            [account.visible]: showConfirmPassword,
                        }) }
                    >
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            name="confirmPassword"
                            className={ form.input }
                            type="password"
                            value={ confirmPassword }
                            onChange={ (e) => {
                                setDirty(true);
                                setConfirmPassword(e.target.value);
                            } }
                        />
                    </div>

                    <input
                        className={ classNames(form.input, form.submit) }
                        type="submit"
                        value="Save Changes"
                        onClick={ doUpdate }
                    />
                </form>
            </>
        </>
    );
}
