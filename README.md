# APP

GymPass style app.

## Rfs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o numero de check-ins realizados pelo usuario logado;
- [ ] Deve ser possível o usuario obter o seu historico de check-ins;
- [ ] Deve ser possível o usuario buscar academias próximas;
- [ ] Deve ser possível o usuario buscar academias pelo nome;
- [ ] Deve ser possível o usuario realizar check-in em uma academia;
- [ ] Deve ser possível validar um check-in de um usuario;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de négocio)

- [x] O usuário não pode se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer 2 check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não funcionais)

- [x] A senha do usuario precisa estar criptografada;
- [x] Os dados da aplicação precisa estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens página;
- [ ] O usuario deve ser identificado por um JWT (json web token);
