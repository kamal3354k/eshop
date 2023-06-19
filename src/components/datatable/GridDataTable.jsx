import React, { useState, useRef, useEffect, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons
import "primeflex/primeflex.css";
import "./style.scss";
import { toast } from "react-toastify";
import {
  useDeleteProductMutation,
  useSearchAndFilterMutation,
} from "../../redux/services/product";
import CreateAndUpdateForm from "../form/CreateAndUpdateForm";
import _ from "lodash";
import { searchQueryObj } from "../../constant";
import debounce from "lodash/debounce";
import { Paginator } from "primereact/paginator";
import { Sidebar } from "primereact/sidebar";

export default function GridDataTable() {
  let emptyProduct = {
    name: "",
    image: null,
    description: "",
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: "INSTOCK",
  };

  const emptyPagination = {
    totolData: null,
    currentPage: null,
    offset: 0,
    limit: 10,
  };

  const [productDialog, setProductDialog] = useState({
    lastClick: "",
    value: false,
  });
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [paginationObj, setPaginationObj] = useState({ first: 0, rows: 10 });
  const [searchQuery, setSearchQuery] = useState({ ...searchQueryObj });
  const [product, setProduct] = useState(emptyProduct);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const dt = useRef(null);
  const [deleteProduct] = useDeleteProductMutation();
  const [searchAndFilter, { isLoading }] = useSearchAndFilterMutation();
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const [visibleTop, setVisibleTop] = useState(false);
  const [visibleBottom, setVisibleBottom] = useState(false);

  const formatCurrency = (value) => {
    return value
      ? value.toLocaleString("en-US", {
          style: "currency",
          currency: "INR",
        })
      : value;
  };

  const openNew = () => {
    setProductDialog({ lastClick: "NEW", value: true });
    setProduct(emptyProduct);
  };

  const hideDialog = () => {
    setProductDialog({ lastClick: "HIDE", value: false });
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    // setDeleteProductsDialog(false);
    // setProduct({});
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog({ lastClick: "EDIT", value: true });
  };

  const confirmDeleteProduct = (product) => {
    setDeleteProductDialog(true);
    setProduct(product);
  };

  const deleteProductFun = () => {
    deleteProduct(product._id)
      .then((d) => {
        toast.success(d?.data?.message);
        callSearchMutationFunction();
      })
      .catch((error) => toast?.error(error?.response?.data?.message));
    setDeleteProductDialog(false);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const callSearchMutationFunction = (value) => {
    searchAndFilter(value)
      .then((d) => {
        setProducts(d?.data);
      })
      .catch((err) => toast.error(err.response.message));
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      const searchQueryString = new URLSearchParams(value).toString();

      if (searchQueryString) {
        callSearchMutationFunction(searchQueryString);
      }
    }, 500),
    []
  );

  // const confirmDeleteSelected = () => {
  //   setDeleteProductsDialog(true);
  // };

  // const deleteSelectedProducts = () => {};

  const handleSearch = useCallback(({ target: { value } }) => {
    setSearchQuery((pre) => ({ ...pre, search: value || "" }));
  }, []);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery?.search]);

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        {/* <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        /> */}
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={exportCSV}
      />
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData?.image}
        alt={rowData.image}
        className="shadow-2 border-round"
        style={{ width: "64px" }}
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  // const ratingBodyTemplate = (rowData) => {
  //   return <Rating value={rowData.rating} readOnly cancel={false} />;
  // };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.inventoryStatus}
        severity={getSeverity(rowData)}
      ></Tag>
    );
  };
  const qunatityBodyTemplate = (rowData) => {
    return rowData?.quantity;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  //limit = row
  const onPage = ({ rows, first }) => {
    const query = {
      limit: rows,
      offset: first,
    };
    const searchQueryString = new URLSearchParams(query).toString();
    callSearchMutationFunction(searchQueryString);
    setPaginationObj({ first, rows });
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Products</h4>
    </div>
  );

  const searchBar = (
    <span className="p-input-icon-left search-container">
      <i className="pi pi-search" />
      <InputText
        type="search"
        onInput={handleSearch}
        value={searchQuery?.search}
        placeholder="Search..."
      />
      <Button icon="pi pi-filter" onClick={() => setVisibleRight(true)} />
    </span>
  );

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No sing"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProductFun}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        // onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  return (
    <div>
      <div className="card">
        <div className="flex gap-2 justify-content-center"></div>


        <Sidebar
          visible={visibleRight}
          position="right"
          onHide={() => setVisibleRight(false)}
        >
          <h2>Right Sidebar</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </Sidebar>
      </div>
      <div className="gridDatatable">
        <div className="card">
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={searchBar}
          ></Toolbar>
          {!isLoading ? (
            <>
              <DataTable
                ref={dt}
                value={products?.data}
                selection={selectedProducts}
                onSelectionChange={(e) => setSelectedProducts(e.value)}
                dataKey="_id"
                paginator={false}
                rows={10}
                globalFilter={globalFilter}
                header={header}
              >
                {/* datatable checkbox */}
                {/* <Column selectionMode="multiple" exportable={false}></Column> */}
                <Column
                  field="name"
                  header="Name"
                  sortable
                  style={{ minWidth: "16rem" }}
                ></Column>
                <Column
                  field="image"
                  header="Image"
                  body={imageBodyTemplate}
                ></Column>
                <Column
                  field="price"
                  header="Price"
                  body={priceBodyTemplate}
                  sortable
                  style={{ minWidth: "8rem" }}
                ></Column>
                <Column
                  field="category"
                  header="Category"
                  sortable
                  style={{ minWidth: "10rem" }}
                ></Column>
                {/* <Column
              field="rating"
              header="Reviews"
              body={ratingBodyTemplate}
              sortable
              style={{ minWidth: "12rem" }}
            ></Column> */}
                <Column
                  field="inventoryStatus"
                  header="Status"
                  body={statusBodyTemplate}
                  sortable
                  style={{ minWidth: "12rem" }}
                ></Column>
                <Column
                  field="quantity"
                  header="Quantity"
                  body={qunatityBodyTemplate}
                  sortable
                  style={{ minWidth: "12rem" }}
                ></Column>
                <Column
                  header="Actions"
                  body={actionBodyTemplate}
                  exportable={false}
                  style={{ minWidth: "12rem" }}
                ></Column>
              </DataTable>

              <Paginator
                first={paginationObj?.first}
                rows={paginationObj?.rows}
                totalRecords={products?.totalData} // Total number of records
                rowsPerPageOptions={[5, 10, 20, 50]} // Options for rows per page
                onPageChange={onPage}
              ></Paginator>
            </>
          ) : (
            <>Loading...</>
          )}
          <CreateAndUpdateForm
            productDialog={productDialog}
            setProductDialog={setProductDialog}
            hideDialog={hideDialog}
            product={product}
            setProduct={setProduct}
            callSearchMutationFunction={callSearchMutationFunction}
          />
        </div>
      </div>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
