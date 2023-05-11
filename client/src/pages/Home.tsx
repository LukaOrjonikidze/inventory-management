import inventory from '../models/inventory';
import classes from '../modules/Home.module.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    const [location, setLocation] = useState<string>("ყველა");
    const [inventories, setInventories] = useState<inventory[]>([]);
    const [inventoriesCount, setInventoriesCount] = useState<number>(0);
    const [pageAmount, setPageAmount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [orderBy, setOrderBy] = useState<string>("name");
    const [orderType, setOrderType] = useState<string>("asc");
    const [render, setRender] = useState<boolean>(false);


    

    useEffect(() => {
        fetch(`https://localhost:7164/api/Inventories?location=${location}&page=${page}&orderBy=${orderBy}&orderType=${orderType}`)
        .then(response => response.json())
        .then(data => {
            setInventoriesCount(data.amount);
            setPageAmount(data.pagesAmount);
            setInventories(data.inventories);
            console.log(data);
        });

    }, [location, page, orderBy, orderType, render]);

    

    

    const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLocation(event.target.value);
    }
    const pageUpHandler = () => {
        setPage(prevValue => prevValue < pageAmount ? prevValue + 1 : prevValue);
    }
    const pageDownHandler = () => {
        setPage(prevValue => prevValue > 1 ? prevValue - 1 : prevValue);
    }
    const sortByName = () => {
        setOrderBy(prevValue => {
            prevValue === "name" ? setOrderType(prevValue => prevValue === "asc" ? "desc" : "asc")
            : setOrderType("asc");
            return "name";
        });
    }
    const sortByPrice = () => {
        setOrderBy(prevValue => {
            prevValue === "price" ? setOrderType(prevValue => prevValue === "asc" ? "desc" : "asc")
            : setOrderType("asc");
            return "price";
        });
    }
    const handleDelete = (id: number) => {
        fetch(`https://localhost:7164/api/Inventories/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setRender(prevValue => !prevValue);
        });
        
    }


    

    return (
        <div className={classes['main']}>
            <div className={classes['controls']}>
                <select onChange={selectChangeHandler} className="form-select form-select-lg" >
                    <option defaultValue="ყველა">ყველა</option>
                    <option value="მთავარი ოფისი">მთავარი ოფისი</option>
                    <option value="კავეა თბილისი მოლი">კავეა თბილისი მოლი</option>
                    <option value="კავეა სითი მოლი">კავეა სითი მოლი</option>
                    <option value="კავეა გალერეა">კავეა გალერეა</option>
                    <option value="კავეა ისთ ფოინთი">კავეა ისთ ფოინთი</option>
                </select>
                <Link to={"/add"}><button className="btn btn-success btn-lg">დამატება</button></Link>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th onClick={sortByName} style={{cursor: "pointer"}} scope="col">სახელი
                        &nbsp; {orderBy === "name" ? orderType === "asc" ? '↑' : '↓' : null}
                         </th>
                        <th scope="col">მისამართი</th>
                        <th onClick={sortByPrice} style={{cursor: "pointer"}} scope="col">ფასი ₾
                        &nbsp; {orderBy === "price" ? orderType === "asc" ? '↑' : '↓' : null}
                        </th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {inventories.map(inventory => (
                        <tr key={inventory.id}>
                            <td>{inventory.name}</td>
                            <td>{inventory.location}</td>
                            <td>{inventory.price.toString()}</td>
                            <td onClick={() => handleDelete(inventory.id)} style={{cursor: "pointer"}}>🗑️</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                        <tr>
                            <td>
                                <button disabled={page == 1} onClick={pageDownHandler} className="btn btn-secondary btn-sm">-</button>
                                 Page: {page} 
                                <button disabled={page >= pageAmount} onClick={pageUpHandler} className="btn btn-secondary btn-sm">+</button>
                            <input placeholder='page' onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPage(+e.target.value)}/>
                             </td>
                            <td>Pages: {pageAmount}</td>
                            <td >Inventories Found: {inventoriesCount}</td>
                        </tr>
                </tfoot>

            </table>

        </div>
  )
}

export default Home