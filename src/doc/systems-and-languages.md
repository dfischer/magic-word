In
[Incommensurability](https://www.dreamsongs.com/Files/Incommensurability.pdf),
Gabriel draws a distinction between *systems* and *languages*:

> A system is a set of interacting components, though sometimes the
> interaction is in the realm of ideas—and thus a language can also be
> a system. But the usual case requires a set of actual, observable
> behavior. A real set of things doing real stuff. —Even if in a
> computer.
>
> A language is a system of signs but for the purpose of conveying
> meaning. A language is words on the page. Grammatical correctness is
> important to a language.

Gabriel also suggests that before the language paradigm rose to power,
the words "language" and "system" were used almost interchangeably in
the programming community. As an interesting example of this, I want
to draw attention to the Smalltalk language, and in particular the
article [Design Principles Behind
Smalltalk](https://www.cs.virginia.edu/~evans/cs655/readings/smalltalk.html)
published in BYTE Magazine, 1981, by one of the original Smalltalk
contributors, Daniel Ingalls:

> Operating System: An operating system is a collection of things that
> don't fit into a language. There shouldn't be one.
> 
> Here are some examples of conventional operating system components
> that have been naturally incorporated into the Smalltalk language:
>
> - Storage management -- Entirely automatic. Objects are created by a
>   message to their class and reclaimed when no further references to
>   them exist. Expansion of the address space through virtual memory
>   is similarly transparent.
> 
> - File system -- Included in the normal framework through objects
>   such as Files and Directories with message protocols that support
>   file access.
>
> - Display handling -- The display is simply an instance of class
>   Form, which is continually visible, and the graphical manipulation
>   messages defined in that class are used to change the visible
>   image.
>
> - Keyboard Input -- The user input devices are similarly modeled as
>   objects with appropriate messages for determining their state or
>   reading their history as a sequence of events.
>
> - Access to subsystems -- Subsystems are naturally incorporated as
>   independent objects within Smalltalk: there they can draw on the
>   large existing universe of description, and those that involve
>   interaction with the user can participate as components in the
>   user interface.
>
> - Debugger -- The state of the Smalltalk processor is accessible as
>   an instance of class Process that owns a chain of stack
>   frames. The debugger is just a Smalltalk subsystem that has access
>   to manipulate the state of a suspended process. It should be noted
>   that nearly the only run-time error that can occur in Smalltalk is
>   for a message not to be recognized by its receiver.
>
> Smalltalk has no "operation system" as such. The necessary primitive
> operations, such as reading a page from the disk, are incorporated
> as primitive methods in response to otherwise normal Smalltalk
> messages.

---

Denshi is a *programming system*: a collection of tools that help you
perform computation. These includes a bytecode virtual machine with
several programming languages targeting it, sensors and acutators
connected to internet services, visualization of code and data, a
means of tracking the lifecycle of software objects etc.
