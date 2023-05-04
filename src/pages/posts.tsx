import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { useState } from "react";

import { Error } from "~/components/common/Error";
import { Refresh } from "~/components/control/Refresh";
import { Post as PostComponent } from "~/components/posts/Post";
import { TAB_TITLE_SUFFIX } from "~/config/Constants";
import { getServerSidePropsForProtectedPage } from "~/hooks/ProtectedPage";
import { Post, postService } from "~/service/PostService";

import postsStyles from "~/pages/posts.module.css";

interface PostsProps {
    posts: Post[];
}

export async function getServerSideProps(
    context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<PostsProps>> {
    const posts = postService.getPosts();

    return {
        ...await getServerSidePropsForProtectedPage(context),
        props: { posts },
    };
}

export default function Posts(props: PostsProps): JSX.Element {
    const [posts, setPosts] = useState(props.posts ?? []);
    const [newPost, setNewPost] = useState("");
    const [error, setError] = useState<string>();

    const reloadPosts = async () => {
        const response = await fetch("/api/v1/posts");

        if (response.ok) {
            setPosts(await response.json());
        } else {
            setError(await response.text());
        }
    };

    const submitNewPost = async () => {
        const init: RequestInit = {
            method: "POST",
            body: JSON.stringify({ postContent: newPost }),
        };

        const response = await fetch("/api/v1/posts/create", init);

        if (response.ok) {
            await reloadPosts();
            setNewPost("");
        } else {
            setError(await response.text());
        }
    };

    return (
        <>
            <Head>
                <title>{ `My Posts${TAB_TITLE_SUFFIX}` }</title>
            </Head>
            <h2>Latest Posts</h2>
            <Refresh doRefresh={ reloadPosts } />
            <Error error={ error } />
            <section className={ postsStyles.postList }>
                <form onSubmit={ (e) => e.preventDefault() } className={ postsStyles.createNew }>
                    <input
                        className={ postsStyles.input }
                        name="newPost"
                        type="text"
                        value={ newPost }
                        onChange={ (e) => setNewPost(e.target.value) }
                        placeholder="What are you thinking?"
                    />
                    <span
                        className={ postsStyles.submitWrapper }
                        onClick={ submitNewPost }
                    >
                        <input
                            type="submit"
                            value="Post!"
                            className={ postsStyles.submitButton }
                        />
                        <FontAwesomeIcon icon={ faPaperPlane } />
                    </span>
                </form>
                { posts.map((post) => <PostComponent post={ post } key={ post.content } />) }
            </section>
        </>
    );
}
