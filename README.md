<br/>
<div align="center">
<a href="https://github.com/GrupoZonaLeste/Projeto_Barbearia">
<img src="//live.staticflickr.com/65535/53784657586_7763a9fea2.jpg" alt="Logo" width="80" height="80">
</a>
<h3 align="center">Projeto Barbearia</h3>
<p align="center">
Revitalize sua Imagem, Assegure sua Confiança e Mantenha sua Lealdade, cada Corte é uma Performance.
<br/>
<br/>
<a href="https://github.com/GrupoZonaLeste/Projeto_Barbearia"><strong>Explore a documentação »</strong></a>
<br/>
<br/>
<a href="https://github.com/GrupoZonaLeste/Projeto_Barbearia"> Demo.</a>  
<a href="https://github.com/GrupoZonaLeste/Projeto_Barbearia/issues">Reporte um Bug .</a>
<a href="https://github.com/GrupoZonaLeste/Projeto_Barbearia/labels/enhancement">Solicite uma Feature</a>
</p>
</div>

 ## 🚧Sobre o projeto

![Tela inicial do site](https://cdn.discordapp.com/attachments/480144183231905794/1234937065561653268/image.png?ex=66328c44&is=66313ac4&hm=778ab4319d65cb902472f1151bd66f72f7c08e59b29e6b5cb3c9dc4dbb94859d&)

Bem-vindo ao nosso site dedicado a oferecer a melhor experiência de agendamento de cortes de cabelo! Nosso objetivo é proporcionar uma plataforma intuitiva e conveniente, onde os clientes possam facilmente marcar seus cortes de cabelo favoritos com os melhores profissionais da área.

Além disso, nossa plataforma não se limita apenas aos clientes. Para os gerentes e funcionários dos salões de beleza, oferecemos ferramentas poderosas de gerenciamento de agendamentos. Com recursos avançados de programação e organização, eles podem gerenciar facilmente a agenda, acompanhar os horários dos clientes e garantir que todos recebam o atendimento excepcional que merecem.
 ### 🛠Tecnologias usadas

As tecnologias utilizadas neste projeto:

- [FastApi](https://nextjs.org)
- [Axios](https://reactjs.org)
- [MongoDB](https://vuejs.org)
- [Bootstrap](https://getbootstrap.com)
 ## 📝Primeiros passos

Aqui vai uma passo a passo de como rodar a aplicação no seu própio ambiente. 
 ### Prerequisites

Certifique-se de ter o Python instalado
  ```sh
  winget install -e --id Python.Python.3.11
  ```
 ### 📦 Instalação

1. Clone o repositório 
   ```sh
   git clone https://github.com/GrupoZonaLeste/Projeto_Barbearia.git
   ```
2. Baixe a extensão python 
     - Name: Python
     - Link: https://marketplace.visualstudio.com/items?itemName=ms-python.python
2. Ative o ambiente virtual python
     - No Vscode: **CTRL+SHIFT+P**
     - selecione: **Python create environment**
2. *Baixe as dependências
caso o ambiente virtual não identifique o arquivo requirements.txt*
   ```sh
   pip install -r requirements
   ```
3. Selecione a pasta do Backend
    ```sh
   cd backend
    ```
4. Rode o uvicorn
   ```sh
   uvicorn main:app --reload
   ```
## Documentação Backend

#### Visualize a Documentação automatica do Swagger

```http
  http://127.0.0.1:8000/docs#/
```
#### BACKEND:
| Pasta   | Arquivo      | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `clientes_pictures` | `*` | Armazena as fotos de perfil dos usuários  |
| `config` | `mongo_db_config.py` | Define a conexão com o mongodb |
| `Controller` | `client.py` | Implementação das funcionalidades do usuário |
| `Controller` | `employee.py` | Implementação das funcionalidades do funcionário |
| `Controller` | `login.py` |Implementação da lógica de login |
| `Controller` | `manager.py` | Implementação das funcionalidades do gerente |
| `Controller` | `schedule.py` | Implementação das funcionalidades de agendamento |
| `Controller` | `tokens.py` | Implementação da geração de token |
| `database` | `connection.py` | Implementa as funções de conexão com o banco (depende da mongo_db_config.py) |
| `database` | `database.py` | Classe para testes|
| `models` | `model.py` | Define o modelo de dados para as entidades do sistema(cliente,gerente,funcionário etc...) |
| `router` | `router_auth` | Define as rotas de autenticação |
| `router` | `router_client.py` | Define as rotas do cliente |
| `router` | `router_employee.py` | Define as rotas do funcionário |
| `router` | `router_manager.py` | Define as rotas do gerente |
| `router` | `router_schedule` | Define as rotas de agendamento |
| `service` | `cors.py` |Configura as permissões de Cors do sistema |
| `BackEnd` | `main.py` | Este arquivo define a aplicação FastAPI principal e inclui as rotas do projeto|

 ## licença 

Distributed under the MIT License. See [MIT License](https://opensource.org/licenses/MIT) for more information.
