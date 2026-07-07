/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Check, Eye, Trash2, Award, Zap } from 'lucide-react';
import { Team } from '../types';
import { getPokemonSpriteUrl } from '../utils';

interface TeamCardProps {
  key?: React.Key;
  team: Team;
  onViewDetails: (team: Team) => void;
  onDelete?: (id: string) => void;
}

export default function TeamCard({ team, onViewDetails, onDelete }: TeamCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(team.rawPokepaste);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Playstyle color badges
  const getStyleBadge = (style: string) => {
    switch (style) {
      case 'Ofensivo':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'Balanceado':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'Stall':
        return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
      case 'Trick Room':
        return 'bg-pink-500/10 text-pink-400 border border-pink-500/20';
      case 'Hyper Offense':
        return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      default:
        return 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20';
    }
  };

  // Difficulty level badges
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'Média':
        return 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
      case 'Avançada':
        return 'bg-red-500/10 text-red-400 border border-red-500/20';
      default:
        return 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20';
    }
  };

  return (
    <div 
      onClick={() => onViewDetails(team)}
      className="glass-panel p-5 rounded-2xl pokemon-card-hover cursor-pointer relative overflow-hidden group flex flex-col justify-between h-full hover:border-poke-red/40"
      id={`team-card-${team.id}`}
    >
      {/* Decorative top-right corner glow for Playstyle */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-poke-red/5 to-transparent pointer-events-none group-hover:from-poke-red/10 transition-all duration-300" />

      <div>
        {/* Header Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md ${getStyleBadge(team.style)}`}>
              {team.style}
            </span>
            <span className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md ${getDifficultyBadge(team.difficulty)}`}>
              {team.difficulty}
            </span>
          </div>
          <span className="text-xs font-mono text-zinc-500 tracking-wider font-semibold">
            {team.format}
          </span>
        </div>

        {/* Team Title & Author */}
        <div className="mb-2">
          <h3 className="font-display text-xl font-bold text-white tracking-tight group-hover:text-poke-red-light transition-colors flex items-center gap-2">
            {team.name}
            {team.isCustom && (
              <span className="bg-zinc-800 text-zinc-400 text-[9px] font-mono px-1.5 py-0.5 rounded border border-zinc-700">
                Criado
              </span>
            )}
          </h3>
          <p className="text-xs text-zinc-500 font-medium">
            por <span className="text-zinc-400 font-semibold">{team.author}</span> • {team.date}
          </p>
        </div>

        {/* Short Summary */}
        <p className="text-sm text-zinc-400 line-clamp-2 mb-5 leading-relaxed">
          {team.summary}
        </p>

        {/* 6 Pokemon Lineup Preview */}
        <div className="bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-900/80 mb-5 flex justify-between items-center gap-1.5 overflow-x-auto scrollbar-none">
          {team.pokemons.map((pkmn, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center justify-center flex-1 min-w-[42px] group/pkmn relative"
              title={`${pkmn.name} (${pkmn.role})`}
            >
              <div className="w-11 h-11 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800 hover:border-poke-blue/30 transition-all relative overflow-hidden">
                {/* Fallback back glow */}
                <div className="absolute inset-0 bg-radial from-zinc-800 to-transparent opacity-40" />
                <img 
                  src={getPokemonSpriteUrl(pkmn.name, true)} 
                  alt={pkmn.name}
                  onError={(e) => {
                    // Try static png showdown sprite if gif fails
                    (e.target as HTMLImageElement).src = getPokemonSpriteUrl(pkmn.name, false);
                  }}
                  className="w-9 h-9 object-contain z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transform hover:scale-115 transition-transform duration-250"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[10px] text-zinc-500 font-mono font-medium mt-1 select-none text-center truncate w-full">
                {pkmn.name.split('-')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-zinc-800/60">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(team);
          }}
          className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 py-2 rounded-xl text-xs font-semibold transition-all active:scale-98"
          id={`btn-view-${team.id}`}
        >
          <Eye size={14} />
          <span>Ver detalhes</span>
        </button>

        <button
          onClick={handleCopy}
          className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-98 ${
            copied 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : 'bg-poke-red/5 hover:bg-poke-red/10 border-poke-red/20 text-poke-red-light'
          }`}
          title="Copiar Pokepaste"
          id={`btn-copy-${team.id}`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? 'Copiado!' : 'Copiar'}</span>
        </button>

        {team.isCustom && onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Tem certeza que deseja remover o time "${team.name}"?`)) {
                onDelete(team.id);
              }
            }}
            className="p-2 bg-zinc-900/50 hover:bg-red-950/30 border border-zinc-800 hover:border-red-500/30 text-zinc-500 hover:text-red-400 rounded-xl transition-all active:scale-95"
            title="Excluir Time"
            id={`btn-delete-${team.id}`}
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
