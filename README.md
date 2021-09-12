# git-checks &middot; [![GitHub license](https://img.shields.io/badge/license-ISC-blue.svg)](https://github.com/bluecatengineering/git-checks/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/@bluecateng/git-checks.svg?style=flat)](https://www.npmjs.com/package/@bluecateng/git-checks)

Scripts for use in Git hooks.

## Install

```
$ npm i -D @bluecateng/git-checks husky
```

## Usage

The provided scripts are meant to be used as githooks from `husky`.

To check commit messages for story numbers use:

```shell
# .husky/commit-msg
npx --no-install check-git-msg-story $1
```

```shell
# .husky/pre-push
npx --no-install check-git-commits-story
```

To check commit messages without story numbers use:

```shell
# .husky/commit-msg
npx --no-install check-git-msg $1
```

```shell
# .husky/pre-push
npx --no-install check-git-commits
```
