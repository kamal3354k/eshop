import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import { BiCameraOff, BiCloudUpload } from "react-icons/bi";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Controller, useForm } from "react-hook-form";

import "./style.scss";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "../../redux/services/product";
import { validCategories } from "../../constant.js";

const CreateAndUpdateForm = ({
  productDialog,
  setProductDialog,
  hideDialog,
  product,
  setProduct,
  callSearchMutationFunction,
}) => {
  const [image, setImage] = useState({ file: {}, previewImage: "" });
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const handleImage = async (event) => {
    const file = await event.target.files[0];
    setImage({ file: file, previewImage: URL.createObjectURL(file) });
    return event;
  };

  const onSubmit = async (fieldData) => {
    const sentData = await {
      ...fieldData,
      image: image?.file,
    };
    console.log(image?.file);
    if (productDialog?.lastClick === "NEW") {
      addProduct(sentData).then((d) => {
        if (!d.error) {
          setProductDialog(false);
          callSearchMutationFunction();
        }
      });
    } else {
      const ChangedValueObject = {};
      for (let i in product) {
        if (product[i] !== sentData[i]) {
          ChangedValueObject[i] = sentData[i];
        }
      }

      updateProduct({ ...ChangedValueObject, id: product?._id }).then((d) => {
        if (d.error) {
        } else {
          setProductDialog(false);
          callSearchMutationFunction();
        }
      });
    }
  };

  useEffect(() => {
    if (product?._id && productDialog?.lastClick === "EDIT") {
      setImage({ previewImage: product?.image });
      reset({ ...product, image: image?.file });
    } else {
      reset({});
      setImage({});
    }
  }, [product?._id, productDialog?.lastClick]);

  return (
    <Dialog
      visible={productDialog?.value}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header={`${
        productDialog?.lastClick === "Edit" ? "Edit" : "Add"
      } Product Details`}
      modal
      className="p-fluid dialog"
      onHide={hideDialog}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="product-form">
        <div className="image-container">
          <div
            className={`image-preview ${errors?.image ? "image-error" : ""}`}
            style={{
              backgroundImage: `url(${image?.previewImage})`,
            }}
          >
            <div class="edit-container">
              <input
                type="file"
                id="imageUpload"
                accept=".png, .jpg, .jpeg"
                {...register("image", {
                  required: !product._id ? "Image is required" : false,
                })}
                onChange={handleImage}
              />
              <label for="imageUpload">
                <BiCloudUpload />
              </label>
            </div>
            {!image?.previewImage && (
              <div className="no-image">
                <BiCameraOff />
                <span>{errors?.image?.message}</span>
              </div>
            )}
          </div>
        </div>
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Name
          </label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{
              required: "Name is Required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
              maxLength: {
                value: 30,
                message: "Name must not exceed 30 characters",
              },
            }}
            render={({ field }) => (
              <InputText
                {...field}
                placeholder="Enter Product Name..."
                className={errors?.name && "p-invalid"}
              />
            )}
          />
          {errors?.name && (
            <small className="p-error">{errors?.name?.message}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="description" className="font-bold">
            Description
          </label>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{
              required: "Description is Required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
              maxLength: {
                value: 200,
                message: "Description must not exceed 200 characters",
              },
            }}
            render={({ field }) => (
              <InputTextarea
                id="description"
                rows={3}
                cols={20}
                placeholder="Enter Product Description..."
                {...field}
                className={errors?.description && "p-invalid"}
              />
            )}
          />
          {errors?.description && (
            <small className="p-error">{errors?.description?.message}</small>
          )}
        </div>

        <div className="field">
          <label className="mb-3 font-bold">Category</label>
          <Controller
            name="category"
            control={control}
            defaultValue=""
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <div className="formgrid grid">
                {validCategories?.map((item, idx) => (
                  <div className="field-radiobutton col-6" key={item}>
                    <RadioButton
                      inputId={`category${idx}`}
                      name="category"
                      value={item}
                      onChange={(e) => field.onChange(e.value)}
                      checked={field?.value?.toLowerCase() === item}
                    />
                    <label htmlFor="category2">{item}</label>
                  </div>
                ))}
              </div>
            )}
          />
          {errors?.category && (
            <small className="p-error">{errors?.category?.message}</small>
          )}
        </div>

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="price" className="font-bold">
              Price
            </label>

            <Controller
              name="price"
              control={control}
              defaultValue={0}
              rules={{
                required: "Price is required",
                min: {
                  value: 100,
                  message: "Minimum price is 100",
                },
                max: {
                  value: 10000,
                  message: "Maximum price is 10000",
                },
              }}
              render={({ field, fieldState }) => (
                <React.Fragment>
                  <InputNumber
                    id="price"
                    value={field.value}
                    mode="currency"
                    currency="INR"
                    placeholder="Enter Product Price..."
                    locale="en-IN"
                    onValueChange={(e) => field.onChange(e.value)}
                    className={fieldState.invalid ? "p-invalid" : ""}
                  />
                </React.Fragment>
              )}
            />

            {errors?.price && (
              <small className="p-error">{errors?.price?.message}</small>
            )}
          </div>
          <div className="field col">
            <label htmlFor="quantity" className="font-bold">
              Quantity
            </label>

            <Controller
              name="quantity"
              control={control}
              defaultValue={0}
              rules={{
                required: "Quantity is required",
                min: {
                  value: 1,
                  message: "Minimum quantity is 1",
                },
                max: {
                  value: 100,
                  message: "Maximum quantity is 100",
                },
              }}
              render={({ field, fieldState }) => (
                <React.Fragment>
                  <InputNumber
                    id="quantity"
                    value={field.value}
                    placeholder="Enter Product Quantity..."
                    onValueChange={(e) => field.onChange(e.value)}
                    className={fieldState.invalid ? "p-invalid" : ""}
                  />
                </React.Fragment>
              )}
            />
            {errors?.quantity && (
              <small className="p-error">{errors?.quantity?.message}</small>
            )}
          </div>
        </div>
        <div class="dialog-footer">
          <Button
            label="Cancel"
            icon="pi pi-times"
            outlined
            type="button"
            onClick={hideDialog}
          />
          <Button label="Save" type="submit" icon="pi pi-check" />
        </div>
      </form>
    </Dialog>
  );
};

export default CreateAndUpdateForm;
