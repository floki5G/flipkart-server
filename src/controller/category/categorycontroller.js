import Categoryschema from "../../schema/category/categoryschema.js";
import slugify from "slugify"

function createCategories(categories, parentId = null) {
    const categoryList = [];
    
    let category;
    if (parentId == undefined) {
      category = categories.filter((cat) =>cat.parentId == "undefined");
    } else {
      category = categories.filter((cat) => cat.parentId == parentId);
    }
  
    for (let cate of category) {
      categoryList.push({
        _id: cate._id,
        name: cate.name,
        slug: cate.slug,
        parentId: cate.parentId,
        categoryPicture: cate.categoryPicture,
        pagetype: cate.pagetype,
        children: createCategories(categories, cate._id),
      });
    }
  
    return categoryList;
  }

export const categorycontoller = (req, res) => {

    let categoryPicture = []
    if (req.files.length > 0) {

        categoryPicture = req.files.map(file => {

            return { img: file.filename }

        })

    }


    const _category = {

        name: req.body.name,
        slug: slugify(req.body.name),
        pagetype: req.body.pagetype,
        categoryPicture: categoryPicture,

    }
    if (req.body.parentId) {
        _category.parentId = req.body.parentId
    }
    const _categorysave = new Categoryschema(_category)
    _categorysave.save((error, category) => {

        if (category) {
            res.status(200).json({ message: category })
        }
        if (error) {
            res.status(500).json(error, "something went wrong category")

        }
    })
}

export const getallCategory =async (req, res) => {
    const _getcategory =await Categoryschema.find({})
        .exec((error, _data) => {
            if (_data) {
                const _categorylist = createCategories(_data)
                res.status(200).json({ _categorylist })

            }
            if (error) {
                res.status(500).json(error, "something went wrong getallCategory")
            }
        })

}

export const deleteCaterory = async (req, res) => {
    const { _id } = req.body
    const deletedCategories = [];
    for (let i = 0; i < _id.length; i++) {
        const _deleteCaterory = await Categoryschema.findOneAndDelete({
            _id: _id[i],
        })
        deletedCategories.push(_deleteCaterory);
    }
    if (deletedCategories.length == _id.length) {
        res.status(200).json({ message: "Categories removed" });
    } else {
        res.status(400).json({ message: "Something went wrong" });
    }
};


export const updateCaterory = (req, res) => {
    const {
        _id, name, parentId
    } = req.body
    if (parentId == undefined) {
        const _updateCaterory = Categoryschema.findOneAndUpdate({ _id }, {
            $set: {
                name: name,
                slug: slugify(name),
            }
        })
            .exec((error, newdata) => {
                if (newdata) {

                    // const _categorylist = createcategory(newdata)

                    res.status(200).json({ message: "newdata update succesfully" })
                }
                if (error) {
                    res.status(500).json(error, "something went wrong updateCategory")
                }
            })

    }
    else {


        const _updateCaterory = Categoryschema.findOneAndUpdate({ _id }, {
            $set: {
                name: name,
                slug: slugify(name),
                parentId: parentId,
            }
        })

            .exec((error, newdata) => {
                if (newdata) {
                    res.status(200).json({ message: "newdata update succesfully" })
                }
                if (error) {
                    res.status(500).json(error, "something went wrong updateCategory")
                }
            })
    }
}