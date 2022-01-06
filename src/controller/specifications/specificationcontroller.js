import Specificationsschema from "../../schema/specifications/specificationsschema.js";
import slugify from "slugify"

const createCategories = (event, parentId = null) => {
    const getdata = []

    let list;

    if (parentId == null) {
        list = event.filter((e) => e.parentId == undefined)
    }
    else {
        list = event.filter((e) => e.parentId == parentId)
    }
    for (let cat of list) {
        getdata.push({
            _id: cat._id,
            name: cat.name,
            category: cat.category,
            parentId: cat.parentId,
            slug: cat.slug,
            children: createCategories(event, cat._id),
        })
    }
    return getdata

}

export const specificationcontoller = (req, res) => {
    const _specification = {
        name: req.body.name,
        slug: slugify(req.body.name),
    }
    if (req.body.parentId) {
        _specification.parentId = req.body.parentId
    }
    if (req.body.category) {
        _specification.category = req.body.category
    }
    const _specificationsave = new Specificationsschema(_specification)
    _specificationsave.save((error, specification) => {
        if (specification) {
            res.status(200).json({ message: specification })
        }
        if (error) {
            res.status(500).json(error, "something went wrong specification")
        }
    })
}

export const getallspecification = (req, res) => {
    const _getSpecification = Specificationsschema.find({})
        .exec((error, _data) => {
            if (_data) {
                const _specificationlist = createCategories(_data)
                res.status(200).json({ _specificationlist })

            }
            if (error) {
                res.status(500).json(error, "something went wrong _getSpecification")
            }
        })

}




