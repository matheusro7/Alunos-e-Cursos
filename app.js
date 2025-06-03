const express = require("express");
const app = express();

app.use(express.json());

// Estado em memória
const cursos = [];
const alunos = [];

let proximoCursoId = 1;
let proximoAlunoId = 1;

// Função para resetar estado (para testes)
function resetData() {
  cursos.length = 0;
  alunos.length = 0;
  proximoCursoId = 1;
  proximoAlunoId = 1;
}

// Rotas de cursos
app.get("/cursos", (req, res) => {
  res.json({ message: "Lista de cursos cadastrados.", cursos });
});

app.get("/cursos/:id", (req, res) => {
  const curso = cursos.find((c) => c.id === parseInt(req.params.id));
  if (!curso) return res.status(404).json({ message: "Curso não encontrado." });
  res.json(curso);
});

app.post("/cursos", (req, res) => {
  const { nome, cargaHoraria } = req.body;
  if (!nome || !cargaHoraria || typeof cargaHoraria !== "number") {
    return res.status(400).json({ message: "Nome e cargaHoraria (número) são obrigatórios." });
  }
  const duplicado = cursos.find((c) => c.nome.toLowerCase() === nome.toLowerCase());
  if (duplicado) return res.status(409).json({ message: "Já existe um curso com este nome." });

  const novoCurso = { id: proximoCursoId++, nome, cargaHoraria };
  cursos.push(novoCurso);
  res.status(201).json(novoCurso);
});

app.put("/cursos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const curso = cursos.find((c) => c.id === id);
  if (!curso) return res.status(404).json({ message: "Curso não encontrado." });

  const { nome, cargaHoraria } = req.body;
  if (!nome || !cargaHoraria || typeof cargaHoraria !== "number") {
    return res.status(400).json({ message: "Nome e cargaHoraria (número) são obrigatórios." });
  }

  curso.nome = nome;
  curso.cargaHoraria = cargaHoraria;
  res.json(curso);
});

app.delete("/cursos/:id", (req, res) => {
  const index = cursos.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Curso não encontrado." });
  cursos.splice(index, 1);
  res.json({ message: "Curso excluído com sucesso." });
});

// Rotas de alunos
app.get("/alunos", (req, res) => {
  res.json({ message: "Lista de alunos cadastrados.", alunos });
});

app.post("/alunos", (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) return res.status(400).json({ message: "Nome e email são obrigatórios." });

  const novoAluno = { id: proximoAlunoId++, nome, email, cursos: [] };
  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});

app.put("/alunos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const aluno = alunos.find((a) => a.id === id);
  if (!aluno) return res.status(404).json({ message: "Aluno não encontrado." });

  const { nome, email } = req.body;
  if (!nome || !email) return res.status(400).json({ message: "Nome e email são obrigatórios." });

  aluno.nome = nome;
  aluno.email = email;
  res.json(aluno);
});

app.delete("/alunos/:id", (req, res) => {
  const index = alunos.findIndex((a) => a.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Aluno não encontrado." });
  alunos.splice(index, 1);
  res.json({ message: "Aluno excluído com sucesso." });
});

app.post("/alunos/:id/matricular", (req, res) => {
  const aluno = alunos.find((a) => a.id === parseInt(req.params.id));
  if (!aluno) return res.status(404).json({ message: "Aluno não encontrado." });

  const { cursoId } = req.body;
  const curso = cursos.find((c) => c.id === cursoId);
  if (!curso) return res.status(404).json({ message: "Curso não encontrado." });

  if (aluno.cursos.includes(cursoId)) {
    return res.status(400).json({ message: "Aluno já está matriculado neste curso." });
  }

  aluno.cursos.push(cursoId);
  res.json({ message: "Aluno matriculado com sucesso!", aluno });
});

module.exports = { app, resetData };
