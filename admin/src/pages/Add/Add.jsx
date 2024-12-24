import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
    
    const [image,setImage] = React.useState(false)
    const [data,setData] = React.useState({
        name:'',
        description:'',
        category:'Salad',
        price:''
    })
    const onChangehandler = (e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setData(data=>({...data,[name]:value}))
    }
    
    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('name',data.name)
        formData.append('description',data.description)
        formData.append('category',data.category)
        formData.append('price',Number(data.price))
        formData.append('image',image)
        const response = await axios.post(`${url}/api/food/add`,formData)
        if(response.data.success){
            setData({
                name:'',
                description:'',
                category:'Salad',
                price:''
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)  
        }
    }
    return (
        <div>
            <div className="add">
                <form className='flex-col' onSubmit={onSubmitHandler}>
                    <div className="add-image-upload flex-col">
                        <p>Upload image</p>
                        <label htmlFor='image'>
                            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                        </label>
                        <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required />
                    </div>
                    <div className="add-product-name flex-col">
                        <p>Product name</p>
                        <input onChange={onChangehandler} value={data.name} type='text' id='name' name="name" placeholder='type' />
                    </div>
                    <div className="add-product-description flex-col">
                        <p>Product description</p>
                        <textarea onChange={onChangehandler} value={data.description} name='description' rows='6' placeholder='Write content here' required />
                    </div>
                    <div className="add-category-price">
                        <div className="add-category flex-col">
                            <p>Product Category</p>
                            <select onChange={onChangehandler} name='category'>
                                <option value='Salad'>Salad</option>
                                <option value='Rolls'>Rolls</option>
                                <option value='Deserts'>Deserts</option>
                                <option value='Sandwich'>Sandwich</option>
                                <option value='Cake'>Cake</option>
                                <option value='Pure Veg'>Pure Veg</option>
                                <option value='Pasta'>Pasta</option>
                                <option value='Noodles'>Noodles</option>
                            </select>
                        </div>
                        <div className="add-price flex-col">
                            <p>Product Price</p>
                            <input onChange={onChangehandler} value={data.price} type='number' name='price' placeholder='$20' required />
                        </div>
                    </div>
                    <button type='submit'>Add Product</button>
                </form>
            </div>
        </div>
    )
}

export default Add
