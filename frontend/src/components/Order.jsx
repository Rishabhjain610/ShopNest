// import React, { useState, useContext, useEffect } from "react";
// import { ShopDataContext } from "../contextapi/ShopContext";
// import { AuthDataContext } from "../contextapi/AuthContext";
// import axios from "axios";
// const Order = () => {
//   const [orderData, setOrderData] = useState([]);
//   const { serverUrl } = useContext(AuthDataContext);
//   const { currency } = useContext(ShopDataContext);
//   const loadOrderData = async () => {
//     try {
//       const result = await axios.post(
//         `${serverUrl}/api/order/order`,
//         {},
//         {
//           withCredentials: true,
//         }
//       );
      
//       if (result.data) {
        
//         let allOrdersItems=[];
        
//         result.data.data.map((order)=>{
//          order.items.map((item)=>{
          
//           item['status']=order.status;
//           item['orderId']=order.payment;
//           item['paymentMethod']=order.paymentMethod;
//           item['date']=order.date;
//           allOrdersItems.push(item);
//          })
//         })
        
//         setOrderData(allOrdersItems);
        
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//  useEffect(()=>{
//  loadOrderData();
//  },[])
//   return (
//     <div className="pt-32 px-4 min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
//       <h1 className="text-4xl font-extrabold text-blue-400 text-center mb-8 tracking-wide drop-shadow-lg">
//         Your Orders
//       </h1>
     
//       {orderData.length > 0 ? (
//         <div className="max-w-3xl mx-auto">
//           <div className="grid gap-6">
//             {orderData.map((item, idx) => (
//               <div
//                 key={item.orderId + item._id + idx}
//                 className="bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6"
//               >
//                 <img
//                   src={item.image1}
//                   alt={item.name}
//                   className="w-24 h-24 object-cover rounded-xl border-2 border-blue-700/30 shadow"
//                 />
//                 <div className="flex-1">
//                   <h2 className="text-xl font-bold text-blue-300 mb-2">{item.name}</h2>
//                   <p className="text-blue-100 mb-1">
//                     <span className="font-semibold">Price:</span> {currency}{item.price}
//                   </p>
//                   <p className="text-blue-100 mb-1">
//                     <span className="font-semibold">Quantity:</span> {item.quantity}
//                   </p>
//                   <p className="text-blue-100 mb-1">
//                     <span className="font-semibold">Size:</span> {item.size}
//                   </p>
//                   <p className="text-blue-100 mb-1">
//                     <span className="font-semibold">Payment:</span> {item.paymentMethod}
//                   </p>
//                   <p className="text-blue-100 mb-1">
//                     <span className="font-semibold">Date:</span> {new Date(item.date).toLocaleDateString()}
//                   </p>
//                   <p className="text-blue-100 mb-1">
//                     <span className="font-semibold">Status:</span>{" "}
//                     <span
//                       className={`px-2 py-1 rounded-full text-sm font-semibold ${
//                         item.status === "Delivered"
//                           ? "bg-green-100 text-green-800"
//                           : item.status === "Shipped"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : "bg-blue-100 text-blue-800"
//                       }`}
//                     >
//                       {item.status}
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <p className="text-center text-blue-200 text-lg mt-12">No orders found.</p>
//       )}
//     </div>
//   );
// };

// export default Order;
import React, { useState, useContext, useEffect } from "react";
import { ShopDataContext } from "../contextapi/ShopContext";
import { AuthDataContext } from "../contextapi/AuthContext";
import axios from "axios";

const Order = () => {
  const [orderData, setOrderData] = useState([]);
  const { serverUrl } = useContext(AuthDataContext);
  const { currency } = useContext(ShopDataContext);

  const loadOrderData = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/order`,
        {},
        { withCredentials: true }
      );
      if (result.data) {
        let allOrdersItems = [];
        result.data.data.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["orderId"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItems.push(item);
          });
        });
        setOrderData(allOrdersItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="pt-32 px-4 min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <h1 className="text-4xl font-extrabold text-blue-400 text-center mb-10 tracking-wide drop-shadow-lg font-sans">
        Your Orders
      </h1>
      {orderData.length > 0 ? (
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {orderData.map((item, idx) => (
              <div
                key={item.orderId + item._id + idx}
                className="bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col sm:flex-row items-center gap-8 border border-blue-900/30 hover:shadow-blue-400/30 transition-all"
              >
                <img
                  src={item.image1}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-xl border-2 border-blue-700/30 shadow"
                />
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-2">
                    <h2 className="text-2xl font-bold text-blue-300 mb-2 sm:mb-0">{item.name}</h2>
                    <span className="text-blue-100 text-lg font-semibold">
                      {currency}{item.price}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-8 gap-y-2 mb-2 text-blue-100">
                    <span>
                      <span className="font-semibold">Quantity:</span> {item.quantity}
                    </span>
                    <span>
                      <span className="font-semibold">Size:</span> {item.size}
                    </span>
                    <span>
                      <span className="font-semibold">Payment:</span> {item.paymentMethod}
                    </span>
                    <span>
                      <span className="font-semibold"></span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-8 gap-y-2 mb-2 text-blue-100">
                    <span>
                      <span className="font-semibold">Date:</span> {new Date(item.date).toLocaleDateString()}
                    </span>
                    <span>
                      <span className="font-semibold">Status:</span>{" "}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.status === "Delivered"
                            ? "bg-green-200 text-green-800"
                            : item.status === "Shipped"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-blue-200 text-blue-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-blue-200 text-lg mt-16">No orders found.</p>
      )}
    </div>
  );
};

export default Order;