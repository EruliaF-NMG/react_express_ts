import { Card } from "antd";

export type UICardProps = {
    elementStyle?: string,
    title?:        React.ReactNode|string,
    extra?:        React.ReactNode,
    cover?:        React.ReactNode,
    loading?:      boolean,
    hoverable?:    boolean,
    bordered?:     boolean,
    children:     React.ReactNode
}

/**
 * Card component
 * @param props UICardProps
 * @returns 
 */
export const UICard = (props : UICardProps) => {
    return (
        <Card 
            title={props.title} 
            extra={props.extra} 
            cover={props.cover} 
            loading={props.loading} 
            hoverable={props.hoverable}
            bordered={props.bordered}
            className={props.elementStyle}
        >
            {props.children}
        </Card>
    );
};