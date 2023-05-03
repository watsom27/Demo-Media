import classnames from "classnames";

import error from "~/components/common/Error.module.css";

interface ErrorProps {
    error?: string;
    slim?: boolean;
}

export function Error(props: ErrorProps): JSX.Element {
    return props.error
        ? <p className={ classnames(error.p, { [error.slim]: props.slim }) }>{ props.error }</p>
        : <></>;
}
