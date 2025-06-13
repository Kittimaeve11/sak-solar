'use client';

import { Message } from '@mui/icons-material'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
export default function page() {
    return (
        <div>
            <div style={{ margin: '0 1rem' }}>            <br />
                <button
                    type="button"
                    className="buttonPrimary"
                >
                    buttonPrimary
                </button>

                <button
                    type="button"
                    className="buttonSecondarybule"
                >
                    buttonSecondarybule
                </button>

                <button
                    type="button"
                    className="buttonSecondaryonebule"
                >
                    buttonSecondaryonebule
                </button>

            </div>

            <div style={{ margin: '0 1rem' }}>

                <button
                    type="button"
                    className="buttonDelete"
                >
                    buttonDelete
                </button>



                <button
                    type="button"
                    className="buttonSecondarydelte"
                >
                    buttonSecondarydelte
                </button>
                <button
                    type="button"
                    className="buttonSecondaryonedelte"
                >
                    buttonSecondaryonedelte
                </button>
            </div>

            <div style={{ margin: '0 1rem' }}>

                <button
                    type="button"
                    className="buttonPrimaryorange"
                >
                    buttonPrimaryorange
                </button>
                <button
                    type="button"
                    className="buttonSecondaryorange"
                >
                    buttonSecondaryorange
                </button>
                <button
                    type="button"
                    className="buttonSecondaryoneorange"
                >
                    buttonSecondaryoneorange
                </button>

            </div>
            <Formik
                initialValues={{
                    name: '',
                    country: '',
                    gender: '',
                    agree: false
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required('กรุณากรอกชื่อ'),
                    country: Yup.string().required('กรุณาเลือกประเทศ'),
                    gender: Yup.string().required('กรุณาเลือกเพศ'),
                    agree: Yup.boolean().oneOf([true], 'กรุณายอมรับเงื่อนไข')
                })}
                onSubmit={(values) => {
                    console.log('ส่งข้อมูล:', values);
                }}
            >
                {({ resetForm }) => (
                    <Form className="form-container">
                        <div>
                            <label htmlFor="name" className="form-label">ชื่อ - นามสกุล :</label>
                            <Field name="name" type="text" className="form-field" />
                            <ErrorMessage name="name" component="div" className="error-text" />

                        </div>
                        <div>
                            <label className="form-label">เพศ:</label>
                            <label className="form-radio">
                                <Field type="radio" name="gender" value="male" className="radio-input" />
                                ชาย
                            </label>
                            <label className="form-radio">
                                <Field type="radio" name="gender" value="female" className="radio-input" />
                                หญิง
                            </label>
                            <label className="form-radio">
                                <Field type="radio" name="gender" value="other" className="radio-input" />
                                อื่น ๆ
                            </label>
                            <ErrorMessage name="gender" component="div" className="error-text" />
                        </div>

                        <div className="form-select-wrapper">
                            <label htmlFor="country" className="form-label">ประเทศ :</label>
                            <Field name="country">
                                {({ field }) => (
                                    <div className="custom-select-container">
                                        <select {...field} className={`form-select ${field.value === '' ? 'placeholder' : ''}`}>
                                            <option value="" disabled hidden>-- กรุณาเลือก --</option>
                                            <option value="th">ไทย</option>
                                            <option value="us">สหรัฐฯ</option>
                                            <option value="jp">ญี่ปุ่น</option>
                                        </select>
                                        <MdOutlineKeyboardArrowDown className="select-arrow" />
                                    </div>
                                )}
                            </Field>
                        </div>
                        <ErrorMessage name="country" component="div" className="error-text" />

                        <div className="checkbox-wrapper">
                            <label className="checkbox-label">
                                <Field name="agree" type="checkbox" className="checkbox-input" />
                                <span className="custom-checkbox"></span>
                                ยอมรับเงื่อนไขการใช้งาน
                            </label>
                            <ErrorMessage name="agree" component="div" className="error-text" />
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <button type="submit" className="buttonPrimary">ส่งข้อมูล</button>
                            <button type="button" onClick={() => resetForm()} className="buttonDelete">เคลียร์ข้อมูล</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>

    )
}
