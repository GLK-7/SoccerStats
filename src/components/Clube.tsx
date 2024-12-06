interface Props {
  name: string;
  srcImg: string;
  widthImg: number;
  gap: number;
}

const Clube = ({ name, srcImg, widthImg, gap }: Props) => {
  return (
    <div className="flex items-center py-1" style={{ gap: `${gap}px` }}>
      <img src={srcImg} alt={name} width={widthImg} />
      <span>{name}</span>
    </div>
  );
};

export default Clube;
