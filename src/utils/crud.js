import mongoose from 'mongoose'

export const getOne = model => async (req, res) => {
  const userId = req.user._id
  const id = req.params.id

  try {
    const doc = await model.findOne({ _id: id, createdBy: userId }).exec()
    if (!doc) return res.status(400).end()
    res.status(200).json({ data: doc })
  } catch (err) {
    console.log(err)
    res.status(400).end()
  }
}

export const getMany = model => async (req, res) => {
  const userId = req.user._id
  try {
    const docs = await model.find({ createdBy: userId }).exec()
    if (!docs) return res.status(400).end()
    res.status(200).json({ data: docs })
  } catch (err) {
    console.log(err)
    res.status(400).end()
  }
}

export const createOne = model => async (req, res) => {
  const userId = req.user._id
  try {
    const doc = await model.create({ createdBy: userId, ...req.body })
    res.status(201).json({ data: doc })
  } catch (err) {
    console.log(err)
    res.status(400).end()
  }
}

export const updateOne = model => async (req, res) => {
  const userId = req.user._id
  try {
    const doc = await model
      .findOneAndUpdate({ _id: req.params.id, createdBy: userId }, req.body, {
        new: true
      })
      .lean()
      .exec()
    if (!doc) return res.status(400).end()
    res.status(200).json({ data: doc })
  } catch (err) {
    console.log(err)
    res.status(400).end()
  }
}

export const removeOne = model => async (req, res) => {
  const userId = req.user._id
  try {
    const doc = await model
      .findOneAndDelete({ _id: req.params.id, createdBy: userId })
      .exec()
    if (!doc) return res.status(400).end()
    res.status(200).json({ data: doc })
  } catch (err) {
    console.log(err)
    res.status(400).end()
  }
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
