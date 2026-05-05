# Garatuja

# Como funciona POO

// Classe abstrata (abstração)
abstract class Animal {
  // Atributos (encapsulamento)
  private nome: string;
  protected idade: number;

  // Construtor
  constructor(nome: string, idade: number) {
    this.nome = nome; // uso do this
    this.idade = idade;
  }

  // Getter
  public getNome(): string {
    return this.nome;
  }

  // Setter
  public setNome(nome: string): void {
    this.nome = nome;
  }

  // Método abstrato
  abstract emitirSom(): void;
}

// Herança
class Cachorro extends Animal {
  private raca: string;

  // Construtor com super
  constructor(nome: string, idade: number, raca: string) {
    super(nome, idade); // chama o construtor da classe pai
    this.raca = raca;
  }

  // Getter
  public getRaca(): string {
    return this.raca;
  }

  // Setter
  public setRaca(raca: string): void {
    this.raca = raca;
  }

  // Implementação do método abstrato
  emitirSom(): void {
    console.log("Au Au!");
  }

  // Método próprio
  exibirInfo(): void {
    console.log(`Nome: ${this.getNome()}`);
    console.log(`Idade: ${this.idade}`);
    console.log(`Raça: ${this.raca}`);
  }
}

// Classe principal (execução)
class Main {
  static main(): void {
    const cachorro = new Cachorro("Rex", 3, "Labrador");

    cachorro.emitirSom();
    cachorro.exibirInfo();

    Usando setter
    cachorro.setNome("Max");

    console.log("Novo nome:", cachorro.getNome());
  }
}

// Executando
Main.main();



# Oque cada coisa

1-Classe

É um **molde** para criar objetos.


class Animal
class Cachorro
```

---

### 🔹 Objeto

É uma instância da classe.

```ts
const cachorro = new Cachorro("Rex", 3, "Labrador");
```

---

### 🔹 Atributos

São as características da classe.

```ts
private nome: string;
protected idade: number;
```

---

### 🔹 Métodos

São as ações da classe.

```ts
emitirSom(): void
exibirInfo(): void
```

---

### 🔹 Construtor

Executado quando o objeto é criado.

```ts
constructor(nome: string, idade: number)
```

---

### 🔹 this

Refere-se ao objeto atual.

```ts
this.nome = nome;
```

---

### 🔹 super

Usado para acessar a classe pai.

```ts
super(nome, idade);
```

---

### 🔹 Herança

Uma classe herda de outra.

```ts
class Cachorro extends Animal
```

---

### 🔹 Abstração

Oculta detalhes e define um padrão.

```ts
abstract class Animal
```

E método abstrato:

abstract emitirSom(): void;

Encapsulamento (modificadores de acesso)(

* private → só dentro da classe
* protected → classe + filhas
* public → qualquer lugar 

)

Getters e Setters

Controlam acesso aos atributos.(

getNome()
setNome()

)
