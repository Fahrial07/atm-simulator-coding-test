const express = require('express');
const { NUMERIC } = require('sequelize');
const { Transaction, BankAccount } = require('../models/index');

class Controller {

    static async transfer(req, res) {
        try {

            const id = req.body.account_id;
            const email = req.body.email;
            const type = 'Transfer';
            const destination_account = req.body.destination_account;
            const amount = req.body.amount;
            const status = 'success';

            const cek_balance = await BankAccount.findOne({
                where: {
                    email: email
                }
            });


            if(cek_balance.balance < 500000){
                res.status(209).json({
                    status: 'Error',
                    message: 'Sorry your balance is not enough !'
                });
                return;
            }

            const destination = await BankAccount.findOne({
                where: {
                    account_number: destination_account
                }
            })


            if(!destination){
                res.status(409).json({
                    status: 'Error',
                    message: 'Account number not found'
                });
                return
            }

            const get_destination = await BankAccount.findOne({
                where: {
                    account_number: destination_account
                }
            });

            const balance_destination = Number(get_destination.balance);
            const after_success = Number(balance_destination) + Number(amount);

            const debit_destination = Number(get_destination.debit);
            const debit_after_success = Number(debit_destination) + Number(amount);

            await BankAccount.update({
                balance: after_success,
                debit: debit_after_success
            }, {
                where: {
                    account_number: destination_account
                }
            });

            const transaction = await Transaction.create({
                account_id: id,
                transaction_type: type,
                destination_account: destination_account,
                amount: amount,
                status: status
            });

            const bank_account = await BankAccount.findOne({
                where: {
                    id: id
                }
            });


            const balance = Number(bank_account.balance);
            const after_tf = Number(balance) - Number(amount);

            const credit = Number(bank_account.credit);
            const credit_after_tf = Number(credit) + Number(amount);


            await BankAccount.update({
                balance: after_tf,
                credit: credit_after_tf
            }, {
                where: {
                    id: bank_account.id
                }
            })

            res.status(201).json({
                status: 'Success',
                transaction
            })


        } catch (error) {
            res.status(500).json({
                status: 'Error',
                message: error.message
            })
        }
    }

    static async deposite(req, res) {
        const id = req.body.account_id;
        const account_number = req.body.account_number;
        const amount = req.body.amount;

        const get_account = await BankAccount.findOne({
            where: {
                account_number: account_number
            }
        })

        if(!get_account){
            res.status(409).json({
                status: 'Error',
                message: 'Account number not found'
            })
        }

        const before_deposite = get_account.debit == null ? 0  : Number(get_account.debit);
        const debit_after_success = Number(before_deposite) + Number(amount);

        const balance_before = Number(get_account.balance);
        const balance_after_success = Number(balance_before) + Number(amount);

        const deposite = await BankAccount.update({
            balance: balance_after_success,
            debit: debit_after_success
        },{
            where: {
                account_number: account_number
            }
        })

        const transaction = await Transaction.create({
            account_id: id,
            transaction_type: 'Deposite',
            destination_account: account_number,
            amount: amount,
            status: 'success'
        })

        res.status(201).json({
            status: 'Success',
            transaction,
            deposite
        })

    }

    static async widdraw(req, res) {
        const account_id = req.body.id;
        const email = req.body.email;
        const amount = req.body.amount;

        const get_account = await BankAccount.findOne({
            where: {
                email
            }
        })

        if(get_account.balance == 0){
            res.status(409).json({
                statuc: 'Error',
                message: 'Your balance is not enought'
            })
        }

        const balance = get_account.balance == null  ? 0 : Number(get_account.balance);
        const after_widdraw = Number(balance) - Number(amount);

        const get_credit = get_account.credit == null  ? 0 : Number(get_account.credit);
        const credit_aw = Number(get_credit) + Number(amount);

        const update_balance = await BankAccount.update({
            balance: after_widdraw,
            credit: credit_aw
        }, {
            where: {
                email: email
            }
        });

        const transaction = await Transaction.create({
            account_id: account_id,
            transaction_type: 'Widdraw',
            destination_account: 0,
            amount: amount,
            status: 'success'
        })

        res.status(201).json({
            status: 'Success',
            transaction,
            update_balance
        })

    }

}

module.exports = Controller;