import React from "react";
import {requireNativeComponent} from "react-native";
import extractProps from "../lib/extract/extractProps";
import { idPattern } from "../lib/util";
import Shape from "./Shape";

export default class Use extends Shape {
    static displayName = "Use";

    static defaultProps = {
        width: 0,
        height: 0,
    };

    setNativeProps = props => {
        this.root.setNativeProps(props);
    };

    render() {
        const { props } = this;
        const { children, width, height, href } = props;

        // match "url(#pattern)"
        const matched = href.match(idPattern);
        const match = matched && matched[1];

        if (!match) {
            console.warn(
                'Invalid `href` prop for `Use` element, expected a href like `"#id"`, but got: "' +
                    href +
                    '"',
            );
        }

        return (
            <RNSVGUse
                ref={ele => {
                    this.root = ele;
                }}
                {...extractProps(props, this)}
                href={match}
                width={width}
                height={height}
            >
                {children}
            </RNSVGUse>
        );
    }
}

const RNSVGUse = requireNativeComponent("RNSVGUse");
