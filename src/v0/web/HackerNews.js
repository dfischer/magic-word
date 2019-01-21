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

import * as pup from "puppeteer";

export default {
  async frontPage() {
    const browser = await pup.launch();
    const page = await browser.newPage();
    await page.goto("https://news.ycombinator.com");
    let links = await page.evaluate(() => {
      var elements = document.querySelectorAll(".storylink");
      var elements = Array.from(elements);
      var links = elements.map(x => x.href);
      return links;
    });
    await browser.close();
    return links;
  }
};
