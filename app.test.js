const request = require("supertest");
const { app, resetData } = require("./app");


let server;
let agent;

beforeAll((done) => {
  server = app.listen(() => {
    const port = server.address().port;
    agent = request.agent(`http://localhost:${port}`);
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

beforeEach(() => {
  resetData();
});

describe("Testando o CRUD de Cursos", () => {
  test("Criar um novo curso", async () => {
    const res = await agent.post("/cursos").send({ nome: "JS", cargaHoraria: 40 });
    expect(res.status).toBe(201);
    expect(res.body.nome).toBe("JS");
  });

  // outros testes...
});


  test("Não permitir criar curso com o mesmo nome", async () => {
    await request(server)
      .post("/cursos")
      .send({ nome: "Curso de JavaScript", cargaHoraria: 40 })
      .set("Content-Type", "application/json");

    const response = await request(server)
      .post("/cursos")
      .send({ nome: "Curso de JavaScript", cargaHoraria: 40 })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Já existe um curso com este nome.");
  });

  test("Listar todos os cursos", async () => {
    await request(server)
      .post("/cursos")
      .send({ nome: "Curso de JavaScript", cargaHoraria: 40 });

    const response = await request(server).get("/cursos");
    expect(response.status).toBe(200);
    expect(response.body.cursos).toHaveLength(1);
    expect(response.body.cursos[0].nome).toBe("Curso de JavaScript");
  });

  test("Atualizar um curso", async () => {
    const createResponse = await request(server)
      .post("/cursos")
      .send({ nome: "Curso de JavaScript", cargaHoraria: 40 });

    const cursoId = createResponse.body.id;

    const response = await request(server)
      .put(`/cursos/${cursoId}`)
      .send({ nome: "Curso de Node.js", cargaHoraria: 60 })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe("Curso de Node.js");
    expect(response.body.cargaHoraria).toBe(60);
  });

  test("Excluir um curso", async () => {
    const createResponse = await request(server)
      .post("/cursos")
      .send({ nome: "Curso de JavaScript", cargaHoraria: 40 });

    const cursoId = createResponse.body.id;

    const deleteResponse = await request(server).delete(`/cursos/${cursoId}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.message).toBe("Curso excluído com sucesso.");

    const getResponse = await request(server).get("/cursos");
    expect(getResponse.body.cursos).toHaveLength(0);
  });

describe("Testando o CRUD de Alunos", () => {
  
  test("Criar um novo aluno", async () => {
    const response = await request(server)
      .post("/alunos")
      .send({ nome: "João Silva", email: "joao@exemplo.com" })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.nome).toBe("João Silva");
  });

  test("Listar todos os alunos", async () => {
    await request(server)
      .post("/alunos")
      .send({ nome: "João Silva", email: "joao@exemplo.com" });

    const response = await request(server).get("/alunos");
    expect(response.status).toBe(200);
    expect(response.body.alunos).toHaveLength(1);
    expect(response.body.alunos[0].nome).toBe("João Silva");
  });

  test("Atualizar um aluno", async () => {
    const createResponse = await request(server)
      .post("/alunos")
      .send({ nome: "João Silva", email: "joao@exemplo.com" });

    const alunoId = createResponse.body.id;

    const response = await request(server)
      .put(`/alunos/${alunoId}`)
      .send({ nome: "João Silva Junior", email: "joaojunior@exemplo.com" })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe("João Silva Junior");
    expect(response.body.email).toBe("joaojunior@exemplo.com");
  });

  test("Excluir um aluno", async () => {
    const createResponse = await request(server)
      .post("/alunos")
      .send({ nome: "João Silva", email: "joao@exemplo.com" });

    const alunoId = createResponse.body.id;

    const deleteResponse = await request(server).delete(`/alunos/${alunoId}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.message).toBe("Aluno excluído com sucesso.");

    const getResponse = await request(server).get("/alunos");
    expect(getResponse.body.alunos).toHaveLength(0);
  });

  test("Matricular um aluno em um curso", async () => {
    const alunoResponse = await request(server)
      .post("/alunos")
      .send({ nome: "João Silva", email: "joao@exemplo.com" })
      .set("Content-Type", "application/json");

    const cursoResponse = await request(server)
      .post("/cursos")
      .send({ nome: "Curso de JavaScript", cargaHoraria: 40 })
      .set("Content-Type", "application/json");

    const alunoId = alunoResponse.body.id;
    const cursoId = cursoResponse.body.id;

    const response = await request(server)
      .post(`/alunos/${alunoId}/matricular`)
      .send({ cursoId })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.aluno.cursos).toContain(cursoId);
  });

  test("Não matricular um aluno já matriculado no mesmo curso", async () => {
    const alunoResponse = await request(server)
      .post("/alunos")
      .send({ nome: "João Silva", email: "joao@exemplo.com" })
      .set("Content-Type", "application/json");

    const cursoResponse = await request(server)
      .post("/cursos")
      .send({ nome: "Curso de JavaScript", cargaHoraria: 40 })
      .set("Content-Type", "application/json");

    const alunoId = alunoResponse.body.id;
    const cursoId = cursoResponse.body.id;

    await request(server)
      .post(`/alunos/${alunoId}/matricular`)
      .send({ cursoId })
      .set("Content-Type", "application/json");

    const response = await request(server)
      .post(`/alunos/${alunoId}/matricular`)
      .send({ cursoId })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Aluno já matriculado nesse curso.");
  });

});

