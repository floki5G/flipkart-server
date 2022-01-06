import slugify from "slugify"
import Highlightschema from "../../schema/highlight/highlightschema.js"


const handelgetallhighlight = (event, parentId = null) => {
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
            children: handelgetallhighlight(event, cat._id),
        })
    }
    return getdata

}


export const highlightcontroller = (req, res) => {

    const _highlight = {
        name: req.body.name,
        slug: slugify(req.body.name),

    }
    if (req.body.parentId) {
        _highlight.parentId = req.body.parentId
    }
    if (req.body.category) {
        _highlight.category = req.body.category
    }
    const highlight = new Highlightschema(_highlight)
    highlight.save((error, data) => {

        if (data) {

            res.status(200).json({ message: data })
        }
        if (error) {


            res.status(500).json(error, "something went wrong highlight")

        }
    })
}

export const getallhighlight = (req, res) => {
    const _getallhighlight = Highlightschema.find({})
        .exec((error, data) => {
            if (data) {
                const getall = handelgetallhighlight(data)
                res.status(200).json({ getall })
            }
            if (error) {
                res.status(500).json(error, "something went wrong highlight")

            }
        })
}


export const gethighlightbyparentid = (req, res) => {
    const { parentid } = req.params;

    const _getallhighlight = Highlightschema.find({})
        .exec((error, data) => {
            if (data) {
                const getall = handelgetallhighlight(data)
               const highlightparentId =  getall.filter((e) => e.category == parentid)
               res.status(200).json({ highlightparentId })

            }
                if (error) {
                    res.status(500).json(error, "something went wrong highlight")
                }
            
})
}
