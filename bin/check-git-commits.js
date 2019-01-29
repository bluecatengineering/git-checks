#!/usr/bin/env node
'use strict';
require('../src/check-commits')(process.env.HUSKY_GIT_STDIN, false);
