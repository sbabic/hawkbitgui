import IconButton, { IconButtonProps } from '../icon-button';
import Tooltip from '../tooltip';

interface TooltipIconButtonProps {
  icon: React.ReactNode;
  tooltipContent: string;
  iconButtonProps?: IconButtonProps;
}

export default function TooltipIconButton({ icon, tooltipContent, iconButtonProps }: TooltipIconButtonProps) {
  return (
    <Tooltip content={tooltipContent}>
      <IconButton height={'30px'} width={'30px'} style={{ padding: '4px' }} {...iconButtonProps}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}
