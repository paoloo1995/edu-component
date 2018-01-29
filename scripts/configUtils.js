#!/usr/bin/env node
'use strict'

/**
 * EDU-CLI 
 * Netease EDU Scaffolding Tool
 * 
 * @author chukuang(toolve@foxmail.com)
 * @version 1.0
 */


const fs = require('fs');
const os = require('os');
const path = require('path');
const shell = require('shelljs');
const colors = require('colors');
const CONST = require('../config/const');
const homeDir = os.homedir();
const configPath = path.join(homeDir,'.edu');
const originPath = path.join(homeDir,'edu-cli-config');

/**
 * check if config file exists
 */
const isConfigExist = () => {
    return fs.existsSync(configPath);
}

/**
 * update global config file
 */
const updateConfig = () => {
    console.log('-----------------------');
    console.log('Start Update:'.yellow || 'Start Update:');
    if (isConfigExist()) {
        shell.rm('-rf',configPath);
    }
    shell.exec('git clone ' + CONST.CONFIG_SOURCE + ' ' + originPath);
    console.log(originPath);
    shell.mv('-f',originPath,configPath);
    // shell.exec('mv -f '+ originPath + ' ' + configPath);
    console.log('Update End.'.yellow);
    console.log('-----------------------\n');
}

/**
 * get config
 */
const getConfig = () => {
    if (isConfigExist()) {
        return require(configPath + '/config.json');    
    } else {
        console.log('No Global EDU-CLI Config File!'.yellow);
        console.log('Start Download The Latest EDU-CLI Config:'.yellow);
        updateConfig();
        console.log('Config Downloaded!'.yellow);
        return require(configPath + '/config.json');
    }
}


module.exports = {
    isConfigExist,
    updateConfig,
    getConfig
}