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
      } else {
        await client.sendText(userId, 'Essa função está desabilitada no momento. Redirecionando para o *Portal Saúde*...');
        await new Promise(resolve => setTimeout(resolve, 2500));
        await voltarAoMenuPrincipal(client, userId, user);
      }
      return;
    }

    // Step 3 - Portal Saúde
    if (user.step === 3) {
      if (msg.includes('marcar exame') || msg.includes('1')) {
        // Lógica de Marcar Exame
        await client.sendText(userId, 'Você pode agendar sua teleconsulta através desse link! \n \n👉 www.teleconsulta.com.br');
        await new Promise(resolve => setTimeout(resolve, 2500));
        await client.sendText(userId, '1️⃣ Agendar retorno\n2️⃣ Validar exame');
        user.step = 7;  // Espera a escolha do usuário entre agendar retorno ou validar exame
      } else if (msg.includes('consultas marcadas') || msg.includes('2')) {
        // Dados fictícios de consultas marcadas para paciente diabético/hipertenso
        await client.sendText(userId, 'Aqui estão suas consultas marcadas:\n\n' +
          '🩺 **Consulta de Acompanhamento - Diabetes Tipo 2**\n' +
          '📅 **Data**: 15/05/2025\n⏰ **Hora**: 14:00\n🏥 **Médico**: Dr. João Silva\n📍 **Unidade**: Hospital São João\n\n' +
          '🩺 **Consulta de Acompanhamento - Hipertensão Arterial**\n' +
          '📅 **Data**: 20/05/2025\n⏰ **Hora**: 09:00\n🏥 **Médico**: Dra. Maria Souza\n📍 **Unidade**: Clínica Saúde em Dia\n\n' +
          '🩺 **Consulta de Retorno - Controle de Diabetes e Hipertensão**\n' +
          '📅 **Data**: 25/05/2025\n⏰ **Hora**: 10:30\n🏥 **Médico**: Dr. Carlos Lima\n📍 **Unidade**: Clínica Conecta Recife\n\n' +
          'Essas são as consultas que estão agendadas no momento. Se precisar de mais alguma informação, estou à disposição!');
        await new Promise(resolve => setTimeout(resolve, 2500));
        await voltarAoMenuPrincipal(client, userId, user);
      } else if (msg.includes('unidades próximas') || msg.includes('3')) {
        await client.sendText(userId, 'Antes de mostrar as unidades mais próximas, precisamos de algumas informações! \n \n📍 Qual o seu CEP? ');
        user.step = 4; // Aguardando o CEP
      } else if (msg.includes('validar exame') || msg.includes('4')) {
        await client.sendText(userId, 'Envie a imagem do seu exame para validação!');
        user.step = 5;
      } else {
        await client.sendText(userId, 'Não entendi! Escolha uma das opções:\n\n1️⃣ *Marcar Exame*\n2️⃣ *Consultas Marcadas*\n3️⃣ *Unidades Próximas*\n4️⃣ *Validar Exame*');
      }
      return;
    }

    // Step 4 - Unidades Próximas (CEP)
    if (user.step === 4) {
      const cep = msg.trim();
      user.cep = cep; // Armazenando o CEP
      await client.sendText(userId, `Agora, só precisamos de uma última informação para encontrar as unidades mais próximas de você!\n\n🏠 Qual o número da sua casa ou apartamento?`);
      user.step = 6; // Passa para o próximo passo (captura do número da casa)
      return;
    }

    // Step 6 - Número da Casa ou Apartamento
    if (user.step === 6) {
      const numeroEndereco = msg.trim();
      user.numeroEndereco = numeroEndereco; // Armazenando o número da casa
      await client.sendText(userId, '🔎 Encontrei!\n\nAqui estão as unidades mais próximas de você:\n\n' +
        '🔹 Drogasil – Unidade Beberibe 💊\n' +
        '📍 Avenida Beberibe, 174 – Recife/PE\n' +
        '⏰ Aberta das 7h às 22h.\n\n' +
        '🔹 Farmácia Popular do Recife Ltda. 💊\n' +
        '📍 Avenida Beberibe, 2031 – Água Fria, Recife/PE\n' +
        '☎️ (81) 3443-0332\n\n' +
        'Essas são as unidades mais próximas. Posso te ajudar com mais alguma coisa?');
      await new Promise(resolve => setTimeout(resolve, 2500));
      await voltarAoMenuPrincipal(client, userId, user); // Volta ao menu do Portal Saúde
      return;
    }

    // Step 7 - Agendar Retorno ou Validar Exame
    if (user.step === 7) {
      if (msg.includes('validar exame') || msg.includes('2')) {
        // Vai para a validação do exame
        await client.sendText(userId, 'Envie a imagem do seu exame para validação!');
        user.step = 5; // Vai para a validação
      } else if (msg.includes('agendar retorno') || msg.includes('1')) {
        await client.sendText(userId, 'Você já validou sua primeira consulta?\n\nCaso ainda não tenha feito isso, valide agora para garantir suas recompensas!');
        await client.sendText(userId, 'O retorno foi agendado no momento da sua última consulta. Acesse o site oficial do Telesaúde para verificar:\n🌐 www.telesaude.com.br');
        await client.sendText(userId, 'Após isso valide seu retorno!\n\n1️⃣ Validar retorno\n2️⃣ Voltar ao menu inicial');
        user.step = 8;  // Aguarda a escolha do usuário
      }
      return;
    }

    // Step 8 - Validar Retorno ou Voltar
    if (user.step === 8) {
      if (msg.includes('validar retorno') || msg.includes('1')) {
        // Vai para a validação de retorno
        await client.sendText(userId, 'Envie o exame de retorno para validação!');
        user.step = 5;  // Valida o retorno
      } else if (msg.includes('voltar ao menu inicial') || msg.includes('2')) {
        // Retorna ao menu inicial
        await voltarAoMenuPrincipal(client, userId, user);
      }
      return;
    }

    // Step 5 - Validar Exame
    if (user.step === 5) {
      if (message.mimetype && message.mimetype.startsWith('image')) {
        await client.sendText(userId, 'Estamos validando essa informação... 👨‍💻');
        await new Promise(resolve => setTimeout(resolve, 5000)); // Simula a validação com uma espera de 5 segundos
        await client.sendText(userId, '✅ Exame Validado Com Sucesso!\nVocê acaba de conquistar +10 moedas Capibas 🪙\nContinue acumulando para desbloquear novas vantagens. 🚀');
        await new Promise(resolve => setTimeout(resolve, 2500));
        await client.sendText(userId, '🚀 Veja aqui no seu Conecta Recife! 😎🥥\n👉 https://conecta.recife.pe.gov.br/ 👈');
        await new Promise(resolve => setTimeout(resolve, 2500));
        await voltarAoMenuPrincipal(client, userId, user); // Retorna ao menu inicial
      } else {
        await client.sendText(userId, 'Por favor, envie um exame em formato de imagem ou PDF para validá-lo.');
        user.step = 5;
      }
      return;
    }
  });
}

async function voltarAoMenuPrincipal(client, userId, user) {
  await client.sendText(userId, '🔄 Voltando ao *Portal Saúde*! Escolha uma das opções abaixo:\n\n1️⃣ *Marcar Exame*\n2️⃣ *Consultas Marcadas*\n3️⃣ *Unidades Próximas*\n4️⃣ *Validar Exame*');
  user.step = 3;  // Retorna para o menu do Portal Saúde
}
