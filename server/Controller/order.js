


export const addOrder = async (req, res) => {
    try{
        console.log("req.body = ", req.body);
        const{ user, products, totalAmount } = req.body;
    }catch(err){
        res.status(401).json({error:err.message});
    }

}