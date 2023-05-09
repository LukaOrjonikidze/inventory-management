import inventory from '../models/inventory';
import classes from '../modules/Home.module.css';
import { useState, useEffect } from 'react';

const Home: React.FC = () => {
    const [location, setLocation] = useState<string>("ყველა");
    const [inventories, setInventories] = useState<inventory[]>([]);
    const [inventoriesCount, setInventoriesCount] = useState<number>(0);
    const [pageAmount, setPageAmount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [orderBy, setOrderBy] = useState<string>("name");
    const [orderType, setOrderType] = useState<string>("asc");


    useEffect(() => {
        fetch(`https://localhost:7164/api/Inventories?location=${location}&page=${page}&orderBy=${orderBy}&orderType=${orderType}`)
        .then(response => response.json())
        .then(data => {
            setInventoriesCount(data.amount);
            setPageAmount(data.pagesAmount);
            setInventories(data.inventories);
            console.log(data);
        });

    }, [location, page, orderBy, orderType]);

    

    const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLocation(event.target.value);
    }
    const pageUpHandler = () => {
        setPage(prevValue => prevValue + 1);
    }
    const pageDownHandler = () => {
        setPage(prevValue => prevValue > 1 ? prevValue - 1 : prevValue);
    }
    const sortByName = () => {
        setOrderBy(prevValue => {
            if (prevValue === "name") {
                setOrderType(prevValue => prevValue === "asc" ? "desc" : "asc");
            }
            return "name";
        });
    }
    const sortByPrice = () => {
        setOrderBy(prevValue => {
            if (prevValue === "price") {
                setOrderType(prevValue => prevValue === "asc" ? "desc" : "asc");
            }
            return "price";
        });
    }


    

    return (
        <div className={classes['main']}>
                <select onChange={selectChangeHandler} className="form-select form-select-lg w-25 h-25" >
                    <option defaultValue="ყველა">ყველა</option>
                    <option value="მთავარი ოფისი">მთავარი ოფისი</option>
                    <option value="კავეა თბილისი მოლი">კავეა თბილისი მოლი</option>
                    <option value="კავეა სითი მოლი">კავეა სითი მოლი</option>
                    <option value="კავეა გალერეა">კავეა გალერეა</option>
                    <option value="კავეა ისთ ფოინთი">კავეა ისთ ფოინთი</option>
                </select>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th onClick={sortByName} style={{cursor: "pointer"}} scope="col">სახელი</th>
                        <th scope="col">მისამართი</th>
                        <th onClick={sortByPrice} style={{cursor: "pointer"}} scope="col">ფასი</th>
                    </tr>
                </thead>
                <tbody>
                    {inventories.map(inventory => (
                        <tr key={inventory.id}>
                            <td>{inventory.id}</td>
                            <td>{inventory.name}</td>
                            <td>{inventory.location}</td>
                            <td>{inventory.price}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                        <tr>
                            <td><button onClick={pageDownHandler} className="btn btn-secondary btn-sm">-</button> Page: {page} <button onClick={pageUpHandler} className="btn btn-secondary btn-sm">+</button> </td>
                            <td>Pages: {pageAmount}</td>
                            <td colSpan={2}>Inventories Found: {inventoriesCount}</td>
                        </tr>
                </tfoot>

            </table>

        </div>
  )
}

export default Home