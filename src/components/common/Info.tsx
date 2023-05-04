import classnames from "classnames";

import info from "~/components/common/Info.module.css";

interface InfoProps {
    info?: string;
    slim?: boolean;
}

export function Info(props: InfoProps): JSX.Element {
    return props.info
        ? <p className={ classnames(info.p, { [info.slim]: props.slim }) }>{ props.info }</p>
        : <></>;
}
