import express from 'express'
const logout = (req,res) => {
res.clearCookie('JWT',{
    httpOnly:true,
    secure: false,
    sameSite:"strict"
})
res.status(200).json({message:"user logout successfully"})
}

export default logout
