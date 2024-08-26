import { FaBagShopping, FaHeart, FaMagnifyingGlass, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { useState } from "react";

function Header() {
  const { cart } = useAppContext();
  const [searchValue,setSearchValue] = useState('');
  const [searchItems,setSearchItems] = useState([]);
  const [noItems,setNoItems] = useState(false);

  async function handleSearch(){
    
    try {
      if(searchValue.trim()) {
        const res = await axios.get(`/products/search/?name=${searchValue}`)
        if(res.data){
          setNoItems(false)
          setSearchItems(res.data); 
        }else{
          setNoItems(true)
        }
      }
      else{
        setNoItems(false)
        setSearchItems([])
      }
    } catch (error) {
      setNoItems(true)
    }
  
}

function handleLinkClick(){
  setSearchItems([])
  setSearchValue('')
}

  return (
    <header className="py-4 shadow-sm bg-white">
      <div className="container px-4 mx-auto flex flex-wrap md:flex-nowrap gap-5 md:gap-0 items-center justify-between">
        <Link to={"/"}>
          <span className="text-2xl md:text-4xl font-bold">Elegant Footwear</span>
        </Link>

        <div className="w-full max-w-xl relative flex max-md:order-1 z-10">
          <span className="absolute left-4 top-3 text-lg text-gray-400">
            <FaMagnifyingGlass />
          </span>
          <input
            type="text"
            value={searchValue}
            onChange={e=>setSearchValue(e.target.value)}
            className="w-full border border-primaryColor border-r-0 pl-12 py-3 pr-3 rounded-1-md focus:outline-none"
            placeholder="Search"
          />
          <button onClick={handleSearch} className="bg-primaryColor border border-primaryColor text-white px-8 rounded-r-md hover:bg-white hover:text-primaryColor transition">
            Search
          </button>
          <ul className={`absolute top-full z-10 left-0 right-0 bg-slate-100 p-5 ${searchItems?.length> 0 ? 'block':'hidden'}`}>
            {searchItems.map(searchItem =>{
              return <li key={searchItem._id}>
              <Link onClick={handleLinkClick} to={`/product-details/${searchItem._id}`} className="hover:text-blue-400">{searchItem.name}</Link>
            </li>
            })}
            
          </ul>

          <ul className={`absolute top-full z-10 left-0 right-0 bg-slate-100 p-5 ${noItems ? 'block':'hidden'}`}>
           <p>No Items Found!</p>
          </ul>

        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/checkout"
            className="text-center text-gray-700 hover:text-primaryColor transition relative"
          >
            <div className="text-2xl text-center">
              <FaBagShopping className="mx-auto" />
            </div>
            <p className="text-xs leading-3">Cart</p>
            <span className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs bg-primaryColor">
              {cart.length}
            </span>
          </Link>
          <Link
            to="/account"
            className="text-center text-gray-700 hover:text-primaryColor transition relative"
          >
            <div className="text-2xl text-center">
              <FaUser className="mx-auto" />
            </div>
            <p className="text-xs leading-3">Account</p>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
