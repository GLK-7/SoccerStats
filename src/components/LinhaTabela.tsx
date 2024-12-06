import ITheme from '../../interfaces/theme';

interface Props {
  hasShadow?: boolean;
  fix?: boolean;
  bold?: boolean;
  children: React.ReactNode;
  theme?: ITheme;
}

const LinhaTabela = ({ hasShadow, fix, children, bold, theme }: Props) => {
  return (
    <>
      {fix ? (
        <td
          className="flex items-center sticky left-0 max-w-full min-w-[170px] overflow-hidden text-ellipsis gap-2"
          style={{
            boxShadow: hasShadow ? '4px 0px 2px rgba(0, 0, 0, 0.9)' : 'none',
            fontWeight: bold ? 'bold' : '',
            zIndex: 1,
            background: theme.bg1,
            borderBottom: theme.borderColor,
          }}
        >
          {children}
        </td>
      ) : (
        <td
          style={{
            fontWeight: bold ? 'bold' : 'normal',
          }}
        >
          {children}
        </td>
      )}
    </>
  );
};

export default LinhaTabela;
