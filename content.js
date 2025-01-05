class TopCutCalculator {
  constructor() {
    this.defaultTopCutRules = [
      { maxPlayers: 8, rounds: 3, topCut: 0 },
      { maxPlayers: 16, rounds: 4, topCut: 4 },
      { maxPlayers: 32, rounds: 6, topCut: 8 },
      { maxPlayers: 64, rounds: 7, topCut: 8 },
      { maxPlayers: 128, rounds: 6, topCut: 16 },
      { maxPlayers: 256, rounds: 7, topCut: 16 },
      { maxPlayers: 512, rounds: 8, topCut: 16 },
      { maxPlayers: 1024, rounds: 9, topCut: 32 },
      { maxPlayers: 2048, rounds: 10, topCut: 32 },
      { maxPlayers: Infinity, rounds: 10, topCut: 64 }
    ];
    this.createElements();
    this.attachEventListeners();
  }

  createElements() {
    // Criar FAB
    const fab = document.createElement('button');
    fab.id = 'topcut-fab';
    fab.innerHTML = '📊';
    document.body.appendChild(fab);

    // Criar Modal com novo campo de Top Cut
    const modal = document.createElement('div');
    modal.id = 'topcut-modal';
    modal.innerHTML = `
      <div class="modal-header">
        Calculadora de Top Cut
        <button id="settings-button" class="settings-icon">⚙️</button>
      </div>
      <div class="input-group">
        <label>Número de Jogadores</label>
        <input type="number" id="players-input" placeholder="Auto-detectar">
      </div>
      <div class="input-group">
        <label>Número de Rodadas</label>
        <input type="number" id="rounds-input" placeholder="Auto-detectar">
      </div>
      <div class="input-group">
        <label>Top Cut</label>
        <select id="topcut-input">
          <option value="auto">Auto (Baseado no número de jogadores)</option>
          <option value="0">Sem Top Cut</option>
          <option value="4">Top 4</option>
          <option value="8">Top 8</option>
          <option value="16">Top 16</option>
          <option value="32">Top 32</option>
          <option value="64">Top 64</option>
          <option value="128">Top 128</option>
        </select>
      </div>
      <button class="button" id="calculate-button">Calcular</button>
      <div class="results" id="results"></div>
    `;
    document.body.appendChild(modal);
  }

  attachEventListeners() {
    const fab = document.getElementById('topcut-fab');
    const modal = document.getElementById('topcut-modal');
    const calculateButton = document.getElementById('calculate-button');
    const playersInput = document.getElementById('players-input');

    fab.addEventListener('click', () => {
      const isVisible = modal.style.display === 'block';
      modal.style.display = isVisible ? 'none' : 'block';
      
      if (!isVisible) {
        this.autoDetectValues();
      }
    });

    calculateButton.addEventListener('click', () => {
      this.calculateTopCut();
    });

    // Atualizar top cut automático quando número de jogadores mudar
    playersInput.addEventListener('change', () => {
      const topCutSelect = document.getElementById('topcut-input');
      if (topCutSelect.value === 'auto') {
        const players = parseInt(playersInput.value);
        const suggestedTopCut = this.determineTopCutSize(players);
        this.updateTopCutSuggestion(suggestedTopCut);
      }
    });

    // Adicionar listener para o botão de configurações
    const settingsButton = document.getElementById('settings-button');
    settingsButton.addEventListener('click', () => {
        // Abre a página de opções da extensão
        chrome.runtime.sendMessage({ action: 'openOptions' });
    });
  }

  updateTopCutSuggestion(topCut) {
    const results = document.getElementById('results');
    if (topCut === 0) {
      results.innerHTML = 'Sugestão: Sem Top Cut';
    } else {
      results.innerHTML = `Sugestão: Top ${topCut}`;
    }
  }

  determineTopCutSize(players) {
    const rule = this.defaultTopCutRules.find(r => players <= r.maxPlayers);
    return rule ? rule.topCut : 64;
  }

  calculateTopCut() {
    const playersCount = parseInt(document.getElementById('players-input').value);
    const roundsCount = parseInt(document.getElementById('rounds-input').value);
    const topCutSelect = document.getElementById('topcut-input');
    
    if (!playersCount || !roundsCount) {
      document.getElementById('results').innerHTML = 
        '<span style="color: rgba(255, 255, 255, 0.87)">Por favor, insira todos os valores.</span>';
      return;
    }

    let topCutSize = topCutSelect.value === 'auto' 
      ? this.determineTopCutSize(playersCount)
      : parseInt(topCutSelect.value);

    const results = this.calculatePossibleRecords(roundsCount, topCutSize);
    
    // Calcula a porcentagem do top cut
    const topCutPercentage = topCutSize > 0 
      ? Math.round((topCutSize/playersCount) * 100) 
      : 0;

    document.getElementById('results').innerHTML = `
      <div style="color: rgba(255, 255, 255, 0.87)">
        <div style="margin-bottom: 2px">Top Cut: ${topCutSize === 0 ? 'Sem Top Cut' : `Top ${topCutSize} (${topCutPercentage}%)`}</div>
        <div style="white-space: nowrap">${results}</div>
      </div>
    `;
  }

  async autoDetectValues() {
    const url = window.location.href;
    const tournamentId = url.match(/tournament\/(.*?)(\/|$)/)?.[1];

    if (!tournamentId) return;

    try {
      // Primeiro detectar número de jogadores
      const standingsResponse = await fetch(`https://play.limitlesstcg.com/tournament/${tournamentId}/standings`);
      const standingsText = await standingsResponse.text();
      const playersCount = this.extractPlayersCount(standingsText);

      if (playersCount) {
        // Atualizar número de jogadores
        document.getElementById('players-input').value = playersCount;

        // Encontrar a regra correspondente baseada no número de jogadores
        const rule = this.defaultTopCutRules.find(r => playersCount <= r.maxPlayers);
        
        if (rule) {
          // Atualizar número de rodadas
          document.getElementById('rounds-input').value = rule.rounds;
          
          // Atualizar top cut
          document.getElementById('topcut-input').value = rule.topCut;

          // Calcular automaticamente
          this.calculateTopCut();
        }
      }
    } catch (error) {
      console.error('Erro ao detectar valores:', error);
      document.getElementById('results').innerHTML = 
        '<span style="color: rgba(255, 255, 255, 0.87)">Erro ao detectar valores automaticamente. Por favor, insira manualmente.</span>';
    }
  }

  extractRoundsCount(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Método 1: Procurar na div de informações do torneio
    const tournamentInfo = doc.querySelector('.tournament-info');
    if (tournamentInfo) {
        const infoText = tournamentInfo.textContent;
        const roundsMatch = infoText.match(/Number of Rounds:\s*(\d+)/i);
        if (roundsMatch && roundsMatch[1]) {
            return parseInt(roundsMatch[1]);
        }
    }

    // Método 2: Procurar em elementos específicos que contenham "Number of Rounds"
    const elements = doc.querySelectorAll('div, p, span, td');
    for (const element of elements) {
        if (element.textContent.includes('Number of Rounds')) {
            const roundsMatch = element.textContent.match(/Number of Rounds:\s*(\d+)/i);
            if (roundsMatch && roundsMatch[1]) {
                return parseInt(roundsMatch[1]);
            }
        }
    }

    // Método 3: Procurar na tabela de informações
    const tableRows = doc.querySelectorAll('tr');
    for (const row of tableRows) {
        const text = row.textContent;
        if (text.includes('Number of Rounds')) {
            const roundsMatch = text.match(/(\d+)/);
            if (roundsMatch && roundsMatch[1]) {
                return parseInt(roundsMatch[1]);
            }
        }
    }

    // Método 4: Procurar pelo maior número de rodada nos pairings
    const roundElements = doc.querySelectorAll('[data-round]');
    if (roundElements.length > 0) {
        const rounds = Array.from(roundElements)
            .map(el => parseInt(el.getAttribute('data-round')))
            .filter(num => !isNaN(num));
        if (rounds.length > 0) {
            return Math.max(...rounds);
        }
    }

    console.log('HTML da página:', html); // Debug
    return null;
  }

  extractPlayersCount(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Pegar todas as linhas da tabela, excluindo o cabeçalho
    const rows = doc.querySelectorAll('tbody tr');
    
    // Retorna o número total de linhas (jogadores) menos 1
    return rows.length > 0 ? rows.length - 1 : 0;
  }

  calculatePossibleRecords(rounds, topCutSize) {
    // Array para armazenar todos os possíveis recordes com suas porcentagens
    const possibleRecords = [];
    let remainingSpots = topCutSize;
    
    // Calcula as possibilidades de vitórias necessárias (do melhor ao pior record)
    for (let wins = rounds; wins >= 0; wins--) {
        const losses = rounds - wins;
        // Calcula quantos jogadores teoricamente podem alcançar esse record
        const playersWithThisRecord = this.calculatePossiblePlayers(rounds, wins);
        
        if (playersWithThisRecord > 0) {
            // Se há vagas suficientes para todos com este record, 100% passam
            // Caso contrário, calcula a % que passará
            const chanceToQualify = remainingSpots >= playersWithThisRecord 
                ? 100 
                : Math.round((remainingSpots / playersWithThisRecord) * 100);

            if (chanceToQualify > 0) {
                possibleRecords.push({
                    record: `${wins}-${losses}`,
                    percentage: chanceToQualify
                });
            }

            remainingSpots = Math.max(0, remainingSpots - playersWithThisRecord);
        }
    }
    
    // Pega os 3 melhores recordes
    const topRecords = possibleRecords.slice(0, 3);
    
    // Nova formatação da string de retorno
    return `Recordes:\n${topRecords
        .map(r => `${r.record} (${r.percentage}%)`)
        .join(' | ')}`;
  }

  calculatePossiblePlayers(rounds, wins) {
    // Usando o coeficiente binomial para calcular possíveis combinações
    return this.binomialCoefficient(rounds, wins);
  }

  binomialCoefficient(n, k) {
    let result = 1;
    for (let i = 1; i <= k; i++) {
        result *= (n + 1 - i);
        result /= i;
    }
    return result;
  }

  determineRoundsCount(players) {
    const rule = this.defaultTopCutRules.find(r => players <= r.maxPlayers);
    return rule ? rule.rounds : 10;
  }
}

// Inicializar a calculadora
new TopCutCalculator(); 