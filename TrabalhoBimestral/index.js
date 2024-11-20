const express = require("express");
const rotas = express();
const Sequelize = require("sequelize");
const cors = require("cors");

//### Configuração do CORS ###
rotas.use(cors()); // Permitir todas as origens

//### Banco de dados ###
const conexaoBanco = new Sequelize("fornecedores", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// Teste de conexão com o banco de dados
conexaoBanco
  .authenticate()
  .then(() => console.log("Conectado com sucesso ao banco de dados"))
  .catch((error) => console.error("Erro ao conectar ao banco de dados:", error));

// Criar tabela Fornecedor
const Fornecedor = conexaoBanco.define("fornecedors", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cnpj: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  tipo: {
    type: Sequelize.ENUM("Físico", "Jurídico"),
    allowNull: false,
  },
  cidade: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bairro: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true, // Validação para garantir que o email esteja no formato correto
    },
  },
  produto: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  valor: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
});

// Sincronizar tabela (criar se não existir)
Fornecedor.sync({ force: false });

//### Rotas ###
// Rota principal
rotas.get("/", (req, res) => {
  res.send("Rota principal de Fornecedores");
});

// Criar um novo fornecedor
rotas.get("/salvar/:nome/:cnpj/:tipo/:cidade/:bairro/:telefone/:email/:produto/:valor", async (req, res) => {
  const { nome, cnpj, tipo, cidade, bairro, telefone, email, produto, valor } = req.params;

  try {
    const novoFornecedor = await Fornecedor.create({
      nome,
      cnpj,
      tipo,
      cidade,
      bairro,
      telefone,
      email,
      produto,
      valor: parseFloat(valor), // Garantir que o valor seja um número
    });

    res.json({
      resposta: "Fornecedor criado com sucesso",
      fornecedor: novoFornecedor,
    });
  } catch (error) {
    res.status(500).json({ mensagem: `Erro ao criar fornecedor: ${error.message}` });
  }
});

// Deletar um fornecedor
rotas.get("/deletar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Fornecedor.destroy({
      where: { id: parseInt(id, 10) },
    });

    if (deleted) {
      res.json({ mensagem: "Fornecedor deletado com sucesso!" });
    } else {
      res.status(404).json({ mensagem: "Fornecedor não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensagem: `Erro ao deletar fornecedor: ${error.message}` });
  }
});

// Atualizar um fornecedor
rotas.get("/atualizar/:id/:nome/:cnpj/:tipo/:cidade/:bairro/:telefone/:email/:produto/:valor", async (req, res) => {
  const { id, nome, cnpj, tipo, cidade, bairro, telefone, email, produto, valor } = req.params;

  try {
    const [updated] = await Fornecedor.update(
      { nome, cnpj, tipo, cidade, bairro, telefone, email, produto, valor: parseFloat(valor) },
      { where: { id: parseInt(id, 10) } }
    );

    if (updated) {
      res.json({ mensagem: "Fornecedor atualizado com sucesso!" });
    } else {
      res.status(404).json({ mensagem: "Fornecedor não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensagem: `Erro ao atualizar fornecedor: ${error.message}` });
  }
});

// Exibir todos os fornecedores
rotas.get("/mostrar", async (req, res) => {
  try {
    const fornecedores = await Fornecedor.findAll();
    res.json(fornecedores);
  } catch (error) {
    res.status(500).json({ mensagem: `Erro ao buscar fornecedores: ${error.message}` });
  }
});

//### Servidor ###
rotas.listen(3031, () => {
  console.log("Servidor rodando na porta 3031: http://localhost:3031/mostrar");
});
