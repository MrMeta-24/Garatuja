# Garatuja

# Como funciona POO

### 1-Classe

É um **molde** para criar objetos.

```
class Animal
class Cachorro
```

---

### 2-Objeto

É uma instância da classe.

```
const cachorro = new Cachorro("Rex", 3, "Labrador");
```

---

### 3-Atributos

São as características da classe.

```
private nome: string;
protected idade: number;
```

---

### 4-Métodos

São as ações da classe.

```
emitirSom(): void
exibirInfo(): void
```

---

### 5-Construtor

Executado quando o objeto é criado.

```
constructor(nome: string, idade: number)
```

---

### 6-this

Refere-se ao objeto atual.

```
this.nome = nome;
```

---

### 7-super

Usado para acessar a classe pai.

```
super(nome, idade);
```

---

### 8-Herança

Uma classe herda de outra.

```
class Cachorro extends Animal
```

---

### 9-Abstração

Oculta detalhes e define um padrão.

```
abstract class Animal
```

E método abstrato:

```
abstract emitirSom(): void;
```

### 10-Encapsulamento (modificadores de acesso)

```
* private → só dentro da classe
* protected → classe + filhas
* public → qualquer lugar 
```

### 11-Getters e Setters

Controlam acesso aos atributos.
```
getNome()
setNome()
```
