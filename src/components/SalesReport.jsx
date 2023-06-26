import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import "./navStyle.css";

function SalesReport({ onMostOrderedItemChange }) {
  const [orders, setOrders] = useState([]);
  const [mostOrderedItem, setMostOrderedItem] = useState(null);
  const [mostOrderedItemCount, setMostOrderedItemCount] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    calculateMostOrderedItem();
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/orders");
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateMostOrderedItem = () => {
    if (orders.length === 0) {
      setMostOrderedItem(null);
      setMostOrderedItemCount(0);
      return;
    }

    const itemsCountMap = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const { productId } = item;
        if (itemsCountMap[productId]) {
          itemsCountMap[productId] += item.quantity;
        } else {
          itemsCountMap[productId] = item.quantity;
        }
      });
    });

    const mostOrderedItemId = Object.keys(itemsCountMap).reduce((a, b) =>
      itemsCountMap[a] > itemsCountMap[b] ? a : b
    );

    const mostOrderedItem = orders
      .map((order) => order.items)
      .flat()
      .find((item) => item.productId === mostOrderedItemId);

    const mostOrderedItemCount = itemsCountMap[mostOrderedItemId];

    setMostOrderedItem(mostOrderedItem);
    setMostOrderedItemCount(mostOrderedItemCount);

    if (onMostOrderedItemChange) {
      onMostOrderedItemChange(mostOrderedItem, mostOrderedItemCount);
    }
  };

  return (
    <div>
      {mostOrderedItem && (
        <div className="border border-danger">
          <h3>Most Ordered Item:</h3>
          <p>Product Name: {mostOrderedItem.productName}</p>
          <p>Price: {mostOrderedItem.price}</p>
          <p>Quantity Ordered: {mostOrderedItem.quantity}</p>
          <img
            src={mostOrderedItem.url}
            alt={mostOrderedItem.productName}
            style={{ maxWidth: "250px", maxHeight: "250px" }}
          />
        </div>
      )}
      <h2>Sales Report</h2>
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Order Date</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.userId}</td>
                <td>{order.orderDate}</td>
                <td>
                  <Table striped bordered size="sm">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity Purchased</th>
                        <th>Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item.productId}>
                          <td>{item.productName}</td>
                          <td>{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>
                            <img
                              src={item.url}
                              alt={item.productName}
                              style={{ maxWidth: "50px", maxHeight: "50px" }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default SalesReport;
