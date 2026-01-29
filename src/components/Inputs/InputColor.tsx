import { cn } from '@/utils/cn';
import { Root, Trigger, Portal, Content } from '@radix-ui/react-popover';
import { Control, useController } from 'react-hook-form';
import { styles } from './styles';
import { ChromePicker } from 'react-color';

type InputColorProps = {
  control: Control<any>;
  registerTitle: string;
  className?: string;
};

export const InputColor = ({
  control,
  registerTitle,
  className,
}: InputColorProps) => {
  const {
    field: { value, onChange },
  } = useController({ name: registerTitle, control });

  return (
    <Root>
      <Trigger asChild>
        <button
          type='button'
          className={cn(
            styles.stylesDefault,
            'px-3 h-9 flex items-center gap-4 cursor-pointer',
            className,
          )}
        >
          <div
            className='h-[14px] w-[14px] rouded-xs'
            style={{ backgroundColor: value }}
          />
          <span className={styles.fontDefault}>{value}</span>
        </button>
      </Trigger>
      <Portal>
        <Content sideOffset={8} className='z-50'>
          <ChromePicker color={value} onChange={(e) => onChange(e.hex)} />
        </Content>
      </Portal>
    </Root>
  );
};
