import classNames from "classnames";
import Link from "next/link";
import { PropsWithChildren } from "react";

import wrapper from "~/components/layout/Wrapper.module.css";
import a from "~/styles/a.module.css";

export function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    const navLinkClass = classNames(wrapper.navLink, a.black);

    return (
        <main className={ wrapper.main }>
            <section>
                <header className={ wrapper.header }>
                    <nav>
                        <Link className={ navLinkClass } href="/">Home</Link>
                        <Link className={ navLinkClass } href="/posts">Posts</Link>
                        <Link className={ navLinkClass } href="/account">My Account</Link>

                        <a className={ navLinkClass } href="/api/v1/users/logout">Login/Logout</a>
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
