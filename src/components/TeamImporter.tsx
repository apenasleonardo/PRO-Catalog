/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  FileText, Check, AlertCircle, Save, Sparkles, HelpCircle, 
  Trash2, Plus, Info, Lightbulb 
} from 'lucide-react';
import { Team, Pokemon, Threat } from '../types';
import { parsePokepaste, getPokemonSpriteUrl } from '../utils';

interface TeamImporterProps {
  onAddTeam: (team: Team) => void;
  onCancel: () => void;
}

export default function TeamImporter({ onAddTeam, onCancel }: TeamImporterProps) {
  // Team Form State
  const [name, setName] = useState('');
  const [style, setStyle] = useState<'Ofensivo' | 'Balanceado' | 'Stall' | 'Trick Room' | 'Hyper Offense' | 'Weather'>('Ofensivo');
  const [difficulty, setDifficulty] = useState<'Fácil' | 'Média' | 'Avançada'>('Fácil');
  const [summary, setSummary] = useState('');
  const [author, setAuthor] = useState('');
  const [pokepasteUrl, setPokepasteUrl] = useState('');
  
  // Strategy State
  const [objective, setObjective] = useState('');
  const [opening, setOpening] = useState('');
  const [winCondition, setWinCondition] = useState('');
  const [commonMistakes, setCommonMistakes] = useState('');
  
  // Threats List State
  const [threats, setThreats] = useState<Threat[]>([
    { name: 'Freeze-Dry', icon: 'ac_unit', description: 'Causa dano super-efetivo a Pokémon de água ou voadores.' },
    { name: 'Golpes de Planta / Grass Moves', icon: 'leaf', description: 'Qualquer Pokémon de Terra ou Água no time sofre imenso.' }
  ]);
  
  const [newThreatName, setNewThreatName] = useState('');
  const [newThreatDesc, setNewThreatDesc] = useState('');

  // Pokepaste raw state
  const [rawPaste, setRawPaste] = useState('');
  const [parsedPokemons, setParsedPokemons] = useState<Pokemon[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);

  // Auto-parse on raw paste changes
  useEffect(() => {
    if (!rawPaste.trim()) {
      setParsedPokemons([]);
      setParseError(null);
      return;
    }

    try {
      const parsed = parsePokepaste(rawPaste);
      if (parsed.length === 0) {
        setParseError('Nenhum Pokémon válido pôde ser extraído do texto informado.');
        setParsedPokemons([]);
      } else {
        setParseError(null);
        setParsedPokemons(parsed);
      }
    } catch (e) {
      setParseError('Ocorreu um erro ao processar o Pokepaste. Verifique a formatação.');
      setParsedPokemons([]);
    }
  }, [rawPaste]);

  const handleAddThreat = () => {
    if (!newThreatName.trim() || !newThreatDesc.trim()) return;
    setThreats([...threats, {
      name: newThreatName.trim(),
      icon: 'alert',
      description: newThreatDesc.trim()
    }]);
    setNewThreatName('');
    setNewThreatDesc('');
  };

  const handleRemoveThreat = (index: number) => {
    setThreats(threats.filter((_, i) => i !== index));
  };

  const handleLoadSample = () => {
    setName('Volt-Turn Sun Offense');
    setStyle('Ofensivo');
    setDifficulty('Média');
    setSummary('Time solar rápido focado em sun-sweepers brutais e controle de momentum constante.');
    setAuthor('SunMasterPRO');
    setPokepasteUrl('https://pokepast.es/sun-sample');
    setObjective('Ativar a luz solar intensa com Torkoal e dar sweep com Venusaur usando a habilidade Chlorophyll (velocidade duplicada) ou Charizard na força bruta.');
    setOpening('Abrir com Torkoal para colocar Stealth Rock e Drought. Usar Yawn para forçar trocas e sair com Eject Button ou trocas seguras.');
    setWinCondition('Enfraquecer barreiras de dragão e fogo inimigas com Landorus. Colocar Venusaur sob o Sol com Growth (+2 de Ataque e Atk Esp) e vencer.');
    setCommonMistakes('Deixar o Sol acabar enquanto Venusaur está em campo contra atacantes mais rápidos. Sempre conte a quantidade de turnos do Sol!');
    setRawPaste(`Torkoal @ Heat Rock
Ability: Drought
EVs: 248 HP / 252 Def / 8 SpD
Bold Nature
- Stealth Rock
- Lava Plume
- Rapid Spin
- Yawn

Venusaur @ Life Orb
Ability: Chlorophyll
EVs: 252 SpA / 4 SpD / 252 Spe
Modest Nature
- Growth
- Giga Drain
- Weather Ball
- Sludge Bomb

Charizard @ Choice Specs
Ability: Solar Power
EVs: 252 SpA / 4 SpD / 252 Spe
Timid Nature
- Overheat
- Flamethrower
- Solar Beam
- Focus Blast

Landorus-Therian @ Leftovers
Ability: Intimidate
EVs: 252 HP / 240 Def / 16 Spe
Impish Nature
- Stealth Rock
- Earthquake
- U-turn
- Toxic

Rotom-Wash @ Leftovers
Ability: Levitate
EVs: 252 HP / 200 Def / 56 Spe
Bold Nature
- Volt Switch
- Hydro Pump
- Will-O-Wisp
- Defog

Dragapult @ Choice Specs
Ability: Infiltrator
EVs: 252 SpA / 4 SpD / 252 Spe
Timid Nature
- Draco Meteor
- Shadow Ball
- Flamethrower
- U-turn`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Por favor, informe o nome do time.');
      return;
    }
    if (parsedPokemons.length === 0) {
      alert('Por favor, insira e valide um Pokepaste válido com pelo menos 1 Pokémon.');
      return;
    }

    const newTeam: Team = {
      id: `custom-team-${Date.now()}`,
      name: name.trim(),
      style,
      difficulty,
      format: 'PRO PvP',
      summary: summary.trim() || `Time estratégico contendo ${parsedPokemons.map(p => p.name).join(', ')}.`,
      author: author.trim() || 'Treinador Anônimo',
      date: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }),
      pokepasteUrl: pokepasteUrl.trim(),
      rawPokepaste: rawPaste.trim(),
      howToUse: {
        objective: objective.trim() || 'Aprenda a rotacionar os membros do time para pressionar o oponente.',
        opening: opening.trim() || 'Comece com o seu Lead preferido para colocar hazards.',
        winCondition: winCondition.trim() || 'Enfraqueça as resistências do time inimigo e rotacione para o seu sweeper principal.',
        commonMistakes: commonMistakes.trim() || 'Não perca seus principais Pokémon de pivot de forma descuidada.'
      },
      threats: threats,
      pokemons: parsedPokemons,
      tags: [style, ...parsedPokemons.slice(0, 2).map(p => p.name), 'PRO PvP'],
      isCustom: true
    };

    onAddTeam(newTeam);
  };

  return (
    <div className="space-y-8 animate-fade-in" id="team-importer-container">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="text-poke-red" />
            Adicionar seu próprio Time
          </h1>
          <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
            Hospede seus times de PvP do Pokémon Revolution Online. Cole o Poképaste e nós montamos os cards e guias visuais automaticamente!
          </p>
        </div>

        <button
          type="button"
          onClick={handleLoadSample}
          className="flex items-center gap-1.5 text-xs font-bold text-poke-yellow hover:text-white bg-zinc-900 hover:bg-zinc-800 px-4 py-2.5 rounded-xl border border-zinc-800/80 hover:border-poke-yellow/30 transition-all cursor-pointer shadow-md shadow-poke-yellow/5"
          id="btn-load-sample-paste"
        >
          <Lightbulb size={14} />
          <span>Carregar Exemplo de Teste</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns (Inputs & Strategy) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General info */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h2 className="font-display text-lg font-bold text-white border-b border-zinc-800 pb-2 flex items-center gap-2">
              <Info size={16} className="text-poke-blue-light" />
              1. Informações Básicas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Nome do Time *</label>
                <input 
                  type="text" 
                  placeholder="Ex: Sun Weather Offense, Sand Bulky"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 focus:border-poke-red focus:ring-1 focus:ring-poke-red/25 text-sm text-white focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Seu Nome / Autor</label>
                <input 
                  type="text" 
                  placeholder="Ex: TrainerAsh, RedPRO"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 focus:border-poke-red focus:ring-1 focus:ring-poke-red/25 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Estilo de Jogo</label>
                <select 
                  value={style}
                  onChange={(e) => setStyle(e.target.value as any)}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 focus:border-poke-red text-sm text-white focus:outline-none cursor-pointer"
                >
                  <option value="Ofensivo">Ofensivo</option>
                  <option value="Balanceado">Balanceado</option>
                  <option value="Stall">Stall</option>
                  <option value="Trick Room">Trick Room</option>
                  <option value="Hyper Offense">Hyper Offense</option>
                  <option value="Weather">Climas / Weather</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Dificuldade</label>
                <select 
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 focus:border-poke-red text-sm text-white focus:outline-none cursor-pointer"
                >
                  <option value="Fácil">Fácil (Iniciante)</option>
                  <option value="Média">Média (Intermediário)</option>
                  <option value="Avançada">Avançada (Experiente)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Pokepaste Link Original (Opcional)</label>
                <input 
                  type="url" 
                  placeholder="Ex: https://pokepast.es/xxxxx"
                  value={pokepasteUrl}
                  onChange={(e) => setPokepasteUrl(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 focus:border-poke-red focus:ring-1 focus:ring-poke-red/25 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Resumo Curto (Aparece no Card)</label>
                <textarea 
                  placeholder="Uma frase curta descrevendo a alma do time..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  maxLength={150}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 focus:border-poke-red focus:ring-1 focus:ring-poke-red/25 text-sm text-white focus:outline-none h-20 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Strategic block */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h2 className="font-display text-lg font-bold text-white border-b border-zinc-800 pb-2 flex items-center gap-2">
              <FileText size={16} className="text-poke-yellow" />
              2. Como Usar (Explicações Simples em Português)
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Objetivo Geral do Time</label>
                <textarea 
                  placeholder="O que esse time quer fazer? (Ex: Ativar chuva com Pelipper para dobrar a velocidade do Swampert-Mega...)"
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 focus:border-poke-red focus:ring-1 focus:ring-poke-red/25 text-zinc-200 text-sm focus:outline-none h-24"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Como Começar a Partida (Abertura / Lead)</label>
                <textarea 
                  placeholder="Quem entra primeiro? (Ex: Sempre inicie com Pelipper para colocar a chuva cedo...)"
                  value={opening}
                  onChange={(e) => setOpening(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 focus:border-poke-red focus:ring-1 focus:ring-poke-red/25 text-zinc-200 text-sm focus:outline-none h-20"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Condição de Vitória (Como fechar o jogo)</label>
                <textarea 
                  placeholder="Quem garante o final do jogo? (Ex: Enfraqueça as defesas com Garchomp e use o Mega Swampert no fim...)"
                  value={winCondition}
                  onChange={(e) => setWinCondition(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 focus:border-poke-red focus:ring-1 focus:ring-poke-red/25 text-zinc-200 text-sm focus:outline-none h-20"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Erros Comuns a Evitar</label>
                <textarea 
                  placeholder="O que um iniciante NÃO deve fazer? (Ex: Nunca sacrifique seu Pelipper cedo se o adversário tiver Sand Stream...)"
                  value={commonMistakes}
                  onChange={(e) => setCommonMistakes(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 focus:border-poke-red focus:ring-1 focus:ring-poke-red/25 text-zinc-200 text-sm focus:outline-none h-20"
                />
              </div>
            </div>
          </div>

          {/* Threats adder */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h2 className="font-display text-lg font-bold text-white border-b border-zinc-800 pb-2 flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-400" />
              3. Ameaças Críticas (Counters)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 md:col-span-2 bg-zinc-950/40 p-3 rounded-xl border border-zinc-900 space-y-2">
                <p className="text-xs font-medium text-zinc-400">Adicionar nova ameaça ao time:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input 
                    type="text" 
                    placeholder="Nome da Ameaça (ex: Freeze-Dry)" 
                    value={newThreatName}
                    onChange={(e) => setNewThreatName(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Descrição simples de como anula..." 
                    value={newThreatDesc}
                    onChange={(e) => setNewThreatDesc(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none md:col-span-2"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddThreat}
                  className="self-end flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs px-4 py-2 rounded-xl border border-zinc-800 font-bold hover:text-white transition-all cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Adicionar Ameaça</span>
                </button>
              </div>

              {/* Dynamic Threats List */}
              <div className="md:col-span-2 space-y-2.5">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Ameaças Cadastradas:</p>
                {threats.map((threat, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/80">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 shrink-0 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg flex items-center justify-center text-xs">
                        !
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-200">{threat.name}</h4>
                        <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{threat.description}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveThreat(idx)}
                      className="text-zinc-500 hover:text-red-400 p-1 rounded-lg hover:bg-zinc-800 transition-colors"
                      title="Excluir ameaça"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                {threats.length === 0 && (
                  <p className="text-xs text-zinc-600 italic">Nenhuma ameaça cadastrada.</p>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Pokepaste Raw and LIVE Preview) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Pokepaste paste */}
          <div className="glass-panel p-6 rounded-2xl bg-zinc-900/40 space-y-4">
            <h2 className="font-display text-lg font-bold text-white border-b border-zinc-800 pb-2 flex items-center gap-2">
              <FileText size={16} className="text-poke-red-light" />
              4. Colar Pokepaste *
            </h2>

            <div className="space-y-3">
              <p className="text-xs text-zinc-400 leading-relaxed">
                Cole o conteúdo bruto (Raw Paste) do seu time obtido no Showdown ou no Pokepaste. Nossa inteligência decodifica automaticamente os Pokémon, itens e ataques:
              </p>

              <textarea 
                placeholder="Pelipper @ Damp Rock&#10;Ability: Drizzle&#10;EVs: 248 HP / 252 Def&#10;Bold Nature&#10;- Scald&#10;- U-turn&#10;..."
                value={rawPaste}
                onChange={(e) => setRawPaste(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-poke-red focus:ring-1 focus:ring-poke-red/25 text-zinc-300 font-mono text-xs focus:outline-none h-72 resize-y"
                required
              />

              {parseError && (
                <div className="flex gap-2 p-3 bg-red-950/20 border border-red-500/20 rounded-xl text-xs text-red-400">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p>{parseError}</p>
                </div>
              )}
            </div>
          </div>

          {/* Live Preview of parsed Pokémon */}
          <div className="glass-panel p-6 rounded-2xl bg-zinc-900/40 space-y-4">
            <h2 className="font-display text-lg font-bold text-white border-b border-zinc-800 pb-2 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Check size={16} className="text-emerald-400" />
                Preview do Time ({parsedPokemons.length}/6)
              </span>
            </h2>

            {parsedPokemons.length > 0 ? (
              <div className="space-y-2.5">
                {parsedPokemons.map((pkmn, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-900 hover:border-zinc-800 transition-colors"
                  >
                    <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800 shrink-0 relative overflow-hidden">
                      <img 
                        src={getPokemonSpriteUrl(pkmn.name, true)} 
                        alt={pkmn.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = getPokemonSpriteUrl(pkmn.name, false);
                        }}
                        className="w-8 h-8 object-contain z-10"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="truncate flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-white truncate">{pkmn.name}</h4>
                        <span className="text-[9px] font-mono font-semibold text-zinc-500 shrink-0">
                          {pkmn.item ? `@ ${pkmn.item}` : 'Sem Item'}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400 mt-0.5 truncate font-mono">
                        {pkmn.moves.join(' • ') || 'Nenhum movimento'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed border-zinc-800 rounded-2xl">
                <HelpCircle size={32} className="text-zinc-600 mx-auto mb-2" />
                <p className="text-xs text-zinc-500 font-medium px-4">
                  Cole seu Pokepaste no campo acima para carregar o visual dos Pokémon aqui em tempo real.
                </p>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={parsedPokemons.length === 0}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-display font-extrabold text-sm transition-all shadow-lg active:scale-95 cursor-pointer ${
                parsedPokemons.length > 0 
                  ? 'bg-poke-red hover:bg-red-600 text-white shadow-poke-red/25' 
                  : 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed'
              }`}
              id="btn-save-custom-team"
            >
              <Save size={16} />
              <span>Salvar Time no Catálogo</span>
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 rounded-xl font-display font-bold text-sm transition-all active:scale-95 cursor-pointer"
              id="btn-cancel-custom-team"
            >
              Cancelar
            </button>
          </div>

        </div>

      </form>

    </div>
  );
}
