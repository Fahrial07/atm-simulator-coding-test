const express = require('express');

function randNumber(length){
    // const n = Math.floor(Math.random()*(max-min+1)+min);
    const n = Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
    return n;
}

module.exports = { randNumber };