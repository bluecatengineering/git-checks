# Git checks

Scripts for use in Git hooks.

## Install

```
$ npm i -D @bluecateng/git-checks husky
```

## Usage

The provided scripts are meant to be used as githooks from `husky`.

To check commit messages for story numbers use:

```json
{
	"husky": {
		"hooks": {
			"commit-msg": "check-git-msg-story",
			"pre-push": "check-git-commits-story"
		}
	}
}
```

To check commit messages without story numbers use:

```json
{
	"husky": {
		"hooks": {
			"commit-msg": "check-git-msg",
			"pre-push": "check-git-commits"
		}
	}
}
```
