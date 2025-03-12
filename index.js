const venom = require('venom-bot');

// Armazena o estado de cada usuário
const userStates = {};

venom.create({
  session: 'conecta-recife',
  headless: false,
  browserArgs: ['--disable-gpu'],
  useChrome: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' // Altere se necessário!
})
.then((client) => start(client))
.catch((erro) => console.log(erro));

function start(client) {
  client.onMessage((message) => {

    if (message.isGroupMsg) return; // Ignorar grupos

    const userId = message.from;
    const msg = message.body.toLowerCase();

    // Se não tem estado, cria um
    if (!userStates[userId]) {
      userStates[userId] = { step: 0 };
    }

    const user = userStates[userId];

    // === Passo 0 - Boas vindas e pedido do CPF ===
    if (user.step === 0) {
      client.sendText(userId, 'Olá!\n\nAntes de prosseguirmos com as opções, devo confirmar sua identidade!\n\nSeu CPF é xxx.xxx.xxx-xx?');
      user.step = 1;
      return;
    }

    // === Passo 1 - Confirmação do CPF ===
    if (user.step === 1) {
      if (msg === 'sim' || msg === 'confirmar') {
        client.sendText(userId, 'Bem-vindo(a)! Esse é o nosso sistema de atendimento do Conecta Recife.\n\nConfira as opções abaixo e escolha a que melhor atende à sua necessidade:\n\n✅ *Desafios Semanais*\n✅ *Validar meu desafio*\n✅ *Saldo de Capibas*');
        user.step = 2;
      } else {
        client.sendText(userId, 'Por favor, confirme seu CPF respondendo *Sim* para continuar!');
      }
      return;
    }

    // === Passo 2 - Menu principal ===
    if (user.step === 2) {

      if (msg.includes('desafios semanais')) {
        client.sendText(userId, 'Quer ver os Desafios Mensais que estão dando o dobro de capibas?\n\n🗓 *Tarefas Mensais* \n💰 Capibas em dobro 💰\n\n✅ Participar de aulas no Compaz / Academia Recife\n   👉 *Meta:* 2x por semana!\n\n✅ Doar sangue nas campanhas apoiadas pelo Conecta Recife\n   👉 Salvar vidas tá na lista! 🩸\n\n✅ Fazer atualização da carteira vacinal\n   👉 Saúde em dia, bora lá! 💉\n\n✅ Adotar um Pet usando Adota Pet do Conecta Recife\n   👉 Novo amigo de quatro patas esperando! 🐶🐱\n\n✅ Levar seu pet para castração ou atualização da carteira vacinal\n   👉 Cuidar da saúde do bichinho também é amor! 🐾');
      }

      else if (msg.includes('validar')) {
        client.sendText(userId, 'Que bom que você cumpriu um desafio!\n\nEscolha uma das categorias abaixo:\n\n🦁 *Animais*\n📝 *Cidadania*\n🚲 *Mobilidade*\n💚 *Saúde e bem estar*\n🌳 *Meio ambiente*');
        user.step = 3;
      }

      else if (msg.includes('saldo')) {
        client.sendText(userId, 'Seu saldo de Capibas é *150 moedas*! 🪙');
      }

      else {
        client.sendText(userId, 'Não entendi! Escolha uma das opções:\n\n✅ *Desafios Semanais*\n✅ *Validar meu desafio*\n✅ *Saldo de Capibas*');
      }

      return;
    }

    // === Passo 3 - Categoria escolhida ===
    if (user.step === 3) {
      client.sendText(userId, `Por favor, informe qual foi a atividade realizada e o desafio cumprido para que possamos validar.\n\nCaso haja algum documento comprobatório, anexe-o para concluir a verificação.`);
      user.step = 4;
      return;
    }

    // === Passo 4 - Espera mensagem ou imagem ===
    if (user.step === 4) {

      if (message.mimetype && message.mimetype.startsWith('image')) {
        client.sendText(userId, 'Estamos validando essa informação...\n\n✅ Parabéns! Sua informação foi validada!\n\nVocê ganhou mais *10 moedas capibas* 🪙!');
        client.sendText(userId, '🌐 Veja aqui o seu Conecta Recife!\n👉 https://conecta.recife.pe.gov.br');
        user.step = 2; // Volta para o menu principal
      } else {
        // Mensagem normal sem imagem
        client.sendText(userId, 'Estamos validando essa informação...\n\n✅ Parabéns! Sua informação foi validada!\n\nVocê ganhou mais *10 moedas capibas* 🪙!');
        client.sendText(userId, '🌐 Veja aqui o seu Conecta Recife!\n👉 https://conecta.recife.pe.gov.br');
        user.step = 2; // Volta para o menu principal
      }

      return;
    }

  });
}
