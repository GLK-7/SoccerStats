import ITheme from '../../interfaces/theme';

// Icons
import { WarningDiamond } from '@phosphor-icons/react';

interface Props {
  theme: ITheme;
}

const DataError = ({ theme }: Props) => {
  return (
    <div
      className="flex rounded p-8 gap-2 items-center"
      style={{
        background: theme.bg1,
      }}
    >
      <WarningDiamond
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
        Erro ao carregar os dados.
      </span>
    </div>
  );
};

export default DataError;
