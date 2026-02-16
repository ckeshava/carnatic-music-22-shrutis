import React, { useState, useRef } from 'react';

const CarnaticSwaraExplorer = () => {
  const [baseFrequency, setBaseFrequency] = useState(261.63);
  const [selectedSwara, setSelectedSwara] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('swaras');
  const [selectedSwaraFamily, setSelectedSwaraFamily] = useState('all');
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);

  // Using his nomenclature: Eka-shruti, Dvi-shruti, Tri-shruti, Chatushruti, Pancha-shruti, Shat-shruti
  const twentyTwoShrutis = [
    // Shruti 1: Shadjam
    { 
      shruti: 1, 
      name: 'Shadjam', 
      traditionalName: 'Shadjam (S)',
      ratio: [1, 1], 
      cents: 0, 
      family: 'S',
      is12Note: true,
      description: 'The tonic, fundamental note. Prakruti swara (unchanging).'
    },
    
    // Shrutis 2-5: Rishabham region
    { 
      shruti: 2, 
      name: 'Eka-shruti Rishabham', 
      traditionalName: 'Shuddha Rishabham (R₁)',
      ratio: [256, 243], 
      cents: 90, 
      family: 'R',
      is12Note: true,
      description: 'Pythagorean minor second. First of the Rishabham variants.'
    },
    { 
      shruti: 3, 
      name: 'Dvi-shruti Rishabham', 
      traditionalName: null,
      ratio: [16, 15], 
      cents: 112, 
      family: 'R',
      is12Note: false,
      description: 'Just minor second. Microtonal variant between R₁ and R₂.'
    },
    { 
      shruti: 4, 
      name: 'Tri-shruti Rishabham', 
      traditionalName: null,
      ratio: [10, 9], 
      cents: 182, 
      family: 'R',
      is12Note: false,
      description: 'Minor whole tone. Microtonal variant approaching R₂.'
    },
    { 
      shruti: 5, 
      name: 'Chatushruti Rishabham', 
      traditionalName: 'Chatushruti Rishabham (R₂) / Shuddha Gandharam (G₁)',
      ratio: [9, 8], 
      cents: 204, 
      family: 'R',
      is12Note: true,
      description: 'Major second. This position has two names depending on raga context.'
    },
    
    // Shrutis 6-9: Gandharam region
    { 
      shruti: 6, 
      name: 'Pancha-shruti Rishabham', 
      traditionalName: null,
      ratio: [32, 27], 
      cents: 294, 
      family: 'G',
      is12Note: false,
      description: 'Pythagorean minor third. Microtonal variant in Gandharam region.'
    },
    { 
      shruti: 7, 
      name: 'Shat-shruti Rishabham', 
      traditionalName: 'Shatshruti Rishabham (R₃) / Sadharana Gandharam (G₂)',
      ratio: [6, 5], 
      cents: 316, 
      family: 'G',
      is12Note: true,
      description: 'Just minor third. This position has two names depending on raga context.'
    },
    { 
      shruti: 8, 
      name: 'Shuddha Gandharam (Cyuta)', 
      traditionalName: null,
      ratio: [5, 4], 
      cents: 386, 
      family: 'G',
      is12Note: false,
      description: 'Just major third. Microtonal variant approaching Antara Gandharam.'
    },
    { 
      shruti: 9, 
      name: 'Antara Gandharam', 
      traditionalName: 'Antara Gandharam (G₃)',
      ratio: [81, 64], 
      cents: 408, 
      family: 'G',
      is12Note: true,
      description: 'Pythagorean major third. The highest Gandharam position.'
    },
    
    // Shrutis 10-13: Madhyamam region
    { 
      shruti: 10, 
      name: 'Shuddha Madhyamam', 
      traditionalName: 'Shuddha Madhyamam (M₁)',
      ratio: [4, 3], 
      cents: 498, 
      family: 'M',
      is12Note: true,
      description: 'Perfect fourth. The natural Madhyamam position.'
    },
    { 
      shruti: 11, 
      name: 'Shuddha Madhyamam (Tivra)', 
      traditionalName: null,
      ratio: [27, 20], 
      cents: 520, 
      family: 'M',
      is12Note: false,
      description: 'Acute fourth. Microtonal variant between M₁ and M₂.'
    },
    { 
      shruti: 12, 
      name: 'Prati Madhyamam', 
      traditionalName: 'Prati Madhyamam (M₂)',
      ratio: [45, 32], 
      cents: 590, 
      family: 'M',
      is12Note: true,
      description: 'Augmented fourth (tritone). First Prati Madhyamam position.'
    },
    { 
      shruti: 13, 
      name: 'Prati Madhyamam (Tivra)', 
      traditionalName: null,
      ratio: [729, 512], 
      cents: 612, 
      family: 'M',
      is12Note: false,
      description: 'Pythagorean tritone. Higher variant of Prati Madhyamam.'
    },
    
    // Shruti 14: Panchamam
    { 
      shruti: 14, 
      name: 'Panchamam', 
      traditionalName: 'Panchamam (P)',
      ratio: [3, 2], 
      cents: 702, 
      family: 'P',
      is12Note: true,
      description: 'Perfect fifth. Prakruti swara (unchanging), like Shadjam.'
    },
    
    // Shrutis 15-18: Dhaivatam region
    { 
      shruti: 15, 
      name: 'Eka-shruti Dhaivatam', 
      traditionalName: 'Shuddha Dhaivatam (D₁)',
      ratio: [128, 81], 
      cents: 792, 
      family: 'D',
      is12Note: true,
      description: 'Pythagorean minor sixth. First of the Dhaivatam variants.'
    },
    { 
      shruti: 16, 
      name: 'Dvi-shruti Dhaivatam', 
      traditionalName: null,
      ratio: [8, 5], 
      cents: 814, 
      family: 'D',
      is12Note: false,
      description: 'Just minor sixth. Microtonal variant between D₁ and D₂.'
    },
    { 
      shruti: 17, 
      name: 'Tri-shruti Dhaivatam', 
      traditionalName: null,
      ratio: [5, 3], 
      cents: 884, 
      family: 'D',
      is12Note: false,
      description: 'Just major sixth. Microtonal variant approaching D₂.'
    },
    { 
      shruti: 18, 
      name: 'Chatushruti Dhaivatam', 
      traditionalName: 'Chatushruti Dhaivatam (D₂) / Shuddha Nishadam (N₁)',
      ratio: [27, 16], 
      cents: 906, 
      family: 'D',
      is12Note: true,
      description: 'Pythagorean major sixth. This position has two names depending on raga context.'
    },
    
    // Shrutis 19-22: Nishadam region
    { 
      shruti: 19, 
      name: 'Pancha-shruti Dhaivatam', 
      traditionalName: null,
      ratio: [16, 9], 
      cents: 996, 
      family: 'N',
      is12Note: false,
      description: 'Pythagorean minor seventh. Microtonal variant in Nishadam region.'
    },
    { 
      shruti: 20, 
      name: 'Shat-shruti Dhaivatam', 
      traditionalName: 'Shatshruti Dhaivatam (D₃) / Kaisiki Nishadam (N₂)',
      ratio: [9, 5], 
      cents: 1018, 
      family: 'N',
      is12Note: true,
      description: 'Just minor seventh. This position has two names depending on raga context.'
    },
    { 
      shruti: 21, 
      name: 'Kaisiki Nishadam (Cyuta)', 
      traditionalName: null,
      ratio: [15, 8], 
      cents: 1088, 
      family: 'N',
      is12Note: false,
      description: 'Just major seventh. Microtonal variant approaching Kakali Nishadam.'
    },
    { 
      shruti: 22, 
      name: 'Kakali Nishadam', 
      traditionalName: 'Kakali Nishadam (N₃)',
      ratio: [243, 128], 
      cents: 1110, 
      family: 'N',
      is12Note: true,
      description: 'Pythagorean major seventh. The highest Nishadam position.'
    },
  ];

  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const playFrequency = (frequency, duration = 1.5) => {
    const ctx = initAudio();
    
    if (oscillatorRef.current) {
      try { oscillatorRef.current.stop(); } catch(e) {}
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
    
    oscillatorRef.current = oscillator;
    
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), duration * 1000);
  };

  const calculateFrequency = (ratio) => {
    return baseFrequency * (ratio[0] / ratio[1]);
  };

  const playSwara = (swara) => {
    setSelectedSwara(swara);
    const freq = calculateFrequency(swara.ratio);
    playFrequency(freq);
  };

  const getStringPosition = (ratio) => {
    return ((ratio[1] / ratio[0]) * 100).toFixed(2);
  };

  const familyColors = {
    'S': 'bg-red-100 border-red-400 hover:bg-red-200',
    'R': 'bg-orange-100 border-orange-400 hover:bg-orange-200',
    'G': 'bg-yellow-100 border-yellow-400 hover:bg-yellow-200',
    'M': 'bg-green-100 border-green-400 hover:bg-green-200',
    'P': 'bg-teal-100 border-teal-400 hover:bg-teal-200',
    'D': 'bg-blue-100 border-blue-400 hover:bg-blue-200',
    'N': 'bg-purple-100 border-purple-400 hover:bg-purple-200',
  };

  const familySelectedColors = {
    'S': 'bg-red-500 text-white',
    'R': 'bg-orange-500 text-white',
    'G': 'bg-yellow-600 text-white',
    'M': 'bg-green-500 text-white',
    'P': 'bg-teal-500 text-white',
    'D': 'bg-blue-500 text-white',
    'N': 'bg-purple-500 text-white',
  };

  const filteredShrutis = selectedSwaraFamily === 'all'
    ? twentyTwoShrutis
    : twentyTwoShrutis.filter(s => s.family === selectedSwaraFamily);

  const StringPositionBar = ({ ratio }) => {
    const position = parseFloat(getStringPosition(ratio));
    const stoppedWidth = 100 - position;
    return (
      <div className="mt-2">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500">Nut</span>
          <span className="text-amber-600 font-medium">Veena String</span>
          <span className="text-gray-500">Bridge</span>
        </div>
        <div className="relative w-full h-5 rounded-full overflow-hidden bg-gray-100 border border-gray-300">
          {/* Stopped portion */}
          <div
            className="absolute left-0 top-0 h-full bg-gray-400 bg-opacity-50"
            style={{ width: `${stoppedWidth}%` }}
          />
          {/* Vibrating portion */}
          <div
            className="absolute right-0 top-0 h-full bg-emerald-500 bg-opacity-60"
            style={{ width: `${position}%` }}
          />
          {/* Press point marker */}
          {stoppedWidth > 0 && (
            <div
              className="absolute top-0 h-full w-0.5 bg-gray-800"
              style={{ left: `${stoppedWidth}%` }}
            />
          )}
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-gray-500">{stoppedWidth > 0 ? `${stoppedWidth.toFixed(1)}% stopped` : 'open string'}</span>
          <span className="text-emerald-700 font-medium">{position.toFixed(1)}% vibrating</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-2">
          Twenty-Two Shrutis of Carnatic Music
          </h1>
          <p>This website demonstrates the static 22 shrutis used in Ancient Indian Carnatic Music system</p>
        </div>

        {/* Base Frequency Control */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg mb-6 border border-amber-200">
          <h3 className="text-lg font-semibold text-amber-800 mb-4">🎵 Set Your Shadjam (Base Frequency)</h3>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <input
                type="range"
                min="200"
                max="400"
                value={baseFrequency}
                onChange={(e) => setBaseFrequency(parseFloat(e.target.value))}
                className="w-40 md:w-48 accent-amber-500"
              />
              <span className="text-lg font-mono text-amber-700">{baseFrequency.toFixed(1)} Hz</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setBaseFrequency(240)} className="px-3 py-1 bg-amber-100 hover:bg-amber-200 rounded text-sm">B♭ (240)</button>
              <button onClick={() => setBaseFrequency(261.63)} className="px-3 py-1 bg-amber-100 hover:bg-amber-200 rounded text-sm">C (261.63)</button>
              <button onClick={() => setBaseFrequency(293.66)} className="px-3 py-1 bg-amber-100 hover:bg-amber-200 rounded text-sm">D (293.66)</button>
              <button onClick={() => setBaseFrequency(392.00)} className="px-3 py-1 bg-amber-100 hover:bg-amber-200 rounded text-sm">G (392.00)</button>
              <button onClick={() => setBaseFrequency(415.30)} className="px-3 py-1 bg-amber-100 hover:bg-amber-200 rounded text-sm">G♯ (415.30)</button>
            </div>
            <button
              onClick={() => playFrequency(baseFrequency)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium"
            >
              ▶ Play Sa
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'swaras', label: '12 Swaras' },
            { id: '22shrutis', label: '22 Shrutis' },
            { id: 'theory', label: 'Theory & Formulas' },
            { id: 'references', label: 'Further Reading' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-amber-700 hover:bg-amber-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 12 Swaras Tab */}
        {activeTab === 'swaras' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-amber-200">
              <h3 className="text-lg font-semibold text-amber-800 mb-4">🎹 The Twelve Swarasthanas (Click to Play)</h3>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-2 md:gap-3 mb-6">
                {[
                  { symbol: 'S', sanskrit: 'Shadjam', ratio: [1, 1], cents: 0 },
                  { symbol: 'R₁', sanskrit: 'Shuddha Rishabham', ratio: [256, 243], cents: 90 },
                  { symbol: 'R₂/G₁', sanskrit: 'Chatushruti Rishabham', ratio: [9, 8], cents: 204 },
                  { symbol: 'R₃/G₂', sanskrit: 'Shatshruti Rishabham', ratio: [32, 27], cents: 294 },
                  { symbol: 'G₃', sanskrit: 'Antara Gandharam', ratio: [81, 64], cents: 408 },
                  { symbol: 'M₁', sanskrit: 'Shuddha Madhyamam', ratio: [4, 3], cents: 498 },
                  { symbol: 'M₂', sanskrit: 'Prati Madhyamam', ratio: [729, 512], cents: 612 },
                  { symbol: 'P', sanskrit: 'Panchamam', ratio: [3, 2], cents: 702 },
                  { symbol: 'D₁', sanskrit: 'Shuddha Dhaivatam', ratio: [128, 81], cents: 792 },
                  { symbol: 'D₂/N₁', sanskrit: 'Chatushruti Dhaivatam', ratio: [27, 16], cents: 906 },
                  { symbol: 'D₃/N₂', sanskrit: 'Shatshruti Dhaivatam', ratio: [16, 9], cents: 996 },
                  { symbol: 'N₃', sanskrit: 'Kakali Nishadam', ratio: [243, 128], cents: 1110 },
                ].map((swara, i) => {
                  const isSelected = selectedSwara?.name === swara.symbol;
                  return (
                    <button
                      key={i}
                      onClick={() => playSwara({ name: swara.symbol, fullName: swara.sanskrit, ratio: swara.ratio, cents: swara.cents, description: '' })}
                      className={`p-2 md:p-3 rounded-lg transition-all duration-200 border-2 ${
                        isSelected 
                          ? 'bg-amber-500 text-white border-amber-600 shadow-lg scale-105' 
                          : 'bg-white hover:bg-amber-50 border-amber-200 hover:border-amber-400'
                      }`}
                    >
                      <div className="font-bold text-sm md:text-lg">{swara.symbol}</div>
                      <div className="text-xs opacity-75">{swara.sanskrit}</div>
                    </button>
                  );
                })}
                <button
                  onClick={() => playSwara({ name: 'Ṡ', fullName: 'Tara Shadjam', ratio: [2, 1], cents: 1200, description: 'Upper octave' })}
                  className="p-2 md:p-3 rounded-lg transition-all border-2 bg-white hover:bg-amber-50 border-amber-200 hover:border-amber-400"
                >
                  <div className="font-bold text-sm md:text-lg">Ṡ</div>
                  <div className="text-xs opacity-75">Tara Shadjam</div>
                </button>
              </div>
              
              {selectedSwara && (
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="text-xl font-bold text-amber-800">{selectedSwara.fullName || selectedSwara.name}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                    <div>
                      <span className="text-sm text-amber-600">Frequency</span>
                      <div className="text-lg font-mono">{calculateFrequency(selectedSwara.ratio).toFixed(2)} Hz</div>
                    </div>
                    <div>
                      <span className="text-sm text-amber-600">Ratio</span>
                      <div className="text-lg font-mono">{selectedSwara.ratio[0]}:{selectedSwara.ratio[1]}</div>
                    </div>
                    <div>
                      <span className="text-sm text-amber-600">Cents</span>
                      <div className="text-lg font-mono">{selectedSwara.cents}</div>
                    </div>
                    <div>
                      <span className="text-sm text-amber-600">String Position</span>
                      <div className="text-lg font-mono">{getStringPosition(selectedSwara.ratio)}%</div>
                    </div>
                  </div>
                  <StringPositionBar ratio={selectedSwara.ratio} />
                  <p className="mt-3 text-amber-700">{selectedSwara.description}</p>
                </div>
              )}
            </div>

            {/* 16 names explanation */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-amber-200">
              <h3 className="text-lg font-semibold text-amber-800 mb-4">📚 Why 16 Names for 12 Positions?</h3>
              <p className="text-amber-700 mb-4">
                In Carnatic music, certain shruti positions share two names depending on the raga context. 
                This allows ragas to maintain the sequential naming convention (Sa-Ri-Ga-Ma-Pa-Da-Ni).
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="font-semibold text-orange-800">R₂ = G₁ (Shruti #5)</div>
                  <div className="text-sm text-orange-700">Chatushruti Rishabham = Shuddha Gandharam</div>
                  <div className="text-xs text-orange-600 mt-1">Ratio: 9:8 | 204 cents</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="font-semibold text-yellow-800">R₃ = G₂ (Shruti #7)</div>
                  <div className="text-sm text-yellow-700">Shatshruti Rishabham = Sadharana Gandharam</div>
                  <div className="text-xs text-yellow-600 mt-1">Ratio: 6:5 | 316 cents</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-semibold text-blue-800">D₂ = N₁ (Shruti #18)</div>
                  <div className="text-sm text-blue-700">Chatushruti Dhaivatam = Shuddha Nishadam</div>
                  <div className="text-xs text-blue-600 mt-1">Ratio: 27:16 | 906 cents</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="font-semibold text-purple-800">D₃ = N₂ (Shruti #20)</div>
                  <div className="text-sm text-purple-700">Shatshruti Dhaivatam = Kaisiki Nishadam</div>
                  <div className="text-xs text-purple-600 mt-1">Ratio: 9:5 | 1018 cents</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 22 Shrutis Tab */}
        {activeTab === '22shrutis' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-amber-200">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">🎶 Complete 22 Shruti System</h3>
              <p className="text-amber-600 mb-4 text-sm">
                Shrutis with traditional 12-note names are marked with ✦.
              </p>
              
              {/* Family Filter */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setSelectedSwaraFamily('all')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    selectedSwaraFamily === 'all' ? 'bg-amber-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  All 22
                </button>
                {['S', 'R', 'G', 'M', 'P', 'D', 'N'].map(family => (
                  <button
                    key={family}
                    onClick={() => setSelectedSwaraFamily(family)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      selectedSwaraFamily === family 
                        ? familySelectedColors[family]
                        : `${familyColors[family]} border`
                    }`}
                  >
                    {family}
                  </button>
                ))}
              </div>

              {/* Shruti Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 mb-6">
                {filteredShrutis.map((shruti, i) => {
                  const freq = calculateFrequency(shruti.ratio);
                  const isSelected = selectedSwara?.shruti === shruti.shruti;
                  return (
                    <button
                      key={i}
                      onClick={() => playSwara(shruti)}
                      className={`p-2 md:p-3 rounded-lg transition-all duration-200 border-2 text-left ${
                        isSelected 
                          ? familySelectedColors[shruti.family] + ' border-gray-600 shadow-lg' 
                          : familyColors[shruti.family]
                      } ${shruti.is12Note ? 'ring-2 ring-amber-400 ring-offset-1' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="font-bold text-sm">
                          #{shruti.shruti} {shruti.is12Note && '✦'}
                        </div>
                      </div>
                      <div className="text-xs mt-1 font-medium opacity-90">
                        {shruti.name}
                      </div>
                      <div className="text-xs font-mono mt-1">{shruti.ratio[0]}:{shruti.ratio[1]}</div>
                      <div className="text-xs opacity-75">{freq.toFixed(1)} Hz</div>
                    </button>
                  );
                })}
              </div>

              <div className="text-xs text-amber-600 mb-4">
                ✦ = Standard 12-note swarasthana with traditional Carnatic name
              </div>

              {/* Selected Shruti Details */}
              {selectedSwara && selectedSwara.family && (
                <div className={`p-4 rounded-lg border-2 ${familyColors[selectedSwara.family]}`}>
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                    <div>
                      <h4 className="text-xl font-bold">
                        Shruti #{selectedSwara.shruti}
                        {selectedSwara.is12Note && <span className="ml-2 text-sm font-normal">(Standard 12-note position)</span>}
                      </h4>
                      {selectedSwara.traditionalName && (
                        <p className="text-sm font-medium mt-1">{selectedSwara.traditionalName}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <div className="bg-white bg-opacity-50 p-2 rounded">
                      <span className="text-xs opacity-70">Frequency</span>
                      <div className="font-mono font-bold">{calculateFrequency(selectedSwara.ratio).toFixed(2)} Hz</div>
                    </div>
                    <div className="bg-white bg-opacity-50 p-2 rounded">
                      <span className="text-xs opacity-70">Ratio</span>
                      <div className="font-mono font-bold">{selectedSwara.ratio[0]}:{selectedSwara.ratio[1]}</div>
                    </div>
                    <div className="bg-white bg-opacity-50 p-2 rounded">
                      <span className="text-xs opacity-70">Decimal</span>
                      <div className="font-mono font-bold">{(selectedSwara.ratio[0]/selectedSwara.ratio[1]).toFixed(4)}</div>
                    </div>
                    <div className="bg-white bg-opacity-50 p-2 rounded">
                      <span className="text-xs opacity-70">String Position</span>
                      <div className="font-mono font-bold">{getStringPosition(selectedSwara.ratio)}%</div>
                    </div>
                  </div>
                  <StringPositionBar ratio={selectedSwara.ratio} />
                  <p className="mt-3 text-sm">{selectedSwara.description}</p>
                  <div className="mt-3 p-2 bg-white bg-opacity-50 rounded">
                    <span className="text-xs opacity-70">Formula</span>
                    <div className="font-mono text-sm">
                      {baseFrequency.toFixed(2)} × ({selectedSwara.ratio[0]}/{selectedSwara.ratio[1]}) = {calculateFrequency(selectedSwara.ratio).toFixed(2)} Hz
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Theory Tab */}
        {activeTab === 'theory' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-amber-200">
              <h3 className="text-lg font-semibold text-amber-800 mb-4">📐 Mathematical Foundations</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">The Fundamental Formula</h4>
                  <div className="bg-amber-50 p-4 rounded-lg font-mono text-center">
                    <div className="text-lg mb-2"><strong>Swara Frequency = Shadjam × (Ratio)</strong></div>
                    <div className="text-sm">f<sub>swara</sub> = f<sub>Sa</sub> × (numerator / denominator)</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">String Position Formula</h4>
                  <div className="bg-amber-50 p-4 rounded-lg font-mono text-center">
                    <div className="text-lg mb-2"><strong>Position = (Denominator / Numerator) × 100%</strong></div>
                    <div className="text-sm">For Pa (3:2): Position = (2/3) × 100 = 66.67% of string length</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete 22 Shruti Table */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-amber-200 overflow-x-auto">
              <h3 className="text-lg font-semibold text-amber-800 mb-4">📊 Complete 22 Shruti Reference Table</h3>
              <p className="text-sm text-amber-600 mb-4">Click any row to hear that shruti. Rows marked ✦ correspond to the standard 12-note system.</p>
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-amber-100">
                    <th className="p-2 text-left border border-amber-300">#</th>
                    <th className="p-2 text-left border border-amber-300">Shruti Name</th>
                    <th className="p-2 text-left border border-amber-300">Ratio</th>
                    <th className="p-2 text-left border border-amber-300">Decimal</th>
                    {/* <th className="p-2 text-left border border-amber-300">Cents</th> */}
                    <th className="p-2 text-left border border-amber-300">Hz (Sa={baseFrequency.toFixed(0)})</th>
                    {/* <th className="p-2 text-left border border-amber-300">String %</th> */}
                  </tr>
                </thead>
                <tbody>
                  {twentyTwoShrutis.map((s, i) => (
                    <tr 
                      key={i} 
                      className={`${s.is12Note ? 'bg-amber-100 font-medium' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-amber-200 cursor-pointer`}
                      onClick={() => playSwara(s)}
                    >
                      <td className="p-2 border border-amber-200 font-bold">
                        {s.shruti} {s.is12Note && '✦'}
                      </td>
                      <td className="p-2 border border-amber-200 text-xs">
                        {s.name}
                      </td>
                      <td className="p-2 border border-amber-200 font-mono">{s.ratio[0]}:{s.ratio[1]}</td>
                      <td className="p-2 border border-amber-200 font-mono">{(s.ratio[0]/s.ratio[1]).toFixed(4)}</td>
                      {/* <td className="p-2 border border-amber-200 font-mono">{s.cents || calculateCents(s.ratio).toFixed(1)}</td> */}
                      <td className="p-2 border border-amber-200 font-mono">{calculateFrequency(s.ratio).toFixed(2)}</td>
                      {/* <td className="p-2 border border-amber-200 font-mono">{getStringPosition(s.ratio)}%</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Learning Tips */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-amber-200">
              <h3 className="text-lg font-semibold text-amber-800 mb-4">👩‍🏫 Learning Exercises</h3>
              <div className="space-y-3">
                <div className="flex gap-3 p-3 bg-amber-50 rounded-lg">
                  <span className="text-xl">1️⃣</span>
                  <div>
                    <strong>Compare adjacent shrutis:</strong> In the 22 Shrutis tab, filter to 'D' family. 
                    Play Shruti #15 → #16 → #17 → #18 in sequence to hear how the pitch gradually rises within the Dhaivatam region.
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-amber-50 rounded-lg">
                  <span className="text-xl">2️⃣</span>
                  <div>
                    <strong>Just vs Pythagorean Tuning:</strong> Compare Shruti #8 (5:4 just major third) with 
                    Shruti #9 (81:64 Pythagorean major third). Both are forms of Gandharam — can students hear the small difference?
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-amber-50 rounded-lg">
                  <span className="text-xl">4️⃣</span>
                  <div>
                    <strong>String position demonstration:</strong> Use the table to show that pressing a veena string 
                    at 66.67% of its length produces Panchamam (3:2), while 75% produces Madhyamam (4:3).
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Further Reading Tab */}
        {activeTab === 'references' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-amber-200">
              <h3 className="text-lg font-semibold text-amber-800 mb-4">📚 Further Reading</h3>
              <p className="text-amber-700 mb-6">
                The following sources were used in creating this tool and provide deeper exploration of the 22 shruti system.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="font-semibold text-amber-800">22shruti.com</div>
                  <div className="text-sm text-amber-700 mt-1">Dr. Vidyadhar Oke's research on 22 shrutis</div>
                  <a href="https://22shruti.com" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                    https://22shruti.com
                  </a>
                  <p className="text-xs text-amber-600 mt-2">
                    Comprehensive resource on shruti positions, ratios, and comparison between Hindustani and Carnatic naming systems.
                  </p>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="font-semibold text-amber-800">Wikipedia: Shruti (music)</div>
                  <div className="text-sm text-amber-700 mt-1">Overview of the shruti concept in Indian classical music</div>
                  <a href="https://en.wikipedia.org/wiki/Shruti_(music)" target="_blank" rel="noopener noreferrer"
                     className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                    https://en.wikipedia.org/wiki/Shruti_(music)
                  </a>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="font-semibold text-amber-800">Lecture: Relevance of 22 shrutis/microtones today</div>
                  <div className="text-sm text-amber-700 mt-1">This is a lecture by Vid. S Sowmya in Madras Music Academy</div>
                  <a href="https://www.youtube.com/watch?v=MbcoX6xXyGA" target="_blank" rel="noopener noreferrer"
                     className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                    Relevance of 22 Srutis/Microtones today | Dr. S Sowmya | 31 Dec 2019 | The Music academy
                  </a>
                </div>
              </div>
            </div>

            {/* Note about variations */}
            <div className="bg-amber-50 rounded-xl p-4 md:p-6 border border-amber-200">
              <h4 className="font-semibold text-amber-800 mb-2">⚠️ A Note on Variations</h4>
              <p className="text-sm text-amber-700">
                Different scholars and traditions may use slightly different frequency ratios for the 22 shrutis, 
                particularly for the microtonal positions between the standard 12 swarasthanas. The ratios used 
                in this tool represent one commonly accepted system based on Pythagorean tuning and just intonation.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-amber-600 text-sm">
          <p>🎵 Carnatic 22 Shruti Explorer</p>
          <p className="text-xs mt-2 text-amber-500">
            Microtonal positions use shruti numbers; traditional names shown only where historically documented.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarnaticSwaraExplorer;
