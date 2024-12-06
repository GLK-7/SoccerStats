import Tabela from './components/Tabela';
import Navbar from './components/Navbar';
import Artilharia from './components/Artilharia';
import Partidas from './components/Partidas';
import Section from './components/Section';

import { useState } from 'react';

export default function App() {
  const themes = [
    {
      name: 'dark',
      bg0: '#1e1e1e',
      bg1: '#262626',
      color: '#fff',
      borderColor: '#404040',
      colorLight: '#ccc',
    },
    {
      name: 'light',
      bg0: '#ccc',
      bg1: '#f1f1f1',
      color: '#393939',
      borderColor: '#ccc',
      colorLight: '#6e6e6e',
    },
  ];

  const [theme, setTheme] = useState(themes[0]);

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} themes={themes} />
      <body
        style={{
          background: theme.bg0,
          margin: 0,
          padding: 0,
        }}
        className="h-screen flex justify-around"
      >
        <div className="p-4 overflow-auto mt-16 gap-4 flex flex-col justify-top w-full items-center">
          <Section id="tabela">
            <Tabela theme={theme} />
          </Section>
          <Section id="artilharia">
            <Artilharia theme={theme} />
          </Section>
          <Section id="partidas">
            <Partidas theme={theme} />
          </Section>
        </div>
      </body>
    </>
  );
}
