import classNames from "classnames";
import { FormEvent, useRef, useState } from "react";

import { Error } from "~/components/common/Error";

import login from "~/pages/login.module.css";

export default function Login(): JSX.Element {
    const [error, setError] = useState<string>();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const passwordRef = useRef<HTMLInputElement>(null);

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const init: RequestInit = {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
        };

        const response = await fetch("/api/v1/users/login", init);

        if (response.ok) {
            location.pathname = "/";
        } else {
            setError(await response.text());
            setPassword("");

            passwordRef.current?.focus();
        }
    };

    return (
        <>
            <h2>Login</h2>
            <Error error={ error } slim />
            <form onSubmit={ onFormSubmit }>
                <section className={ login.loginWrapper }>
                    <label htmlFor="username">Username</label>
                    <input
                        className={ login.input }
                        type="text"
                        name="username"
                        value={ username }
                        onChange={ (e) => setUsername(e.target.value) }
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        className={ login.input }
                        type="password"
                        name="password"
                        ref={ passwordRef }
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                    />

                    <input className={ classNames(login.input, login.submit) } type="submit" value="Login" />
                    <input
                        className={ classNames(login.input, login.submit) }
                        type="button"
                        value="Register"
                        onClick={ () => location.pathname = "/register" }
                    />
                </section>
            </form>
        </>
    );
}
