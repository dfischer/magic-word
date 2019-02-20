# Planet Forth
A Forth-based FaaS platform. Typed, purely functional concatenative
code for scripting the web — and others! With deep learning! 🚀

## Table of contents
- [About](#about)
- [Roadmap](#roadmap)
- [License](#license)

## About
Planet Forth is a function-as-a-service (FaaS) platform where users
collaboratively write code that executes in a server-side container.

Planet Forth uses a minimalist, purely functional dialect of Forth
known as *ABC*.

## Roadmap
My vision for Planet Forth is something similar to
[Glitch](https://glitch.com/) and [IFTTT](https://ifttt.com/): a way
for small groups of developers to collaborate on a running program,
with an emphasis on integration with web services and generation of
audiovisual content.

I'd like to use Planet Forth to explore a number of experimental ideas
in programming languages and machine learning:

### Recreate results from [Neural Program Synthesis with Priority Queue Training](https://arxiv.org/abs/1801.03526)

Character and word based neural language models achieve good results
and are now commonplace. The word-at-a-time model seems to be a
natural fit for Forth, and I'd like to generate Forth code with these
techniques.

### Programming on a mobile device

Smartphones have been around for many years now but they're still not
good environments for writing code. I have some ideas about this that
I'd like to try out, in particular: programming on a mobile device
should not feel like "writing code", it should feel more like googling
for a function. Consider [SmartSynth: Synthesizing Smartphone
Automation Scripts from Natural
Language](https://www.microsoft.com/en-us/research/publication/smartsynth-synthesizing-smartphone-automation-scripts-natural-language/).

### Recreate graphics/audio programming model from [IBNIZ](http://pelulamu.net/ibniz/)

I like the idea of interpreting a function as a map from time to
sample intensity, or a map from 2D space to color space; these seem
like really simple audio/graphics APIs that can rival e.g. Processing
for functional code.

## License
Planet Forth is available under the terms of the GNU Affero General
Public License, version 3; see the `LICENSE` file for details.
