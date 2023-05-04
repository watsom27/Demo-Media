import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "~/service/PostService";

import { useState } from "react";
import postStyles from "~/components/posts/Post.module.css";

interface PostProps {
    post: Post;
    key: string;
}

export function Post(props: PostProps): JSX.Element {
    const [post, setPost] = useState(props.post);

    const likePost = async () => {
        setPost({
            ...post,
            likes: post.likes + 1,
        });

        const init: RequestInit = {
            method: "PATCH",
        };

        await fetch(`/api/v1/posts/like/${post.postId}`, { method: "PATCH" });
    };

    return (
        <div className={ postStyles.wrapper }>
            <i>
                <b>{ post.user.username }</b> says:
            </i>
            { post.content }
            <span>
                <FontAwesomeIcon
                    icon={ faThumbsUp }
                    onClick={ likePost }
                    className={ postStyles.like }
                />{"   "}
                { post.likes }
            </span>
        </div>
    );
}
