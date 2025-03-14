# 🤖 Arrecifes Chatbot

Chatbot simples e funcional desenvolvido para atender usuários via **WhatsApp**, fornecendo informações e interações de forma prática e objetiva. O projeto pode ser utilizado como base para outros assistentes virtuais, sendo fácil de entender e customizar.

![GitHub repo size](https://img.shields.io/github/repo-size/FelipeLohan/arrecifes-chatbot)
![GitHub last commit](https://img.shields.io/github/last-commit/FelipeLohan/arrecifes-chatbot)
![GitHub issues](https://img.shields.io/github/issues/FelipeLohan/arrecifes-chatbot)

---

## 📚 Sobre o Projeto

O **Arrecifes Chatbot** é um bot para **WhatsApp**, desenvolvido com **JavaScript** utilizando a biblioteca **Venom Bot**, que facilita a criação de bots para atendimento automatizado. Ele é simples, direto e ideal para quem quer entender o básico sobre automação no WhatsApp ou criar fluxos de conversa personalizados.

Pode ser utilizado em:
- Pequenas empresas que queiram implementar um atendimento automatizado no WhatsApp;
- Projetos educacionais e de demonstração de automação;
- Base para expandir e criar bots mais complexos.

---

## 🚀 Tecnologias Utilizadas

- **JavaScript (Node.js)**
- **Venom Bot** (API para criar bots de WhatsApp)
  
---

## 📂 Estrutura do Projeto

```
📦 arrecifes-chatbot
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
git clone https://github.com/FelipeLohan/arrecifes-chatbot.git
```

2. **Acesse a pasta do projeto:**

```bash
cd arrecifes-chatbot
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

Agora o Arrecifes Chatbot pode ser executado em um container Docker de forma simples!

### 1. **Build da Imagem Docker:**

```bash
docker build -t arrecifes-chatbot .
```

### 2. **Executar o Container:**

```bash
docker run -it --rm --name arrecifes-chatbot arrecifes-chatbot
```

> O parâmetro `-it` é importante para que você consiga visualizar o QR Code e escaneá-lo com o WhatsApp.

---

### 3. **Persistência de Sessão (Evitar escanear o QR toda vez):**

Para manter a sessão ativa e não precisar escanear o QR Code sempre que iniciar o container, você pode montar um volume local para armazenar os dados de sessão do Venom Bot.

#### Exemplo de execução com volume de persistência:
```bash
docker run -it --rm \
  -v $(pwd)/tokens:/usr/src/app/tokens \
  arrecifes-chatbot
```

### 4. **Ajuste no Código para Persistência:**

Garanta que o seu `index.js` está configurado para salvar a sessão no diretório `tokens/`.  
Exemplo de configuração no Venom Bot:
```javascript
const venom = require('venom-bot');

venom
  .create({
    session: 'session-name',
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
      client.sendText(message.from, 'Olá! Eu sou o Arrecifes Chatbot 🤖');
    }
    // Adicione mais regras de interação aqui!
  });
}
```

---

## 💡 Funcionalidades

- Atendimento automatizado via **WhatsApp**
- Mensagens personalizadas e interativas
- Fluxo de perguntas e respostas simples
- Fácil de customizar para novas demandas

---

## ✨ Melhorias Futuras (Sugestões)

- Integração com banco de dados para histórico de conversas
- Implementação de NLP para respostas mais inteligentes (Dialogflow, Watson)
- Painel de administração para gerenciar as conversas em tempo real
- Deploy em servidores cloud para manter o bot 24/7 online

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

Feito com ❤️ por **Felipe Lohan** e **Vinicius Gomes**
