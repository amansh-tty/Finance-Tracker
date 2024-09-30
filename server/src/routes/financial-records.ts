import express, { Request, Response, NextFunction } from "express";
import FinancialRecordModel from "../schema/financial-record";

const router = express.Router();

router.get("/getAllByUserID/:userId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const records = await FinancialRecordModel.find({ userId: userId });
    if (records.length === 0) {
      return res.status(404).send("No records found for the user.");
    }
    res.status(200).send(records);
  } catch (err) {
    next(err);  // Pass the error to the next middleware
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newRecordBody = req.body;
    const newRecord = new FinancialRecordModel(newRecordBody);
    const savedRecord = await newRecord.save();

    res.status(200).send(savedRecord);
  } catch (err) {
    next(err);  // Pass the error to the next middleware
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );

    if (!record) return res.status(404).send();

    res.status(200).send(record);
  } catch (err) {
    next(err);  // Pass the error to the next middleware
  }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const record = await FinancialRecordModel.findByIdAndDelete(id);
    if (!record) return res.status(404).send();
    res.status(200).send(record);
  } catch (err) {
    next(err);  // Pass the error to the next middleware
  }
});

export default router;
