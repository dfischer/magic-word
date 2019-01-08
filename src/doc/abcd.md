ABCD is a purely functional, Turing-complete,
[concatenative](http://tunes.org/~iepos/joy.html) bytecode with four
primitive functions:

```
[A] [B] a = B [A]
[A] [B] b = [[A] B]
    [A] c = [A] [A]
    [A] d =
```

In the equations above, a sequence of code that looks like the pattern
on the left hand side of the equality is replaced with the pattern on
the right. Such a replacement is called a *rewrite*; the repeated
application of rewrites to a volume of code is called *program
rewriting*.

Program rewriting is different from evaluation in typical
languages. Consider the following JavaScript program:

```javascript
let frontPage = await HackerNews.titles();
let relevant = frontPage.filter(x => x.includes("JavaScript"));
let downcase = relevant.map(x => x.toLowerCase());
console.log(downcase);
```

In vanilla JavaScript it is not meaningful to talk about serializing
this program after the first line has finished evaluating. It's not
clear how to save the state of a running JavaScript program, and even
if such a mechanism was created (as it was in Dart with "snapshots"),
the result would not be a "JavaScript program". It would be "something
else", some sort of image file that has to be treated differently from
source code.

In Denshi it is perfectly possible to serialize a program in the
middle of execution, and the result of the serialization is again a
Denshi program.

Because the range of each rewrite is bounded, they can
happen in parallel across a large volume of code. It's sometimes
useful to think of ABCD as a cellular automata, with evaluation as the
time evolution of cells.

ABCD is universal (i.e. Turing-complete); for security purposes,
total subsets may be identified through the use of annotations
and accelerators.
