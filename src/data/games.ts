import type { Game } from '../types/Game'

export const games: Game[] = [
  {
    id: 'morpion',
    title: 'Morpion',
    description: 'Mets des gros X, ton pote mettras des gros O. ',
    icon: '✖️'
  },
  {
    id: 'sudoku',
    title: 'Sudoku',
    description: 'Remplir une grille de chiffres...',
    icon: '🔢'
  },
  {
    id: 'chess',
    title: 'Échecs',
    description: "Balance tes subordonnés comme un vrai roi",
    icon: '♟️'
  }
]