const venom = require('venom-bot');

const userStates = {};

venom.create({
  session: 'conecta-recife',
  headless: false,
  browserArgs: ['--disable-gpu'],
  useChrome: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
})
.then((client) => start(client))
.catch((erro) => console.log(erro));

function start(client) {
  client.onMessage(async (message) => {
    if (message.isGroupMsg) return;

    const userId = message.from;
    const msg = message.body.toLowerCase();

    if (!userStates[userId]) {
      userStates[userId] = { step: 0 };
    }

    const user = userStates[userId];

    if (user.step === 0) {
      await client.sendText(userId, 'Olá!\n\nAntes de prosseguirmos com as opções, devo confirmar sua identidade!\n\nSeu CPF é xxx.xxx.xxx-xx?');
      user.step = 1;
      return;
    }

    if (user.step === 1) {
      if (msg === 'sim' || msg === 'confirmar') {
        await client.sendText(userId, 'Bem-vindo(a)! Esse é o nosso sistema de atendimento do Conecta Recife.\n\nConfira as opções abaixo e escolha a que melhor atende à sua necessidade:\n\n1️⃣ *Desafios Mensais*\n2️⃣ *Validar meu desafio*\n3️⃣ *Saldo de Capibas*\n4️⃣ *O que é a moeda Capiba?*');
        user.step = 2;
      } else {
        await client.sendText(userId, 'Por favor, confirme seu CPF respondendo *Sim* para continuar!');
      }
      return;
    }

    if (user.step === 2) {
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (msg.includes('desafios mensais') || msg.includes('1')) {
        await client.sendText(userId,
          'Quer ver os Desafios Mensais que estão dando o dobro de capibas?\n\n' +
          '🗓 *Tarefas Mensais* \n💰 Capibas em dobro 💰\n\n' +
          '✅ Participar de aulas no Compaz / Academia Recife\n👉 *Meta:* 2x por semana!\n\n' +
          '✅ Doar sangue nas campanhas apoiadas pelo Conecta Recife\n👉 Salvar vidas tá na lista! 🩸\n\n' +
          '✅ Fazer atualização da carteira vacinal\n👉 Saúde em dia, bora lá! 💉\n\n' +
          '✅ Adotar um Pet usando Adota Pet do Conecta Recife\n👉 Novo amigo de quatro patas esperando! 🐶🐱\n\n' +
          '✅ Levar seu pet para castração ou atualização da carteira vacinal\n👉 Cuidar da saúde do bichinho também é amor! 🐾'
        );
        await voltarAoMenuPrincipal(client, userId, user);
      } else if (msg.includes('validar') || msg.includes('2')) {
        await client.sendText(userId, 'Que bom que você cumpriu um desafio!\n\nEscolha uma das categorias que mais se enquadra abaixo:\n\n1️⃣ 🦁 *Animais*\n2️⃣ 📝 *Cidadania*\n3️⃣ 🚲 *Mobilidade*\n4️⃣ 💚 *Saúde e bem estar*\n5️⃣ 🌳 *Meio ambiente*');
        user.step = 3;
      } else if (msg.includes('saldo') || msg.includes('3')) {
        await client.sendText(userId, '🌐 Veja seu saldo aqui no seu Conecta Recife!\n👉 https://conecta.recife.pe.gov.br');
        await voltarAoMenuPrincipal(client, userId, user);
      } else if (msg.includes('moeda capiba') || msg.includes('4')) {
        await client.sendText(userId, 'A moeda *Capiba* é um incentivo digital oferecido pelo Conecta Recife. Você pode acumular Capibas ao participar de desafios e atividades da comunidade e trocá-los por benefícios!');
        await voltarAoMenuPrincipal(client, userId, user);
      } else {
        await client.sendText(userId, 'Não entendi! Escolha uma das opções:\n\n1️⃣ *Desafios Mensais*\n2️⃣ *Validar meu desafio*\n3️⃣ *Saldo de Capibas*\n4️⃣ *O que é a moeda Capiba?*');
      }
      return;
    }

    if (user.step === 3) {
      await client.sendText(userId,
        `Por favor, informe qual foi a atividade realizada e o desafio cumprido para que possamos validar.\n\n` +
        `Caso haja algum documento comprobatório, anexe-o para concluir a verificação.`
      );
      user.step = 4;
      return;
    }

    if (user.step === 4) {
      await client.sendText(userId, 'Estamos validando essa informação... 👨‍💻');
      await new Promise(resolve => setTimeout(resolve, 6000));

      if (message.mimetype && message.mimetype.startsWith('image')) {
        await client.sendText(userId, 'Estamos validando essa informação...\n\n✅ Parabéns! Sua informação foi validada!\n\nVocê ganhou mais *10 moedas capibas* 🪙!');
        await new Promise(resolve => setTimeout(resolve, 2500));
        await client.sendText(userId, '🌐 Veja aqui o seu Conecta Recife!\n👉 https://conecta.recife.pe.gov.br');
      } else {
        await client.sendText(userId, 'Você não mandou um Documento válido! ⛔, tente novamente!');
        user.step = 3;
      }
      await new Promise(resolve => setTimeout(resolve, 2500));
      await voltarAoMenuPrincipal(client, userId, user);
      return;
    }
  });
}

async function voltarAoMenuPrincipal(client, userId, user) {
  await client.sendText(userId, '🔄 Voltando ao menu principal!\n\nEscolha a opção que melhor atende à sua necessidade:\n\n1️⃣ *Desafios Mensais*\n2️⃣ *Validar meu desafio*\n3️⃣ *Saldo de Capibas*\n4️⃣ *O que é a moeda Capiba?*');
  user.step = 2;
}
