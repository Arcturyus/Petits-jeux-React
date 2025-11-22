import type { Game } from '../types/Game'

export const games: Game[] = [
  {
    id: 'morpion',
    title: 'Morpion',
    description: "L'un aligne des X, l'autre des O...", 
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
    description: "Tout le monde protège un roi qui fait rien...",
    icon: '♟️'
  }
]