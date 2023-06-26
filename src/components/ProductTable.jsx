import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import { Table, Button, Modal, Form } from "react-bootstrap";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const { authState } = useContext(AuthContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    id: "",
    name: "",
    price: "",
    quantity: "",
    url: "",
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error occurred while fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    const product = products.find((product) => product.id === productId);
    if (product) {
      setEditedProduct({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        url: product.url,
      });
      setShowEditModal(true);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error occurred while deleting product:", error);
    }
  };

  const handleEditModalOpen = (product) => {
    setEditedProduct(product);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(
        `http://localhost:8080/products/${editedProduct.id}`,
        editedProduct
      );
      setShowEditModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Error occurred while updating product:", error);
    }
  };

  return (
    <div>
      <h2 className="text-success text-decoration-underline">Edit Products</h2>
      <Table striped bordered hover style={{ width: "90%" }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.url} alt={product.name} height="50" />
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <div style={{ display: "flex", gap: "5px" }}>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEditModalOpen(product)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditFormSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleEditFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={handleEditFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={editedProduct.quantity}
                onChange={handleEditFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formUrl">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                name="url"
                value={editedProduct.url}
                onChange={handleEditFormChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProductTable;
