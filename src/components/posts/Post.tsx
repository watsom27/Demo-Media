import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "~/service/PostService";

import post from "~/components/posts/Post.module.css";

interface PostProps {
    post: Post;
    key: string;
}

export function Post(props: PostProps): JSX.Element {
    return (
        <div className={ post.wrapper }>
            <i>
                <b>{ props.post.user.username }</b> says:
            </i>
            { props.post.content }
            <span>
                <FontAwesomeIcon
                    icon={ faThumbsUp }
                    onClick={ () => alert("like") }
                    className={ post.like }
                />{"   "}
                { props.post.likes }
            </span>
        </div>
    );
}
