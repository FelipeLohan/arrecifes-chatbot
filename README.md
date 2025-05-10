# 🤖 Portal Saúde Chatbot

Chatbot simples e funcional desenvolvido para atender usuários via **WhatsApp**, fornecendo informações de saúde e facilitando o processo de teleconsulta. O projeto visa melhorar a adesão ao tratamento, além de recompensar os usuários que seguirem corretamente as orientações.

![GitHub repo size](https://img.shields.io/github/repo-size/FelipeLohan/portal-saude-chatbot)
![GitHub last commit](https://img.shields.io/github/last-commit/FelipeLohan/portal-saude-chatbot)
![GitHub issues](https://img.shields.io/github/issues/FelipeLohan/portal-saude-chatbot)

---

## 📚 Sobre o Projeto

O **Portal Saúde Chatbot** é um bot para **WhatsApp**, desenvolvido com **JavaScript** utilizando a biblioteca **Venom Bot**, que facilita a criação de bots para atendimento automatizado. Este chatbot tem como objetivo principal facilitar a comunicação entre usuários e serviços de saúde, proporcionando uma experiência de teleconsulta mais ágil e personalizada. Ele também ajuda na adesão a tratamentos, com recompensas para os usuários que seguirem as orientações.

O chatbot pode ser utilizado em:

* **Unidades de saúde** para automatizar atendimentos e facilitar a teleconsulta;
* **Projetos de saúde pública** voltados para adesão a tratamentos médicos e acompanhamento de pacientes;
* **Iniciativas educacionais** para promoção de saúde e prevenção de doenças;
* **Hospitais e clínicas** que desejam melhorar a comunicação com os pacientes.

---

## 🚀 Tecnologias Utilizadas

* **JavaScript (Node.js)**
* **Venom Bot** (API para criar bots de WhatsApp)

---

## 📂 Estrutura do Projeto

```
📦 portal-saude-chatbot
 ┣ 📜 index.js
 ┣ 📜 package.json
 ┣ 📜 Dockerfile
 ┣ 📜 README.md
 ┗ 📁 node_modules/
```

---

## ▶️ Como Rodar o Projeto Localmente

1. **Clone o repositório:**

```bash
git clone https://github.com/FelipeLohan/portal-saude-chatbot.git
```

2. **Acesse a pasta do projeto:**

```bash
cd portal-saude-chatbot
```

3. **Instale as dependências:**

```bash
npm install
```

4. **Inicie o chatbot:**

```bash
node index.js
```

5. **Escaneie o QR Code no seu WhatsApp para autenticar!**

---

## 🐳 Como Rodar com Docker

Agora o Portal Saúde Chatbot pode ser executado em um container Docker de forma simples!

### 1. **Build da Imagem Docker:**

```bash
docker build -t portal-saude-chatbot .
```

### 2. **Executar o Container:**

```bash
docker run -it --rm --name portal-saude-chatbot portal-saude-chatbot
```

> O parâmetro `-it` é importante para que você consiga visualizar o QR Code e escaneá-lo com o WhatsApp.

---

### 3. **Persistência de Sessão (Evitar escanear o QR toda vez):**

Para manter a sessão ativa e não precisar escanear o QR Code sempre que iniciar o container, você pode montar um volume local para armazenar os dados de sessão do Venom Bot.

#### Exemplo de execução com volume de persistência:

```bash
docker run -it --rm \
  -v $(pwd)/tokens:/usr/src/app/tokens \
  portal-saude-chatbot
```

### 4. **Ajuste no Código para Persistência:**

Garanta que o seu `index.js` está configurado para salvar a sessão no diretório `tokens/`.

Exemplo de configuração no Venom Bot:

```javascript
const venom = require('venom-bot');

venom
  .create({
    session: 'saude-session',
    multidevice: true, // Para dispositivos múltiplos
    folderNameToken: 'tokens' // <-- Aqui você garante que o token seja salvo no volume
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.body === 'Oi' || message.body === 'Olá') {
      client.sendText(message.from, 'Olá! Eu sou o Portal Saúde Chatbot 🤖');
    }
    // Adicione mais regras de interação aqui, focadas em teleconsultas e adesão a tratamentos
  });
}
```

---

## 💡 Funcionalidades

* **Atendimento automatizado via WhatsApp** para orientação sobre saúde.
* **Facilitação de teleconsultas** com mensagens personalizadas e interativas.
* **Recompensa ao usuário** que seguir orientações sobre tratamentos médicos.
* **Fluxo de perguntas e respostas simples** para esclarecimento de dúvidas de saúde.
* **Fácil de customizar** para novos fluxos de interação ou novos tratamentos.

---

## ✨ Melhorias Futuras (Sugestões)

* **Integração com banco de dados** para histórico de interações e acompanhamento de pacientes.
* **Implementação de NLP** para respostas mais inteligentes, por exemplo, com Dialogflow ou Watson.
* **Painel de administração** para gerenciar conversas em tempo real e monitorar a adesão aos tratamentos.
* **Deploy em servidores cloud** para manter o bot online 24/7.
* **Sistema de gamificação** para incentivar a adesão a tratamentos, com pontos e recompensas.

---

## 🤝 Contribuição

Contribuições são super bem-vindas! Segue o passo a passo caso queira colaborar:

1. Fork este repositório
2. Crie uma branch (`git checkout -b feature/minha-nova-funcionalidade`)
3. Commit suas alterações (`git commit -m 'feat: minha nova funcionalidade'`)
4. Push para a branch (`git push origin feature/minha-nova-funcionalidade`)
5. Abra um Pull Request!

---

## 📄 Licença

Este projeto está sob a licença MIT.
Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🙋‍♂️ Autores

Feito com ❤️ por **Felipe Lohan (Desenvolvedor)**, **Vinicius Gomes (Desenvolvedor e CyberSecurity)** e **Heitor Sette (Gestor do projeto)**.