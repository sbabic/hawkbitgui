import IconButton from '../icon-button';
import Tooltip from '../tooltip';

interface TooltipIconButtonProps {
  icon: React.ReactNode;
  tooltipContent: string;
  onClick: () => void;
}

export default function TooltipIconButton({ icon, tooltipContent, onClick }: TooltipIconButtonProps) {
  return (
    <Tooltip content={tooltipContent}>
      <IconButton height={'30px'} width={'30px'} onClick={onClick} style={{ padding: '4px' }}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}
