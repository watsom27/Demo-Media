import type { AppProps } from "next/app";

import { Wrapper } from "~/components/layout/Wrapper";

import "~/styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Wrapper>
            <Component { ...pageProps } />
        </Wrapper>
    );
}
