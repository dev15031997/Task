const User=require('../models/userModel')
const bcrypt=require('bcryptjs')

// create User-(default seller)
exports.createUser= async (req,res)=>{
    const {name,email,phone,password,cpassword,country,state,skills}=req.body;

    if(!name || !email || !phone || !password || !cpassword || !country || !state || !skills)
    {
        return res.status(400).json({status:400,message:'Please fill all the fields'})
    }

    try {
        // check if user exists
        const userData=await User.findOne({email})

        if(userData)
        {
            return res.status(400).json({status:400,message: 'Email already exists' });
        }
        else if(password !==cpassword)
        {
             return res.status(400).json({status:400,message: 'Password do not match' });
        }
        else{
            // hashing password before saving
            const hashedPassword=bcrypt.hashSync(password,10);
            
            const user=new User({
                name,
                email,
                phone,
                password:hashedPassword,
                country,
                state,
                skills
            })

            await user.save()

            res.status(201).json({status:201,message:'Seller created successfully'});
        }

    } catch (error) {
          res.status(500).json({status:500,message:'Error creating seller',error});
    }
};


// Get all the seller Record
exports.getSeller= async (req,res)=>{
    const page=req.query.page || 1;
    const count=3;

    try {
        const skip=(page-1)*count;

        // Total Seller Count
        const sellerCount = await User.countDocuments({ role: 'seller' });

        // Total page Count
        const pageCount=Math.ceil(sellerCount/count)

        let sellerData=await User.find({role:'seller'}).limit(count).skip(skip).select('-password');

        res.status(200).json({status:200,message:'Sellers record fetched successfully',Pagination:{
            sellerCount,pageCount,count,page
        },sellerData});
    }catch (error) {
        res.status(500).json({status:500,message:'Error fetching seller records',error});
    }
};

// user Login
exports.userLogin=async(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password)
    {
        return res.status(400).json({status:400,message:'Please fill all the fields'})
    }

    try{
        const userExist=await User.findOne({email})

        if(!userExist)
        {
            return res.status(400).json({status:400,message: 'User not found' });
        }

        // check user record 
        const userCheck=await bcrypt.compare(password,userExist.password);

        if(!userCheck)
        {
            return res.status(400).json({status:400,message: 'Incorrect Credentials'});
        }

        // create a token
        let token=await userExist.generateToken();

        // sending user Data without password
        const safeUser=userExist.toObject();
        delete safeUser.password;
        
        res.status(200).json({status:200,message:'User Login successfull',user:safeUser,token});
    }catch(error)
    {
        res.status(500).json({status:500,message:'Error fetching user',error});
    }
};
