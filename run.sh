#!/usr/bin/env bash

cd auth/ && npm i && npm start &
cd resource/ && npm i && npm start

wait;