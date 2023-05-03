import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import refresh from "~/components/control/Refresh.module.css";

interface RefreshProps {
    doRefresh: () => Promise<void>;
    className?: string;
}

export function Refresh({ doRefresh, className }: RefreshProps): JSX.Element {
    return (
        <span className={ classNames(refresh.wrapper, className) } onClick={ doRefresh }>
            Refresh <FontAwesomeIcon icon={ faRotateRight } />
        </span>
    );
}
