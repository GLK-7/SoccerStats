import { useState } from 'react';
import useSoccerData from '../hooks/useSoccerData';
import {ITheme} from '../interfaces/theme';
import { Partida } from '../interfaces/partida';

// Components
import Loading from './Loading';
import DataError from './DataError';
import Clube from './Clube';

interface Props {
  theme: ITheme;
}

const Partidas = ({ theme }: Props) => {
  const { data, loading } = useSoccerData(`campeonatos/${10}/partidas`);
  const [selectedRodada, setSelectedRodada] = useState<string | null>(null);

  const convertRodadaText = (texto: string): string => {
    const [numero, _] = texto.split('a-');
    const numeroConvertido = parseInt(numero, 10);

    return `${numeroConvertido}ª Rodada`;
  };

  if (loading) return <Loading theme={theme} />;
  if (!data) return <DataError theme={theme} />;

  const partidas = data?.partidas?.['fase-unica'] || {};
  const rodadasFiltradas = selectedRodada
    ? { [selectedRodada]: partidas[selectedRodada] }
    : partidas;

  return (
    <div
      className="p-4 gap-4 flex flex-col text-white rounded light sm:w-[60%] w-full"
      style={{
        background: theme.bg1,
        color: theme.color,
      }}
    >
      <div className="flex flex-col justify-between items-center mb-4 gap-4">
        <h1 className="text-center">Partidas</h1>
        <select
          className="p-2 rounded"
          style={{ background: theme.bg0, color: theme.color }}
          onChange={(e) => setSelectedRodada(e.target.value)}
          value={selectedRodada || ''}
        >
          <option value="">Todas as Rodadas</option>
          {Object.keys(partidas).map((rodada) => (
            <option key={rodada} value={rodada}>
              {convertRodadaText(rodada)}
            </option>
          ))}
        </select>
      </div>

      {Object.keys(rodadasFiltradas).map((rodada) => (
        <div key={rodada} className="mb-6">
          <h3 className="font-bold text-xl mb-2">
            {convertRodadaText(rodada)}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Object.entries(rodadasFiltradas[rodada]).map(
              ([indice, partida]) => {
                const partidaData = partida as Partida;

                return (
                  <div
                    key={indice}
                    className="rounded-lg shadow-lg p-4 flex flex-col items-center justify-center"
                    style={{
                      background: theme.bg0,
                    }}
                  >
                    <div className="flex w-1/1 items-center">
                      <Clube
                        name={partidaData.time_mandante?.nome_popular}
                        srcImg={partidaData.time_mandante?.escudo}
                        widthImg={20}
                        gap={2}
                      />

                      <span
                        className="mx-2"
                        style={{ color: theme.boderColor }}
                      >
                        X
                      </span>

                      <Clube
                        name={partidaData.time_visitante?.nome_popular}
                        srcImg={partidaData.time_visitante?.escudo}
                        widthImg={20}
                        gap={2}
                      />
                    </div>

                    <p className="mt-2 text-xs">
                      {partidaData.data_realizacao} -{' '}
                      {partidaData.hora_realizacao}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Partidas;
