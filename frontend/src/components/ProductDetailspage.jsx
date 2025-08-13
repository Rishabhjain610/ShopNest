import React from 'react'
import { useContext,useState,useEffect } from 'react';
import { ShopDataContext } from '../contextapi/ShopContext';
import { useParams } from 'react-router-dom';
const ProductDetailspage = () => {
  const {id}=useParams();
  const {products,currency}=useContext(ShopDataContext);
  const [image,setImage]=useState("");
  const [image1,setImage1]=useState("");
  const [image2,setImage2]=useState("");  
  const [image3,setImage3]=useState("");
  const [image4,setImage4]=useState("");
  const [productData,setProductData]=useState(false);
  const fetchProductData=async()=>{
    const products1=products.products;
    console.log(products1);
    console.log(pro)
    products1.map((item)=>{
      if(item.id===id){
        setProductData(item);
        console.log(productData.image1)
        setImage1(item.image1);
        console.log(item.image1);
        setImage2(item.image2);
        console.log(item.image2);
        setImage3(item.image3);
        console.log(item.image3);
        setImage4(item.image4);
        console.log(item.image4);
        setImage(item.image1);
      }
    })
    return null;
  }
  useEffect(()=>{
    fetchProductData();
  },[id,products])
  return (
    <div>
      <div>
        <div>
          <img src={image} alt="" />
        </div>
        <div>
          <img src={image1} alt="" />
        </div>
        <div>
          <img src={image2} alt="" />
        </div>
        <div>
          <img src={image3} alt="" />
        </div>
        <div>
          <img src={image4} alt="" />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailspage

