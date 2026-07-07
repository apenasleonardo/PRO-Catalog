/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, Shield, Sword, RefreshCw, Zap, CloudSun, HelpCircle, 
  Info, Sparkles, AlertCircle, ArrowUpRight 
} from 'lucide-react';

export default function BeginnerGuide() {
  const [activeSubTab, setActiveSubTab] = useState<'roles' | 'mechanics' | 'terms'>('roles');

  const roles = [
    {
      title: 'Sweeper (Varredor / Atacante Rápido)',
      icon: <Sword className="text-poke-red" size={20} />,
      desc: 'É o Pokémon encarregado de vencer o jogo (dar sweep) depois que as defesas do oponente foram enfraquecidas. Eles geralmente têm ataque muito alto e alta velocidade, ou usam golpes de "setup" (como Dragon Dance ou Swords Dance) para inflar seus atributos e atacar com força.',
      example: 'Mega Swampert na chuva ou Excadrill na areia.',
      tip: 'Não coloque seu Sweeper em campo muito cedo. Espere as ameaças dele (como paredes físicas ou counters) estarem enfraquecidas ou derrotadas.'
    },
    {
      title: 'Wall (Parede Defensiva)',
      icon: <Shield className="text-poke-blue-light" size={20} />,
      desc: 'Pokémon com altíssima Defesa ou Defesa Especial e muita vida. Sua função é absorver golpes dos atacantes mais poderosos do oponente, se curar e puni-los com golpes de status como Toxic ou queimaduras.',
      example: 'Ferrothorn para ataques físicos, Chansey para ataques especiais.',
      tip: 'Use Walls para travar o ritmo de jogo do oponente e forçá-lo a trocar de Pokémon, acumulando dano de entrada (hazards).'
    },
    {
      title: 'Pivot (Controlador de Momentum)',
      icon: <RefreshCw className="text-amber-400" size={20} />,
      desc: 'Pokémon encarregado de entrar, absorver um golpe ou ameaçar o oponente, e sair de campo rapidamente usando movimentos de troca voluntária como U-turn, Volt Switch ou Flip Turn. Isso permite que você coloque um atacante de forma totalmente segura sem sofrer dano na entrada.',
      example: 'Pelipper ou Rotom-Wash.',
      tip: 'Um pivot lento é excelente, pois ele recebe o golpe do adversário primeiro e traz o seu aliado intacto para o campo.'
    },
    {
      title: 'Lead / Hazard Setter (Abridor)',
      icon: <Zap className="text-poke-yellow" size={20} />,
      desc: 'Pokémon que geralmente inicia a partida com o objetivo de estabelecer vantagens iniciais para o time, como colocar sujeiras de entrada (Stealth Rock, Spikes) ou erguer telas defensivas (Reflect, Light Screen) antes de ser derrotado.',
      example: 'Grimmsnarl com telas ou Garchomp com Stealth Rock.',
      tip: 'Nem todo abridor precisa ser sacrificado. Se o oponente tiver uma troca desfavorável, você pode colocar os hazards e guardá-lo para depois.'
    }
  ];

  const mechanics = [
    {
      name: 'Climas (Weather)',
      desc: 'Mecânicas globais que afetam o campo por 5 turnos (ou 8 turnos com itens específicos como Damp Rock/Smooth Rock).',
      details: [
        { title: 'Chuva (Rain)', text: 'Aumenta o dano de golpes de Água em 50%, reduz o dano de Fogo em 50%, e ativa habilidades como Swift Swim (dobra velocidade) e Rain Dish.' },
        { title: 'Tempestade de Areia (Sandstorm)', text: 'Aumenta a Defesa Especial de Pokémon de Pedra em 50%. Causa pequeno dano contínuo a cada turno em Pokémon que não sejam de Pedra, Terra ou Aço. Ativa Sand Rush (dobra velocidade).' },
        { title: 'Sol Forte (Sunny Day)', text: 'Aumenta o dano de golpes de Fogo em 50%, reduz de Água em 50%. Permite usar Solar Beam instantaneamente e ativa habilidades como Chlorophyll.' }
      ]
    },
    {
      name: 'Sujeira de Campo (Hazards)',
      desc: 'Espinhos e pedras colocados no campo inimigo que causam dano toda vez que um Pokémon oponente entra na partida.',
      details: [
        { title: 'Stealth Rock (Pedras Flutuantes)', text: 'Causa dano baseado na fraqueza do oponente ao tipo Pedra (de 3.125% até 50% de vida máxima). Só pode colocar uma camada.' },
        { title: 'Spikes (Espinhos)', text: 'Pode acumular até 3 camadas. Causa dano fixo por entrada: 12.5% (1 camada), 16.6% (2 camadas) ou 25% (3 camadas) de vida máxima. Não afeta Pokémon voadores ou com Levitate.' },
        { title: 'Toxic Spikes (Espinhos Venenosos)', text: 'Acumula até 2 camadas. Envenena (1 camada) ou envenena gravemente (2 camadas) o Pokémon terrestre oponente ao entrar.' }
      ]
    },
    {
      name: 'Telas Defensivas (Screens)',
      desc: 'Barreiras que protegem todo o seu time contra ataques oponentes durante 5 a 8 turnos.',
      details: [
        { title: 'Reflect (Reflexo)', text: 'Reduz pela metade (50%) todo o dano físico recebido pelo seu time.' },
        { title: 'Light Screen (Tela de Luz)', text: 'Reduz pela metade (50%) todo o dano especial recebido pelo seu time.' },
        { title: 'Light Clay (Item chave)', text: 'Se o Pokémon que usar as telas estiver segurando este item, a duração delas sobe de 5 para 8 turnos.' }
      ]
    }
  ];

  const terms = [
    {
      term: 'STAB (Same Type Attack Bonus)',
      meaning: 'Bônus recebido quando um Pokémon usa um golpe do mesmo tipo que o dele. O golpe ganha 50% extra de força bruta! Por isso um Swampert de água bate muito mais forte com Waterfall do que com qualquer outro ataque físico de mesmo poder base.'
    },
    {
      term: 'EVs (Effort Values) & IVs (Individual Values)',
      meaning: 'IVs são o "talento genético" do Pokémon (vão de 0 a 31 em cada atributo). EVs são os "pontos de treino" (um Pokémon pode ter no máximo 510 pontos, e até 252 em um único atributo). Em PvP de nível alto, todos usam IVs no máximo (31), e os EVs são direcionados para maximizar seus pontos mais fortes (ex: 252 em Ataque e 252 em Velocidade para Sweepers).'
    },
    {
      term: 'Momentum (Vantagem de Turno)',
      meaning: 'Ter o controle sobre o ritmo da partida. Se o seu oponente é forçado a reagir às suas trocas ou ataques, você tem o "momentum". Usar golpes como U-turn ou Volt Switch ajuda a manter essa vantagem de posicionamento ativa.'
    },
    {
      term: 'Setup (Configuração)',
      meaning: 'Gastar um turno usando um golpe de status para aumentar atributos próprios (ex: Quiver Dance, Calm Mind ou Dragon Dance). Fazer isso atrás de telas ou em trocas previstas do adversário é a chave para vencer partidas difíceis.'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in" id="beginner-guide-container">
      
      {/* Introduction Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden bg-radial from-poke-blue/10 to-transparent">
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-poke-blue/5 to-transparent pointer-events-none" />
        <div className="max-w-3xl space-y-3">
          <span className="bg-poke-blue/20 text-poke-blue-light text-[10px] font-mono tracking-widest font-bold uppercase px-3 py-1 rounded-md border border-poke-blue/30 inline-flex items-center gap-1">
            <Sparkles size={12} />
            Central de Treinamento
          </span>
          <h1 className="font-display text-3xl font-extrabold text-white tracking-tight">
            Guia de PvP para Iniciantes
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Seja bem-vindo ao competitivo do <strong>Pokémon Revolution Online (PRO)</strong>! O PvP vai muito além de escolher golpes super-efetivos. Entenda as mecânicas, funções e termos que os mestres de Kanto e Sinnoh usam para dominar as ligas.
          </p>
        </div>
      </div>

      {/* Internal Navigation tabs */}
      <div className="flex border-b border-zinc-800">
        <button
          onClick={() => setActiveSubTab('roles')}
          className={`px-5 py-3 font-display font-bold text-sm border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'roles'
              ? 'border-poke-red text-white'
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
          id="guide-subtab-roles"
        >
          Funções no Time
        </button>
        <button
          onClick={() => setActiveSubTab('mechanics')}
          className={`px-5 py-3 font-display font-bold text-sm border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'mechanics'
              ? 'border-poke-red text-white'
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
          id="guide-subtab-mechanics"
        >
          Mecânicas de Campo
        </button>
        <button
          onClick={() => setActiveSubTab('terms')}
          className={`px-5 py-3 font-display font-bold text-sm border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'terms'
              ? 'border-poke-red text-white'
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
          id="guide-subtab-terms"
        >
          Dicionário do PvP
        </button>
      </div>

      {/* Content Render based on subtab */}
      <div className="space-y-6">
        
        {/* ROLES SUBTAB */}
        {activeSubTab === 'roles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="guide-roles-section">
            {roles.map((role, idx) => (
              <div 
                key={idx}
                className="glass-panel p-6 rounded-2xl space-y-4 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center">
                    {role.icon}
                  </div>
                  <h3 className="font-display font-bold text-white text-base">
                    {role.title}
                  </h3>
                </div>

                <p className="text-zinc-300 text-xs leading-relaxed">
                  {role.desc}
                </p>

                <div className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-900 space-y-1.5">
                  <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wide">Exemplo de Uso</p>
                  <p className="text-xs text-zinc-300 font-semibold flex items-center gap-1.5">
                    <ArrowUpRight size={14} className="text-poke-blue-light" />
                    {role.example}
                  </p>
                </div>

                <div className="flex gap-2 text-xs text-amber-300 bg-amber-500/5 border border-amber-500/10 p-3 rounded-xl">
                  <Info size={16} className="shrink-0 mt-0.5 text-amber-400" />
                  <p className="leading-relaxed">
                    <strong>Dica de Mestre:</strong> {role.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MECHANICS SUBTAB */}
        {activeSubTab === 'mechanics' && (
          <div className="space-y-8" id="guide-mechanics-section">
            {mechanics.map((mech, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl space-y-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {mech.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {mech.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mech.details.map((det, dIdx) => (
                    <div 
                      key={dIdx}
                      className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-900 space-y-2 hover:border-zinc-800 transition-colors"
                    >
                      <h4 className="text-xs font-extrabold text-white uppercase tracking-wide border-b border-zinc-800 pb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-poke-red" />
                        {det.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {det.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TERMS SUBTAB */}
        {activeSubTab === 'terms' && (
          <div className="glass-panel p-6 rounded-2xl divide-y divide-zinc-800/60" id="guide-terms-section">
            {terms.map((term, idx) => (
              <div 
                key={idx}
                className={`py-5 first:pt-0 last:pb-0 flex flex-col md:flex-row gap-4 items-start`}
              >
                <div className="md:w-1/4">
                  <h3 className="font-display font-extrabold text-white text-sm tracking-wide bg-zinc-900 px-3 py-2.5 rounded-xl border border-zinc-800 inline-block md:flex items-center gap-2">
                    <BookOpen size={14} className="text-poke-red-light" />
                    {term.term}
                  </h3>
                </div>
                <div className="md:w-3/4">
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {term.meaning}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Helpful alert banner at bottom */}
      <div className="bg-poke-blue/5 border border-poke-blue/15 p-5 rounded-2xl flex gap-4 items-start">
        <AlertCircle className="text-poke-blue-light shrink-0 mt-0.5" size={20} />
        <div className="space-y-1 text-xs sm:text-sm">
          <h4 className="font-bold text-white">Como colocar em prática?</h4>
          <p className="text-zinc-400 leading-relaxed">
            Selecione um time com a tag <strong>"Fácil"</strong> no catálogo principal. Eles possuem sinergias diretas, exigindo menos previsões complexas (predictions) e auxiliando na absorção natural de conceitos cruciais como troca de turnos e vantagens de tipo.
          </p>
        </div>
      </div>

    </div>
  );
}
