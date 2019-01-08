# Program Synthesis
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

# Neural Networks
Convolutional (dilated), residual character-to-character.
Sequential (recurrent), with the "stack RNN" structure.

# Tsetlin Machines
[A strange new model](https://arxiv.org/abs/1804.01508), should check
this out.
