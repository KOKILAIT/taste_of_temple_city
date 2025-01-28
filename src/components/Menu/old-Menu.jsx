import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Img from "../../assets/biryani.png";
import Img2 from "../../assets/biryani2.png";
import Img3 from "../../assets/biryani4.png";
import StarRatings from "react-star-ratings";
import "semantic-ui-css/semantic.min.css";
const ServicesData = [
  {
    id: 1,
    img: Img2,
    name: "Biryani",
    description:
      "Briyani is an Emotion. Enjoy the real spices of subcontinent.",
    price: 10,
  },
  {
    id: 2,
    img: Img,
    name: "Chiken kari",
    description: "Chettinadu chicken is everything you need for the weekend",
    price: 5,
  },
  {
    id: 3,
    img: Img3,
    name: "Fish curry",
    description: "Freshly from Atlantics",
    price: 12,
  },
];
const Services = ({ service, Add, Remove }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [servicePrices, setServicePrices] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [addCounts, setAddCounts] = useState({});
  const [removeCounts, setRemoveCounts] = useState({});
  const [email, setEmail] = useState(""); // Add this line
  const [phone, setPhone] = useState(""); // And this line
  const validateForm = () => {
    return email !== "" && phone !== "";
  };

  const handleOrders = async () => {
    const orderDetails = Object.entries(addCounts).map(
      ([serviceName, count]) => {
        const service = ServicesData.find(
          (service) => service.name === serviceName
        );
        return {
          name: serviceName,
          quantity: count,
          price: service.price * count,
        };
      }
    );

    try {
      const response = await axios.post(
        "http://localhost:8081/orders",
        orderDetails
      );
      if (response.status === 200) {
        toast.success("Order placed successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Failed to place order. Please try again.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error("An error occurred while placing the order.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const sendEmail = async () => {
    if (isFormValid) {
      const response = await axios.post(
        "https://backend-ochre-mu.vercel.app/mail",
        {
          email: email,
          phone: phone,
          addCounts,
          totalPrice,
        }
      );
      if (response.status === 200 && response.statusText === "OK") {
        toast.success(
          "Thanks for your message! We love to hear from people and will get back to you if needed.",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      } else {
        toast.error("Enter a valid email address");
      }
    }
  };
  const Menu = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };

    const filteredServices = ServicesData.filter((service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  const handleAdd = (serviceName) => {
    // Increase the count
    setAddCounts((prevCounts) => ({
      ...prevCounts,
      [serviceName]: (prevCounts[serviceName] || 0) + 1,
    }));
    console.log("Updated fact", serviceName);
    // Calculate the price
    const service = ServicesData.find(
      (service) => service.name === serviceName
    );
    if (service) {
      console.log(service.price);
      setTotalPrice((prevPrice) => prevPrice + parseFloat(service.price));
    }
  };
  const handleRemove = (serviceName) => {
    // Decrease the count
    setAddCounts((prevCounts) => {
      if (prevCounts[serviceName] > 0) {
        return { ...prevCounts, [serviceName]: prevCounts[serviceName] - 1 };
      }
      return prevCounts;
    });

    // Calculate the price
    const service = ServicesData.find(
      (service) => service.name === serviceName
    );
    if (service && removeCounts[serviceName] > 0) {
      setTotalPrice((prevPrice) => prevPrice - service.price);
      console.log(totalPrice);
    }
  };
  return (
    <>
      <span id="services"></span>
      <div className="py-10">
        <div className="container">
          <div className="text-center mb-20 max-w-[400px] mx-auto">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Our Signature dishes
            </h1>
            <div className="ui search">
              <div className="ui icon input">
                <input
                  type="text"
                  placeholder="Search dish"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <i className="search icon"></i>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Don't worry to miss your favorite food. We are here to serve you.
              Bringing our authentic flavour overseas
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-5 place-items-center">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                data-aos="zoom-in"
                data-aos-duration="300"
                className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-high group max-w-[300px]"
              >
                <div className="h-[100px]">
                  <img
                    src={service.img}
                    alt=""
                    className="max-w-[200px] block mx-auto transform -translate-y-14
        group-hover:scale-105 group-hover:rotate-6 duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <div className="w-full "></div>
                  <h1 className="text-xl font-bold">{service.name}</h1>
                  <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                    {service.description}
                  </p>
                </div>
                <div>
                  <p className="text-center text-black-500 group-hover:text-white duration-high text-sm line-clamp-2 text-xl font-bold">
                    💲 {service.price}
                  </p>
                </div>
                <div className="p-4 text-center">
                  <div className="w-full "></div>
                </div>
                <div className="flex justify-center gap-4 mt-10">
                  <button
                    onClick={() => handleAdd(service.name)}
                    className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-full shadow-xl hover:shadow-md mr-2"
                  >
                    ➕{addCounts[service.name] || 0}
                  </button>
                  <button
                    onClick={() => handleRemove(service.name)}
                    className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-full shadow-xl hover:shadow-md ml-2"
                  >
                    ➖{removeCounts[service.name] || 0}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-5 place-items-center">
            {ServicesData.map((service) => (
              <div
                data-aos="zoom-in"
                data-aos-duration="300"
                className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-high group max-w-[300px]"
              >
                <div className="h-[100px]">
                  <img
                    src={service.img}
                    alt=""
                    className="max-w-[200px] block mx-auto transform -translate-y-14
                  group-hover:scale-105 group-hover:rotate-6 duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <div className="w-full "></div>
                  <h1 className="text-xl font-bold">{service.name}</h1>
                  <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                    {service.description}
                  </p>
                </div>
                <div>
                  <p className="text-center text-black-500 group-hover:text-white duration-high text-sm line-clamp-2 text-xl font-bold">
                    💲 {service.price}
                  </p>
                </div>
                <div className="p-4 text-center">
                  <div className="w-full "></div>
                </div>
                <div className="flex justify-center gap-4 mt-10">
                  <button
                    onClick={() => handleAdd(service.name)}
                    className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-full shadow-xl hover:shadow-md mr-2" // added margin-right
                  >
                    ➕{addCounts[service.name] || 0}
                  </button>
                  <button
                    onClick={() => handleRemove(service.name)}
                    className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-full shadow-xl hover:shadow-md ml-2" // added margin-left
                  >
                    ➖{removeCounts[service.name] || 0}
                  </button>
                </div>
              </div>
            ))}
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  //sendEmail();
                  handleOrders();
                  setEmail("");
                  setPhone("");
                  Object.keys(addCounts).forEach((key) => {
                    addCounts[key] = 0;
                  });
                  Object.keys(removeCounts).forEach((key) => {
                    removeCounts[key] = 0;
                  });
                }}
                className="form"
              >
                <input
                  type="text"
                  placeholder="Share your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsFormValid(validateForm());
                  }}
                />
                <input
                  type="phone"
                  placeholder="Share your contact number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setIsFormValid(validateForm());
                  }}
                />

                <button
                  onClick={() => {
                    if (!isFormValid) {
                      toast("Please fill in all the fields", {
                        style: {
                          backgroundColor: "#eab308",
                          color: "#fff",
                        },
                      });
                      return;
                    }
                    let message = [];
                    message.push("Order Placed Successfully!");
                    for (const [serviceName, count] of Object.entries(
                      addCounts
                    )) {
                      if (count > 0) {
                        message.push(`${serviceName}: ${count}`);
                      }
                    }
                    console.log("Total Price", totalPrice);
                    message.push(`Total Price: ${totalPrice}`);
                    if (message.length > 0) {
                      toast(
                        <div>
                          {message.map((item, index) => (
                            <div key={index}>{item}</div>
                          ))}
                        </div>,
                        {
                          style: {
                            backgroundColor: "#eab308", // Change this to your theme's background color
                            color: "#fff", // Change this to your theme's text color
                          },
                        }
                      );
                    }
                    //   window.location.reload();
                  }}
                  className="align-middle bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-full shadow-xl hover:shadow-md ml-2 "
                >
                  Place Order
                </button>
              </form>
            </>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Services;
