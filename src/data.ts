/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Team } from './types';

export const PRELOADED_TEAMS: Team[] = [
  {
    id: 'rain-balance-pro',
    name: 'Rain Balance',
    style: 'Balanceado',
    difficulty: 'Fácil',
    format: 'PRO PvP',
    summary: 'Time focado em manter pressão ofensiva constante usando a mecânica de chuva (Rain) e pivots rápidos.',
    author: 'TrainerRed99',
    date: '12 de Outubro, 2024',
    pokepasteUrl: 'https://pokepast.es/5a7042a37f59d4c1',
    tags: ['Chuva', 'Balance', 'Iniciante', 'Mega Swampert'],
    howToUse: {
      objective: 'O objetivo principal é ativar a chuva com Pelipper para dobrar a velocidade do Mega Swampert (Swift Swim) e fortalecer os golpes do tipo Água de todo o time em 50%.',
      opening: 'Quase sempre inicie com Pelipper para ativar Drizzle imediatamente. Use U-turn para trazer um parceiro defensivo como Ferrothorn ou Garchomp para colocar hazards.',
      winCondition: 'Limpar as ameaças do tipo Planta com Scizor ou enfraquecê-las com Spikes. Uma vez limpas, Mega Swampert pode dar sweep no time adversário com facilidade na chuva.',
      commonMistakes: 'Deixar o Pelipper morrer cedo. Sem a chuva ativa, o potencial de sweep do Mega Swampert é drasticamente reduzido. Preserve os seus pivots!'
    },
    threats: [
      {
        name: 'Freeze-Dry',
        icon: 'ac_unit',
        description: 'Pokémon como Kyurem ou Ninetales-Alola podem derrubar Pelipper e Swampert facilmente com dano quádruplo.'
      },
      {
        name: 'Giga Drain / Grass Moves',
        icon: 'leaf',
        description: 'Qualquer golpe de Planta é fatal para Mega Swampert devido à sua fraqueza quádrupla. Cuidado com Grass Knot em oponentes inesperados.'
      }
    ],
    pokemons: [
      {
        name: 'Pelipper',
        spriteName: 'pelipper',
        item: 'Damp Rock',
        ability: 'Drizzle',
        nature: 'Bold',
        evs: '248 HP / 252 Def / 8 SpD',
        moves: ['Scald', 'U-turn', 'Roost', 'Hurricane'],
        role: 'Rain Setter / Pivot',
        description: 'Sua única missão é colocar a chuva que dura 8 turnos com Damp Rock, e sair de campo com U-turn.'
      },
      {
        name: 'Swampert-Mega',
        spriteName: 'swampert-mega',
        item: 'Swampertite',
        ability: 'Swift Swim',
        nature: 'Adamant',
        evs: '252 Atk / 4 Def / 252 Spe',
        moves: ['Waterfall', 'Earthquake', 'Ice Punch', 'Power-Up Punch'],
        role: 'Late Game Sweeper',
        description: 'O monstro do time. Sob a chuva ele se torna incrivelmente rápido e forte, derrubando a maioria dos oponentes com Waterfall.'
      },
      {
        name: 'Garchomp',
        spriteName: 'garchomp',
        item: 'Rocky Helmet',
        ability: 'Rough Skin',
        nature: 'Jolly',
        evs: '252 HP / 4 Atk / 252 Spe',
        moves: ['Stealth Rock', 'Earthquake', 'Toxic', 'Dragon Tail'],
        role: 'Stealth Rock Lead / Phazer',
        description: 'Pune atacantes físicos com Rocky Helmet + Rough Skin. Coloca Stealth Rock e força trocas com Dragon Tail.'
      },
      {
        name: 'Ferrothorn',
        spriteName: 'ferrothorn',
        item: 'Leftovers',
        ability: 'Iron Barbs',
        nature: 'Sassy',
        evs: '252 HP / 24 Def / 232 SpD',
        moves: ['Leech Seed', 'Knock Off', 'Power Whip', 'Spikes'],
        role: 'Defensive Wall',
        description: 'Se beneficia da chuva (reduz fraqueza de Fogo). É a parede que para atacantes Elétricos e de Água oponentes.'
      },
      {
        name: 'Scizor',
        spriteName: 'scizor',
        item: 'Choice Band',
        ability: 'Technician',
        nature: 'Adamant',
        evs: '248 HP / 252 Atk / 8 SpD',
        moves: ['Bullet Punch', 'U-turn', 'Superpower', 'Pursuit'],
        role: 'Revenge Killer',
        description: 'Seu forte ataque com prioridade (Bullet Punch) impulsionado por Technician limpa ameaças rápidas com pouca vida.'
      },
      {
        name: 'Rotom-Wash',
        spriteName: 'rotom-wash',
        item: 'Leftovers',
        ability: 'Levitate',
        nature: 'Bold',
        evs: '252 HP / 200 Def / 56 Spe',
        moves: ['Volt Switch', 'Hydro Pump', 'Will-O-Wisp', 'Defog'],
        role: 'Defensive Pivot / Utility',
        description: 'Provê um ótimo Volt Switch lento para trazer seus atacantes sem que eles sofram dano. Queima oponentes físicos com Will-O-Wisp.'
      }
    ],
    rawPokepaste: `Pelipper @ Damp Rock
Ability: Drizzle
EVs: 248 HP / 252 Def / 8 SpD
Bold Nature
- Scald
- U-turn
- Roost
- Hurricane

Swampert-Mega @ Swampertite
Ability: Swift Swim
EVs: 252 Atk / 4 Def / 252 Spe
Adamant Nature
- Waterfall
- Earthquake
- Ice Punch
- Power-Up Punch

Garchomp @ Rocky Helmet
Ability: Rough Skin
EVs: 252 HP / 4 Atk / 252 Spe
Jolly Nature
- Stealth Rock
- Earthquake
- Toxic
- Dragon Tail

Ferrothorn @ Leftovers
Ability: Iron Barbs
EVs: 252 HP / 24 Def / 232 SpD
Sassy Nature
- Leech Seed
- Knock Off
- Power Whip
- Spikes

Scizor @ Choice Band
Ability: Technician
EVs: 248 HP / 252 Atk / 8 SpD
Adamant Nature
- Bullet Punch
- U-turn
- Superpower
- Pursuit

Rotom-Wash @ Leftovers
Ability: Levitate
EVs: 252 HP / 200 Def / 56 Spe
Bold Nature
- Volt Switch
- Hydro Pump
- Will-O-Wisp
- Defog`
  },
  {
    id: 'sandstorm-offense-pro',
    name: 'Sinnoh Sandstorm',
    style: 'Ofensivo',
    difficulty: 'Média',
    format: 'PRO PvP',
    summary: 'Time que usa a tempestade de areia para aumentar a Defesa Especial de Tyranitar e ativar o Sand Rush do Excadrill.',
    author: 'CynthiaFan',
    date: '02 de Novembro, 2024',
    pokepasteUrl: 'https://pokepast.es/4f2150a2b8e3',
    tags: ['Areia', 'Ofensivo', 'Excadrill', 'Tyranitar'],
    howToUse: {
      objective: 'Ativar a Tempestade de Areia com Tyranitar, garantindo a ele 50% de bônus na Defesa Especial, e dar sweep usando o Excadrill, que tem sua velocidade dobrada sob a areia.',
      opening: 'Use Tyranitar para colocar a areia de início ou coloque Skarmory para garantir Hazards iniciais e imunidades a terra.',
      winCondition: 'Enfraquecer as barreiras físicas com Garchomp e Tyranitar, limpar o campo de Hazards e, em seguida, mandar Excadrill com Swords Dance ativo sob a tempestade de areia.',
      commonMistakes: 'Manter Excadrill em campo contra atacantes com prioridade de água (Aqua Jet) ou lutador (Mach Punch) sem antes remover essas ameaças.'
    },
    threats: [
      {
        name: 'Urshifu / Conkeldurr',
        icon: 'swords',
        description: 'Golpes do tipo Lutador fortes atropelam o Tyranitar e o Excadrill. Use o Skarmory para resistir a esses ataques.'
      },
      {
        name: 'Climas Oponentes (Chuva/Sol)',
        icon: 'cloud_rain',
        description: 'Se o oponente trocar o clima para chuva, Excadrill perde o bônus de velocidade e Swampert-Mega pode atropelar seu time.'
      }
    ],
    pokemons: [
      {
        name: 'Tyranitar',
        spriteName: 'tyranitar',
        item: 'Smooth Rock',
        ability: 'Sand Stream',
        nature: 'Careful',
        evs: '252 HP / 4 Atk / 252 SpD',
        moves: ['Stealth Rock', 'Rock Slide', 'Crunch', 'Pursuit'],
        role: 'Sand Setter / Tank',
        description: 'Traz a areia que dura 8 turnos com Smooth Rock. Extremamente resistente contra ataques especiais na areia.'
      },
      {
        name: 'Excadrill',
        spriteName: 'excadrill',
        item: 'Life Orb',
        ability: 'Sand Rush',
        nature: 'Adamant',
        evs: '252 Atk / 4 Def / 252 Spe',
        moves: ['Swords Dance', 'Earthquake', 'Iron Head', 'Rock Slide'],
        role: 'Sand Sweeper',
        description: 'Praticamente imbatível na areia. Um Swords Dance garante poder de ataque suficiente para nocautear times inteiros.'
      },
      {
        name: 'Skarmory',
        spriteName: 'skarmory',
        item: 'Leftovers',
        ability: 'Sturdy',
        nature: 'Bold',
        evs: '252 HP / 252 Def / 4 SpD',
        moves: ['Spikes', 'Roost', 'Whirlwind', 'Brave Bird'],
        role: 'Physical Wall',
        description: 'Sua barreira impenetrável contra golpes físicos. Resiste a lutadores e espalha Spikes facilmente.'
      },
      {
        name: 'Gastrodon',
        spriteName: 'gastrodon',
        item: 'Leftovers',
        ability: 'Storm Drain',
        nature: 'Sassy',
        evs: '252 HP / 4 Def / 252 SpD',
        moves: ['Scald', 'Recover', 'Earth Power', 'Toxic'],
        role: 'Water Counter / Special Wall',
        description: 'Absorve ataques de água direcionados a Tyranitar ou Excadrill graças à sua habilidade Storm Drain.'
      },
      {
        name: 'Reuniclus',
        spriteName: 'reuniclus',
        item: 'Leftovers',
        ability: 'Magic Guard',
        nature: 'Bold',
        evs: '252 HP / 252 Def / 4 SpD',
        moves: ['Calm Mind', 'Recover', 'Psychic', 'Focus Blast'],
        role: 'Late Game Setup Sweeper',
        description: 'Sua habilidade Magic Guard o torna imune ao dano passivo da areia e de Toxic. Excelente em partidas demoradas.'
      },
      {
        name: 'Garchomp',
        spriteName: 'garchomp',
        item: 'Choice Scarf',
        ability: 'Rough Skin',
        nature: 'Jolly',
        evs: '252 Atk / 4 SpD / 252 Spe',
        moves: ['Outrage', 'Earthquake', 'Stone Edge', 'Fire Blast'],
        role: 'Revenge Killer / Pivot',
        description: 'Pega inimigos rápidos de surpresa com Choice Scarf, limpando ameaças como Volcarona ou Dragapult.'
      }
    ],
    rawPokepaste: `Tyranitar @ Smooth Rock
Ability: Sand Stream
EVs: 252 HP / 4 Atk / 252 SpD
Careful Nature
- Stealth Rock
- Rock Slide
- Crunch
- Pursuit

Excadrill @ Life Orb
Ability: Sand Rush
EVs: 252 Atk / 4 Def / 252 Spe
Adamant Nature
- Swords Dance
- Earthquake
- Iron Head
- Rock Slide

Skarmory @ Leftovers
Ability: Sturdy
EVs: 252 HP / 252 Def / 4 SpD
Bold Nature
- Spikes
- Roost
- Whirlwind
- Brave Bird

Gastrodon @ Leftovers
Ability: Storm Drain
EVs: 252 HP / 4 Def / 252 SpD
Sassy Nature
- Scald
- Recover
- Earth Power
- Toxic

Reuniclus @ Leftovers
Ability: Magic Guard
EVs: 252 HP / 252 Def / 4 SpD
Bold Nature
- Calm Mind
- Recover
- Psychic
- Focus Blast

Garchomp @ Choice Scarf
Ability: Rough Skin
EVs: 252 Atk / 4 SpD / 252 Spe
Jolly Nature
- Outrage
- Earthquake
- Stone Edge
- Fire Blast`
  },
  {
    id: 'hyper-offense-dragapult',
    name: 'Dragapult Hyper Offense',
    style: 'Hyper Offense',
    difficulty: 'Avançada',
    format: 'PRO PvP',
    summary: 'Time de ritmo ultra-rápido focado em usar telas defensivas (Reflect/Light Screen) para habilitar múltiplos atacantes de setup.',
    author: 'HyperGamerX',
    date: '28 de Novembro, 2024',
    pokepasteUrl: 'https://pokepast.es/f9c8230198cd',
    tags: ['Telas', 'Rápido', 'Dragapult', 'Volcarona', 'Setup'],
    howToUse: {
      objective: 'Colocar Reflect e Light Screen com Grimmsnarl para reduzir todo dano recebido pela metade. Isso permite que seus atacantes configurem bônus de atributos com Swords Dance ou Quiver Dance de forma segura.',
      opening: 'Sempre comece com Grimmsnarl. Sua habilidade Prankster dá prioridade a golpes de status. Use Light Clay para estender a duração das telas de 5 para 8 turnos.',
      winCondition: 'Colocar 2 Quiver Dances com Volcarona ou 1 Swords Dance com Dragonite atrás das telas, destruindo toda a linha defensiva inimiga.',
      commonMistakes: 'Jogar de forma muito passiva. Esse time não tem cura além de itens. Você deve pressionar e atacar constantemente sem medo de sacrificar Pokémon para trazer seus varredores (sweepers).'
    },
    threats: [
      {
        name: 'Defog / Rapid Spin',
        icon: 'wind',
        description: 'Movimentos que removem suas telas reduzem pela metade a eficácia da sua estratégia. Previna isso nocauteando o usuário de Defog cedo.'
      },
      {
        name: 'Infiltrator',
        icon: 'eye',
        description: 'Pokémon com Infiltrator (como outros Dragapult) ignoram Reflect e Light Screen completamente.'
      }
    ],
    pokemons: [
      {
        name: 'Grimmsnarl',
        spriteName: 'grimmsnarl',
        item: 'Light Clay',
        ability: 'Prankster',
        nature: 'Careful',
        evs: '252 HP / 128 Def / 128 SpD',
        moves: ['Reflect', 'Light Screen', 'Taunt', 'Spirit Break'],
        role: 'Dual Screener / Lead',
        description: 'Usa Reflect e Light Screen prioritários para proteger o time. Impede oponentes de usar hazards com Taunt.'
      },
      {
        name: 'Dragapult',
        spriteName: 'dragapult',
        item: 'Life Orb',
        ability: 'Infiltrator',
        nature: 'Naive',
        evs: '4 Atk / 252 SpA / 252 Spe',
        moves: ['Draco Meteor', 'Shadow Ball', 'U-turn', 'Flamethrower'],
        role: 'Special Attacker / Wallbreaker',
        description: 'Um dos Pokémon mais rápidos do jogo. Quebra as barreiras físicas e especiais oponentes com grande cobertura.'
      },
      {
        name: 'Volcarona',
        spriteName: 'volcarona',
        item: 'Heavy-Duty Boots',
        ability: 'Flame Body',
        nature: 'Timid',
        evs: '4 HP / 252 SpA / 252 Spe',
        moves: ['Quiver Dance', 'Fiery Dance', 'Bug Buzz', 'Giga Drain'],
        role: 'Special Setup Sweeper',
        description: 'Após um único Quiver Dance, ela se torna incrivelmente destrutiva e rápida, regenerando-se com Giga Drain.'
      },
      {
        name: 'Dragonite',
        spriteName: 'dragonite',
        item: 'Lum Berry',
        ability: 'Multiscale',
        nature: 'Jolly',
        evs: '252 Atk / 4 SpD / 252 Spe',
        moves: ['Dragon Dance', 'Outrage', 'Extreme Speed', 'Earthquake'],
        role: 'Physical Setup Sweeper',
        description: 'Habilidade Multiscale reduz o dano com HP cheio em 50%, permitindo configurar Dragon Dance com total segurança.'
      },
      {
        name: 'Kartana',
        spriteName: 'kartana',
        item: 'Choice Band',
        ability: 'Beast Boost',
        nature: 'Jolly',
        evs: '4 HP / 252 Atk / 252 Spe',
        moves: ['Leaf Blade', 'Sacred Sword', 'Smart Strike', 'Knock Off'],
        role: 'Physical Wallbreaker',
        description: 'Poder de ataque físico assustador. Sua habilidade Beast Boost aumenta seu ataque a cada oponente nocauteado.'
      },
      {
        name: 'Azumarill',
        spriteName: 'azumarill',
        item: 'Sitrus Berry',
        ability: 'Huge Power',
        nature: 'Adamant',
        evs: '252 HP / 252 Atk / 4 SpD',
        moves: ['Belly Drum', 'Aqua Jet', 'Play Rough', 'Liquidation'],
        role: 'Belly Drum Sweeper',
        description: 'Atrás de telas, ela usa Belly Drum para maximizar seu ataque e varre com prioridade (Aqua Jet).'
      }
    ],
    rawPokepaste: `Grimmsnarl @ Light Clay
Ability: Prankster
EVs: 252 HP / 128 Def / 128 SpD
Careful Nature
- Reflect
- Light Screen
- Taunt
- Spirit Break

Dragapult @ Life Orb
Ability: Infiltrator
EVs: 4 Atk / 252 SpA / 252 Spe
Naive Nature
- Draco Meteor
- Shadow Ball
- U-turn
- Flamethrower

Volcarona @ Heavy-Duty Boots
Ability: Flame Body
EVs: 4 HP / 252 SpA / 252 Spe
Timid Nature
- Quiver Dance
- Fiery Dance
- Bug Buzz
- Giga Drain

Dragonite @ Lum Berry
Ability: Multiscale
EVs: 252 Atk / 4 SpD / 252 Spe
Jolly Nature
- Dragon Dance
- Outrage
- Extreme Speed
- Earthquake

Kartana @ Choice Band
Ability: Beast Boost
EVs: 4 HP / 252 Atk / 252 Spe
Jolly Nature
- Leaf Blade
- Sacred Sword
- Smart Strike
- Knock Off

Azumarill @ Sitrus Berry
Ability: Huge Power
EVs: 252 HP / 252 Atk / 4 SpD
Adamant Nature
- Belly Drum
- Aqua Jet
- Play Rough
- Liquidation`
  },
  {
    id: 'stall-antimeta-pro',
    name: 'Stall Anti-Meta',
    style: 'Stall',
    difficulty: 'Avançada',
    format: 'PRO PvP',
    summary: 'Time defensivo projetado para anular totalmente as ameaças ofensivas do meta através de status, cura e trocas constantes.',
    author: 'StallMaster',
    date: '15 de Dezembro, 2024',
    pokepasteUrl: 'https://pokepast.es/a192bc047df1',
    tags: ['Defensivo', 'Anti-Meta', 'Toxic', 'Recuperação'],
    howToUse: {
      objective: 'Cansar o oponente impedindo que ele cause dano real. Usar movimentos como Toxic e hazards para esgotar a vida útil dos atacantes inimigos enquanto se cura constantemente.',
      opening: 'Sempre comece com um Pokémon que possa se adaptar ao lead adversário. Chansey ou Toxapex são escolhas seguras para absorver golpes especiais ou físicos, respectivamente.',
      winCondition: 'Deixar todos os oponentes sob o efeito de Toxic e hazards (Spikes/Stealth Rock) no campo. O oponente acabará se auto-derrotando pela exaustão de PP ou vida.',
      commonMistakes: 'Permitir que atacantes fortes de setup configurem ao máximo sem usar Haze do Toxapex ou Whirlwind do Skarmory. Identifique as condições de setup cedo!'
    },
    threats: [
      {
        name: 'Taunt',
        icon: 'volume_x',
        description: 'Impedir seus Pokémon de usarem movimentos de cura (Recover, Soft-Boiled) pode colapsar sua linha de defesa rapidamente.'
      },
      {
        name: 'Aço / Venenoso imunes a Toxic',
        icon: 'shield',
        description: 'Pokémon imunes a veneno não podem ser fustigados por Toxic. Use Quagsire ou Skarmory para combatê-los.'
      }
    ],
    pokemons: [
      {
        name: 'Chansey',
        spriteName: 'chansey',
        item: 'Eviolite',
        ability: 'Natural Cure',
        nature: 'Bold',
        evs: '252 HP / 252 Def / 4 SpD',
        moves: ['Soft-Boiled', 'Seismic Toss', 'Toxic', 'Heal Bell'],
        role: 'Special Wall / Cleric',
        description: 'Com o item Eviolite, sua defesa se multiplica. É virtualmente indestrutível por golpes especiais. Cura status do time com Heal Bell.'
      },
      {
        name: 'Toxapex',
        spriteName: 'toxapex',
        item: 'Black Sludge',
        ability: 'Regenerator',
        nature: 'Bold',
        evs: '252 HP / 252 Def / 4 SpD',
        moves: ['Scald', 'Recover', 'Toxic Spikes', 'Haze'],
        role: 'Physical Wall / Pivot',
        description: 'Sua barreira física preferida. Cura 33% da sua vida total ao trocar de campo (Regenerator). Zera bônus de status adversários com Haze.'
      },
      {
        name: 'Skarmory',
        spriteName: 'skarmory',
        item: 'Rocky Helmet',
        ability: 'Sturdy',
        nature: 'Bold',
        evs: '252 HP / 252 Def / 4 SpD',
        moves: ['Roost', 'Defog', 'Spikes', 'Whirlwind'],
        role: 'Hazard Control / Wall',
        description: 'Limpa Hazards do campo com Defog, coloca Spikes e força trocas de inimigos de setup usando Whirlwind.'
      },
      {
        name: 'Quagsire',
        spriteName: 'quagsire',
        item: 'Leftovers',
        ability: 'Unaware',
        nature: 'Relaxed',
        evs: '252 HP / 252 Def / 4 SpD',
        moves: ['Recover', 'Scald', 'Earthquake', 'Toxic'],
        role: 'Setup Sweeper Counter',
        description: 'Sua habilidade Unaware ignora totalmente os bônus de atributos do atacante oponente (como Swords Dance ou Dragon Dance).'
      },
      {
        name: 'Clefable',
        spriteName: 'clefable',
        item: 'Leftovers',
        ability: 'Magic Guard',
        nature: 'Bold',
        evs: '252 HP / 252 Def / 4 SpD',
        moves: ['Moonblast', 'Wish', 'Protect', 'Teleport'],
        role: 'Wish Passer / Utility',
        description: 'Magic Guard a protege contra hazards e status. Passa curas gigantescas para seus aliados usando a combinação de Wish + Teleport.'
      },
      {
        name: 'Sableye',
        spriteName: 'sableye',
        item: 'Sablenite',
        ability: 'Prankster',
        nature: 'Careful',
        evs: '252 HP / 112 Def / 144 SpD',
        moves: ['Recover', 'Will-O-Wisp', 'Knock Off', 'Foul Play'],
        role: 'Anti-Lead / Mega Wall',
        description: 'Sua Mega Evolução ganha Magic Bounce, refletindo de volta todos os Hazards, Taunts e Toxics que os leads inimigos tentarem colocar.'
      }
    ],
    rawPokepaste: `Chansey @ Eviolite
Ability: Natural Cure
EVs: 252 HP / 252 Def / 4 SpD
Bold Nature
- Soft-Boiled
- Seismic Toss
- Toxic
- Heal Bell

Toxapex @ Black Sludge
Ability: Regenerator
EVs: 252 HP / 252 Def / 4 SpD
Bold Nature
- Scald
- Recover
- Toxic Spikes
- Haze

Skarmory @ Rocky Helmet
Ability: Sturdy
EVs: 252 HP / 252 Def / 4 SpD
Bold Nature
- Roost
- Defog
- Spikes
- Whirlwind

Quagsire @ Leftovers
Ability: Unaware
EVs: 252 HP / 252 Def / 4 SpD
Relaxed Nature
- Recover
- Scald
- Earthquake
- Toxic

Clefable @ Leftovers
Ability: Magic Guard
EVs: 252 HP / 252 Def / 4 SpD
Bold Nature
- Moonblast
- Wish
- Protect
- Teleport

Sableye @ Sablenite
Ability: Prankster
EVs: 252 HP / 112 Def / 144 SpD
Careful Nature
- Recover
- Will-O-Wisp
- Knock Off
- Foul Play`
  }
];
