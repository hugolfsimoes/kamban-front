import { Provider as ProviderDefault, Root, TooltipProviderProps } from "@radix-ui/react-tooltip";

export const Provider = ({ children, delayDuration = 0, ...props }: TooltipProviderProps) => {
    return (
        <ProviderDefault delayDuration={delayDuration}>
            <Root>{children}</Root>
        </ProviderDefault>
    )
} 