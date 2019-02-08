# Denshi <a href="https://liberapay.com/xkapastel"><img src="http://img.shields.io/liberapay/patrons/xkapastel.svg?logo=liberapay"></a>

<img src="/media/lightning-192.png"
     alt="A black lightning bolt on an orange background"
     align="right"/>

Denshi is an experimental programming environment, intended to explore
applications of machine learning to the development of software.

## ABC

ABC is a combinator calculus with six primitive functions:

```
[A] [B] a = B A        apply
[A] [B] b = [[A] B]    bind
    [A] c = [A] [A]    copy
    [A] d =            drop
[A] s B r = [B] A      shift / reset
```

All values in ABC are functions made of these six primitives. ABC uses
a concept of *well-known functions* to implement *software
acceleration*.

ABC has a similar goal to Nock, but is simpler and less idiosyncratic.
