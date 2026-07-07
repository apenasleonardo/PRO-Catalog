/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TeamCard from './components/TeamCard';
import TeamDetail from './components/TeamDetail';
import TeamImporter from './components/TeamImporter';
import BeginnerGuide from './components/BeginnerGuide';
import { PRELOADED_TEAMS } from './data';
import { Team } from './types';
import { Filter, Layers, HelpCircle, Award, RotateCcw, Flame } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'pro_pvp_teams_catalog';

export default function App() {
  const [activeTab, setActiveTab] = useState<'explore' | 'create' | 'guide'>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  
  // Filtering States
  const [selectedStyle, setSelectedStyle] = useState<string>('Todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Todos');

  // Load teams from localStorage on initial render
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) {
          setTeams(parsed);
          return;
        }
      } catch (e) {
        console.error('Erro ao ler times locais, redefinindo...', e);
      }
    }
    // Default fallback
    setTeams(PRELOADED_TEAMS);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(PRELOADED_TEAMS));
  }, []);

  // Sync teams back to localStorage when changed
  const saveTeamsToStorage = (updatedTeams: Team[]) => {
    setTeams(updatedTeams);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTeams));
  };

  const handleAddTeam = (newTeam: Team) => {
    const updated = [newTeam, ...teams];
    saveTeamsToStorage(updated);
    setActiveTab('explore');
    setSelectedTeam(newTeam); // Auto view newly added team details!
  };

  const handleDeleteTeam = (id: string) => {
    const updated = teams.filter(t => t.id !== id);
    saveTeamsToStorage(updated);
    if (selectedTeam?.id === id) {
      setSelectedTeam(null);
    }
  };

  const handleResetCatalog = () => {
    if (confirm('Tem certeza de que deseja redefinir o catálogo? Todos os seus times criados serão apagados.')) {
      saveTeamsToStorage(PRELOADED_TEAMS);
      setSelectedTeam(null);
      setActiveTab('explore');
    }
  };

  // Extract all unique styles for filters
  const availableStyles = ['Todos', 'Ofensivo', 'Balanceado', 'Stall', 'Trick Room', 'Hyper Offense', 'Weather'];
  const availableDifficulties = ['Todos', 'Fácil', 'Média', 'Avançada'];

  // Filter and search logic
  const filteredTeams = teams.filter(team => {
    // Style check
    if (selectedStyle !== 'Todos' && team.style !== selectedStyle) {
      return false;
    }
    
    // Difficulty check
    if (selectedDifficulty !== 'Todos' && team.difficulty !== selectedDifficulty) {
      return false;
    }

    // Search query check
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchesName = team.name.toLowerCase().includes(query);
      const matchesAuthor = team.author.toLowerCase().includes(query);
      const matchesSummary = team.summary.toLowerCase().includes(query);
      
      // Match individual pokemons
      const matchesPokemons = team.pokemons.some(p => 
        p.name.toLowerCase().includes(query) || 
        p.role.toLowerCase().includes(query) ||
        p.moves.some(m => m.toLowerCase().includes(query))
      );

      // Match tags
      const matchesTags = team.tags.some(t => t.toLowerCase().includes(query));

      return matchesName || matchesAuthor || matchesSummary || matchesPokemons || matchesTags;
    }

    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 selection:bg-poke-red selection:text-white" id="root-app-container">
      
      {/* Navbar Component */}
      <Navbar 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSelectedTeam(null); // Clear selected team when navigating tabs
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLogoClick={() => {
          setActiveTab('explore');
          setSelectedTeam(null);
          setSearchQuery('');
          setSelectedStyle('Todos');
          setSelectedDifficulty('Todos');
        }}
      />

      {/* Main Container */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 py-8" id="main-content-area">
        
        {/* Render detailed view if a team is selected */}
        {selectedTeam ? (
          <TeamDetail 
            team={selectedTeam} 
            onBack={() => setSelectedTeam(null)} 
          />
        ) : (
          <>
            {/* EXPLORE TAB (MAIN CATALOG) */}
            {activeTab === 'explore' && (
              <div className="space-y-6" id="explore-view">
                
                {/* Visual Intro Banner on Home */}
                <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800">
                  {/* Glowing background */}
                  <div className="absolute inset-y-0 right-0 w-1/2 bg-radial from-poke-red/5 to-transparent pointer-events-none" />
                  
                  <div className="space-y-2 max-w-2xl">
                    <span className="text-[10px] font-mono tracking-widest font-extrabold text-poke-red uppercase px-2.5 py-1 bg-poke-red/5 border border-poke-red/10 rounded-md inline-flex items-center gap-1.5">
                      <Flame size={12} />
                      Pokémon Revolution Online PvP
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                      Encontre o time ideal para o seu estilo de jogo
                    </h2>
                    <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                      Explore estratégias explicadas em português com imagens animadas e Poképastes diretos prontos para copiar. Traduzido de forma visual para treinadores iniciantes ou experientes!
                    </p>
                  </div>

                  <div className="flex gap-3 shrink-0">
                    <button
                      onClick={() => setActiveTab('create')}
                      className="px-5 py-3.5 bg-poke-red hover:bg-red-600 text-white rounded-xl font-display font-extrabold text-sm shadow-lg shadow-poke-red/20 transition-all active:scale-95 cursor-pointer"
                      id="btn-banner-add-team"
                    >
                      Hospedar Meu Time
                    </button>
                    <button
                      onClick={() => setActiveTab('guide')}
                      className="px-5 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-xl font-display font-bold text-sm transition-all active:scale-95 cursor-pointer"
                      id="btn-banner-guide"
                    >
                      Guia de PvP
                    </button>
                  </div>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-900/40 p-4 rounded-2xl border border-zinc-900">
                  <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                      <Filter size={14} />
                      <span>Filtrar por:</span>
                    </div>

                    {/* Playstyle Selector */}
                    <div className="flex flex-wrap items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                      {availableStyles.map((style) => (
                        <button
                          key={style}
                          onClick={() => setSelectedStyle(style)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            selectedStyle === style
                              ? 'bg-zinc-800 text-white shadow-sm'
                              : 'text-zinc-500 hover:text-zinc-300'
                          }`}
                          id={`filter-style-${style.toLowerCase().replace(/\s+/g, '_')}`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>

                    {/* Difficulty Selector */}
                    <div className="flex flex-wrap items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                      {availableDifficulties.map((diff) => (
                        <button
                          key={diff}
                          onClick={() => setSelectedDifficulty(diff)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            selectedDifficulty === diff
                              ? 'bg-zinc-800 text-white shadow-sm'
                              : 'text-zinc-500 hover:text-zinc-300'
                          }`}
                          id={`filter-difficulty-${diff.toLowerCase()}`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reset Catalog button (if they modified it or want a fresh seed) */}
                  <button
                    onClick={handleResetCatalog}
                    className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-red-400 bg-transparent hover:bg-zinc-900/50 px-3 py-2 rounded-xl border border-transparent hover:border-zinc-800/80 transition-all cursor-pointer"
                    title="Redefinir catálogo para os times padrões"
                    id="btn-reset-catalog"
                  >
                    <RotateCcw size={14} />
                    <span>Redefinir Catálogo</span>
                  </button>
                </div>

                {/* Grid of Team Cards */}
                {filteredTeams.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6" id="teams-grid">
                    {filteredTeams.map((team) => (
                      <TeamCard 
                        key={team.id} 
                        team={team} 
                        onViewDetails={(t) => setSelectedTeam(t)}
                        onDelete={handleDeleteTeam}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-zinc-900/10 border border-dashed border-zinc-800 rounded-3xl" id="no-results-area">
                    <Layers size={48} className="mx-auto text-zinc-700 mb-3" />
                    <h3 className="font-display text-lg font-bold text-zinc-300">Nenhum time encontrado</h3>
                    <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1 leading-relaxed px-4">
                      Tente alterar os termos de busca ou filtros selecionados. Você também pode clicar no botão acima para redefinir o catálogo.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* CREATE TAB */}
            {activeTab === 'create' && (
              <TeamImporter 
                onAddTeam={handleAddTeam} 
                onCancel={() => setActiveTab('explore')} 
              />
            )}

            {/* GUIDE TAB */}
            {activeTab === 'guide' && (
              <BeginnerGuide />
            )}
          </>
        )}

      </main>

      {/* Elegant Tactical Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-10 mt-16" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-display font-black text-xl text-white tracking-tight flex items-center gap-1.5">
              PRO <span className="text-poke-red font-bold">Catalog</span>
            </span>
            <p className="text-xs text-zinc-500 text-center md:text-left leading-relaxed">
              © {new Date().getFullYear()} PRO PvP Competitive Catalog. Todos os direitos reservados.
              <br />
              Todas as propriedades e sprites de Pokémon pertencem à Nintendo, GameFreak e Pokémon Showdown.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-zinc-500">
            <a href="#" className="hover:text-zinc-300 transition-colors" onClick={() => { setActiveTab('explore'); setSelectedTeam(null); }}>Explorar Times</a>
            <a href="#" className="hover:text-zinc-300 transition-colors" onClick={() => { setActiveTab('guide'); setSelectedTeam(null); }}>Guia de Combate</a>
            <a href="#" className="hover:text-zinc-300 transition-colors" onClick={() => { setActiveTab('create'); setSelectedTeam(null); }}>Hospedar Novo Time</a>
            <span className="text-zinc-800">|</span>
            <a href="https://pokemonrevolution.net" target="_blank" rel="noopener noreferrer" className="text-poke-blue-light hover:underline flex items-center gap-1">
              PRO Website
            </a>
          </nav>
        </div>
      </footer>

    </div>
  );
}
