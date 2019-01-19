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

import React, { useState, useReducer, useEffect, useRef } from "react";
import { makeStyles } from '@material-ui/styles';
import SearchBar from "./SearchBar.js";
import NavBar from "./NavBar.js";

function useEvent(element, event, thunk) {
  useEffect(() => {
    element.addEventListener(event, thunk);
    return () => element.removeEventListener(thunk);
  });
}

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },
});

export default function App(props) {
  let scrollRef = useRef(null);
  useEvent(window, "scroll", () => {
    
  });
  const onSearchBarChange = (value) => {

  };
  const onNavBarChange = (value) => {

  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SearchBar onChange={onSearchBarChange}/>
      <NavBar onChange={onNavBarChange}/>
    </div>
  );
}
