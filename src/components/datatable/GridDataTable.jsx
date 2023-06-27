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
import { categoryArray, emptyProduct, searchQueryObj } from "../../constant";
import debounce from "lodash/debounce";
import { Paginator } from "primereact/paginator";
import { Sidebar } from "primereact/sidebar";
import { Slider } from "primereact/slider";
import { MultiSelect } from "primereact/multiselect";
import Loader from "../loader/Loader";
import { formatCurrency, getSeverity } from "../../utlis";

export default function GridDataTable() {

  const [productDialog, setProductDialog] = useState({
    lastClick: "",
    value: false,
  });


  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState({ ...searchQueryObj });
  const [product, setProduct] = useState(emptyProduct);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const dt = useRef(null);
  const [visibleRight, setVisibleRight] = useState(false);
  const [range, setRange] = useState([0, 10000]);

  // RTK hooks
  const [deleteProduct] = useDeleteProductMutation();
  const [searchAndFilter, { isLoading }] = useSearchAndFilterMutation();


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

  const callSearchMutationFunction = useCallback((value) => {
    const searchQueryString = new URLSearchParams(value).toString();
    searchAndFilter(searchQueryString)
      .then((d) => {
        setProducts(d?.data);
      })
      .catch((err) => toast.error(err.response.message));
  }, []);

  //debounce
  const debouncedSearch = useCallback(
    debounce((value) => {
      callSearchMutationFunction(value);
    }, 500),
    []
  );

  const handleSearch = useCallback(
    ({ target: { value } }) => {
      setSearchQuery((pre) => ({ ...pre, search: value || "" }));
      debouncedSearch({ ...searchQuery, search: value });
    },
    [searchQuery]
  );

  const handleApplyFilter = () => {
    callSearchMutationFunction(searchQuery);
  };
  const handleCancelFilter = () => {
    setSearchQuery(searchQueryObj);
    setRange([0,10000])
    callSearchMutationFunction(searchQueryObj);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
      </div>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <div className="datatable-image-container">
        <img
          src={rowData?.image}
          alt={rowData.image}
          className="shadow-2 border-round "
        />
      </div>
    );
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

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

  

  //limit = row
  const onPage = ({ rows, first }) => {
    setSearchQuery((pre) => ({ ...pre, limit: rows, offset: first }));
    callSearchMutationFunction({ ...searchQuery, limit: rows, offset: first });
  };

  const handleFilterSelect = ({ target: { value } }) => {
    setSearchQuery((pre) => ({ ...pre, category: value }));
  };

  useEffect(() => {
    callSearchMutationFunction(searchQuery);
  }, []);

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

  const handleRange = useCallback((e) => {
    setRange(e.value);
    setSearchQuery((pre) => ({
      ...pre,
      min_price: e.value[0],
      max_price: e.value[1],
    }));
  }, []);

  return (
    <div>
      <div className="card">
        <div className="flex gap-2 justify-content-center"></div>

        <Sidebar
          visible={visibleRight}
          position="right"
          onHide={() => setVisibleRight(false)}
          className="sidebar"
        >
          <div className="item">
            <h3>Filter</h3>
            <div className="flex range-input-container">
              <div className="item">
                <p>Price</p>
                <hr />
                <div className="label-container">
                  <label>Min:{range[0]}</label>
                  <label>Max:{range[1]}</label>
                </div>
                <Slider
                  min={0}
                  max={10000}
                  value={range}
                  onChange={handleRange}
                  range
                />
              </div>
            </div>
          </div>

          <div className="item">
            <p>Category</p>
            <MultiSelect
              id="select"
              value={searchQuery?.category}
              onChange={handleFilterSelect}
              options={categoryArray}
              optionLabel="name"
              maxSelectedLabels={3}
              className="w-full md:w-20rem"
            />
          </div>

          <div className="flex justify-content-center apply-filter">
            <Button onClick={handleApplyFilter}>Apply</Button>
            <Button onClick={handleCancelFilter} severity="danger">
              Cancel
            </Button>
          </div>
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
                header={header}
              >
                <Column
                  field="name"
                  header="Name"
                  sortable
                  className="datatable-column"
                ></Column>
                <Column
                  field="image"
                  header="Image"
                  body={imageBodyTemplate}
                  className="datatable-column"
                ></Column>
                <Column
                  field="price"
                  header="Price"
                  body={priceBodyTemplate}
                  sortable
                  className="datatable-column"
                ></Column>
                <Column
                  field="category"
                  header="Category"
                  sortable
                  className="datatable-column"
                ></Column>
                <Column
                  field="inventoryStatus"
                  header="Status"
                  body={statusBodyTemplate}
                  sortable
                  className="datatable-column"
                ></Column>
                <Column
                  field="quantity"
                  header="Quantity"
                  body={qunatityBodyTemplate}
                  sortable
                  className="datatable-column"
                ></Column>
                <Column
                  header="Actions"
                  body={actionBodyTemplate}
                  exportable={false}
                  className="datatable-column"
                ></Column>
              </DataTable>

              <Paginator
                first={searchQuery?.offset}
                rows={searchQuery?.limit}
                totalRecords={products?.totalData} // Total number of records
                rowsPerPageOptions={[5, 10, 20, 50]} // Options for rows per page
                onPageChange={onPage}
              ></Paginator>
            </>
          ) : (
            <Loader/>
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
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        className="dialog"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
