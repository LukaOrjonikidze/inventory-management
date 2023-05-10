import classes from "../modules/AddInventory.module.css";
import {useState} from "react";
import { Link } from "react-router-dom";

const AddInventory: React.FC = () => {
  const [name, setName] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [price, setPrice] = useState<number>(0)
  const [message, setMessage] = useState<string>("")


  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('https://localhost:7164/api/Inventories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, location, price})
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setMessage("დამატებულია");
    })
  }
  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }
  const locationChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  }
  const priceChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(+event.target.value);
  }
  


  return (
    <div className={classes['add-inventory']}>
      <h1>დამატება</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">სახელი</label>
          <input onChange={nameChangeHandler} value={name} type="text" className="form-control" id="name" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
          <label htmlFor="location" className="form-label">მისამართი</label>
          <input onChange={locationChangeHandler} value={location} type="text" className="form-control" id="location" />
          </div>
          <div className="mb-3">
          <label htmlFor="price" className="form-label">ფასი ₾</label>
          <input onChange={priceChangeHandler} value={price} type="number" className="form-control" id="price" />
          </div>
          <button type="submit" className="btn btn-success w-100">დამატება</button>
      </form>
      {message  !== "" &&  <p>{message}</p>}
      <Link to="/"><button className="btn btn-secondary w-25">გასვლა</button> </Link>
    </div>
  )
}

export default AddInventory