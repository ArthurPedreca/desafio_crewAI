# Assistente Editorial
Esse o código feito para o Desafio Grupo Elo Editorial: Assistente Editorial Multiagente com CrewAI + Gemini. Apesar do título estar especificando o uso do Gemini, eu usei o modelo da openAi o gpt-3.5, 
por conta da simplicidade na hora da criação da API key e por conta do CrewAI ter mais  afinidade com os
modelos da OpenAI. Além disso eu não achei que seria necessário a criação de uma API completa para o projeto, mas de qualquer forma eu criei um arquivo mínimo de uma API que não é totalmente usada pelos agentes, porém de qualquer forma ela funciona corretamente. 

## Para conseguir testar o projeto (e a API se quiser) siga o fluxo a baixo

API simples em Node/Express para (opcional):
- Ler o catálogo (`mock_catalog.json`)
- Listar/criar tickets em `mock_ticket.json`

Sem banco, sem camada extra. É pra fins de teste.

### Estrutura
- `server.js` — API mínima (Node/Express)
- `package.json` — dependências e scripts Node
- `mock_catalog.json` — catálogo mock
- `mock_ticket.json` — tickets mock (criado se não existir)
- `requirements.txt` — deps Python (para o notebook/crewai)
- `agentes.ipynb` — notebook do projeto

### Rodar a API (Node)
1) Instale deps do Node (na raiz do projeto):

```powershell
npm install
```

2) Inicie a API:

```powershell
npm start
```

A API sobe em `http://127.0.0.1:8000`.

### Endpoints
- GET `/catalog`
- GET `/tickets`
- POST `/tickets` (JSON)
  - Exemplo:
    ```json
    {
      "title": "Novo release",
      "description": "Texto base para imprensa",
      "book_title": "A Baleia-azul",
      "priority": "alta"
    }
    ```

### Testes rápidos (PowerShell)
- Catalogo:
  ```powershell
  curl http://127.0.0.1:8000/catalog
  ```
- Tickets:
  ```powershell
  curl http://127.0.0.1:8000/tickets
  ```
- Criar ticket:
  ```powershell
  $body = '{"title":"Novo release","description":"Texto base","book_title":"A Girafa","priority":"media"}'
  curl -Method POST -Uri http://127.0.0.1:8000/tickets -Body $body -ContentType 'application/json'
  ```

Os dados são persistidos em `mock_ticket.json`.

### Notebook/CREWAI 
Se quiser usar o notebook:

1) Crie/ative venv Python (opcional se já existe `.venv`):
```powershell
python -m venv .venv
.\.venv\Scripts\activate
```
2) Instale deps Python:
```powershell
pip install -r requirements.txt
```
3) Abra o notebook:
```powershell
jupyter notebook agentes.ipynb
```
Após abrir o notebook basta rodar cada célula para o funcionamento total dos agentes. 

### O agente entrega 2 tipos de respostas
- Caso os inputs estejam incompletos ele envia somente as informações pesquisadas referente ao livro
- Se inserir todas as informações no campo inputs, ele vai criar um ticket e retornar apenas o essencial sobre o livro pesquisado. 

Tipo de resposta 1: 

O livro A Abelha do autor Milton Célio de Oliveira Filho está disponível nas seguintes lojas: Amazon.com.br, Loja Elo Editorial.

Tipo de resposta 2: (Caso queira testar a crição do ticket):
```json
  {                                                                                                              
    "id": "TCK-20250906-0007",                                                          
    "status": "open",                                            
    "subject": "Dúvida sobre o livro",          
    "title": "A Abelha",                                          
    "author": "Milton Célio de Oliveira Filho"
  }
```
