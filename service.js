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

// XXX TODO This is dead code, rethink it for the reboot.

const version   = "0.0.2";
const cacheName = `denshi-${version}`;
const cacheUrls = [
  "/",
  "/lib/app.js",
  "https://fonts.googleapis.com/css?family=Roboto:300,400,500",
];

async function onInstall(event) {
  let db = await caches.open(cacheName);
  await db.addAll(cacheUrls);
  self.skipWaiting();
}

async function onActivate(event) {
  await self.clients.claim();
}

async function onFetch(event) {
  let db = await caches.open(cacheName);
  let response = await db.match(event.request, { ignoreSearch: true });
  return response || fetch(event.request);
}

self.addEventListener("install",  (e) => e.waitUntil(onInstall(e)));
self.addEventListener("activate", (e) => e.waitUntil(onActivate(e)));
self.addEventListener("fetch",    (e) => e.respondWith(onFetch(e)));
