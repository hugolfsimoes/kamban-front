import { Portal, Arrow, Content as ContentDefault, TooltipContentProps } from '@radix-ui/react-tooltip'

import { ColorType } from './types'
import { cn } from '@/utils/cn'
import { colorStyles } from './config'

export type ContentProps = TooltipContentProps & {
    color?: ColorType
}

export const Content = ({
    children, className, color = 'primary', sideOffset = 8, ...props
}: ContentProps) => {

    return (
        <Portal>
            <ContentDefault sideOffset={sideOffset} className={cn('py-2 px-4 rounded-md font-normal text-xs leading-5', colorStyles[color], className)}>
                {children}
                <Arrow />
            </ContentDefault>
        </Portal>
    )



}