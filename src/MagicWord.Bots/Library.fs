namespace MagicWord.Bots

[<AutoOpen>]
module Library =
  type IGrammar =
    abstract member Add: string list -> unit
    abstract member Get: string -> string
    abstract member Save: unit -> int array
