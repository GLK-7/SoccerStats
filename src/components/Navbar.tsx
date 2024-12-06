import React, { useState } from 'react';
import ITheme from '../../interfaces/theme';

import {
  SoccerBall,
  Table,
  CalendarDots,
  Sun,
  Moon,
  Star,
  List,
  X,
} from '@phosphor-icons/react';

interface Props {
  theme: ITheme;
  setTheme?: React.Dispatch<React.SetStateAction<ITheme>>;
  themes: ITheme[];
}

const Navbar = ({ theme, setTheme, themes }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className="px-2 h-16 fixed top-0 left-0 w-full shadow-lg z-50"
      style={{
        background: theme.bg1,
        color: theme.color,
      }}
    >
      <div className="flex items-center justify-between h-full">
        {/* Logo */}
        <div className="flex items-center gap-2 md:text-xl text-xl p-2 rounded">
          <SoccerBall weight="fill" />
          <h2>Soccer Stats</h2>
        </div>

        {/* Botão hambúrguer para mobile */}
        <button
          className="text-2xl md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <List size={24} />}
        </button>

        {/* Navegação principal */}
        <nav
          className={`${
            isMenuOpen ? 'block md:shadow-none shadow-lg' : 'hidden'
          } md:flex flex-col md:flex-row items-center absolute md:static top-16 left-0 w-full md:w-auto bg-opacity-95 md:bg-transparent`}
          style={{
            background: isMenuOpen ? theme.bg1 : 'transparent',
          }}
        >
          <ul className="flex flex-col md:flex-row gap-1 items-center w-full md:w-auto">
            <li className="cursor-pointer hover:text-gray-300 flex gap-1 items-center px-3 py-2 md:py-0">
              <Table size={20} weight="fill" className="mb-0.5" />
              <a href="#tabela">Tabela</a>
            </li>
            <li className="cursor-pointer hover:text-gray-300 flex gap-1 items-center px-3 py-2 md:py-0">
              <Star size={20} weight="fill" className="mb-0.5" />
              <a href="#artilharia">Artilharia</a>
            </li>
            <li className="cursor-pointer hover:text-gray-300 flex gap-1 items-center px-3 py-2 md:py-0">
              <CalendarDots size={20} weight="fill" className="mb-0.5" />
              <a href="#partidas">Partidas</a>
            </li>
          </ul>
          {/* Botões de seleção de tema */}
          <div className="flex gap-2 px-2 md:px-8 justify-center py-4 md:py-0 border-none">
            <button
              onClick={() => setTheme?.(themes[1])}
              style={{
                background:
                  theme.name === themes[1].name ? theme.color : theme.bg0,
                borderRadius: '4px',
                color:
                  theme.name === themes[1].name
                    ? themes[0].color
                    : themes[0].color,
              }}
              className="flex items-center gap-1 p-2 w-24 justify-center"
            >
              <Sun size={20} weight="fill" className="mb-0.5" />
              Claro
            </button>
            <button
              onClick={() => setTheme?.(themes[0])}
              style={{
                background:
                  theme.name === themes[0].name ? theme.color : theme.bg0,
                borderRadius: '4px',
                color:
                  theme.name === themes[0].name
                    ? themes[1].color
                    : themes[1].color,
              }}
              className="flex items-center gap-1 p-2 w-24 justify-center"
            >
              <Moon size={20} weight="fill" className="mb-0.5" />
              Escuro
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
