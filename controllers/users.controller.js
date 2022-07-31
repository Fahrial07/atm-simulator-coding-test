const express = require('express');
const { Users, BankAccount } = require('../models/index');
const helper = require('../helpers/auth.js');
const number = require('../helpers/numberGenerate.js');

class Controller {

    static async register(req, res) {
        try {
        const name = req.body.name;
        const email = req.body.email.toLowerCase();
        const password = await helper.encryptedPassword(req.body.password);

        let cekEmail = await Users.findOne({
            where: {
                email: email
            }
        })

        if(cekEmail){
            res.status(409).json({
                status: 'Error',
                message: 'Email already exist'
            });
            return
        }
        const user = await Users.create({
            name,
            email,
            password
         });

        const getId = await Users.findOne({
            where: {
                email
            }
        })

        const num = await number.randNumber(14);
        const account_number = getId.id + num;
        const balance = 0;
        const debit = 0;
        const credit = 0;

        const bank_account = await BankAccount.create({
            email: email,
            account_number,
            balance,
            debit,
            credit
        })

        res.status(201).json({
            status: 'Success',
            user,
            bank_account
        })

        } catch (error) {
            // res.status(500).json({
            //     status: 'Error',
            //     message: error
            // })
        }
    }

    static async login(req, res) {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;

        const user  = await Users.findOne({ where: { email } })

        if(!user){
            res.status(404).json({
                status: 'Error',
                message: 'Invalid Email or Password'
            });
            return;
        }

        const isPasswordValid = await helper.comparePassword(password, user.password);

        if(!isPasswordValid){
            res.status(409).json({
                status: 'Error',
                message: 'Invalid Email or Password'
            });
            return;
        }

        const bankAccount = await BankAccount.findOne({ where: {email: user.email } })

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        }

        const token = await helper.createToken(payload);

        res.status(200).json({
            status: 'Success',
            user,
            bankAccount,
            token
        })

    }

}

module.exports = Controller;