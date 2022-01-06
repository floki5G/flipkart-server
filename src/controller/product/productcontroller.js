import Productschema from "../../schema/product/productschema.js";
import Categoryschema from "../../schema/category/categoryschema.js";
import Highlightschema from "../../schema/highlight/highlightschema.js"
import slugify from "slugify";


export const productcontroller = (req, res) => {


    const {
        name, price, description, review, category, offers } = req.body;

    let productPicture = []
    if (req.files.length > 0) {
        productPicture = req.files.map(file => {

            return { img: file.filename }

        })
    }

    let highlightData = []
    if (req.body.highlightData.length > 0) {
        highlightData = req.body.highlightData.map(file => {
            const dat = JSON.parse(file)
            return {
                filterhighlight: dat.filterhighlight,
                value: dat.value,
                descriptionfilter: dat.descriptionfilter
            }
        })
    }



    let specificationData = []
    if (req.body.specificationData.length > 0) {
        specificationData = req.body.specificationData.map(file => {
            const dat = JSON.parse(file)
            return {
                specificatonId: dat.specificatonId,
                filterDescription: dat.filterDescription
            }
        })
    }


    const _product = Productschema({
        name: name,
        slug: slugify(name),
        price,
        description,
        offers,
        review,
        productPicture,
        // createdBy: req.user._id,
        category,
        highlightData,
        specificationData
    })
    _product.save((error, data) => {
        if (data) {
            res.status(200).json({ message: data })
        }
        if (error) {
            res.status(500).json("something went wrong productcontroller")
        }
    })

}

const createcategory = (_list, parentId = null) => {

    const categoryList = [];
    let list;
    if (parentId == null) {

        list = _list.filter(cat => cat.parentId == undefined)
    }
    else {
        list = _list.filter(cat => cat.parentId == parentId)
    }
    for (let cat of list) {
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            parentId: cat.parentId,
            children: createcategory(_list, cat._id)
        })
    }
    return categoryList

}
export const getallproduct = async (req, res) => {
    const _getcategoryproduct = await Categoryschema.find({}).exec();
    const _getproduct = await Productschema.find({})
        .select('_id name price description offers highlightData productPicture specificationData  category')
        .populate({ path: 'category', select: "_id name parentId" })
        .exec((error, data) => {
            if (data) {
                res.status(200).json({
                    products: data
                })

            }
            if (error) {
                res.status(200).json({ message: "server getallproduct error" })
            }
        })


}


export const updateproduct = async (req, res) => {
    const {
        _id, name, price, description, review, createdBy, category, offers } = req.body;

    if (req.files.length > 0) {
        let productPicture = []
        productPicture = req.files.map(file => {

            return { img: file.filename }

        })
        const _updateproduct = await Productschema.findOneAndUpdate({ _id }, {
            $set: {
                name: name,
                slug: slugify(name),
                price: price,
                offers: offers,
                description: description,
                productPicture: productPicture,
                category: category
            }
        })
            .exec((error, newdata) => {
                if (newdata) {
                    res.status(200).json({ message: "newdata" })
                }
                if (error) {
                    res.status(200).json({ message: "error" })

                }
            })
    }
    else {
        const _updateproduct = await Productschema.findOneAndUpdate({ _id }, {
            $set: {
                name: name,
                slug: slugify(name),
                price: price,
                offers: offers,
                description: description,
                category: category
            }
        })
            .exec((error, newdata) => {
                if (newdata) {
                    res.status(200).json({ message: "newdata" })
                }
                if (error) {
                    res.status(200).json({ message: "error" })

                }
            })
    }
}


export const getproductbyslug = (req, res) => {
    const { slug } = req.params
    Categoryschema.findOne({ slug: slug })
        .select("_id pagetype")
        .exec((error, data) => {
            if (data) {
                Productschema.find({ category: data._id })
                    .exec((error, products) => {
                        if (error) {
                            res.status(400).json({ message: error })
                        }
                        if (data.pagetype) {
                            if (products.length > 0) {
                                res.status(200).json({
                                    products,
                                    priceRange: {
                                        under5k: 5000,
                                        under10k: 10000,
                                        under15k: 15000,
                                        under20k: 20000,
                                        under30k: 30000,
                                    },
                                    productsByPrice: {
                                        under5k: products.filter((product) => product.price <= 5000),
                                        under10k: products.filter(
                                            (product) => product.price > 5000 && product.price <= 10000
                                        ),
                                        under15k: products.filter(
                                            (product) => product.price > 10000 && product.price <= 15000
                                        ),
                                        under20k: products.filter(
                                            (product) => product.price > 15000 && product.price <= 20000
                                        ),
                                        under30k: products.filter(
                                            (product) => product.price > 20000 && product.price <= 30000
                                        ),
                                    },
                                });
                            }
                        } else {
                            res.status(200).json({ products });
                        }
                    })
            }
            if (error) {
                res.status(400).json({ message: error })
            }
        })
}


export const getproductbyfilterslug = (req, res) => {
    const { slug, cid } = req.params
    Categoryschema.findOne({ _id: cid })
        .select("_id pagetype")
        .exec((error, _data) => {
            Highlightschema.findOne({ slug: slug })
                .select("_id ")
                .exec((error, data) => {
                    if (data) {
                        Productschema.find({ "highlightData.filterhighlight": data._id, category: _data._id })
                            .exec((error, products) => {
                                if (error) {
                                    res.status(400).json({ message: error })
                                }

                                if (products.length > 0) {
                                    res.status(200).json({
                                        products,
                                        priceRange: {
                                            under5k: 5000,
                                            under10k: 10000, 
                                            under15k: 15000,
                                            under20k: 20000,
                                            under30k: 30000,
                                        },
                                        productsByPrice: {
                                            under5k: products.filter((product) => product.price <= 5000),
                                            under10k: products.filter(
                                                (product) => product.price > 5000 && product.price <= 10000
                                            ),
                                            under15k: products.filter(
                                                (product) => product.price > 10000 && product.price <= 15000
                                            ),
                                            under20k: products.filter(
                                                (product) => product.price > 15000 && product.price <= 20000
                                            ),
                                            under30k: products.filter(
                                                (product) => product.price > 20000 && product.price <= 30000
                                            ),
                                        },
                                    });
                                }

                            })
                    }
                    if (error) {
                        res.status(400).json({ message: error })
                    }
                })
        })
}



export const getproductdetailbyslug = (req, res) => {
    const { slug } = req.params

    Productschema.find({ slug: slug })
        .exec((error, products) => {
            if (error) {
                res.status(400).json({ message: error })
            }
            if (products) {
                if (products.length > 0) {
                    res.status(200).json({ products });
                }
            }
        })
}

