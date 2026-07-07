/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, PlusCircle, BookOpen, Layers, Award } from 'lucide-react';

interface NavbarProps {
  activeTab: 'explore' | 'create' | 'guide';
  onTabChange: (tab: 'explore' | 'create' | 'guide') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onLogoClick: () => void;
}

export default function Navbar({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  onLogoClick
}: NavbarProps) {
  return (
    <header className="border-b border-surface-border bg-surface-dark sticky top-0 z-50 transition-all duration-300 shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={onLogoClick}
          className="flex items-center gap-3 cursor-pointer group"
          id="navbar-logo"
        >
          <div className="bg-gradient-to-br from-poke-red to-red-600 w-10 h-10 rounded-full flex items-center justify-center border-2 border-white/20 shadow-lg group-hover:rotate-12 transition-transform duration-300">
            <span className="text-white font-extrabold text-lg select-none">P</span>
          </div>
          <div>
            <span className="font-display text-2xl font-black text-white tracking-tight flex items-center gap-2">
              PRO <span className="text-poke-red font-bold">Catalog</span>
            </span>
            <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">PvP Team Hub</p>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex items-center gap-1 bg-zinc-900/60 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => onTabChange('explore')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === 'explore'
                ? 'bg-poke-red text-white shadow-md shadow-poke-red/25'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
            id="nav-tab-explore"
          >
            <Layers size={16} />
            <span>Explorar Times</span>
          </button>
          
          <button
            onClick={() => onTabChange('create')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === 'create'
                ? 'bg-poke-red text-white shadow-md shadow-poke-red/25'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
            id="nav-tab-create"
          >
            <PlusCircle size={16} />
            <span>Adicionar Time</span>
          </button>
          
          <button
            onClick={() => onTabChange('guide')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === 'guide'
                ? 'bg-poke-red text-white shadow-md shadow-poke-red/25'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
            id="nav-tab-guide"
          >
            <BookOpen size={16} />
            <span>Guia do Iniciante</span>
          </button>
        </nav>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <span className="absolute left-3 top-2.5 text-zinc-500">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Buscar por Pokémon ou tags..."
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              // Auto focus to explore if they search
              if (activeTab !== 'explore') {
                onTabChange('explore');
              }
            }}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 focus:border-poke-red focus:ring-1 focus:ring-poke-red/20 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none transition-all duration-200"
            id="search-input-global"
          />
        </div>
      </div>
    </header>
  );
}
