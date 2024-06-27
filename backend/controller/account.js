const { default: mongoose } = require("mongoose");
const Account = require("../model/account");
const z = require('zod');

const balance = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const account = await Account.findOne({ userId })
        if (!account) {
            return res.status(400).json({ success: false, message: 'No account found' })
        }
        return res.status(200).json({ balance: account.balance, message: 'Balance fetched', success: true })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'internal server error', success: false })
    }
}

transferSchema = z.object({
    to: z.string(),
    amount: z.number()
})
const transfer = async (req, res, next) => {
    try {
        const { success } = transferSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({ success: false, message: 'Required field missing' });
        }
        const { to, amount } = req.body;
        const userId = req.user.id;
        const session = await mongoose.startSession();
        session.startTransaction();
    
        // Fetch the accounts within the transaction
        const account = await Account.findOne({ userId: userId }).session(session);
    
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }
    
        const toAccount = await Account.findOne({ userId: to }).session(session);
    
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }
    
        // Perform the transfer
        await Account.updateOne({ userId: userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    
        // Commit the transaction
        await session.commitTransaction();
    
        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });

    }
}

module.exports = {
    balance,
    transfer
}