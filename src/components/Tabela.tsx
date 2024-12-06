import { useRef, useState, useEffect } from 'react';
import {ITheme} from '../interfaces/theme';

// Hook
import useSoccerData from '../hooks/useSoccerData';

// Components
import StatusPt from './StatusPt';
import Clube from './Clube';
import LinhaTabela from './LinhaTabela';
import Loading from './Loading';
import DataError from './DataError';

// Representa um time na tabela
interface Time {
  time_id: number;
  nome_popular: string;
  sigla: string;
  escudo: string;
}

// Representa cada posição na tabela
interface PosicaoTabela {
  posicao: number;
  pontos: number;
  time: Time;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  gols_pro: number;
  gols_contra: number;
  saldo_gols: number;
  aproveitamento: number;
  variacao_posicao: number;
  ultimos_jogos: string[]; // "v" para vitória, "e" para empate, "d" para derrota.
}

interface Props {
  theme: ITheme;
}

const Tabela = ({ theme }: Props) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const [hasShadow, setHasShadow] = useState(false);

  const handleScroll = () => {
    if (tableRef.current) {
      const scrollLeft = tableRef.current.scrollLeft;

      // Adiciona sombra quando há conteúdo oculto à direita
      setHasShadow(scrollLeft > 0);
    }
  };

  useEffect(() => {
    const ref = tableRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (ref) {
        ref.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasShadow]);

  const { data, loading } = useSoccerData(`campeonatos/${10}/tabela`);

  if (loading) return <Loading theme={theme} />;
  if (!data) return <DataError theme={theme} />;

  return (
    <div
      className="p-4 gap-4 flex flex-col rounded sm:w-[60%] w-full"
      style={{ background: theme.bg1, color: theme.color }}
    >
      <h1 className="text-center text-sm sm:text-base">
        Tabela do Campeonato Brasileiro Série A
      </h1>
      <div className="overflow-x-auto pb-4" ref={tableRef}>
        <table className="text-xs table-auto w-full">
          <thead>
            <tr
              style={{
                borderBottom: `1px solid ${theme.borderColor || '#000'}`,
              }}
            >
              <th
                className="text-left sticky left-0 max-w-xs overflow-hidden text-ellipsis"
                style={{ background: theme.bg1 }}
              >
                Clube
              </th>
              <th className="text-left font-bold">Pts</th>
              <th className="text-left">PJ</th>
              <th className="text-left">V</th>
              <th className="text-left">EM</th>
              <th className="text-left">DE</th>
              <th className="text-left">SG</th>
              <th className="text-left">Últimos Jogos</th>
            </tr>
          </thead>
          <tbody className="">
            {data.map((comp: PosicaoTabela) => (
              <tr
                key={comp.posicao}
                className="items-center"
                style={{
                  borderBottom: `1px solid ${theme.borderColor || '#000'}`,
                }}
              >
                <LinhaTabela fix={true} hasShadow={hasShadow} theme={theme}>
                  <strong>{comp.posicao}</strong>
                  <Clube
                    name={comp.time.nome_popular}
                    srcImg={comp.time.escudo}
                    widthImg={24}
                    gap={6}
                  />
                </LinhaTabela>
                <LinhaTabela bold={true} theme={theme}>
                  {comp.pontos}
                </LinhaTabela>
                <LinhaTabela theme={theme}>{comp.jogos}</LinhaTabela>
                <LinhaTabela theme={theme}>{comp.vitorias}</LinhaTabela>
                <LinhaTabela theme={theme}>{comp.empates}</LinhaTabela>
                <LinhaTabela theme={theme}>{comp.derrotas}</LinhaTabela>
                <LinhaTabela theme={theme}>{comp.saldo_gols}</LinhaTabela>
                <LinhaTabela theme={theme}>
                  <StatusPt jogos={comp.ultimos_jogos} />
                </LinhaTabela>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tabela;
