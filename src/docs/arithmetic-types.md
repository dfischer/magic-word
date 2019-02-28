When creating a programming language, the question arises of what
things should be *primitive* and what things should be defined in
terms of those primitives. I think a good way to tackle this problem
is by appeal to the things that are primitive in the surrounding
intellectual context.

Consider the basic algebraic rules for addition:

```
(a + (b + c)) = ((a + b) + c)    associativity
        a + b = b + a            commutativity
        a + 0 = a                identity
```

These rules say that whenever you have an expression on one side of an
equals sign, you're allowed to transform it in to the expression on
the other side. "Transform" sounds a lot like what functions do, so
let's rewrite those rules using `<->` to mean a pair of functions that
go from left to right and right to left:

```
 assocl: (a + (b + c)) <-> ((a + b) + c) :assocr
commute:       (a + b) <-> (b + a)       :commute
  zeroi:             a <-> (a + 0)       :zeroe
```

These are functions that operate on *sum types*, types of the form
`a + b`. What is a sum type? In keeping with the arithmetic analogy,
think of the expression as representing the *number of values in that
type*. If the type `a` has `a` values, and the type `b` has `b`
values, then the type `a + b` has `a + b` values.

In light of this argument, it's interesting to look at the languages
that do *not* have sum types: C, C++, D, Go, JavaScript, Python, Ruby,
Perl, PHP, Tcl. If no popular languages have sum types, does that mean
they are not primitive? Or does it mean most popular languages have
failed at identifying a good set of primitives? 
