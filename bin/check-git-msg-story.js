#!/usr/bin/env node
'use strict';
require('../src/check-msg')(process.env.HUSKY_GIT_PARAMS, true);
