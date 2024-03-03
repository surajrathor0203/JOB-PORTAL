import jobsModel from "../models/jobsModel.js"
import mongoose from "mongoose";
import moment from "moment";

//=====create job======

export const createJobController = async (req, res, next) => {
    const { company, position } = req.body
    if (!company || !position) {
        next('please provide all fields')
    }
    req.body.createdBy = req.user.userId
    const job = await jobsModel.create(req.body);
    res.status(201).json({ job });
};

/// ======get jobs====
export const getAlljobsController = async (req, res, next) => {
    // const jobs = await jobsModel.find({ createdBy: req.user.userId })
    //condition for logic filter
    const { status, workType, search, sort } = req.query
    const queryObject = {
        createdBy: req.user.userId
    }
    //logic filter
    if (status && status !== "all") {
        queryObject.status = status
    }
    if (workType && workType !== "all") {
        queryObject.workType = workType;

    }
    if (search) {
        queryObject.position = { $regex: search, $options: "i" }

    }

    let queryResult = jobsModel.find(queryObject)

    if (sort === "letest") {
        queryResult = queryResult.sort("-createdAt")

    }
    if (sort === "oldest") {
        queryResult = queryResult.sort("createdAt")

    }
    if (sort === "a-z") {
        queryResult = queryResult.sort("position")

    }
    if (sort === "A-Z") {
        queryResult = queryResult.sort("-position")

    }

    // pignation
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    queryResult = queryResult.skip(skip).limit(limit);

    const totaljobs = await jobsModel.countDocuments(queryResult);
    const numOfpage = Math.ceil(totaljobs / limit);

    // const jobs = await queryResult;

    const jobs = await queryResult;
    // const jobs = await jobsModel.find(queryObject)

    res.status(200).json({
        totaljobs,
        jobs,
        numOfpage

    });
};

/// ======update jobs====

export const updateJobController = async (req, res, next) => {
    const { id } = req.params
    const { company, position } = req.body
    //validation
    if (!company || !position) {
        next('please provide all fields')

    }
    //find job
    const job = await jobsModel.findOne({ _id: id })
    //validation
    if (!job) {
        next(`no job found with this id ${id}`)

    }
    if (!req.user.userId === job.createdBy.toString()) {
        next('you are not Authorized to update this job')
        return;

    }
    const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    })
    //res
    res.status(200).json({ updateJob });

};

//====delete jobs====

export const deleteJobController = async (req, res, next) => {
    const { id } = req.params
    //find job
    const job = await jobsModel.findOne({ _id: id })
    //validation
    if (!job) {
        next(`no job found with this id ${id}`)

    }
    if (!req.user.userId === job.createdBy.toString()) {
        next('you are not Authorized to update this job')
        return;

    }
    await job.deleteOne();
    res.status(200).json({ message: ' Success job deleted' });


};

//====jobs stats ====

export const jobStatsController = async (req, res) => {
    const stats = await jobsModel.aggregate([
        //search by user jobs
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            },

        },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 },
            }
        },


    ]);

    const defaultStats = {
        pending: stats.pending || 0,
        reject: stats.reject || 0,
        interview: stats.interview || 0
    }

    let monthlyApplication = await jobsModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' }
                },
                count: {
                    $sum: 1

                }
            }
        }
    ])

    monthlyApplication = monthlyApplication.map(item => {
        const {
            _id: { year, month },
            count,
        } = item;
        const date = moment().month(month - 1).format("MMM");
        const date1 = moment().year(year);
        // console.log(month, year);
        return { date, date1, count };
    }).reverse();
    console.log(stats)
    res.status(200).json({ totaljobs: stats.length, defaultStats, monthlyApplication });
};