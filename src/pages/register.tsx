import classNames from "classnames";
import { FormEvent, useRef } from "react";
import { useState } from "react";

import { Error } from "~/components/common/Error";

import form from "~/styles/form.module.css";

export default function Login(): JSX.Element {
    const [error, setError] = useState<string>();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const passwordRef = useRef<HTMLInputElement>(null);

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const init: RequestInit = {
            method: "POST",
            body: JSON.stringify({
                name,
                username,
                password,
                confirmPassword,
            }),
        };

        const response = await fetch("/api/v1/users/register", init);

        if (response.ok) {
            location.pathname = "/";
        } else {
            setError(await response.text());
            setPassword("");
            setConfirmPassword("");
            passwordRef.current?.focus();
        }
    };

    return (
        <>
            <h2>Register</h2>
            <Error error={ error } slim />
            <form onSubmit={ onFormSubmit }>
                <section className={ form.formWrapper }>
                    <label htmlFor="name">Your Name</label>
                    <input
                        className={ form.input }
                        type="text"
                        name="name"
                        value={ name }
                        onChange={ (e) => setName(e.target.value) }
                    />

                    <label htmlFor="username">Username</label>
                    <input
                        className={ form.input }
                        type="text"
                        name="username"
                        value={ username }
                        onChange={ (e) => setUsername(e.target.value) }
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        className={ form.input }
                        type="password"
                        name="password"
                        ref={ passwordRef }
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                    />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        className={ form.input }
                        type="password"
                        name="confirmPassword"
                        value={ confirmPassword }
                        onChange={ (e) => setConfirmPassword(e.target.value) }
                    />

                    <input className={ classNames(form.input, form.submit) } type="submit" value="Register" />
                    <input
                        className={ classNames(form.input, form.submit) }
                        type="button"
                        value="Login"
                        onClick={ () => location.pathname = "/login" }
                    />
                </section>
            </form>
        </>
    );
}
