## Program Rewriting
The four primitive combinators:

```
[A] [B] a = B [A]
[A] [B] b = [[A] B]
    [A] c = [A] [A]
    [A] d =
```

An alternative basis:

```
    [A] a = A
    [A] b = [[A]]
[A] [B] c = [A B]
    [A] d = [A] [A]
    [A] e =
[A] [B] f = [B] [A]
```

The first basis emphasizes the concept of *scope*. I think it can be
motivated from lexical scoping in the lambda calculus, along with
duplication/erasure being tied to the *linear* lambda calculus. So the
first basis seems more foundational.

Why is it good to work at such a low level of semantics? Why not use a
more meaningful basis that deals with e.g. sum and product types?
Consider:

```
 assocl : (a * (b * c)) <-> ((a * b) * c) : assocr
commute :       (a * b) <-> (b * a)       : commute
  uniti :             a <-> (a * 1)       : unite
```

One argument is that it's simply not necessary: "arithmetic"
operations like this are readily recognized with ABCD:

```
           [A] [B] pair exec = [A] [B]
[A] [B] [C] pair pair assocl = [A] [B] pair [C] pair
[A] [B] pair [C] pair assocr = [A] [B] [C] pair pair
        [A] [B] pair commute = [B] [A] pair
                   [A] uniti = [[A] []]
              [[A] []] unite = [A]
```

I really like the idea of code as a cellular automata-like substance,
a kind of "active Legos". It's important to work totally at the
program level, encoding "data" as a program that introduces a value in
to an environment.

## Machine Learning
There are a number of interesting results in machine learning, and
particularly in program synthesis, that I'd like to replicate in the
context of a functional language. Many program synthesis papers use
either Brainfuck or some novel assembly language made in imitation of
e.g. x86.

[Neural Program Synthesis with Priority Queue
Training](https://arxiv.org/abs/1801.03526) was a very surprising
result: you can essentially "bootstrap" a randomly initialized neural
network with its own output and solve basic program synthesis
problems. This seems like a good place to start: a simple
character-to-character model that's able to generate ABCD to solve
e.g. basic operations on polynomials. For example, given the equation:

```
[foo] [bar] pair X = [bar] [foo] pair
```

can we bootstrap a random net to solve for `X`?

There are some other things I'd like to look at, like latent space
embedding, but I think PQT is a good first milestone.

### Architecture
Convolutional (dilated), residual character-to-character.
Sequential (recurrent), with the "stack RNN" structure.

### Tsetlin Machines
[A strange new model](https://arxiv.org/abs/1804.01508), should check
this out.
