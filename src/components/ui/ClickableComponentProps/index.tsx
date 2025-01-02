import React, { ReactNode, FC } from 'react';

interface ClickableComponentProps {
    children: ReactNode;
    onClick?: (event: any) => void;
}

const ClickableComponent: FC<ClickableComponentProps> = ({
    children,
    onClick,
}) => {
    const handleClick = (event: any) => {
        if (onClick) {
            onClick(event);
        }
    };

    return React.Children.map(children, (child: any) =>
        React.cloneElement(child as React.ReactElement<any>, {
            onClick: (event: any) => {
                if (child.props.onClick) {
                    child.props.onClick(event);
                }
                handleClick(event);
            },
        })
    );
};

export default ClickableComponent;
