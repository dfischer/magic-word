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

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FunctionsIcon from '@material-ui/icons/Functions';
import ExploreIcon from '@material-ui/icons/Explore';

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
});

export default function NavBar(props) {
  // XXX TODO state
  let [position, setPosition] = useState(0);
  const onChange = (event, value) => {
    setPosition(value);
  };
  const classes = useStyles();
  let data = [
    { label: "Home", icon: <HomeIcon/> },
    { label: "Explore", icon: <ExploreIcon/> },
    { label: "Events", icon: <NotificationsIcon/> },
    { label: "Functions", icon: <FunctionsIcon/> },
  ];
  let buttons = data.map(({ label, icon }) => {
    return (
      <BottomNavigationAction
        label={label}
        icon={icon}
      />
    )
  });
  return (
    <BottomNavigation value={position}
                      className={classes.root}
                      onChange={onChange}
                      showLabels>
      { buttons }
    </BottomNavigation>
  );
}
