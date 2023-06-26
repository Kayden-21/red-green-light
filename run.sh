#!/usr/bin/env bash

cd auth/ && npm i && npm start &
cd resource/ && npm i && npm start

wait;
clear;

echo Services running. Authentication: 'http://localhost:4000' and Game: 'http://localhost:3000'