import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import axios from "axios"

export const Orders = () => {
	const [orders, setOrders] = useState([])
	const [showTable, setShowTable] = useState(false)
	const [showButtons, setShowButtons] = useState(false);
	
	useEffect(() => {
		fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-Orders`)
			.then(response => response.json())
			.then(loquerecibo => setOrders(loquerecibo))
	}, [])	   

	const handleSendOrder = async (orderId) => {
		try {
			const resp = await axios.put(
				`${import.meta.env.VITE_SERVER_URI}/api/update-order/${orderId}/send`
			);
	
			if (resp.status === 200) {
				const updatedOrders = orders.map((order) =>
					order._id === orderId ? { ...order , state: "sent" } : order
				);
				setOrders(updatedOrders);
			}
		} catch (error) {
			console.error('Error updating order status:', error);
		}
	};
	const handleShow = () => {
		setShowTable(true);
		setShowButtons(true);
	};
	const handleHide = () => {
		setShowTable(false);
		setShowButtons(false);
	};
	
	const handleDelete = async () => {
		let validator = window.confirm(
			`Are you sure you want to delete the sent orders??`
		)
		if (validator){
			try {
			  await axios.delete(`${import.meta.env.VITE_SERVER_URI}/api/delete-all-orders`, {
				headers: {
				  Authorization: "Bearer " + localStorage.getItem("token"),
				},
			  });
			  const ordersToKeep = orders.filter((order) => order.state !== "sent");
			  setOrders(ordersToKeep);  
			} catch (error) {
			  console.error("Error when deleting orders: ", error);
			}}
	};
	return (
		<Container id="admin" className="admin-container">
			<h1 className="h1">Orders</h1>
			<br />
				<table id="responsive-table" className="table" >
					<thead className="thead-dark">
						<tr className="tr">
							<th className="th" scope="col">Client data</th>
							<th className="th" scope="col">Menus</th>
							<th className="th" scope="col">Total</th>
							<th className="th" scope="col">Options</th>
						</tr>
					</thead>
					<tbody className="tbody">{orders.filter((order) => order.state === "process")
                    .map((order) => (
                        <tr key={order._id}>
                            <td className="letra_tabla" data-label="Datos del Cliente:"> 
                                    <p className="pDatosdel cliente"><b>*Name:</b> {order.datos.name}</p>
                                    <p className="pDatosdel cliente"><b>*Phone:</b> {order.datos.phone}</p>
                            </td>
                            <td className="letra_tabla" data-label="Menus:">
                                {order.items.map((item) => (
                                <div key={item.id}>
                                    <ul>
                                        <li> {item.name}</li>
										<li>Quantity: {item.cantidad}</li>
                                    </ul>
                                </div> ))}
                            </td>
                            <td  className="letra_tabla" data-label="Total:">{order.total}
                            </td>
                            <td >
                                <button style={{backgroundColor:"#b8733a", margin:"8px", color:"white"}} onClick={() => handleSendOrder(order._id)}>
									Send
								</button>
                            </td>
                        </tr>))}
                    </tbody>
				</table>
				<button style={{backgroundColor:"#372214", margin:"8px", color:"white"}} onClick={handleShow}>
					Show Orders of the Day
				</button>
				<br />
				{showTable && (
				<table id="responsive-table" className="table" style={{marginBottom:"0"}}>
					<thead className="thead-dark">
					    <tr>
                            <td colSpan="5">Orders of the Day</td>
                        </tr>
						<tr className="tr">
							<th className="th" scope="col">Client data</th>
							<th className="th" scope="col">Menus</th>
							<th className="th" scope="col">Total</th>
						</tr>
					</thead>
					<tbody className="tbody">{orders.filter((order) => order.state === "sent")
                    .map((order) => (
                        <tr key={order._id}>
                            <td className="letra_tabla" data-label="Client data:"> 
                                <ul>
                                    <li>Direccion: {order.datos.name}</li>
                                 </ul>
                            </td>
                            <td className="letra_tabla" data-label="Menus:">
                                {order.items.map((item) => (
                                <div key={item.id}>
                                    <ul>
                                        <li> {item.name}</li>
										<li>{item.cantidad}</li>
                                    </ul>
                                </div> ))}
                            </td>
                            <td  className="letra_tabla" data-label="Total:">{order.total}
                            </td>
                        </tr>))}
                    </tbody>
					<tfoot>
                        <tr>
							<td className="td"></td>
							<td className="td"></td>
							<td className="td">{orders .filter((order) => order.state === "sent")
                                .reduce((total, order) => total + order.total, 0)}
							</td>
                        </tr>
                    </tfoot>
				</table>
				)} 
                {showButtons && (
				<div className="botones">
				    <button style={{backgroundColor:"#372214", margin:"8px", color:"white"}} className="boton1" onClick={handleHide}>
				        Accept
				    </button>
				    <button style={{backgroundColor:"#372214", margin:"8px", color:"white"}} className="boton2" onClick={handleDelete}>
		                Delete
				    </button>
				</div>
				)} <br />
		</Container>
	)		
}