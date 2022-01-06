import mongoose  from "mongoose"
import NewpageSchema from "../../schema/newpage/newpageschema.js"

export const newpagecontroller = (req, res) => {

    const { title, description ,category} = req.body

    let banners = []
    if (req.files.banners.length > 0) {
        banners = req.files.banners.map(file => {
            return { img: file.filename }
        })
    }
   let products = []

    if (req.files.products.length > 0) {
        products = req.files.products.map(file => {
            return { img: file.filename }
        })
    }
    const _newpagecontroller = new NewpageSchema({
        title,
        description,
        banners,
        products,
        category,
        createdBy: req.user._id 
    })

    _newpagecontroller.save((error, data) => {
        if (data) {
            res.status(200).json({ message: data })
        }
        if (error) {
            res.status(500).json(error, "something went wrong new page")

        }
    })



}


export const getallnewpage = (req,res) =>{
    const _getallnewpage = NewpageSchema.find({})
    .exec((error,data)=>{
        if(data){
res.status(200).json({message:data})
        }
        if(error){
            res.status(500).json({message:"error getalldata"})
        }
    })
}


export const getnepagebycat = (req,res) =>{
    const { cid, pagetype } = req.params;
    if (pagetype == "page") {
        NewpageSchema.findOne({ category: cid })
        .exec((error, page) => {
        if (error) return res.status(500).json({ error });
        if (page) return res.status(200).json({ page });
      });
    }
  };