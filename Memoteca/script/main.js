// Importa todas as funções do arquivo ui.js
// (ui = user interface - toda a lógica de interface)
import * as ui from './ui.js'

// ========== INICIALIZAÇÃO ==========
// Quando esta página carrega, executa automaticamente:
// 1. Configura o botão para abrir o modal de adicionar
// 2. Carrega todos os pensamentos do banco e cria os cards

// inicializar
ui.adicionarPensamento();   // Configura o botão "Adicionar pensamentos"
ui.carregarPensamentos(); // Busca dados e cria os cards na tela