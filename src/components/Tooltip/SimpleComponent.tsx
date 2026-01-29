import { Trigger } from "@radix-ui/react-tooltip"
import { Content, ContentProps } from "./Content"
import { Provider } from "./Provider"

type SimpleComponentProps = ContentProps & { text: string }

export const SimpleComponent = ({ children, text, ...props }: SimpleComponentProps) => {
    return (
        <Provider>
            <Trigger asChild>{children}</Trigger>
            <Content {...props}>{text}</Content>
        </Provider>
    )
}