/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, Copy, Check, ExternalLink, Download, AlertTriangle, 
  Target, Zap, AlertOctagon, HelpCircle, Shield, Sword 
} from 'lucide-react';
import { Team, Pokemon } from '../types';
import { getPokemonSpriteUrl, getItemSpriteUrl } from '../utils';

interface TeamDetailProps {
  team: Team;
  onBack: () => void;
}

export default function TeamDetail({ team, onBack }: TeamDetailProps) {
  const [copiedFull, setCopiedFull] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);

  const handleCopyFull = () => {
    navigator.clipboard.writeText(team.rawPokepaste);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
  };

  const handleCopyDesc = () => {
    const descriptionText = `
Time: ${team.name}
Estilo: ${team.style} | Dificuldade: ${team.difficulty}
Autor: ${team.author}

COMO USAR:
- Objetivo: ${team.howToUse.objective}
- Abertura: ${team.howToUse.opening}
- Condição de Vitória: ${team.howToUse.winCondition}
- Erros Comuns: ${team.howToUse.commonMistakes}

POKÉMONS:
${team.pokemons.map(p => `- ${p.name} (${p.role}): ${p.description}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(descriptionText);
    setCopiedDesc(true);
    setTimeout(() => setCopiedDesc(false), 2000);
  };

  const handleExportText = () => {
    const fileContent = `
========================================
${team.name.toUpperCase()} - PRO COMPETITIVE PVP
========================================
Autor: ${team.author}
Data: ${team.date}
Estilo: ${team.style} | Dificuldade: ${team.difficulty}
Original Paste: ${team.pokepasteUrl || 'N/A'}

----------------------------------------
GUIA ESTRATÉGICO DE USO (PORTUGUÊS)
----------------------------------------
Objetivo do Time:
${team.howToUse.objective}

Como Iniciar (Abertura):
${team.howToUse.opening}

Condição de Vitória (Como Fechar):
${team.howToUse.winCondition}

Erros Comuns a Evitar:
${team.howToUse.commonMistakes}

Ameaças Críticas:
${team.threats.map(t => `- ${t.name}: ${t.description}`).join('\n')}

----------------------------------------
FUNÇÕES DOS POKÉMONS
----------------------------------------
${team.pokemons.map(p => `
* ${p.name} (${p.role})
  - Item: ${p.item}
  - Ability: ${p.ability}
  - Nature: ${p.nature}
  - EVs: ${p.evs}
  - Descrição: ${p.description}
  - Moveset: ${p.moves.join(', ')}
`).join('\n')}

----------------------------------------
RAW POKEPASTE (IMPORTÁVEL NO SHOWDOWN)
----------------------------------------
${team.rawPokepaste}
    `.trim();

    const element = document.createElement('a');
    const file = new Blob([fileContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${team.name.toLowerCase().replace(/\s+/g, '_')}_estrategia.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Color lookup for tags
  const getTagStyle = (tag: string) => {
    const lower = tag.toLowerCase();
    if (lower.includes('chuva') || lower.includes('rain') || lower.includes('água')) {
      return 'bg-blue-600/20 text-blue-300 border border-blue-500/30';
    }
    if (lower.includes('areia') || lower.includes('sand') || lower.includes('terra')) {
      return 'bg-amber-600/20 text-amber-300 border border-amber-500/30';
    }
    if (lower.includes('sol') || lower.includes('fogo')) {
      return 'bg-orange-600/20 text-orange-300 border border-orange-500/30';
    }
    if (lower.includes('ofensivo') || lower.includes('rápido') || lower.includes('hyper')) {
      return 'bg-rose-600/20 text-rose-300 border border-rose-500/30';
    }
    if (lower.includes('defensivo') || lower.includes('stall') || lower.includes('anti-meta')) {
      return 'bg-purple-600/20 text-purple-300 border border-purple-500/30';
    }
    return 'bg-zinc-800 text-zinc-300 border border-zinc-700';
  };

  return (
    <div className="space-y-8 animate-fade-in" id="team-detail-container">
      {/* Navigation & Header */}
      <div className="flex flex-col gap-4">
        <button 
          onClick={onBack}
          className="self-start flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 px-4 py-2.5 rounded-xl border border-zinc-800 transition-all active:scale-95 cursor-pointer"
          id="btn-back-to-catalog"
        >
          <ArrowLeft size={16} />
          <span>Voltar ao catálogo</span>
        </button>

        <div className="border-l-4 border-poke-red pl-4 py-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {team.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mt-2 font-medium">
              <span className="flex items-center gap-1.5">
                por <strong className="text-zinc-200">{team.author}</strong>
              </span>
              <span>•</span>
              <span>{team.date}</span>
              {team.pokepasteUrl && (
                <>
                  <span>•</span>
                  <a 
                    href={team.pokepasteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-poke-blue-light hover:underline flex items-center gap-1 font-semibold"
                  >
                    <ExternalLink size={12} />
                    Original Pokepaste
                  </a>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {team.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className={`text-[10px] font-mono tracking-wider uppercase font-bold px-3 py-1 rounded-md ${getTagStyle(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Left Strategy, Right Pokemon cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Strategic Guide & Threats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Strategy Guide */}
          <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-poke-red/5 to-transparent pointer-events-none" />
            <h2 className="font-display text-lg font-bold text-white mb-5 flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Target size={18} className="text-poke-red" />
              Como usar o time
            </h2>

            <div className="space-y-5 text-sm leading-relaxed">
              <div className="space-y-1">
                <h3 className="font-mono text-[10px] font-bold tracking-wider uppercase text-poke-blue-light flex items-center gap-1.5">
                  <span>●</span> Objetivo do time
                </h3>
                <p className="text-zinc-300 font-normal pl-4 border-l border-zinc-800">
                  {team.howToUse.objective}
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-mono text-[10px] font-bold tracking-wider uppercase text-poke-yellow flex items-center gap-1.5">
                  <span>●</span> Como Começar (Abertura)
                </h3>
                <p className="text-zinc-300 font-normal pl-4 border-l border-zinc-800">
                  {team.howToUse.opening}
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-mono text-[10px] font-bold tracking-wider uppercase text-emerald-400 flex items-center gap-1.5">
                  <span>●</span> Condição de Vitória
                </h3>
                <p className="text-zinc-300 font-normal pl-4 border-l border-zinc-800">
                  {team.howToUse.winCondition}
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-mono text-[10px] font-bold tracking-wider uppercase text-rose-400 flex items-center gap-1.5">
                  <span>●</span> Erros Comuns a Evitar
                </h3>
                <p className="text-zinc-300 font-normal pl-4 border-l border-zinc-800">
                  {team.howToUse.commonMistakes}
                </p>
              </div>
            </div>
          </div>

          {/* Threats panel */}
          <div className="bg-red-950/20 border border-red-500/20 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-red-500/5 to-transparent pointer-events-none" />
            <h2 className="font-display text-lg font-bold text-red-300 mb-4 flex items-center gap-2 border-b border-red-500/10 pb-3">
              <AlertTriangle size={18} className="text-red-400" />
              Ameaças Críticas
            </h2>

            <div className="space-y-4">
              {team.threats.map((threat, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="mt-0.5 bg-red-500/10 border border-red-500/20 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-red-400">
                    <AlertOctagon size={14} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-red-200 uppercase tracking-wide">
                      {threat.name}
                    </h4>
                    <p className="text-xs text-red-300/80 mt-1 leading-relaxed">
                      {threat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 6 Pokemon Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {team.pokemons.map((pkmn, idx) => (
            <div 
              key={idx}
              className="glass-panel p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all group"
              id={`pkmn-card-${pkmn.name.toLowerCase()}`}
            >
              {/* Type Watermark or graphic */}
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <img 
                  src={getPokemonSpriteUrl(pkmn.name, false)} 
                  alt="" 
                  className="w-28 h-28 object-contain filter grayscale"
                />
              </div>

              {/* Identity Row */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-zinc-950/80 rounded-xl flex items-center justify-center border border-zinc-800 shadow-inner shrink-0 relative">
                  {/* Background element */}
                  <div className="absolute inset-0 bg-radial from-poke-blue/10 to-transparent opacity-50" />
                  <img 
                    src={getPokemonSpriteUrl(pkmn.name, true)} 
                    alt={pkmn.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getPokemonSpriteUrl(pkmn.name, false);
                    }}
                    className="w-14 h-14 object-contain z-10 drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-white tracking-tight">
                    {pkmn.name}
                  </h3>
                  <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-poke-blue-light bg-poke-blue/10 px-2 py-0.5 rounded border border-poke-blue/20">
                    {pkmn.role}
                  </span>
                </div>
              </div>

              {/* Simple Portuguese Role Explanation */}
              <div className="bg-zinc-950/40 p-3 rounded-xl border border-zinc-900 text-xs text-zinc-300 leading-relaxed mb-4 flex items-start gap-2">
                <HelpCircle size={14} className="text-zinc-500 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Função:</strong> {pkmn.description}
                </p>
              </div>

              {/* Specs Grid (Item, Ability, Nature, EVs) */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-4 text-zinc-400">
                <div className="bg-zinc-900/50 p-2 rounded-xl border border-zinc-800/60 flex items-center gap-2">
                  <div className="w-6 h-6 shrink-0 bg-zinc-950 rounded-md flex items-center justify-center border border-zinc-800">
                    {pkmn.item ? (
                      <img 
                        src={getItemSpriteUrl(pkmn.item)} 
                        alt={pkmn.item}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                        className="w-5 h-5 object-contain"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                    )}
                  </div>
                  <div className="truncate">
                    <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">Item</p>
                    <p className="text-zinc-200 font-semibold truncate" title={pkmn.item || 'Nenhum'}>
                      {pkmn.item || 'Nenhum'}
                    </p>
                  </div>
                </div>

                <div className="bg-zinc-900/50 p-2 rounded-xl border border-zinc-800/60 flex items-center gap-2">
                  <div className="w-6 h-6 shrink-0 bg-zinc-950 rounded-md flex items-center justify-center border border-zinc-800">
                    <Shield size={12} className="text-zinc-500" />
                  </div>
                  <div className="truncate">
                    <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">Habilidade</p>
                    <p className="text-zinc-200 font-semibold truncate" title={pkmn.ability}>
                      {pkmn.ability}
                    </p>
                  </div>
                </div>

                <div className="bg-zinc-900/50 p-2 rounded-xl border border-zinc-800/60 flex items-center gap-2">
                  <div className="w-6 h-6 shrink-0 bg-zinc-950 rounded-md flex items-center justify-center border border-zinc-800">
                    <Sword size={12} className="text-zinc-500" />
                  </div>
                  <div className="truncate">
                    <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">Natureza</p>
                    <p className="text-zinc-200 font-semibold truncate" title={pkmn.nature}>
                      {pkmn.nature}
                    </p>
                  </div>
                </div>

                <div className="bg-zinc-900/50 p-2 rounded-xl border border-zinc-800/60 flex items-center gap-2">
                  <div className="w-6 h-6 shrink-0 bg-zinc-950 rounded-md flex items-center justify-center border border-zinc-800">
                    <Zap size={12} className="text-zinc-500" />
                  </div>
                  <div className="truncate">
                    <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">EVs</p>
                    <p className="text-zinc-200 font-semibold truncate" title={pkmn.evs}>
                      {pkmn.evs}
                    </p>
                  </div>
                </div>
              </div>

              {/* Moveset */}
              <div className="mt-auto space-y-1">
                <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-500 px-1">Moveset</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {pkmn.moves.map((move, mIdx) => (
                    <div 
                      key={mIdx}
                      className="bg-zinc-950/50 px-2.5 py-1.5 rounded-lg border border-zinc-800 text-xs font-medium text-zinc-200 truncate flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-poke-red opacity-60" />
                      <span className="truncate">{move}</span>
                    </div>
                  ))}
                  {pkmn.moves.length === 0 && (
                    <div className="col-span-2 text-center text-xs text-zinc-600 py-1 italic">
                      Nenhum movimento listado
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Export & Clipboard Footer Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-8 border-t border-zinc-800/80">
        <button 
          onClick={handleCopyFull}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-extrabold text-base transition-all duration-200 active:scale-95 shadow-lg cursor-pointer ${
            copiedFull
              ? 'bg-emerald-600 text-white shadow-emerald-500/10'
              : 'bg-poke-red hover:bg-red-600 text-white shadow-poke-red/10'
          }`}
          id="btn-copy-full-team-detail"
        >
          {copiedFull ? <Check size={20} /> : <Copy size={20} />}
          <span>{copiedFull ? 'Time Completo Copiado!' : 'Copiar Time Completo'}</span>
        </button>

        <button 
          onClick={handleCopyDesc}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 px-6 py-4 rounded-xl font-display font-bold text-sm transition-all duration-200 active:scale-95 cursor-pointer`}
          id="btn-copy-desc-team-detail"
        >
          {copiedDesc ? <Check size={16} /> : <Copy size={16} />}
          <span>{copiedDesc ? 'Estratégia Copiada!' : 'Copiar Guia / Descrição'}</span>
        </button>

        <button 
          onClick={handleExportText}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 px-6 py-4 rounded-xl font-display font-bold text-sm transition-all duration-200 active:scale-95 cursor-pointer"
          id="btn-export-text-team-detail"
        >
          <Download size={16} />
          <span>Exportar Arquivo .TXT</span>
        </button>
      </div>

    </div>
  );
}
