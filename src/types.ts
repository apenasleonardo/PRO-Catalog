/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Pokemon {
  name: string;
  spriteName: string; // Formatted lowercase name for sprites
  item: string;
  ability: string;
  nature: string;
  evs: string;
  moves: string[];
  role: string;
  description: string;
}

export interface Threat {
  name: string;
  icon: string; // Name of Lucide or custom icon key
  description: string;
}

export interface Team {
  id: string;
  name: string;
  style: 'Ofensivo' | 'Balanceado' | 'Stall' | 'Trick Room' | 'Hyper Offense' | 'Weather';
  difficulty: 'Fácil' | 'Média' | 'Avançada';
  format: string;
  summary: string;
  author: string;
  date: string;
  pokepasteUrl: string;
  rawPokepaste: string;
  howToUse: {
    objective: string;
    opening: string;
    winCondition: string;
    commonMistakes: string;
  };
  threats: Threat[];
  pokemons: Pokemon[];
  tags: string[];
  isCustom?: boolean;
}
