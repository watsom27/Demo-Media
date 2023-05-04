import Head from "next/head";

import { getServerSidePropsForProtectedPage as getServerSideProps } from "~/hooks/ProtectedPage";

export { getServerSideProps };

export default function Home() {
    return (
        <>
            <Head>
                <title>Demo Social Media</title>
                <meta name="description" content="Simple Social Media App, without a cool name." />
            </Head>
            <h2>Demo Social Media</h2>
            <p>Simple 'social media' type app. Users can make posts and then they and other users can 'like' them.</p>
            <p>User account details can be updated in the 'My Account' page.</p>
            <p>Use the links above to navigate.</p>
        </>
    );
}
