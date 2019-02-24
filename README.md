# Magic Word
A Forth-based FaaS platform. Typed, purely functional concatenative
code for scripting the web — and others! With deep learning! 🚀

## Table of contents
- [About](#about)
- [Getting Started](#getting-started)
- [ABC](#abc)
  - [Inference](#inference)
- [Architecture](#architecture)
- [Roadmap](#roadmap)
- [License](#license)

## About
Magic Word is a function-as-a-service (FaaS) platform where users
collaboratively write code that executes in a server-side container.

My vision for Magic Word is something similar to
[Glitch](https://glitch.com/) and [IFTTT](https://ifttt.com/): a way
for small groups of developers to collaborate on a running program,
with an emphasis on integration with web services and generation of
audiovisual content.

## Getting Started
`dotnet run --project ./src/MagicWord.Web/MagicWord.Web.fsproj` will
(eventually) start the web service.

## ABC
Magic Word uses a minimalist, purely functional dialect of Forth known
as *ABC*.

```
[A] [B] a = B [A]
[A] [B] b = [[A] b]
    [A] c = [A] [A]
    [A] d =
[A] s B r = [B] A

/foo    symbols, the use/mention distinction for words
#foo    tags, identity functions with unobservable effects
!foo    bangs, side effects using linear capabilities
```

I'm hoping that Forth's word-at-a-time model will lend itself well to
formal manipulation by program synthesizers, and in particular neural
language models. I view this as a similar argument to Lisp lending
itself well to manipulation by macros due to its simplistic syntax.

### Inference
I'm interested in [deep
inference](http://alessio.guglielmi.name/res/cos/) and hope to combine
this with [illative
logic](https://www.semanticscholar.org/paper/Systems-of-Illative-Combinatory-Logic-Complete-for-Barendregt-Bunder/f3093a1cec21b03d03f99aca549b74aab8a4e545)
as a way to build ad-hoc type systems, with support for features like
typeclasses and more. I'll also mention [computability
logic](http://www.csc.villanova.edu/~japaridz/CL/), but I still need
to think about applications of this.

## Architecture
`MagicWord.Lang` implements ABC. `MagicWord.Web` is a web server. The
idea is that routes like `/words/foo` will show the execution of the
word named `foo`.

There will probably be additional things like IRC and Twitter clients
as well.

## Roadmap
I'd like to use Magic Word to explore a number of experimental ideas
in programming languages and machine learning:

### Programming on a mobile device
Smartphones have been around for many years now but they're still not
good environments for writing code. I have some ideas about this that
I'd like to try out, in particular: programming on a mobile device
should not feel like "writing code", it should feel more like googling
for a function. Consider [SmartSynth: Synthesizing Smartphone
Automation Scripts from Natural
Language](https://www.microsoft.com/en-us/research/publication/smartsynth-synthesizing-smartphone-automation-scripts-natural-language/).

### Recreate results from [Neural Program Synthesis with Priority Queue Training](https://arxiv.org/abs/1801.03526)

Character and word based neural language models achieve good results
and are now commonplace. The word-at-a-time model seems to be a
natural fit for Forth, and I'd like to generate Forth code with these
techniques.

### Recreate graphics/audio programming model from [IBNIZ](http://pelulamu.net/ibniz/)
I like the idea of interpreting a function as a map from time to
sample intensity, or a map from 2D space to color space; these seem
like really simple audio/graphics APIs that can rival e.g. Processing
for functional code.

## License
Magic Word is available under the terms of the GNU Affero General
Public License, version 3; see the `LICENSE` file for details.
