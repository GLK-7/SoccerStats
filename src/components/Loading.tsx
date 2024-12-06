import {ITheme} from '../interfaces/theme';

// Icons
import { Clock } from '@phosphor-icons/react';

interface Props {
  theme: ITheme;
}

const Loading = ({ theme }: Props) => {
  return (
    <div
      className="flex rounded p-8 gap-2 items-center"
      style={{
        background: theme.bg1,
      }}
    >
      <Clock
        size={28}
        weight="fill"
        className="rounded-full mb-0.5"
        style={{
          color: theme.color,
        }}
      />
      <span
        style={{
          color: theme.color,
        }}
      >
        Carregando...
      </span>
    </div>
  );
};

export default Loading;
