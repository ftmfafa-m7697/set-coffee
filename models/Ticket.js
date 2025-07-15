const mongoose = require("mongoose");
require("./User");
require("./Department");
require("./SubDepartment");

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        department: {
            type: mongoose.Types.ObjectId,
            ref: "Department",
            required: true,
        },
        subDepartment: {
            type: mongoose.Types.ObjectId,
            ref: "SubDepartment",
            required: true,
        },
        priority: {
            type: Number,
            default: 1,
            enum: [1, 2, 3], //فقط از این سه گزینه میتوان انتخاب کرد
        },
        hasAnswer: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, //تاریخ ثبت تیکت
    }
);

const model = mongoose.models.Ticket || mongoose.model("Ticket", schema);

export default model;
