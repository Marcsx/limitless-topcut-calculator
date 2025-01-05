const translations = {
    en: {
        title: "Top Cut Calculator",
        players: "Players",
        rounds: "Rounds",
        topCut: "Top Cut",
        records: "Records",
        calculate: "Calculate",
        settings: "Settings",
        noTopCut: "No Top Cut"
    },
    pt: {
        title: "Calculadora de Top Cut",
        players: "Jogadores",
        rounds: "Rodadas",
        topCut: "Top Cut",
        records: "Recordes",
        calculate: "Calcular",
        settings: "Configurações",
        noTopCut: "Sem Top Cut"
    }
};

class I18n {
    constructor() {
        this.currentLocale = navigator.language.startsWith('pt') ? 'pt' : 'en';
    }

    t(key) {
        return translations[this.currentLocale][key] || translations['en'][key];
    }
} 