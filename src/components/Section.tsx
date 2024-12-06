interface Props {
  id: string;
  children: React.ReactNode;
}

const Section = ({ id, children }: Props) => {
  return (
    <section id={id} className="flex justify-center w-full">
      {children}
    </section>
  );
};

export default Section;
