#!/bin/bash

cp patient_information_management/package.json .
cp patient_information_management/package-lock.json .
cp -r patient_information_management/node_modules .
cat requirements.txt | npm install -g --save-dev
