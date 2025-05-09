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

    // Step 0 - Confirmação do CPF
    if (user.step === 0) {
      await client.sendText(userId, 'Olá!\n\nAntes de prosseguirmos com as opções, devo confirmar sua identidade!\n\nSeu CPF é xxx.xxx.xxx-xx?');
      user.step = 1;
      return;
    }

    // Step 1 - Confirmar CPF
    if (user.step === 1) {
      if (msg === 'sim' || msg === 'confirmar') {
        await client.sendText(userId, 'Bem-vindo(a)! Esse é o nosso sistema de atendimento do Conecta Recife.\n\nConfira as opções abaixo e escolha a que melhor atende à sua necessidade:\n\n1️⃣ *Portal Saúde*\n2️⃣ *Desafios Mensais*\n3️⃣ *Validar meu desafio*\n4️⃣ *Saldo de Capibas*\n5️⃣ *O que é a moeda Capiba?*');
        user.step = 2;
      } else {
        await client.sendText(userId, 'Por favor, confirme seu CPF respondendo *Sim* para continuar!');
      }
      return;
    }

    // Step 2 - Menu Principal
    if (user.step === 2) {
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (msg.includes('portal saúde') || msg.includes('1')) {
        await client.sendText(userId, 'Bem-vindo ao Portal Saúde! Escolha uma das opções abaixo:\n\n1️⃣ *Marcar Exame*\n2️⃣ *Consultas Marcadas*\n3️⃣ *Unidades Próximas*\n4️⃣ *Validar Exame*');
        user.step = 3;
      } else if (msg.includes('desafios mensais') || msg.includes('2')) {
        // Logic for Desafios Mensais...
      } else if (msg.includes('validar') || msg.includes('3')) {
        // Logic for Validar Meu Desafio...
      } else if (msg.includes('saldo') || msg.includes('4')) {
        // Logic for Saldo de Capibas...
      } else if (msg.includes('moeda capiba') || msg.includes('5')) {
        // Logic for O que é a moeda Capiba...
      } else {
        await client.sendText(userId, 'Não entendi! Escolha uma das opções:\n\n1️⃣ *Portal Saúde*\n2️⃣ *Desafios Mensais*\n3️⃣ *Validar meu desafio*\n4️⃣ *Saldo de Capibas*\n5️⃣ *O que é a moeda Capiba?*');
      }
      return;
    }

    // Step 3 - Portal Saúde
    if (user.step === 3) {
      if (msg.includes('marcar exame') || msg.includes('1')) {
        await client.sendText(userId, 'Você pode agendar seu exame através deste link: https://www.telesaude.com.br');
        await new Promise(resolve => setTimeout(resolve, 2500));
        await voltarAoMenuPrincipal(client, userId, user);
      } else if (msg.includes('consultas marcadas') || msg.includes('2')) {
        await client.sendText(userId, 'Aqui estão suas consultas marcadas: [Lista de consultas]');
        await new Promise(resolve => setTimeout(resolve, 2500));
        await voltarAoMenuPrincipal(client, userId, user);
      } else if (msg.includes('unidades próximas') || msg.includes('3')) {
        await client.sendText(userId, 'Qual o seu CEP para encontrarmos as unidades mais próximas?');
        user.step = 4;
      } else if (msg.includes('validar exame') || msg.includes('4')) {
        await client.sendText(userId, 'Envie a imagem do seu exame para validação!');
        user.step = 5;
      } else {
        await client.sendText(userId, 'Não entendi! Escolha uma das opções:\n\n1️⃣ *Marcar Exame*\n2️⃣ *Consultas Marcadas*\n3️⃣ *Unidades Próximas*\n4️⃣ *Validar Exame*');
      }
      return;
    }

    // Step 4 - Unidades Próximas
    if (user.step === 4) {
      const cep = msg.trim();
      await client.sendText(userId, `Aguarde enquanto buscamos as unidades próximas ao seu CEP: ${cep}...`);
      await new Promise(resolve => setTimeout(resolve, 2500));
      await client.sendText(userId, 'Aqui estão as unidades mais próximas:\n[Lista de unidades]');
      await new Promise(resolve => setTimeout(resolve, 2500));
      await voltarAoMenuPrincipal(client, userId, user);
      return;
    }

    // Step 5 - Validar Exame
    if (user.step === 5) {
      if (message.mimetype && message.mimetype.startsWith('image')) {
        await client.sendText(userId, 'Exame validado com sucesso! Você ganhou *10 moedas capibas*!');
        await new Promise(resolve => setTimeout(resolve, 2500));
        await client.sendText(userId, '🌐 Veja aqui o seu Conecta Recife!\n👉 https://conecta.recife.pe.gov.br');
      } else {
        await client.sendText(userId, 'Por favor, envie um exame em formato de imagem ou PDF para validá-lo.');
        user.step = 5;
      }
      await new Promise(resolve => setTimeout(resolve, 2500));
      await voltarAoMenuPrincipal(client, userId, user);
      return;
    }
  });
}

async function voltarAoMenuPrincipal(client, userId, user) {
  await client.sendText(userId, '🔄 Voltando ao menu principal!\n\nEscolha a opção que melhor atende à sua necessidade:\n\n1️⃣ *Portal Saúde*\n2️⃣ *Desafios Mensais*\n3️⃣ *Validar meu desafio*\n4️⃣ *Saldo de Capibas*\n5️⃣ *O que é a moeda Capiba?*');
  user.step = 2;
}
