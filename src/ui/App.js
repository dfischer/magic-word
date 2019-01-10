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
import { withStyles } from '@material-ui/core/styles';
import RawSearchBar from "./SearchBar.js";
import RawNavBar from "./NavBar.js";

const styles = {
  searchBar: {
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: 8,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  },
  navBar: {
    root: {
      width: 500,
    },
  },
};

const NavBar    = withStyles(styles.navBar)(RawNavBar);
const SearchBar = withStyles(styles.searchBar)(RawSearchBar);

export default function App(props) {
  let scrollRef = useRef(null);
  let [showSearchBar, setShowSearchBar] = useState(true);
  const onScroll = (event) => {
    setShowSearchBar(scrollRef.current < window.scrollY);
    scrollRef.current = window.scrollY;
  };
  const onSearchBarChange = (value) => {

  };
  const onNavBarChange = (value) => {

  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener(onScroll);
  });
  return (
    <div>
      <SearchBar onChange={onSearchBarChange}/>
      <NavBar onChange={onNavBarChange}/>
    </div>
  );
}
