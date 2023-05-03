import classNames from "classnames";
import { PropsWithChildren } from "react";

import wrapper from "~/components/layout/Wrapper.module.css";
import a from "~/styles/a.module.css";

export interface WrapperProps {
    isLoggedOut?: boolean;
}

export function Wrapper({ children, isLoggedOut }: PropsWithChildren<WrapperProps>): JSX.Element {
    const navLinkClass = classNames(wrapper.navLink, a.black);

    return (
        <main className={ wrapper.main }>
            <section>
                <header className={ wrapper.header }>
                    <nav>
                        <a className={ navLinkClass } href="/">Home</a>
                        <a className={ navLinkClass } href="/posts">Posts</a>
                        <a className={ navLinkClass } href="/account">My Account</a>
                        { isLoggedOut
                            ? <a className={ navLinkClass } href="/login">Login</a>
                            : <a className={ navLinkClass } href="/api/v1/users/logout">Logout</a> }
                    </nav>
                </header>
                { children }
            </section>
            <footer className={ wrapper.footer }>
                <h3>Demo Social Media</h3>
                <p>
                    Created by{" "}
                    <a
                        className={ a.white }
                        href="https://m-watson.co.uk"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Michael Watson
                    </a>
                </p>
            </footer>
        </main>
    );
}
