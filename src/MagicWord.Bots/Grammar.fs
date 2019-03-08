namespace MagicWord.Bots

module Grammar =
  type private Label =
    | Sum
    | Dot
    | Relu
    | Push
    | Softplus
    | Softmax

  type Node = {
    label: Label
    edges: Value
  }

  type private Automata(depth: int) =
    let labels: float array = []
    let edges: Value array = []
    let state: Value array = []

    member Step(source: Value): Value =
      source

    member Mutate(alpha: float): unit =
      ()

    member Reset(): unit =
      ()
