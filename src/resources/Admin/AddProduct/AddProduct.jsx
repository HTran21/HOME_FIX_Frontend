import className from "classnames/bind";
import styles from "./AddProduct.module.scss";
import { useState, useEffect } from "react";
import axios from '../../../service/customize_axios';
import { toast } from "react-toastify";

const cx = className.bind(styles);

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";

import React from 'react';
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';


// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

function AddProduct() {

    const [showImage, setShowImage] = useState("../public/icon/image-gallery.png")
    const [nameProduct, setNameProduct] = useState("");
    const [contentMarkdown, setContentMarkdown] = useState("");
    const [contentHTML, setContentHTML] = useState("")
    const [imageProduct, setImageProduct] = useState();
    const [idCategori, setidCategori] = useState();
    const [idBrand, setidBrand] = useState();
    const [listCategories, setListCategories] = useState();
    const [listBrands, setListBrands] = useState();
    const [errors, setErrors] = useState({});

    const [inputKey, setInputKey] = useState(0);

    const fetchCategories = () => {
        axios.get("http://localhost:3000/product/categories")
            .then(res => {
                setListCategories(res.data)
            })
            .catch((error) => console.log(error));
    }
    const fetchBrands = () => {
        axios.get("http://localhost:3000/product/brand")
            .then(res => {
                setListBrands(res.data)

            })
            .catch(err => console.log(err));

    }

    useEffect(() => {
        fetchCategories();
        fetchBrands();
    }, [])

    function handleEditorChange({ html, text }) {
        setContentHTML(html);
        setContentMarkdown(text)
        // console.log('handleEditorChange', html, text);
    }

    const uploadService = () => {
        // console.log("nameService", nameService);
        // console.log("HTML", contentHTML);
        // console.log("Markdown", contentMarkdown);
        // console.log("LOGO", logoService);

        const newErrors = {};

        if (nameProduct.trim() === "") {
            newErrors.nameProduct = "Chưa nhập tên sản phẩm"
        }

        if (!imageProduct) {
            newErrors.imageProduct = "Chưa chọn ảnh"
        }

        if (contentMarkdown.trim() === "") {
            newErrors.contentMarkdown = "Chưa nhập mô tả sản phẩm"
        }

        if (idBrand <= 0 || !idBrand) {
            newErrors.idBrand = "Chưa chọn nhãn hàng"
        }

        if (idCategori <= 0 || !idCategori) {
            newErrors.idCategori = "Chưa chọn loại thiết bị"
        }


        if (Object.keys(newErrors).length === 0) {
            setErrors({});
            const formData = new FormData();
            formData.append('imageProduct', imageProduct)
            formData.append('nameProduct', nameProduct)
            formData.append('idBrand', idBrand)
            formData.append('idCategori', idCategori)
            formData.append('contentMarkdown', contentMarkdown)
            formData.append('contentHTML', contentHTML)
            // console.log("Hinh anh", imageProduct)
            // console.log("Input key", inputKey)


            axios.post("http://localhost:3000/product", formData)
                .then(res => {
                    if (res.data.success === false) {
                        toast.error(res.data.message)
                    }
                    else {
                        toast.success(res.data.message)
                        setNameProduct('');
                        setShowImage('../public/icon/image-gallery.png')
                        setImageProduct();
                        setidBrand("");
                        setidCategori("");
                        setContentMarkdown('');
                        setContentHTML('');
                        setInputKey(prevKey => prevKey + 1);
                    }
                })

        } else {
            setErrors(newErrors);
        }

    }

    return (
        <>
            <div className={cx("containerPage")}>
                <div className="titleProduct">
                    <h4 className="d-inline-block">Thêm sản phẩm</h4>
                </div>
                <div className={cx("contentPage")}>
                    <div className={cx("titleContentService")}>
                        <img src="../public/icon/home-appliance.png" alt="" className={cx("iconTitleContentService")} />
                        <div className={cx("contentTitleContentService")}>
                            <h5>Thông tin sản phẩm</h5>
                            <p>Điên đầy đủ thông tin sản phẩm bên dưới.</p>
                        </div>
                    </div>

                    <div className={cx("titleService")}>
                        <div className="mb-3 mt-4">
                            <h5>Tên sản phẩm</h5>
                            <input

                                type="text"
                                className={`form-control mt-2 ${cx("inputForm")} ${errors.nameProduct ? 'border border-danger' : ''} `}
                                id="exampleFormControlInput1"
                                placeholder="Nhập tên sản phẩm"
                                value={nameProduct}
                                onChange={(e) => { setNameProduct(e.target.value) }}
                                autoComplete="off"
                            />
                            {errors.nameProduct && <p className={cx("errors")}>{errors.nameProduct}</p>}
                        </div>

                    </div>
                    <div className="logoService mb-3">
                        <h5>Hình ảnh sản phẩm</h5>

                        <input type="file" name="imgService" id="imgService" className="d-none"
                            key={inputKey}
                            accept="image/jpeg, image/png, image/jpg"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setShowImage(URL.createObjectURL(e.target.files[0]))
                                    setImageProduct(e.target.files[0])
                                }
                            }} />
                        <label htmlFor="imgService" className={`${cx("labelImgService")} ${errors.logoService ? 'border-danger' : ''}`}>
                            <img className={cx("imgService")} src={showImage} alt="" />
                        </label>
                        {errors.imageProduct && <p className={cx("errors")}>{errors.imageProduct}</p>}
                    </div>
                    <div className={cx("titleService")}>
                        <div className="mb-3 mt-4">
                            <h5>Chọn nhãn hàng</h5>
                            <select className={`form-control mt-2 ${cx("inputForm")} ${errors.idBrand ? ' border-danger' : ''} `} aria-label="Default select example"
                                value={idBrand} onChange={(e) => setidBrand(e.target.value)}
                            >
                                <option value="0">Chọn nhãn hàng</option>
                                {
                                    listBrands?.map((brand, i) =>
                                        <option key={i} value={brand.id}>{brand.nameBrand}</option>
                                    )
                                }
                            </select>
                            {errors.idBrand && <p className={cx("errors")}>{errors.idBrand}</p>}

                        </div>

                    </div>
                    <div className={cx("titleService")}>
                        <div className="mb-3 mt-4">
                            <h5>Chọn loại thiết bị</h5>
                            <select className={`form-control mt-2 ${cx("inputForm")} ${errors.idCategori ? ' border-danger' : ''} `} aria-label="Default select example"
                                value={idCategori} onChange={(e) => setidCategori(e.target.value)}
                            >
                                <option value="0">Chọn loại thiết bị</option>
                                {
                                    listCategories?.map((catagory, i) =>
                                        <option key={i} value={catagory.id}>{catagory.nameCategories}</option>
                                    )
                                }
                            </select>
                            {errors.idCategori && <p className={cx("errors")}>{errors.idCategori}</p>}

                        </div>

                    </div>

                    <h5>Mô tả sản phẩm</h5>
                    <div className={`${cx("desService")} ${errors.contentMarkdown ? 'border-danger' : ''}`}>
                        <MdEditor style={{ height: '600px', border: "1px soild red" }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} value={contentMarkdown} />

                    </div>
                    {errors.contentMarkdown && <p className={cx("errors")}>{errors.contentMarkdown}</p>}


                    <button type="button" className={cx("btnAddService")} onClick={uploadService}>
                        Tạo sản phẩm
                    </button>

                </div>
            </div>
        </>
    );
}

export default AddProduct;