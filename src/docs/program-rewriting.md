Magic Word's bytecode is a *term rewriting system*.

```
[A] [B] a = B [A]    apply
```

Capture and escape.

We want to change `[A] [B]` so that `B` is guaranteed to observe
`[A]`, so we rewrite it to `[[A] B]`.

We want to change `[A] [B]` so that `B` does not observe `[A]`, so
rewrite it to `B [A]`.

Let's go through these rules one by one:

`apply` and `bind` model the sort of *lexical scope* you see in the
lambda calculus:

```
(lambda (x)
  (lambda (y)
    (x y)))
```

Time flows from left to right, so a value can "see" values on its
left, and "cannot see" values on its right.

When you have a block of code, you can determine the things it sees
with `bind`, and the things it doesn't see with `apply`.

Why is rewriting useful? You can "stop" a computation at any point,
and the result is a valid program. Because our programs are pure, we
can then move this program across machines, as it will not capture any
ephemeral resources; because our programs are combinatory, this
doesn't require any tricky bundling of the current lexical
environment.
