import useSoccerData from '../hooks/useSoccerData';
import ITheme from '../../interfaces/theme';

// Icons
import { User, ArrowCircleDown, ArrowCircleUp } from '@phosphor-icons/react';

// Components
import Clube from './Clube';
import LinhaTabela from './LinhaTabela';
import Loading from './Loading';
import DataError from './DataError';
import { useState } from 'react';

interface Props {
  theme: ITheme;
}

const Artilharia = ({ theme }: Props) => {
  const { data, loading } = useSoccerData(`campeonatos/${10}/artilharia`);
  const [showAll, setShowAll] = useState(false);

  if (loading) return <Loading theme={theme} />;
  if (!data) return <DataError theme={theme} />;

  // Define quantos itens exibir
  const visibleData = showAll ? data : data.slice(0, 5);

  return (
    <div
      className="p-4 gap-4 flex flex-col text-white rounded light sm:w-[60%] w-full"
      style={{
        background: theme.bg1,
        color: theme.color,
      }}
    >
      <h1 className="text-center text-sm sm:text-base">Artilharia</h1>
      <div className="flex flex-col">
        <table>
          <thead>
            <tr
              className="text-left text-sm"
              style={{
                color: theme.color,
                borderBottom: `1px solid ${theme.borderColor}`,
              }}
            >
              <th>Jogador</th>
              <th>Gols</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((ln: any, index: number) => (
              <tr
                key={index}
                className="text-sm sm:text-base border-b h-12 gap-2"
                style={{
                  background: theme.bg1,
                  borderBottom: `1px solid ${theme.borderColor}`,
                  color: theme.color,
                }}
              >
                <LinhaTabela theme={theme}>
                  <div className="flex gap-4 items-center">
                    <div className="w-4 text-base">
                      <b>{index + 1}</b>
                    </div>
                    <div className="flex items-center gap-1">
                      <User
                        size={28}
                        weight="fill"
                        className="rounded-full mb-0.5 p-1"
                        style={{
                          background: theme.color,
                          color: theme.bg1,
                        }}
                      />
                      <div>
                        <span className="text-sm">
                          {ln.atleta.nome_popular}
                        </span>
                        <span
                          className="text-xs mt-[-8px] flex"
                          style={{
                            color: theme.colorLight,
                          }}
                        >
                          <Clube
                            name={ln.time.nome_popular}
                            srcImg={ln.time.escudo}
                            widthImg={14}
                            gap={4}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </LinhaTabela>

                <LinhaTabela theme={theme}>
                  <span>{ln.gols}</span>
                </LinhaTabela>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Botão para alternar entre mostrar todos ou apenas os 5 primeiros */}
        {data.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 bg-neutral-500 hover:bg-neutral-600 text-white py-2 px-4 rounded flex items-center gap-2 justify-center"
          >
            {showAll ? (
              <ArrowCircleUp
                size={24}
                weight="fill"
                className="rounded-full mb-0.5 text-white"
              />
            ) : (
              <ArrowCircleDown
                size={24}
                weight="fill"
                className="rounded-full mb-0.5 text-white"
              />
            )}

            {showAll ? 'Mostrar menos' : 'Mostrar todos'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Artilharia;
