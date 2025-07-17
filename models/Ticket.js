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
            //نشان می‌دهد آیا به این تیکت پاسخی داده شده یا نه
        },
        isAnswer: {
            type: Boolean,
            default: false,
            //مشخص می‌کند آیا این تیکت در واقع پاسخی به تیکت دیگر است یا نه
        },
        mainTicket: {
            type: mongoose.Types.ObjectId,
            ref: "Ticket",
            //این فیلد، معرف شناسه تیکتی است که این تیکت پاسخ آن است، یعنی برای تعیین پاسخ‌های مدیریتی به کار می‌رود
            //default: false,// بانوشتن این خط به ارور بر میخوردم
            default: null,
            //status: 500, message: {"MESSAGE":"ValidationError: mainTicket: Cast to ObjectId failed for value \"false\" (type boolean) at path \"mainTicket\" because of \"BSONError\""}
        },
    },
    {
        timestamps: true, //تاریخ ثبت تیکت
    }
);

const model = mongoose.models.Ticket || mongoose.model("Ticket", schema);

export default model;
