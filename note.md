# Notes

## Dependencies - NOT INCLUDING CREATE_REACT_APP ONES

    I.e. yarn add
    
    sass react-router-dom formik axios yup react-redux @reduxjs/toolkit @auth0/auth0-react react-datepicker react-select

## Dev Dependencies

    I.e. yarn add --dev

    @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-airbnb eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks prettier eslint-config-prettier eslint-plugin-prettier

### Types Dev Dependencies

    I.e. yarn add --dev

    @types/react-router-dom @types/react-datepicker

## Initialise tsconfig.json file for typescript

    npx tsc --init

## Scripts

    "scripts": {
        "dev": "react-scripts start"
    }

## Setting up a new Git Repo

## Create a new repository on the command line

    git init
    git add .
    git commit -m "first commit"
    git branch -M main
    git remote add origin "your Github info"
    git push -u origin main

## Push an existing repository from the command line

    git remote add origin "your Github info"
    git push -u origin main

## Merge Unrelated Histories

    git pull origin main --allow-unrelated-histories
