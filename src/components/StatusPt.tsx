import { CheckCircle, XCircle, MinusCircle } from '@phosphor-icons/react';

interface Props {
  jogos: string[];
}

const StatusPt = ({ jogos }: Props) => {
  return (
    <div className="flex">
      {jogos.map((jogo, index) => (
        <div key={index}>
          {jogo === 'v' ? (
            <CheckCircle size={20} weight="fill" className="text-green-500" />
          ) : jogo === 'e' ? (
            <MinusCircle size={20} weight="fill" className="text-yellow-500" />
          ) : (
            <XCircle size={20} weight="fill" className="text-red-500" />
          )}
        </div>
      ))}
    </div>
  );
};

export default StatusPt;
