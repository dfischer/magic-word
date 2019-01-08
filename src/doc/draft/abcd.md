TODO

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
