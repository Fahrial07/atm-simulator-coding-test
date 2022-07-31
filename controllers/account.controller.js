const express = require('express');
const { BankAccount, Users } = require('../models/index');

class Controller {

    static async getAccount(req, res) {

        const bank_account = await BankAccount.findOne({
            where: {
                email: req.query.email
            }
         })

         const user = await Users.findOne({
            where: {
                email: bank_account.email
            }
         })

        res.status(200).json({
            status: 'Success',
            bank_account,
            user
        })

    }

    static async getAll(req, res) {

        const all_bank_account = await BankAccount.findAll();

        res.status(200).json({
            status: 'Success',
            all_bank_account
        });
    }

    static async deleteAccount(req, res) {

        const delete_account = await BankAccount.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).json({
            status: 'Success Deleted',
            delete_account
        })

    }

}

module.exports = Controller;