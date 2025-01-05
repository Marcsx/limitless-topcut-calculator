# Calculadora de Top Cut - Extensão Chrome para Limitless TCG

## Sobre
Extensão Chrome desenvolvida para calcular o top cut de torneios na plataforma [Limitless TCG](https://play.limitlesstcg.com/tournament).

## Como Usar
1. Insira o link do torneio no formato `/standings` 
   - Exemplo: `https://play.limitlesstcg.com/tournament/67799b5bed2c78098c6afdb7/standings`
   - A extensão utilizará esta página para obter o número total de jogadores

2. A extensão automaticamente:
   - Obtém o número total de jogadores
   - Calcula o número de rodadas Swiss baseado no número de jogadores
   - Determina o tamanho do top cut

## Configurações
A extensão permite personalizar as regras do torneio através do botão de configurações (⚙️):

1. **Editar Regras Existentes**
   - Clique no botão de configurações
   - Modifique os valores de:
     - Número máximo de jogadores
     - Número de rodadas
     - Tamanho do top cut

2. **Adicionar Novas Regras**
   - Clique em "+ Adicionar Regra"
   - Preencha os campos necessários

3. **Remover Regras**
   - Clique no ícone 🗑️ ao lado da regra

4. **Salvar Alterações**
   - Clique em "Salvar" para aplicar as mudanças
   - As configurações são salvas localmente

## Regras Padrão
| Número de Jogadores | Rodadas Swiss | Top Cut |
|-------------------|---------------|----------|
| 4-8 | 3 | Sem Top Cut |
| 9-16 | 4 | Top 4 |
| 17-32 | 6 | Top 8 |
| 33-64 | 7 | Top 8 |
| 65-128 | 6 | Top 16 |
| 129-256 | 7 | Top 16 |
| 256-512 | 8 | Top 16 |
| 513-1024 | 9 | Top 32 (Dia 2) |
| 1025-2048 | 10 | Top 32 (Dia 2) |
| 2049+ | 10 | Top 64 (Dia 2) |

## Resultados
- A calculadora mostrará os valores baseados nas regras configuradas
- Os valores podem ser:
  - Detectados automaticamente
  - Inseridos manualmente
  - Personalizados através das configurações

## Observações Importantes
⚠️ Esta calculadora:
- Considera todos os jogadores inscritos, incluindo drops
- Permite personalização completa das regras
- Salva as configurações localmente
- Usa Material Design com tema escuro

## Personalização
Você pode:
- Modificar as regras padrão
- Adicionar novas regras
- Remover regras existentes
- Restaurar as configurações padrão através do painel de configurações