const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function encryptedPassword(password){
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if(err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}

function comparePassword(password, hash){
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if(err){
                reject(err);
            } else {
                resolve(result)
            }
        });
    });
}

function createToken(user){
    return new Promise((resolve, reject) => {
        jwt.sign({user}, 'AKUMAU', (err, token) => {
            if(err){
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {encryptedPassword, comparePassword, createToken}