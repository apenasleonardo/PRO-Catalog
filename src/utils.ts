/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pokemon } from './types';

/**
 * Formats a pokemon's name to match Pokémon Showdown sprite naming conventions.
 */
export function cleanPokemonName(name: string): string {
  let cleaned = name.trim().toLowerCase();
  
  // Remove gender suffixes like " (M)" or " (F)"
  cleaned = cleaned.replace(/\s*\([mf]\)\s*/gi, '');
  
  // Remove special symbols
  cleaned = cleaned.replace(/[^a-z0-9\s-]/g, '');
  
  // Convert standard Showdown names if needed (e.g., "tapu koko" to "tapukoko")
  if (cleaned.startsWith('tapu ')) {
    cleaned = cleaned.replace('tapu ', 'tapu');
  }
  
  // Replace spaces with nothing or hyphens depending on showdown conventions
  // Most forms use a hyphen (e.g., "rotom-wash", "landorus-therian")
  // Let's replace spaces with hyphens
  cleaned = cleaned.replace(/\s+/g, '-');
  
  return cleaned;
}

/**
 * Generates the Pokémon Showdown sprite URL.
 * Prefers animated sprites, fallback is static.
 */
export function getPokemonSpriteUrl(name: string, animated: boolean = true): string {
  const cleanedName = cleanPokemonName(name);
  
  // Special cases for sprites
  let spriteFile = cleanedName;
  if (cleanedName === 'swampert-mega') spriteFile = 'swampert-mega';
  if (cleanedName === 'scizor-mega') spriteFile = 'scizor-mega';
  
  if (animated) {
    // Showdown animated gif server
    return `https://play.pokemonshowdown.com/sprites/xyani/${spriteFile}.gif`;
  } else {
    // Showdown static png server
    return `https://play.pokemonshowdown.com/sprites/xy/${spriteFile}.png`;
  }
}

/**
 * Generates the PokéAPI official artwork URL as high-quality fallback.
 */
export function getPokemonArtworkUrl(name: string): string {
  // We can use a map of popular pokémon IDs to avoid hitting PokéAPI in real-time,
  // or we can use a reliable public asset provider.
  // Actually, we can get official artwork using standard dex names or clean names
  // from custom showdown images or another high-quality repository:
  // e.g. https://play.pokemonshowdown.com/sprites/dex/pelipper.png is super clean and transparent!
  const cleaned = cleanPokemonName(name).replace('-', '');
  return `https://play.pokemonshowdown.com/sprites/dex/${cleanPokemonName(name)}.png`;
}

/**
 * Generates the Serebii item sprite URL.
 */
export function getItemSpriteUrl(itemName: string): string {
  if (!itemName) return '';
  
  // Format item name: lowercase, strip spaces and punctuation
  let cleaned = itemName.trim().toLowerCase()
    .replace(/[^a-z0-9]/g, ''); // E.g., "Leftovers" -> "leftovers", "Damp Rock" -> "damprock"
    
  // Special overrides
  if (cleaned === 'swampertite') return 'https://www.serebii.net/itemdex/sprites/swampertite.png';
  if (cleaned === 'rockyhelmet') return 'https://www.serebii.net/itemdex/sprites/rockyhelmet.png';
  if (cleaned === 'leftovers') return 'https://www.serebii.net/itemdex/sprites/leftovers.png';
  if (cleaned === 'choiceband') return 'https://www.serebii.net/itemdex/sprites/choiceband.png';
  if (cleaned === 'choicespecs') return 'https://www.serebii.net/itemdex/sprites/choicespecs.png';
  if (cleaned === 'choicescarf') return 'https://www.serebii.net/itemdex/sprites/choicescarf.png';
  if (cleaned === 'lifeorb') return 'https://www.serebii.net/itemdex/sprites/lifeorb.png';
  if (cleaned === 'focussash') return 'https://www.serebii.net/itemdex/sprites/focussash.png';
  if (cleaned === 'heavyboots' || cleaned === 'heavydutyboots') return 'https://www.serebii.net/itemdex/sprites/heavy-dutyboots.png';
  
  return `https://www.serebii.net/itemdex/sprites/${cleaned}.png`;
}

/**
 * Parses raw Pokepaste text into an array of Pokémon objects.
 */
export function parsePokepaste(pasteText: string): Pokemon[] {
  if (!pasteText) return [];
  
  const pokemons: Pokemon[] = [];
  // Split blocks by double-newline
  const blocks = pasteText.split(/\r?\n\r?\n/);
  
  for (const block of blocks) {
    const lines = block.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) continue;
    
    // First line: Name [@ Item]
    const firstLine = lines[0];
    let name = '';
    let item = '';
    
    if (firstLine.includes('@')) {
      const parts = firstLine.split('@');
      name = parts[0].trim();
      item = parts[1].trim();
    } else {
      name = firstLine.trim();
    }
    
    // Strip gender tags or shiny keywords
    name = name.replace(/\s*\([MF]\)\s*/gi, '').trim();
    name = name.replace(/\s*Shiny\s*/gi, '').trim();
    
    let ability = 'Não especificada';
    let nature = 'Serious';
    let evs = 'Nenhum';
    const moves: string[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.toLowerCase().startsWith('ability:')) {
        ability = line.substring(8).trim();
      } else if (line.toLowerCase().startsWith('evs:')) {
        evs = line.substring(4).trim();
      } else if (line.endsWith(' Nature')) {
        nature = line.replace(/\s+Nature/i, '').trim();
      } else if (line.startsWith('-')) {
        const moveName = line.substring(1).trim();
        if (moveName) {
          moves.push(moveName);
        }
      }
    }
    
    if (name) {
      // Determine a basic role and description
      let role = 'Combatente';
      let description = 'Pokémon versátil para a batalha.';
      
      const lowerName = name.toLowerCase();
      if (lowerName.includes('pelipper') || lowerName.includes('torkoal') || lowerName.includes('ninetales') || lowerName.includes('tyranitar')) {
        role = 'Clima / Suporte';
        description = 'Ativa o clima e dá suporte de posicionamento para o time.';
      } else if (lowerName.includes('swampert') || lowerName.includes('garchomp') || lowerName.includes('dragonite') || lowerName.includes('scizor')) {
        role = 'Atacante Físico / Sweeper';
        description = 'Causa danos massivos com golpes físicos e pressiona trocas.';
      } else if (lowerName.includes('ferrothorn') || lowerName.includes('toxapex') || lowerName.includes('skarmory') || lowerName.includes('chansey')) {
        role = 'Tanque / Parede Defensiva';
        description = 'Absorve golpes, espalha hazards e cansa as ameaças inimigas.';
      } else if (lowerName.includes('rotom') || lowerName.includes('landorus') || lowerName.includes('tornadus')) {
        role = 'Pivot / Utilitário';
        description = 'Controla o momentum da partida trazendo aliados com segurança.';
      }
      
      pokemons.push({
        name,
        spriteName: cleanPokemonName(name),
        item,
        ability,
        nature,
        evs,
        moves: moves.slice(0, 4), // Maximum 4 moves
        role,
        description,
      });
    }
  }
  
  return pokemons;
}
