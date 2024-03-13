import className from "classnames/bind";
import styles from "./EditService.module.scss";
import { useEffect, useState } from "react";
import axios from '../../../service/customize_axios';
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const cx = className.bind(styles);

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";

import React from 'react';
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);


function EditService() {

    const { id } = useParams();
    const [data, setData] = useState();
    const [showImage, setShowImage] = useState("../public/icon/image-gallery.png")
    const [nameService, setNameService] = useState("");
    const [contentMarkdown, setContentMarkdown] = useState("");
    const [contentHTML, setContentHTML] = useState("")
    const [logoService, setLogoService] = useState();
    const [errors, setErrors] = useState({});



    useEffect(() => {
        axios.get("http://localhost:3000/blog/getService/" + id)
            .then(res => {
                setData(res.data.detailService)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const getData = () => {
            setNameService(data?.nameService)
            setContentMarkdown(data?.contentMarkDown)
            setContentHTML(data?.contentHTML)
            setShowImage(`http://localhost:3000/${data?.logoService}`)
            // setLogoService(data?.logoService)
        }

        getData();
    }, [data])

    function handleEditorChange({ html, text }) {
        setContentHTML(html);
        setContentMarkdown(text)
    }

    const uploadService = () => {
        const newErrors = {};

        if (nameService.trim() === "") {
            newErrors.nameService = "Chưa nhập tên dịch vụ"
        }

        if (Object.keys(newErrors).length === 0) {
            setErrors({});

            const formData = new FormData();
            formData.append('logoService', logoService)
            formData.append('nameService', nameService)
            formData.append('contentHTML', contentHTML)
            formData.append('contentMarkdown', contentMarkdown)
            axios.put("http://localhost:3000/blog/updateService/" + id, formData)
                .then(res => {
                    if (res.data.success === false) {
                        toast.error(res.data.message)
                        // getData();
                    }
                    else {
                        toast.success(res.data.message)

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
                    <h4 className="d-inline-block">Chỉnh sửa dịch vụ</h4>
                </div>
                <div className={cx("contentPage")}>
                    <form action="">
                        <div className={cx("titleContentService")}>
                            <FontAwesomeIcon icon={faScrewdriverWrench} className={cx("iconTitleContentService")} />
                            <div className={cx("contentTitleContentService")}>
                                <h5>Thông tin dịch vụ</h5>
                                <p>Điên đầy đủ thông tin dịch vụ bên dưới.</p>
                            </div>
                        </div>

                        <div className={cx("titleService")}>
                            <div className="mb-3 mt-4">
                                <h5>Tên dịch vụ</h5>
                                <input
                                    type="email"
                                    className={`form-control mt-2 ${errors.nameService ? 'border-danger' : ''}`}
                                    id="exampleFormControlInput1"
                                    placeholder="Nhập tên dịch vụ"
                                    defaultValue={nameService}
                                    onChange={(e) => { setNameService(e.target.value) }}

                                />
                                {errors.nameService && <p className={cx("errors")}>{errors.nameService}</p>}
                            </div>

                        </div>
                        <div className="logoService mb-3">
                            <h5>Logo dịch vụ</h5>

                            <input type="file" name="imgService" id="imgService" className="d-none"
                                accept="image/jpeg, image/png, image/jpg"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setShowImage(URL.createObjectURL(e.target.files[0]))
                                        setLogoService(e.target.files[0])
                                    }


                                }} />
                            <label htmlFor="imgService" className={`${cx("labelImgService")} ${errors.logoService ? 'border-danger' : ''}`}>
                                <img className={cx("imgService")} src={showImage} alt="" />
                            </label>
                            {errors.logoService && <p className={cx("errors")}>{errors.logoService}</p>}
                        </div>
                        <h5>Mô tả dịch vụ</h5>
                        <div className="desService">
                            <MdEditor style={{ height: '600px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} value={contentMarkdown} />
                        </div>

                        <button type="button" className={cx("btnEditService")} onClick={uploadService}>
                            Lưu dịch vụ
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditService;