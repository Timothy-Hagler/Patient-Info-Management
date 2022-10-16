#!/bin/bash

cp patient_information_management/package.json .
cp patient_information_management/package-lock.json .
cat requirements.txt | npm install -g --save-dev
