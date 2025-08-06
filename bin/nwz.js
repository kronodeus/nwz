#!/usr/bin/env node
import {main} from '../dist/main.js'

main().then(() => process.exit(0)).catch(error => {
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
})