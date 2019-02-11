using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace ABC.Blocks {
  public class IdentityPatch : Patch {
    public override void Apply(Module module) {
      //
    }

    public override void Accept(IPatchVisitor visitor) {
      visitor.VisitIdentity(this);
    }

    public override Patch Then(Patch rest) {
      return rest;
    }

    public override string ToString() {
      return "";
    }
  }
}
