import express from "express";
import fs from "fs";
import path from "path";
import React from 'react';
import { renderToString } from "react-dom/server";
import App from "../src/App";

const PORT = 8000;
const app = express();

app.use("^/$", (req, res) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${renderToString(<App />)}</div>`
      )
    );
  });
});


app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
