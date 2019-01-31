// This file is a part of Denshi.
// Copyright (C) 2019 Matthew Blount

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public
// License along with this program.  If not, see
// <https://www.gnu.org/licenses/.

import React from "react";

export default (props) => {
  if (props.name !== undefined) {
    const action = `/${props.name}`;
    return (
      <div>
        <h1>{props.name}</h1>
        <pre><code>{props.res}</code></pre>
        <form method="post"
              action={action}>
          <textarea name="src"
                    rows="5"
                    cols="80"
                    defaultValue={props.src}/>
          <br/>
          <button type="submit">Edit</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <pre><code>{props.res}</code></pre>
      </div>
    );
  }
}
