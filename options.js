class OptionsManager {
    constructor() {
        this.rules = [];
        this.defaultRules = [
            { maxPlayers: 8, rounds: 3, topCut: 0 },      // 4-8 jogadores
            { maxPlayers: 16, rounds: 4, topCut: 4 },     // 9-16 jogadores
            { maxPlayers: 32, rounds: 6, topCut: 8 },     // 17-32 jogadores
            { maxPlayers: 64, rounds: 7, topCut: 8 },     // 33-64 jogadores
            { maxPlayers: 128, rounds: 6, topCut: 16 },   // 65-128 jogadores
            { maxPlayers: 256, rounds: 7, topCut: 16 },   // 129-256 jogadores
            { maxPlayers: 512, rounds: 8, topCut: 16 },   // 256-512 jogadores
            { maxPlayers: 1024, rounds: 9, topCut: 32 },  // 513-1024 jogadores
            { maxPlayers: 2048, rounds: 10, topCut: 32 }, // 1025-2048 jogadores
            { maxPlayers: 999999, rounds: 10, topCut: 64 } // 2049+ jogadores
        ];
    }

    init() {
        this.loadRules();
        this.attachEventListeners();
    }

    loadRules() {
        chrome.storage.local.get(['rules'], (result) => {
            this.rules = result.rules || [...this.defaultRules];
            this.renderRules();
        });
    }

    renderRules() {
        const container = document.getElementById('rules-list');
        container.innerHTML = this.rules.map((rule, index) => `
            <div class="rule-item">
                <div class="rule-inputs">
                    <div class="input-group">
                        <label>Número máximo de jogadores</label>
                        <input type="number" class="max-players" value="${rule.maxPlayers}" min="1">
                    </div>
                    <div class="input-group">
                        <label>Rodadas Swiss</label>
                        <input type="number" class="rounds" value="${rule.rounds}" min="1">
                    </div>
                    <div class="input-group">
                        <label>Top Cut</label>
                        <input type="number" class="top-cut" value="${rule.topCut}" min="0">
                    </div>
                </div>
                <button class="delete-rule" data-index="${index}">🗑️</button>
            </div>
        `).join('');
    }

    attachEventListeners() {
        document.getElementById('add-rule').addEventListener('click', () => {
            this.rules.push({ maxPlayers: 0, rounds: 0, topCut: 0 });
            this.renderRules();
        });

        document.getElementById('save').addEventListener('click', () => {
            this.saveRules();
        });

        document.getElementById('restore').addEventListener('click', () => {
            if (confirm('Tem certeza que deseja restaurar as configurações padrão?')) {
                this.rules = [...this.defaultRules];
                this.renderRules();
                this.saveRules();
            }
        });

        document.getElementById('rules-list').addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-rule')) {
                const index = parseInt(e.target.dataset.index);
                this.rules.splice(index, 1);
                this.renderRules();
            }
        });
    }

    saveRules() {
        // Atualiza os valores baseado nos inputs
        const newRules = [];
        const ruleItems = document.querySelectorAll('.rule-item');
        
        ruleItems.forEach(item => {
            newRules.push({
                maxPlayers: parseInt(item.querySelector('.max-players').value),
                rounds: parseInt(item.querySelector('.rounds').value),
                topCut: parseInt(item.querySelector('.top-cut').value)
            });
        });

        this.rules = newRules;
        chrome.storage.local.set({ rules: this.rules }, () => {
            alert('Configurações salvas com sucesso!');
        });
    }
}

// Inicializa as opções
document.addEventListener('DOMContentLoaded', () => {
    const options = new OptionsManager();
    options.init();
}); 